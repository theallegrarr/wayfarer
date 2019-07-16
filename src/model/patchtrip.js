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

function patch(tripid) {
  // let value = '';
  const query = {
    // give the query a unique name
    name: 'fetch-trips',
    text: 'UPDATE btrips SET status=$2 WHERE id=$1',
    values: [tripid,0],
  };
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      let val = '';
      if (error) {
        reject(error);
      }
      if (results) {
        val = 'true';
        resolve(val);
      } else {
        val = 'false';
        resolve(val);
      }
    });
  }).catch((error) => {
    if (error) {
      console.log(error);
    }
  });
}

export default patch;
