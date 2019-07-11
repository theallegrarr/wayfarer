import trips from '../model/trips';

function viewTrips(info) {

  if (info.is_admin === 'true') {
    return trips;
  }

  const userTrips = trips.filter(trips => trips.user_id === info.user_id);

  return userTrips;
}

export default viewTrips;
