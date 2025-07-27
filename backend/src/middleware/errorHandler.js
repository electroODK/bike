// src/middleware/errorHandler.js
import logger from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    logger.error('Error occurred', {
        status: statusCode,
        message: err.message,
        stack: err.stack,
        method: req.method,
        path: req.originalUrl,
        ip: req.ip
    });

    if (statusCode >= 400 && statusCode < 500) {
        res.status(statusCode).json({
            success: false,
            message: err.message || 'Client error'
        });
    } else {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export default errorHandler;
