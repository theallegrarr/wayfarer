'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _signin = require('../middleware/signin');

var _signin2 = _interopRequireDefault(_signin);

var _signup = require('../middleware/signup');

var _signup2 = _interopRequireDefault(_signup);

var _trips = require('../middleware/trips');

var _trips2 = _interopRequireDefault(_trips);

var _users = require('../middleware/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use('/auth/signin', _signin2.default);
app.use('/auth/signup', _signup2.default);
app.use('/trips', _trips2.default);
app.use('/users', _users2.default);

app.use('/', function (req, res) {
  res.status(200).json({
    message: 'success'
  });
});

app.use(function (req, res) {
  res.status(404).json({
    message: 'Error! Not Found'
  });
});

exports.default = app;