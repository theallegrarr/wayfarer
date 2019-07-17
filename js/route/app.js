'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _signin = require('../middleware/signin');

var _signin2 = _interopRequireDefault(_signin);

var _signup = require('../middleware/signup');

var _signup2 = _interopRequireDefault(_signup);

var _trips = require('../middleware/trips');

var _trips2 = _interopRequireDefault(_trips);

var _bookings = require('../middleware/bookings');

var _bookings2 = _interopRequireDefault(_bookings);

var _swagger = require('./swagger.json');

var _swagger2 = _interopRequireDefault(_swagger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use('/v1/auth/signin', _signin2.default);
app.use('/v1/auth/signup', _signup2.default);
app.use('/v1/trips', _trips2.default);
app.use('/v1/bookings', _bookings2.default);
app.use('/v1/doc', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(_swagger2.default));

app.use('/', function (req, res) {
  res.status(400).json({
    message: 'content not found'
  });
});

app.use(function (req, res) {
  res.status(404).json({
    message: 'Error! Not Found'
  });
});

exports.default = app;