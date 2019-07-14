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

pool.query('CREATE TABLE IF NOT EXISTS bookings (booking_id INT, user_id INT, trip_id INT, bus_id INT, trip_date DATE, seat_number INT, first_name VARCHAR, last_name VARCHAR, email VARCHAR)', (err, res) => {
  if (err) {
    console.log(err);
  }
});

pool.query('CREATE TABLE IF NOT EXISTS users (id INT, email VARCHAR, first_name VARCHAR, last_name VARCHAR, password VARCHAR, is_admin BOOL, token VARCHAR)', (err, res) => {
  if (err) {
    console.log(err);
  }
});

pool.query('CREATE TABLE IF NOT EXISTS buses (id INT, number_plate INT, manufacturer VARCHAR, model VARCHAR, year VARCHAR, capacity INT)', (err, res) => {
  if (err) {
    console.log(err);
  }
});

pool.query('CREATE TABLE IF NOT EXISTS trips (trip_id INT, bus_id INT, origin VARCHAR, destination VARCHAR, trip_date DATE, fare FLOAT)', (err, res) => {
  if (err) {
    console.log(err);
  }
});

pool.query('SELECT * FROM trips', (err, res) => {
  console.log(res);
});

pool.end();
