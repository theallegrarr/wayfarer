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

pool.query('CREATE TABLE IF NOT EXISTS btrips (id INT, bus_id INT, origin VARCHAR, destination VARCHAR, trip_date DATE, fare FLOAT, status FLOAT)', (err, res) => {
  if (err) {
    console.log(err);
  }
});

pool.query('CREATE TABLE IF NOT EXISTS bbookings (id INT, user_id INT, trip_id INT, bus_id INT, trip_date DATE, seat_number INT, first_name VARCHAR, last_name VARCHAR, email VARCHAR)', (err, res) => {
  if (err) {
    console.log(err);
  }
});

if (process.env.NODE_ENV === 'test') {
  const data = {
    bus_id: 1,
    origin: 'Lagos',
    destination: 'Kaduna',
    trip_date: '2019-07-30T00:00:00.000Z',
    fare: 8500,
    status: 1,
  };

  pool.query('INSERT INTO btrips(id, bus_id, origin, destination, trip_date, fare, status) VALUES($1, $2, $3, $4, $5, $6, $7)', [1, data.bus_id, data.origin, data.destination, data.trip_date, data.fare, data.status], (err, res) => {
    if (err) {
      console.log(error);
    }
  });
}

pool.end();
