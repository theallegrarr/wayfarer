import trips from '../model/trips';

function makeTrips(info) {

  const value = Math.max(...trips.map(o => o.trip_id));

  const data = {
    trip_id: value + 1,
    bus_id: 4,
    origin: 'Lagos',
    destination: 'Abuja',
    trip_date: '01-08-2019',
    fare: 3000.0,
    user_id: info.user_id,
  };

  if (info.is_admin === 'true') {
    trips.push(data);
  } else {
    return ('failed');
  }

  return data;
}

export default makeTrips;
