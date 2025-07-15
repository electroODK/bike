import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  
  if (!token) {
    return res.status(401).json({
      message: 'No token provided',
      error: true,
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;  
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid or expired token',
      error: true,
      success: false,
    });
  }
};