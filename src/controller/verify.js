import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

module.exports = (req, res, next) => {
  dotenv.config();

  console.log(process.env.NODE_ENV);

  if (process.env.NODE_ENV === 'test') {
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
