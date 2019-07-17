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

function addtrip(data) {
  return new Promise((resolve, reject) => {
    validId().then((result) => {
      pool.query('INSERT INTO btrips(id, bus_id, origin, destination, trip_date, fare, status) VALUES($1, $2, $3, $4, $5, $6, $7)', [result, data.bus_id, data.origin, data.destination, data.trip_date, data.fare, data.status], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    }).catch((error) => {
      reject(error);
    });
  });
}

export default addtrip;
