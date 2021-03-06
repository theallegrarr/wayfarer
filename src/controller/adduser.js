import userfind from '../model/userfind';
import adduser from '../model/adduser';

function addUser(info) {
  return new Promise((resolve, reject) => {
    userfind(info.email).then((result) => {
      let val = '';
      if (result === 'true') {
        val = 'failed';
        resolve(val);
      }
      if (result === 'false') {
        adduser(info);
        val = 'success';
        resolve(val);
      }
    }).catch((error) => {
      reject(error);
    });
  });
}

export default addUser;
