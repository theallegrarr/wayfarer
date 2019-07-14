import addtrip from '../model/addtrips';

function addTrip(info) {
  return new Promise((resolve, reject) => {
    addtrip(info).then((result) => {
      const val = result;
      resolve(val);
    }).catch((error) => {
      reject(error);
    });
  });
}

export default addTrip;
