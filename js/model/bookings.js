'use strict';

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

pool.query('CREATE TABLE IF NOT EXISTS bookings (id INT, trip_id INT, user_id INT, created_on DATE)', function (err, res) {
  console.log(err, res);
});

pool.query('CREATE TABLE IF NOT EXISTS buses (id INT, number_plate INT, manufacturer VARCHAR, model VARCHAR, year VARCHAR, capacity INT)', function (err, res) {
  console.log(err, res);
});

pool.end();