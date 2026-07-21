const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = async function globalSetup() {
    console.log('Global test setup - creating mongo memory server...');
    const instance = await MongoMemoryServer.create();
    global.__MONGOINSTANCE = instance;
    process.env.MONGO_URI = instance.getUri();
};

