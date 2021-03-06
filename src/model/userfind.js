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

function userfind(iemail,all) {
  // let value = '';
  let query = {
    // give the query a unique name
    name: 'fetch-user',
    text: 'SELECT * FROM users WHERE email = $1',
    values: [iemail],
  };
  if (all === 1) {
    query = {
      // give the query a unique name
      name: 'fetch-user 2',
      text: 'SELECT * FROM users',
      values: [],
    };
  }
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      let val = '';
      if (error) {
        reject(error);
      }
      
      if (results.rowCount > 0 && all === 1) {
        resolve(results.rowCount);
      }

      if (results.rowCount > 0) {
        val = 'true';
        resolve(val);
      }
      if (results.rowCount === 0) {
        val = 'false';
        resolve(val);
      }
    });
  });
}

export default userfind;
