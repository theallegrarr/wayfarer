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
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhbHNva2VsQGdtYWlsLmNvbSIsImlhdCI6MTU2MzE3OTMzNiwiZXhwIjoxNTYzMjA4MTM2fQ.BqC4ITBnS4aIaLFq4gh9rRn0YUp0XJcZQgatKgmcIec',
  user_id: 4,
  is_admin: 'true'
};

describe('TRIP Tests', function () {
  it('Should Fail to Create Trip', function (done) {
    _chai2.default.request(_app2.default).post('/v1/trips').send(user).end(function (err, res) {
      res.should.have.status(400);
    });
    done();
  });
  it('Should Fail to return all Trips', function (done) {
    _chai2.default.request(_app2.default).get('/v1/trips').send(user).end(function (err, res) {
      res.should.have.status(400);
    });
    done();
  });
});