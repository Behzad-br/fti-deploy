const mongoose = require('mongoose');

beforeAll(async () => {
    // Check if the URI contains "test" to ensure we're not touching dev/prod DBs
    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw new Error('MONGO_URI is not set in test environment');
    }
    
    // Connect to the isolated test database
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

afterEach(async () => {
    // Clear all collections after each test for total isolation
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
});
