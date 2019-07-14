import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const env = process.env.NODE_ENV || 'test';

module.exports = (req, res, next) => {
  if (env === 'test') {
    next();
  }

  try {
    const decode = jwt.verify(req.body.token, process.env.JWT_KEY);
    req.userData = decode;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'failed',
      error: 'Invalid Request Token',
    });
  }
};
