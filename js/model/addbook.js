'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bookfind = require('./bookfind');

var _bookfind2 = _interopRequireDefault(_bookfind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var pool = new _pg.Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBASE,
  password: process.env.DBPASS,
  port: process.env.DBPORT
});

function getUserInfo(user) {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM users WHERE id=$1', [user.user_id], function (err, res) {
      if (res.rowCount > 0) {
        var data = res.rows[0];
        resolve(data);
        reject(err);
      } else {
        reject(err);
      }
    });
  }).catch(function (err) {
    return err;
  });
}

function getTripInfo(tripId) {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM trips WHERE trip_id=$1', [tripId], function (err, res) {
      if (res.rowCount > 0) {
        var data = res.rows[0];
        resolve(data);
        reject(err);
      } else {
        resolve('invalid id');
        reject(err);
      }
    });
  }).catch(function (err) {
    return err;
  });
}

function getSeats(tripId) {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM bookings WHERE trip_id=$1', [tripId], function (err, res) {
      if (res.rowCount > 0) {
        var data = res.rowCount;
        resolve(data);
        reject(err);
      } else {
        var _data = 0;
        resolve(_data);
        reject(err);
      }
    });
  }).catch(function (err) {
    return err;
  });
}

function addbook(info, rowc) {
  var data = '';
  var rowcount = 0;
  var seat = 0;
  return new Promise(function (resolve, reject) {
    getUserInfo(info).then(function (result) {
      getTripInfo(info.trip_id).then(function (result2) {
        getSeats(info.trip_id).then(function (result3) {
          var tripInfo = result2;
          if (result2 === 'invalid id') {
            resolve('invalid id');
          }
          seat = result3 + 1;
          rowcount = rowc + 1;
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
            email: result.email
          };

          pool.query('INSERT INTO bookings(id, user_id, trip_id, bus_id, trip_date, seat_number, first_name, last_name, email) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)', [data.id, data.user_id, data.trip_id, data.bus_id, data.trip_date, data.seat_number, data.first_name, data.last_name, data.email], function (err, res) {
            resolve(data);
            reject(err);
          });
        }).catch(function (err) {
          if (err) {
            console.log(err);
          }
        });
      }).catch(function (err) {
        if (err) {
          console.log(err);
        }
      });
    }).catch(function (err) {
      if (err) {
        console.log(err);
      }
    });
  });
}

exports.default = addbook;