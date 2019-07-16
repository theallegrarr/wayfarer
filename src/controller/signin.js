import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import signin from '../model/signin';

const log = require('simple-node-logger').createSimpleLogger();

function signIn(user) {
  return new Promise((resolve, reject) => {
    let etoken = '';
    signin(user.email).then((result) => {
      if (result) {
        if (result.rowCount > 0) {
          bcrypt.compare(user.password, result.rows[0].password, (err, response) => {
            if (response === true) {
              etoken = jwt.sign({
                email: user.email,
                id: user.id,
              },
              process.env.JWT_KEY,
              {
                expiresIn: '8h',
              });
              resolve(etoken);
            } else {
              etoken = 'failed';
              resolve(etoken);
            }
            if (err) {
              etoken = 'failed';
              resolve(etoken);
            }
          });
        }
      } else {
        resolve('failed');
      }
    }).catch((error) => {
      reject(error);
    });
  });
}

export default signIn;
