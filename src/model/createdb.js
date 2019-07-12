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

pool.query('CREATE TABLE IF NOT EXISTS bookings (id INT, trip_id INT, user_id INT, created_on DATE)', (err, res) => {
  console.log(err, res);
});

pool.query('CREATE TABLE IF NOT EXISTS buses (id INT, number_plate INT, manufacturer VARCHAR, model VARCHAR, year VARCHAR, capacity INT)', (err, res) => {
  console.log(err, res);
});

pool.end();
