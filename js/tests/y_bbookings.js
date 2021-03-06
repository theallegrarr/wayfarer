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
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhc3RvQGdtYWlsLmNvbSIsImlkIjo3NDcsImlhdCI6MTU2MzM1OTg0OSwiZXhwIjoxNTYzMzg4NjQ5fQ.o3xdq-HHB1VcI8DhbPYvNGfF46DoWGRYQcCQ5U3DY20',
  user_id: 4,
  is_admin: true,
  trip_id: 20
};

describe('BOOKING Tests', function () {
  it('Should return all Bookings', function (done) {
    _chai2.default.request(_app2.default).get('/v1/bookings').send(user).end(function (err, res) {
      res.should.have.status(200);
    });
    done();
  });
});