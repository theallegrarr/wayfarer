import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

if (process.env.PLACE === 'Travis') {
  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DBASE,
    password: process.env.DBPASS,
    port: process.env.DBPORT,
  });

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
      console.log(err);
    }
  });
}
