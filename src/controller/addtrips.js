import addtrip from '../model/addtrips';

function addTrip(info) {
  return new Promise((resolve, reject) => {

    addtrip(info).then((result) => {
      const val = result;
      console.log(info);
      resolve(val);
    }).catch((error) => {
      console.log(error);
      reject(error);
    });
  });
}

export default addTrip;
