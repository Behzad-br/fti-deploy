const { MongoMemoryServer } = require('mongodb-memory-server');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

(async () => {
    console.log('--- Booting Isolated Staging Environment ---');
    const dbPath = path.join(__dirname, '..', 'tempdb');
    if (fs.existsSync(dbPath)) {
        fs.rmSync(dbPath, { recursive: true, force: true });
    }
    fs.mkdirSync(dbPath);
    
    const mongod = await MongoMemoryServer.create({ instance: { dbPath } });
    const uri = mongod.getUri();
    
    console.log(`[Staging DB] Started at: ${uri}`);

    const envContent = `NODE_ENV=staging
PORT=5000
MONGO_URI=${uri}
JWT_SECRET=super_secret_staging_jwt_key_that_is_at_least_32_characters_long
FRONTEND_URL=http://localhost:8080
ADDITIONAL_ALLOWED_ORIGINS=http://127.0.0.1:5173`;

    const stagingEnv = { ...process.env, ...dotenv.parse(envContent) };

    // Run Migration Dry Run
    console.log('\n[Staging DB] --- Running Migration Dry-Run ---');
    const dryProcess = spawn('node', ['utils/migrateJSON.js', '--dry-run'], { 
        cwd: path.join(__dirname, '..'), 
        env: stagingEnv,
        stdio: 'inherit'
    });

    dryProcess.on('close', (code) => {
        if (code !== 0) {
            console.error('[Staging DB] Dry-run failed');
            process.exit(1);
        }

        console.log('\n[Staging DB] --- Running Actual Migration ---');
        const migrateProcess = spawn('node', ['utils/migrateJSON.js'], { 
            cwd: path.join(__dirname, '..'), 
            env: stagingEnv,
            stdio: 'inherit'
        });

        migrateProcess.on('close', (code2) => {
            if (code2 !== 0) {
                console.error('[Staging DB] Migration failed');
                process.exit(1);
            }

            console.log('\n[Staging Server] Booting API on port 5000...');
            const serverProcess = spawn('node', ['server.js'], {
                cwd: path.join(__dirname, '..'),
                env: stagingEnv,
                stdio: 'inherit'
            });

            serverProcess.on('close', () => {
                mongod.stop();
                process.exit(0);
            });

            process.on('SIGINT', () => {
                serverProcess.kill();
                mongod.stop();
                process.exit(0);
            });
        });
    });
})();
