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

function adduser(data) {
  pool.query('INSERT INTO users(id, email, first_name, last_name, password, is_admin) VALUES($1, $2, $3, $4, $5, $6)', [data.id, data.email, data.first_name, data.last_name, data.password, data.is_admin], function (err, res) {
    if (err) {
      console.log(err);
      return 'failed';
    }
    return 'success';
  });
}

exports.default = adduser;