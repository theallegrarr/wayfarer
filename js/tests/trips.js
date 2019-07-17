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
  id: 568,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhc3RvNDdAZ21haWwuY29tIiwiaWQiOjY2LCJpYXQiOjE1NjMzNjcyMDcsImV4cCI6MTU2MzM5NjAwN30.Wj6B1b7BIPpi7c8817BJLrQ3r62b9kxUyUllL70L9A0',
  user_id: 66,
  is_admin: true,
  bus_id: 1,
  origin: 'Lagos',
  destination: 'Kaduna',
  trip_date: '2019-07-30T00:00:00.000Z',
  fare: 8500,
  status: 1
};

describe('TRIP Tests', function () {
  it('Should Create Trip', function (done) {
    _chai2.default.request(_app2.default).post('/v1/trips').send(trip).end(function (err, res) {
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
  it('Should patch a Trips', function (done) {
    _chai2.default.request(_app2.default).get('/v1/trips/568').send(trip).end(function (err, res) {
      res.should.have.status(200);
    });
    done();
  });
});