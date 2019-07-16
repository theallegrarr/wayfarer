import bookfind from '../model/bookfind';
import remove from '../model/deletebook';

function deletebook(info, user) {

  return new Promise((resolve, reject) => {
    bookfind(info, -1, -1).then((result) => {
      if (result.rowCount > 0) {
        if (result.rows[0].user_id !== user.id) {
          console.log(result.rows[0].user_id);
          resolve('not authorized to delete this booking');
        }
        remove(info).then((result2) => {
          resolve('success');
        }).catch((err) => {
          if (err) {
            console.log(err);
            reject(err);
          }
        });
      } else {
        resolve('booking does not exist');
      }
    }).catch((err) => {
      if (err) {
        console.log(err);
        reject(err);
      }
    });
  });
}

export default deletebook;
