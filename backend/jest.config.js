module.exports = {
    testEnvironment: 'node',
    globalSetup: '<rootDir>/tests/setup/globalSetup.js',
    globalTeardown: '<rootDir>/tests/setup/globalTeardown.js',
    setupFilesAfterEnv: ['<rootDir>/tests/setup/setupFile.js'],
    testMatch: [
        '**/tests/**/*.test.js',
        '**/?(*.)+(spec|test).js'
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/tests/'
    ]
};
