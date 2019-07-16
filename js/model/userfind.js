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

function userfind(iemail, all) {
  // let value = '';
  var query = {
    // give the query a unique name
    name: 'fetch-user',
    text: 'SELECT * FROM users WHERE email = $1',
    values: [iemail]
  };
  if (all === 1) {
    query = {
      // give the query a unique name
      name: 'fetch-user 2',
      text: 'SELECT * FROM users',
      values: []
    };
  }
  return new Promise(function (resolve, reject) {
    pool.query(query, function (error, results) {
      var val = '';
      if (error) {
        reject(error);
      }

      if (results.rowCount > 0 && all === 1) {
        resolve(results.rowCount);
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

exports.default = userfind;