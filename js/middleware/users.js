'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _user = require('../controller/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // hold user requests sign-in sign-up

_dotenv2.default.config();

router.post('/', function (req, res) {
  var user = (0, _user2.default)();
  if (user) {
    res.status(200).json({
      user: user
    });
  } else {
    res.status(400).json({
      message: 'Bad Request'
    });
  }
});

exports.default = router;