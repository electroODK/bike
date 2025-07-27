// src/middleware/httpLogger.js
import morgan from 'morgan';
import logger from '../utils/logger.js';

const stream = {
  write: (message) => logger.http(message.trim()),
};

const httpLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream }
);

export default httpLogger;
