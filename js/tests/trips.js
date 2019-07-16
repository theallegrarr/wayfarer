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

var user = {
  id: 4,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhc3RvQGdtYWlsLmNvbSIsImlkIjo3NDcsImlhdCI6MTU2MzI4Nzk0MCwiZXhwIjoxNTYzMzE2NzQwfQ.DZgNzf8hlF8yHek7dorqZ3kDyUlkU1rUqVHhzJ-35ow',
  user_id: 4,
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
    _chai2.default.request(_app2.default).post('/v1/trips').send(user).end(function (err, res) {
      res.should.have.status(201);
    });
    done();
  });
  it('Should return all Trips', function (done) {
    _chai2.default.request(_app2.default).get('/v1/trips').send(user).end(function (err, res) {
      res.should.have.status(200);
    });
    done();
  });
});