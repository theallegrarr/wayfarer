import tripfind from '../model/bookfind';
import addtrip from '../model/addbook';

function addbook(info) {
  return new Promise((resolve, reject) => {
    tripfind(info.trip_id).then((result) => {
      let val = '';
      if (result === 'true') {
        val = 'trip exists';
        resolve(val);
      }
      if (result === 'false') {
        addtrip(info);
        val = 'success';
        resolve(val);
      }
    }).catch((error) => {
      reject(error);
    });
  });
}

export default addbook;
