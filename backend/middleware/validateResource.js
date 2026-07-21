const validateResource = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (e) {
        // Send a formatted 400 Bad Request error
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: e.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message
            }))
        });
    }
};

module.exports = validateResource;
