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

function validId() {
  // let value = '';
  var query = {
    // give the query a unique name
    name: 'fetch-trips',
    text: 'SELECT * FROM btrips'
  };
  return new Promise(function (resolve, reject) {
    pool.query(query, function (error, results) {
      if (error) {
        reject(error);
      }
      var val = results.rowCount + 1;
      resolve(val);
    });
  });
}

exports.default = validId;