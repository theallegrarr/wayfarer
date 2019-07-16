'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _emailValidator = require('email-validator');

var _emailValidator2 = _interopRequireDefault(_emailValidator);

var _signin = require('../controller/signin');

var _signin2 = _interopRequireDefault(_signin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// hold user requests sign-in sign-up
var router = _express2.default.Router();
_dotenv2.default.config();

router.post('/', function (req, res) {
  var data = {
    email: req.body.email,
    password: req.body.password,
    is_admin: req.body.is_admin
  };
  console.log(validEmail, ' ', data);

  var validEmail = _emailValidator2.default.validate(data.email);
  if (data.password === undefined || validEmail === false) {
    res.status(401.1).json({
      status: 'error',
      error: 'wrong login parameters'
    });
  }

  (0, _signin2.default)(data).then(function (result) {
    if (result !== 'failed') {
      console.log(result, ' ', data);
      res.status(200).json({
        status: 'success',
        data: {
          user_id: data.id,
          is_admin: data.is_admin,
          token: result
        }
      });
      // noone
    } else {
      res.status(401.1).json({
        status: 'error',
        error: 'wrong login parameters'
      });
    }
  }).catch(function (error) {
    throw error;
  });
});

exports.default = router;