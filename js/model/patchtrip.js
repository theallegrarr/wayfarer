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

function patch(tripid) {
  // let value = '';
  var query = {
    // give the query a unique name
    text: 'UPDATE btrips SET status=$2 WHERE id=$1',
    values: [tripid, 0]
  };
  return new Promise(function (resolve, reject) {
    pool.query(query, function (error, results) {
      var val = '';
      if (error) {
        throw error;
      }
      if (results) {
        val = 'true';
        resolve(val);
      } else {
        val = 'false';
        resolve(val);
      }
    });
  }).catch(function (error) {
    if (error) {
      console.log(error);
    }
  });
}

exports.default = patch;