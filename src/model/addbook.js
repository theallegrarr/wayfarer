import { Pool } from 'pg';
import dotenv from 'dotenv';
import validId from './validId';

dotenv.config();

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBASE,
  password: process.env.DBPASS,
  port: process.env.DBPORT,
});

function addbook() {
  validId().then((result) => {
    const data = {
      id: result,
      bus_id: 4,
      origin: 'Lagos',
      destination: 'Abuja',
      trip_date: '2019-08-01',
      fare: 2000.0,
    };
    pool.query('INSERT INTO trips(trip_id, bus_id, origin, destination, trip_date, fare) VALUES($1, $2, $3, $4, $5, $6)', [data.trip_id, data.bus_id, data.origin, data.destination, data.trip_date, data.fare], (err, res) => {
      if (err) {
        console.log(err);
        return 'failed';
      }

      console.log(res);
      return 'success';
    });
  });
}

export default addbook;