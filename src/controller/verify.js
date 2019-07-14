import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === undefined) {
  next();
}

module.exports = (req, res, next) => {

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
