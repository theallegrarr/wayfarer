import viewtrip from '../model/viewtrips';

function viewtrips() {
  return new Promise((resolve, reject) => {
    viewtrip().then((result) => {
      const val = result;
      resolve(val);
    }).catch((error) => {
      reject(error);
    });
  });
}

export default viewtrips;
