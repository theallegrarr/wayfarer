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

var details = {
  id: 9,
  email: 'joely@gmail.com',
  first_name: 'Helga',
  last_name: 'Paul',
  password: 'batoore',
  is_admin: 'true'
};

// const signUp = request.agent(app);
describe('USER OPERATIONS', function () {
  it('Should add users', function (done) {
    _chai2.default.request(_app2.default).post('/v1/auth/signup').send(details).end(function (err, res) {
      res.should.have.status(409);
      (0, _chai.expect)(res.body).to.have.property('message');
      // console.log('Response Body:', res.body);
    });
    done();
  });

  it('Should not add Duplicate users', function (done) {
    _chai2.default.request(_app2.default).post('/v1/auth/signup').send(details).end(function (err, res) {
      res.should.have.status(409);
      (0, _chai.expect)(res.body).to.have.property('message');
      // console.log('Response Body:', res.body);
    });
    done();
  });

  var user = {
    email: 'joely@gmail.com',
    password: 'batoore',
    is_admin: 'true'
  };

  it('Should Sign In', function (done) {
    _chai2.default.request(_app2.default).post('/v1/auth/signin').send(user).end(function (err, res) {
      res.should.have.status(200);
      // console.log('Response Body:', res.body);
    });
    done();
  });

  var user2 = {
    email: 'johnpaul@gmail.com',
    password: 'batare',
    is_admin: 'true'
  };

  it('Should Fail to Sign In', function (done) {
    _chai2.default.request(_app2.default).post('/v1/auth/signin').send(user).end(function (err, res) {
      res.should.have.status(409);
      // console.log('Response Body:', res.body);
    });
    done();
  });
});