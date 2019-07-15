import getbooks from '../model/bookfind';

function getBooks(info, info2, info3) {
  return new Promise((resolve, reject) => {
    getbooks(info, info2, info3).then((result) => {
      let val = '';
      if (result === false) {
        val = 'no bookings found';
        resolve(val);
      }
      if (result !== false) {
        val = result.rows;
        resolve(val);
      }
    }).catch((error) => {
      reject(error);
    });
  });
}

export default getBooks;
