const rateLimit = require('express-rate-limit');

// General API Rate Limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again after 15 minutes',
    },
});

// Authentication Rate Limiter
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per `window` for auth routes
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many login attempts from this IP, please try again after 15 minutes',
    },
});

// Form Submission Rate Limiter
const formLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 form submissions per hour
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many form submissions from this IP, please try again after an hour',
    },
});

module.exports = {
    apiLimiter,
    authLimiter,
    formLimiter,
};
