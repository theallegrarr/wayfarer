import tripfind from '../model/tripfind';
import addbook from '../model/addbook';
import bookfind from '../model/bookfind';

function addBook(info) {

  return new Promise((resolve, reject) => {
    let rowcount = 0;
    const tripInfo = '';
    bookfind(0).then((result) => {
      rowcount = result.rowCount;
    }).catch((err) => {
      if (err) {
        console.log(err);
        reject(err);
      }
    });

    tripfind(info.trip_id, 0).then((result) => {
      let val = '';
      if (result === 'false') {
        val = 'trip is not valid';
        resolve(val);
      } else {
        addbook(info, rowcount).then((value) => {
          resolve(value);
        }).catch((err) => {
          if (err) {
            console.log(err);
            reject(err);
          }
        });
      }
    }).catch((error) => {
      reject(error);
    });
  });
}

export default addBook;
