'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _validId = require('./validId');

var _validId2 = _interopRequireDefault(_validId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var pool = new _pg.Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBASE,
  password: process.env.DBPASS,
  port: process.env.DBPORT
});

function addtrip() {
  return new Promise(function (resolve, reject) {
    (0, _validId2.default)().then(function (result) {
      var data = {
        id: result,
        bus_id: 4,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: '2019-08-01',
        fare: 2000.0
      };
      pool.query('INSERT INTO trips(trip_id, bus_id, origin, destination, trip_date, fare) VALUES($1, $2, $3, $4, $5, $6)', [data.id, data.bus_id, data.origin, data.destination, data.trip_date, data.fare], function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }).catch(function (error) {
      reject(error);
    });
  });
}

exports.default = addtrip;