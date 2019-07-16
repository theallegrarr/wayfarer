import bcrypt from 'bcrypt';

function produce(value) {
  return new Promise((resolve,reject) => {
    bcrypt.hash(value, 10, (err, hash) => {
      if (err) {
        resolve('failed');
      }

      if (hash) {
        resolve(hash);
      }
      reject(err);
    });
  });
}

export default produce;