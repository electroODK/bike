// src/middleware/requestLogger.js
import logger from '../utils/logger.js';

const requestlogger = (req, res, next) => {
    logger.info(`[${req.method}] ${req.originalUrl}`, {
        ip: req.ip,
        params: req.params,
        query: req.query,
        body: req.body
    });
    next();
};

export default requestlogger;
