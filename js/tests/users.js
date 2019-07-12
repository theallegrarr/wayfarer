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
  id: 4,
  email: 'helga@gmail.com',
  first_name: 'Helga',
  last_name: 'Paul',
  password: 'batoore',
  is_admin: 'true'
};

// const signUp = request.agent(app);
describe('USER OPERATIONS', function () {
  it('Should add new user', function (done) {
    _chai2.default.request(_app2.default).post('/auth/signup').send(details).end(function (err, res) {
      res.should.have.status(200);
      (0, _chai.expect)(res.body).to.have.property('message');
      // console.log('Response Body:', res.body);
    });
    done();
  });
  var user = {
    email: 'johnpaul@gmail.com',
    password: 'batoore',
    is_admin: 'true'
  };

  it('Should Fail to Sign In', function (done) {
    _chai2.default.request(_app2.default).post('/auth/signin').send(user).end(function (err, res) {
      res.should.have.status(401);
      // console.log('Response Body:', res.body);
    });
    done();
  });
});