import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function verify(req) {
  return new Promise((resolve, reject) => {
    const decode = jwt.verify(req.body.token, process.env.JWT_KEY);
    const data = decode;
    resolve(data);
  }).catch((error) => {
    console.log(error);
    return (false);
  });
}

export default verify;
