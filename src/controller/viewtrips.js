import trips from '../model/trips';

function viewTrips(info) {

  if (info.is_admin === 'true' || info.is_admin === 'false') {
    return trips;
  }

  const userTrips = trips.filter(trips => trips.user_id === info.user_id);

  return userTrips;
}

export default viewTrips;
