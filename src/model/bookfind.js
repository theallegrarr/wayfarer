import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBASE,
  password: process.env.DBPASS,
  port: process.env.DBPORT,
});

function bookfind(id, tripId, userId) {
  let query = '';
  if (id !== 0) {
    query = {
    // give the query a unique name
      name: 'fetch-booking',
      text: 'SELECT * FROM bookings WHERE id = $1',
      values: [id],
    };
  }
  if (tripId !== 0 && id === 0) {
    query = {
    // give the query a unique name
      name: 'fetch-booking',
      text: 'SELECT * FROM bookings WHERE trip_id = $1',
      values: [tripId],
    };
  }
  if (id === 0) {
    query = {
      // give the query a unique name
      name: 'fetch-booking',
      text: 'SELECT * FROM bookings',
    };
  }
  if (userId > 0) {
    query = {
      // give the query a unique name
      name: 'fetch-booking',
      text: 'SELECT * FROM bookings WHERE user_id = $1',
      values: [userId],
    };
  }

  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      let val = '';
      if (error) {
        reject(error);
      }
      if (results.rowCount > 0) {
        val = results;
        resolve(val);
      }
      if (results.rowCount === 0) {
        val = false;
        resolve(val);
      }
    });
  });
}

export default bookfind;
