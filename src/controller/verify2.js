import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function verify(req) {
  return new Promise((resolve, reject) => {
    const decode = jwt.verify(req.body.token, process.env.JWT_KEY);
    const data = decode;
    console.log(data);
    resolve(data);
  }).catch((error) => {
    reject(error);
  });
}

export default verify;
