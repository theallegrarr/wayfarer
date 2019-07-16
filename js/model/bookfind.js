'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var pool = new _pg.Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBASE,
  password: process.env.DBPASS,
  port: process.env.DBPORT
});

function bookfind(id, tripId, userId) {
  var query = '';
  if (id > 0) {
    query = {
      // give the query a unique name
      text: 'SELECT * FROM bbookings WHERE id = $1',
      values: [id]
    };
  }
  if (tripId >= 0 && id === 0) {
    query = {
      // give the query a unique name
      text: 'SELECT * FROM bbookings WHERE trip_id = $1',
      values: [tripId]
    };
  }
  if (id === 0) {
    query = {
      // give the query a unique name
      text: 'SELECT * FROM bbookings'
    };
  }
  if (userId > 0) {
    query = {
      // give the query a unique name
      text: 'SELECT * FROM bbookings WHERE user_id = $1',
      values: [userId]
    };
  }

  return new Promise(function (resolve, reject) {
    pool.query(query, function (error, results) {
      console.log(id);
      var val = '';
      if (error) {
        reject(error);
      }
      if (results) {
        if (results.rowCount > 0) {
          val = results;
          // console.log(val);
          resolve(val);
        } else {
          val = 0;
          resolve(val);
        }
        if (results.rowCount === 0) {
          val = false;
          resolve(val);
        }
      }
      reject(error);
    });
  }).catch(function (error) {
    if (error) {
      console.log(error);
    }
  });
}

exports.default = bookfind;