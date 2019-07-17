'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _assert = require('assert');

var _app = require('../route/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
_chai2.default.use(_chaiHttp2.default);

var should = _chai2.default.should();

var details = {
  id: 9,
  email: 'kempo20@gmail.com',
  first_name: 'Helga',
  last_name: 'Paul',
  password: 'batoore',
  is_admin: true
};

// const signUp = request.agent(app);
describe('USER OPERATIONS', function () {
  it('Should add users', function (done) {
    // console.log(details);
    _chai2.default.request(_app2.default).post('/v1/auth/signup').send(details).end(function (err, res) {
      try {
        res.should.have.status(201);
      } catch (error) {
        throw new _assert.AssertionError(error);
      }
      (0, _chai.expect)(res.body).to.have.property('data');
    });
    done();
  });

  var user = {
    email: 'kempo20@gmail.com',
    password: 'batoore',
    is_admin: 'true'
  };

  it('Should Sign In', function (done) {
    _chai2.default.request(_app2.default).post('/v1/auth/signin').send(user).end(function (err, res) {
      res.should.have.status(200);
    });
    done();
  });

  var user2 = {
    email: 'kempo20@gmail.com',
    password: 'batare',
    is_admin: true
  };

  it('Should Fail to Sign In', function (done) {
    _chai2.default.request(_app2.default).post('/v1/auth/signin').send(user2).end(function (err, res) {
      res.should.have.status(401);
      // console.log('Response Body:', res.body);
    });
    done();
  });
});