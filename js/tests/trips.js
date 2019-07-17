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

var trip = {
  email: 'joely@gmail.com',
  first_name: 'John',
  last_name: 'Van',
  password: 'batoore',
  is_admin: true,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvZWx5QGdtYWlsLmNvbSIsImlkIjo5LCJpYXQiOjE1NjMzNjk2NzYsImV4cCI6MTU2MzM5ODQ3Nn0.m1sbdBLi6yVUODKWm6afNzSs9xOGQYIXWS1rLgoCPMI',
  bus_id: 1,
  origin: 'Lagos',
  destination: 'Kaduna',
  trip_date: '2019-07-30T00:00:00.000Z',
  fare: 8500,
  trip_id: 3
};

describe('TRIP Tests', function () {
  it('Should Create Trip', function (done) {
    _chai2.default.request(_app2.default).post('/v1/trips').send(trip).end(function (err, res) {
      console.log(res.body.data.id);
      res.should.have.status(201);
    });
    done();
  });
  it('Should return all Trips', function (done) {
    _chai2.default.request(_app2.default).get('/v1/trips').send(trip).end(function (err, res) {
      res.should.have.status(200);
    });
    done();
  });
  it('Should patch a Trip', function (done) {
    _chai2.default.request(_app2.default).patch('/v1/trips/1').send(trip).end(function (err, res) {
      res.should.have.status(200);
    });
    done();
  });
});