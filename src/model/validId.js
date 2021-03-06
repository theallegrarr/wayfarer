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

function validId() {
  // let value = '';
  const query = {
    // give the query a unique name
    name: 'fetch-trips',
    text: 'SELECT * FROM btrips',
  };
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if (error) {
        reject(error);
      }
      const val = results.rowCount + 1;
      resolve(val);
    });
  });
}

export default validId;
