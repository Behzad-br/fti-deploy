const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');

// Load env vars
dotenv.config();

// Startup Checks
const requiredEnv = ['MONGO_URI', 'JWT_SECRET', 'FRONTEND_URL'];
const missingEnv = requiredEnv.filter(env => !process.env[env]);

if (missingEnv.length > 0 && process.env.NODE_ENV !== 'test') {
    console.error(`[FATAL] Missing required environment variables: ${missingEnv.join(', ')}`);
    process.exit(1);
}

if (process.env.JWT_SECRET.length < 32 && process.env.NODE_ENV === 'production') {
    console.error('[FATAL] JWT_SECRET must be at least 32 characters long in production');
    process.exit(1);
}

const connectDB = require('./config/db');
const { apiLimiter } = require('./middleware/rateLimiter');

// Parent Router
const apiRoutes = require('./routes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Load env vars
dotenv.config();

// Connect to database
// In test environments (like Jest), we manage DB connections manually
if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

const app = express();

const path = require('path');

const AppError = require('./utils/AppError');

// Security Headers
app.use(helmet({
    crossOriginResourcePolicy: false, // required if we want to serve images cross-origin
}));

// CORS Configuration
app.use(cors({
    origin: function (origin, callback) {
        // Compute dynamically for tests
        const allowedOrigins = [
        process.env.FRONTEND_URL,
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:8080',
        'http://127.0.0.1:8080',
        ...(process.env.ADDITIONAL_ALLOWED_ORIGINS ? process.env.ADDITIONAL_ALLOWED_ORIGINS.split(',') : [])
    ].filter(Boolean);

        // Allow requests with no origin (like mobile apps, curl, or test scripts)
        if (!origin) return callback(null, true);
        
        // Allow localhost in development
        if (process.env.NODE_ENV === 'development' && origin.startsWith('http://localhost')) {
            return callback(null, true);
        }

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new AppError('Not allowed by CORS', 403));
        }
    },
    credentials: true, // if using cookies
}));

// Global Rate Limiter
app.use('/api', apiLimiter);

// Middleware
app.use(express.json({ limit: '50mb' })); // Support large images (base64)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health Check
app.get('/health', async (req, res) => {
    try {
        const mongoose = require('mongoose');
        const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
        if (dbStatus !== 'connected') throw new Error('Database disconnected');
        res.status(200).json({ status: 'ok', service: 'backend', database: dbStatus });
    } catch (error) {
        res.status(503).json({ status: 'error', service: 'backend', database: 'error' });
    }
});

app.get('/', (req, res) => {
    res.send('FTI Journey API is running securely with MVC structure...');
});

// API Routes
app.use('/api', apiRoutes);

// Unmatched Routes
app.use(notFound);

// Global Error Handler (must be last)
app.use(errorHandler);

// Don't listen to port if testing (handled by supertest)
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, '0.0.0.0', () => {
        console.log(`✅ Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });

    // Graceful Shutdown
    process.on('SIGTERM', () => {
        console.info('SIGTERM signal received. Closing HTTP server.');
        server.close(async () => {
            console.log('HTTP server closed.');
            try {
                const mongoose = require('mongoose');
                await mongoose.connection.close();
                console.log('MongoDB connection closed.');
                process.exit(0);
            } catch (err) {
                console.error('Error during graceful shutdown', err);
                process.exit(1);
            }
        });
    });
}

module.exports = app; // export for testing
