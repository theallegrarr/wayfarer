'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../route/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
_chai2.default.use(_chaiHttp2.default);

var should = _chai2.default.should();
var user = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvZWx5QGdtYWlsLmNvbSIsImlkIjo5LCJpYXQiOjE1NjMzNjk2NzYsImV4cCI6MTU2MzM5ODQ3Nn0.m1sbdBLi6yVUODKWm6afNzSs9xOGQYIXWS1rLgoCPMI',
  user_id: 4,
  is_admin: true,
  trip_id: 1
};

describe('BOOKING Tests', function () {
  it('Should Create booking', function (done) {
    _chai2.default.request(_app2.default).post('/v1/bookings').send(user).end(function (err, res) {
      res.should.have.status(201);
    });
    done();
  });
});