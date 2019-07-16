import tripfind from '../model/tripfind';
import addbook from '../model/addbook';
import bookfind from '../model/bookfind';

function addBook(info) {

  return new Promise((resolve, reject) => {
    let rowcount = -1;
    console.log(info);
    bookfind(0).then((result) => {
      if (result) {
        rowcount = result.rowCount;
      } else {
        rowcount = 0;
      }
      tripfind(info.trip_id, 0).then((xresult) => {
        let val = '';
        if (xresult === 'false') {
          val = 'trip is not valid';
          resolve(val);
        } else {
          addbook(info, rowcount).then((value) => {
            if (value === 'invalid id') {
              resolve('invalid id');
            }
            resolve(value);
          }).catch((err) => {
            if (err) {
              reject(err);
            }
          });
        }
      }).catch((error) => {
        reject(error);
      });
    }).catch((err) => {
      if (err) {
        reject(err);
      }
    });
  });
}

export default addBook;
