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

function adduser(data) {
  pool.query('INSERT INTO users(id, email, first_name, last_name, password, is_admin) VALUES($1, $2, $3, $4, $5, $6)', [data.id, data.email, data.first_name, data.last_name, data.password, data.is_admin], (err, res) => {
    if (err) {
      console.log(err);
      return 'failed';
    }

    console.log(res);
    return 'success';
  });
}

export default adduser;
