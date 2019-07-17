'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

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
    var decode = _jsonwebtoken2.default.verify(user.token, process.env.JWT_KEY);
    pool.query('SELECT * FROM users WHERE email=$1', [decode.email], function (err, res) {
      if (res.rowCount > 0) {
        var idata = res.rows[0];
        resolve(idata);
      } else {
        resolve('failed');
      }
    });
  }).catch(function (err) {
    console.log(err);
  });
}

function getTripInfo(tripId) {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM btrips WHERE id=$1', [tripId], function (err, res) {
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
    pool.query('SELECT * FROM bbookings WHERE trip_id=$1', [tripId], function (err, res) {
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
          if (result === 'failed') {
            resolve('invalid id');
          }
          seat = result3 + 1;
          rowcount = rowc + 1;
          // const bookId = result - 1;
          data = {
            id: rowcount,
            user_id: result.id,
            trip_id: info.trip_id,
            bus_id: tripInfo.bus_id,
            trip_date: tripInfo.trip_date,
            seat_number: seat,
            first_name: result.first_name,
            last_name: result.last_name,
            email: result.email
          };

          pool.query('INSERT INTO bbookings(id, user_id, trip_id, bus_id, trip_date, seat_number, first_name, last_name, email) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)', [data.id, data.user_id, data.trip_id, data.bus_id, data.trip_date, data.seat_number, data.first_name, data.last_name, data.email], function (err, res) {
            resolve(data);
          });
        }).catch(function (err) {
          if (err) {
            reject(err);
          }
        });
      }).catch(function (err) {
        if (err) {
          reject(err);
        }
      });
    }).catch(function (err) {
      if (err) {
        reject(err);
      }
    });
  });
}

exports.default = addbook;