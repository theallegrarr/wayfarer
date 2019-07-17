'use strict';

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

if (process.env.PLACE === 'Travis') {
  var pool = new _pg.Pool({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DBASE,
    password: process.env.DBPASS,
    port: process.env.DBPORT
  });

  var data = {
    bus_id: 1,
    origin: 'Lagos',
    destination: 'Kaduna',
    trip_date: '2019-07-30T00:00:00.000Z',
    fare: 8500,
    status: 1
  };

  pool.query('INSERT INTO btrips(id, bus_id, origin, destination, trip_date, fare, status) VALUES($1, $2, $3, $4, $5, $6, $7)', [1, data.bus_id, data.origin, data.destination, data.trip_date, data.fare, data.status], function (err, res) {
    if (err) {
      console.log(err);
    }
  });
}