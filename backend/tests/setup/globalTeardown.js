const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = async function globalTeardown() {
    console.log('Global test teardown - stopping mongo memory server...');
    const instance = global.__MONGOINSTANCE;
    if (instance) {
        await instance.stop();
    }
};

