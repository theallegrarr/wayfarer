import findtrip from '../model/tripfind';
import patch from '../model/patchtrip';

function deletebook(info) {

  return new Promise((resolve, reject) => {
    findtrip(info).then((result) => {
      if (result === 'true') {
        patch(info).then(() => {
          resolve('success');
        }).catch((err) => {
          if (err) {
            console.log(err);
          }
        });
      } else {
        resolve('trip does not exist');
      }
    }).catch((err) => {
      if (err) {
        console.log(err);
      }
    });
  });
}

export default deletebook;
