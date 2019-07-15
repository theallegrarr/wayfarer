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

function deletebook(id) {
  var query = '';
  query = {
    // give the query a unique name
    name: 'delete-booking',
    text: 'DELETE FROM bookings WHERE id = $1',
    values: [id]
  };

  return new Promise(function (resolve, reject) {
    pool.query(query, function (error, results) {
      resolve(results);
      reject(error);
    });
  });
}

exports.default = deletebook;