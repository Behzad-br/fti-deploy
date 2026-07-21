const { spawn } = require('child_process');
const path = require('path');
const http = require('http');

const PORT = 5050;
const env = {
    ...process.env,
    NODE_ENV: 'production',
    PORT: PORT.toString(),
    MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smoke_test_db',
    JWT_SECRET: 'this_is_a_very_long_secret_for_production_testing_purposes',
    FRONTEND_URL: 'https://production.com'
};

const wait = (ms) => new Promise(res => setTimeout(res, ms));

const ping = (options) => {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
        });
        req.on('error', reject);
        req.end();
    });
};

(async () => {
    console.log('--- Starting Smoke Test ---');
    const serverProcess = spawn('node', [path.join(__dirname, '../server.js')], { env });
    
    let serverOutput = '';
    serverProcess.stdout.on('data', data => serverOutput += data.toString());
    serverProcess.stderr.on('data', data => serverOutput += data.toString());

    await wait(3000); // Wait for boot

    try {
        // 1. Verify unknown origin rejection
        const badOriginRes = await ping({
            hostname: '127.0.0.1',
            port: PORT,
            path: '/api/contact',
            method: 'GET',
            headers: { Origin: 'http://malicious.com' }
        });
        if (badOriginRes.status !== 403) throw new Error('Failed to reject bad origin');

        // 2. Verify production origin accepted
        const goodOriginRes = await ping({
            hostname: '127.0.0.1',
            port: PORT,
            path: '/api/contact',
            method: 'GET',
            headers: { Origin: 'https://production.com' }
        });
        // Might be 400 or 401 or whatever but shouldn't be CORS failure
        if (goodOriginRes.status === 403 || goodOriginRes.status === 500) {
            throw new Error('Production origin rejected or crashed');
        }

        // 3. Verify Helmet headers
        if (!goodOriginRes.headers['x-content-type-options']) {
            throw new Error('Helmet headers missing');
        }

        console.log('Smoke test passed successfully!');
    } catch (e) {
        console.error('Smoke test failed:', e.message);
        console.error('Server output:', serverOutput);
        process.exitCode = 1;
    } finally {
        serverProcess.kill();
    }
})();
