import bookfind from '../model/bookfind';
import remove from '../model/deletebook';

function deletebook(info, user, userid) {

  return new Promise((resolve, reject) => {
    bookfind(info, -1, -1).then((result) => {

      if (result !== undefined) {
        if (result.rowCount > 0) {
          if (result.rows[0].user_id !== userid) {
            resolve('not authorized to delete this booking');
          }

          remove(info).then(() => {
            resolve('success');
          }).catch((err) => {
            if (err) {
              reject(err);
            }
          });
        } else { resolve('booking does not exist'); }
      } else {
        resolve('booking does not exist');
      }
    }).catch((err) => {
      if (err) {
        console.log('error 1:', err);
      }
    });
  });
}

export default deletebook;
