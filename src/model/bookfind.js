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
  if (id > 0) {
    query = {
      text: 'SELECT * FROM bbookings WHERE id = $1',
      values: [id],
    };
  }
  if (tripId >= 0 && id === 0) {
    query = {
      text: 'SELECT * FROM bbookings WHERE trip_id = $1',
      values: [tripId],
    };
  }
  if (id === 0) {
    query = {
      text: 'SELECT * FROM bbookings',
    };
  }
  if (userId > 0) {
    query = {
      // give the query a unique name
      text: 'SELECT * FROM bbookings WHERE user_id = $1',
      values: [userId],
    };
  }

  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      console.log(id, userId, tripId, results);
      let val = '';
      if (error) {
        resolve(false);
        throw (error);
      }
      if (results) {
        if (results.rowCount > 0) {
          val = results;
          // console.log(val);
          resolve(val);
        } else {
          val = 0;
          resolve(val);
        }
        if (results.rowCount === 0) {
          val = false;
          resolve(val);
        }
      }
    });
  }).catch((error) => {
    if (error) {
      console.log(error);
    }
  });
}

export default bookfind;
