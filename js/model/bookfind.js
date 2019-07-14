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

function bookfind(iemail) {
  // let value = '';
  var query = {
    // give the query a unique name
    name: 'fetch-user',
    text: 'SELECT * FROM bookings WHERE email = $1',
    values: [iemail]
  };
  return new Promise(function (resolve, reject) {
    pool.query(query, function (error, results) {
      var val = '';
      if (error) {
        reject(error);
      }
      if (results.rowCount > 0) {
        val = 'true';
        resolve(val);
      }
      if (results.rowCount === 0) {
        val = 'false';
        resolve(val);
      }
    });
  });
}

exports.default = bookfind;