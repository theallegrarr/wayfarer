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

function addtrip(req) {
  return new Promise((resolve, reject) => {
    validId().then((result) => {
      const data = {
        id: result,
        bus_id: req.bus_id,
        origin: req.origin,
        destination: req.destination,
        trip_date: req.trip_date,
        fare: req.fare,
        status: 1.0,
      };
      pool.query('INSERT INTO btrips(id, bus_id, origin, destination, trip_date, fare, status) VALUES($1, $2, $3, $4, $5, $6, $7)', [data.id, data.bus_id, data.origin, data.destination, data.trip_date, data.fare, data.status], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }).catch((error) => {
      reject(error);
    });
  });
}

export default addtrip;
