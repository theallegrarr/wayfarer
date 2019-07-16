'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _emailValidator = require('email-validator');

var _emailValidator2 = _interopRequireDefault(_emailValidator);

var _encrypt = require('../controller/encrypt');

var _encrypt2 = _interopRequireDefault(_encrypt);

var _adduser = require('../controller/adduser');

var _adduser2 = _interopRequireDefault(_adduser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', function (req, res) {
  var validEmail = _emailValidator2.default.validate(req.body.email);
  if (req.body.password === undefined || validEmail === false) {
    res.status(401.1).json({
      status: 'error',
      error: 'wrong login parameters'
    });
  }

  (0, _encrypt2.default)(req.body.password).then(function (hashed) {
    if (hashed === 'failed') {
      res.status(400).json({
        status: 'error',
        error: 'Bad password'
      });
    }

    var etoken = _jsonwebtoken2.default.sign({
      email: req.body.email,
      id: req.body.id
    }, process.env.JWT_KEY, {
      expiresIn: '8h'
    });

    var data = {
      id: req.body.id,
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: hashed,
      is_admin: true,
      token: etoken
    };

    (0, _adduser2.default)(data).then(function (result) {
      if (result === 'success') {
        res.status(201).json({
          status: 'Success',
          data: data
        });
      } else {
        res.status(409).json({
          status: 'error',
          error: 'Mail Already Exists'
        });
      }
    }).catch(function (error) {
      if (error) {
        console.log(error);
        res.status(409).json({
          status: 'error',
          error: 'Sign up failed'
        });
      }
    });
    return 'hash complete';
  }).catch(function (error) {
    console.log(error);
  });
});

exports.default = router;