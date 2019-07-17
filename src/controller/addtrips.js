import addtrip from '../model/addtrips';

function addTrip(info) {
  return new Promise((resolve, reject) => {
    const data = {
      id: null,
      bus_id: info.bus_id,
      origin: info.origin,
      destination: info.destination,
      trip_date: info.trip_date,
      fare: info.fare,
      status: 1.0,
    };

    addtrip(data).then((result) => {

      const productData = {
        id: result,
        bus_id: info.bus_id,
        origin: info.origin,
        destination: info.destination,
        trip_date: info.trip_date,
        fare: info.fare,
        status: 1.0,
      };

      resolve(productData);
    }).catch((error) => {
      console.log(error);
      reject(error);
    });
  });
}

export default addTrip;
