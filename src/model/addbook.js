import { Pool } from 'pg';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import tripfind from './bookfind';

dotenv.config();

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBASE,
  password: process.env.DBPASS,
  port: process.env.DBPORT,
});

function getUserInfo(user) {
  return new Promise((resolve, reject) => {
    const decode = jwt.verify(user.token, process.env.JWT_KEY);
    pool.query('SELECT * FROM users WHERE email=$1', [decode.email], (err, res) => {
      if (res.rowCount > 0) {
        const idata = res.rows[0];
        resolve(idata);
      } else {
        resolve('failed');
      }
    });
  }).catch((err) => {console.log(err)});
}

function getTripInfo(tripId) {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM btrips WHERE id=$1', [tripId], (err, res) => {
      if (res.rowCount > 0) {
        const data = res.rows[0];
        resolve(data);
        reject(err);
      } else {
        resolve('invalid id');
        reject(err);
      }
    });
  }).catch(err => err);
}

function getSeats(tripId) {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM bookings WHERE trip_id=$1', [tripId], (err, res) => {
      if (res.rowCount > 0) {
        const data = res.rowCount;
        resolve(data);
        reject(err);
      } else {
        const data = 0;
        resolve(data);
        reject(err);
      }
    });
  }).catch(err => err);
}

function addbook(info, rowc) {
  let data = '';
  let rowcount = 0;
  let seat = 0;
  return new Promise((resolve, reject) => {
    getUserInfo(info).then((result) => { 
      getTripInfo(info.trip_id).then((result2) => {
        getSeats(info.trip_id).then((result3) => {
          const tripInfo = result2;
          if (result2 === 'invalid id') {
            resolve('invalid id');
          }
          if (result === 'failed') {
            resolve('invalid id');
          }
          seat = result3 + 1;
          rowcount = rowc + 1
          // const bookId = result - 1;
          data = {
            id: rowcount,
            user_id: info.user_id,
            trip_id: info.trip_id,
            bus_id: tripInfo.bus_id,
            trip_date: tripInfo.trip_date,
            seat_number: seat,
            first_name: result.first_name,
            last_name: result.last_name,
            email: result.email,
          };

          pool.query('INSERT INTO bookings(id, user_id, trip_id, bus_id, trip_date, seat_number, first_name, last_name, email) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)', [data.id, data.user_id, data.trip_id, data.bus_id, data.trip_date, data.seat_number, data.first_name, data.last_name, data.email], (err, res) => {
            resolve(data);
          });
        }).catch((err) => {
          if (err) {
            reject(err);
          }
        });
      }).catch((err) => {
        if (err) {
          reject(err);
        }
      });
    }).catch((err) => {
      if (err) {
        reject(err);
      }
    });
  });
}

export default addbook;
