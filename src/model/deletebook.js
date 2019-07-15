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

function deletebook(id) {
  let query = '';
  query = {
    // give the query a unique name
    name: 'delete-booking',
    text: 'DELETE FROM bookings WHERE id = $1',
    values: [id],
  };

  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      resolve(results);
      reject(error);
    });
  });
}

export default deletebook;
