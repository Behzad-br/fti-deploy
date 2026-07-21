const AppError = require('../utils/AppError');

// ─────────────────────────────────────────────────────────────────────────────
//  Global Error Handling Middleware
//  Must be the LAST middleware registered in server.js
//  app.use(errorHandler)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Handle MongoDB CastError (invalid ObjectId)
 * e.g. /api/contact/not-a-valid-id
 * → 400 Bad Request
 */
const handleCastErrorDB = (err) =>
    new AppError(`Invalid ${err.path}: ${err.value}`, 400);

/**
 * Handle MongoDB duplicate key error (code 11000)
 * e.g. duplicate email on signup
 * → 409 Conflict
 */
const handleDuplicateFieldsDB = (err) => {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    const value = err.keyValue?.[field];
    return new AppError(
        `Duplicate value "${value}" for field "${field}". Please use a different value.`,
        409
    );
};

/**
 * Handle MongoDB validation errors
 * e.g. required field missing, enum constraint violation
 * → 422 Unprocessable Entity
 */
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    return new AppError(`Validation failed: ${errors.join('. ')}`, 422);
};

/**
 * Handle invalid JWT token
 * → 401 Unauthorized
 */
const handleJWTError = () =>
    new AppError('Invalid token. Please log in again.', 401);

/**
 * Handle expired JWT token
 * → 401 Unauthorized
 */
const handleJWTExpiredError = () =>
    new AppError('Your session has expired. Please log in again.', 401);

// ─────────────────────────────────────────────────────────────────────────────
//  Send error in Development (full details)
// ─────────────────────────────────────────────────────────────────────────────
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        statusCode: err.statusCode,
        message: err.message,
        stack: err.stack,
        error: err,
    });
};

// ─────────────────────────────────────────────────────────────────────────────
//  Send error in Production (clean, no leaks)
// ─────────────────────────────────────────────────────────────────────────────
const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        // Known, safe-to-expose error
        res.status(err.statusCode).json({
            status: err.status,
            statusCode: err.statusCode,
            message: err.message,
        });
    } else {
        // Unknown / programming error — don't leak details
        console.error('💥 UNEXPECTED ERROR:', err);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Something went wrong on the server. Please try again later.',
        });
    }
};

// ─────────────────────────────────────────────────────────────────────────────
//  Main Error Handler  (4 parameters = Express error middleware)
// ─────────────────────────────────────────────────────────────────────────────
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else {
        let error = Object.assign(Object.create(Object.getPrototypeOf(err)), err);
        error.message = err.message;
        error.name = err.name;
        error.code = err.code;

        if (err.type === 'entity.parse.failed') {
            error = new AppError('Malformed JSON payload', 400);
        }

        if (error.name === 'CastError')           error = handleCastErrorDB(error);
        if (error.code === 11000)                 error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError')     error = handleValidationErrorDB(error);
        if (error.name === 'JsonWebTokenError')   error = handleJWTError();
        if (error.name === 'TokenExpiredError')   error = handleJWTExpiredError();

        sendErrorProd(error, res);
    }
};

/**
 * 404 Not Found handler — for unmatched routes
 * app.use(notFound)  — register BEFORE errorHandler
 */
const notFound = (req, res, next) => {
    next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

module.exports = { errorHandler, notFound };
