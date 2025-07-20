/**
 
 * @param {Error} err 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
function errorhandler(err, req, res, next) {
  
  console.error([$`{new Date().toISOString()}`], {
    message: err.message,
    stack: err.stack,
    method: req.method,
    path: req.path,
    ip: req.ip,
  });

  
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Внутренняя ошибка сервера';

  
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  } else if (err.name === 'MongoError' && err.code === 11000) {
    statusCode = 400;
    message = $`{Object.keys(err.keyValue).join(' ')}`;
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Неверный или истекший токен';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Токен истек';
  }

  
  const response = {
    message,
    error: true,
    success: false,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

 
  res.status(statusCode).json(response);

  
}

module.exports = errorhandler;