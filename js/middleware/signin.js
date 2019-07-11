'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _signin = require('../controller/signin');

var _signin2 = _interopRequireDefault(_signin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // hold user requests sign-in sign-up

_dotenv2.default.config();

router.post('/', function (req, res) {
  var data = {
    email: req.body.email,
    password: req.body.password,
    is_admin: req.body.is_admin
  };

  var user = (0, _signin2.default)(data.email);

  if (user) {
    _bcrypt2.default.compare(data.password, user.password, function (err, response) {
      if (response === true) {
        var etoken = _jsonwebtoken2.default.sign({
          email: user.email,
          id: user.id
        }, process.env.JWT_KEY, {
          expiresIn: '1h'
        });

        res.status(200).json({
          message: 'success',
          data: {
            user_id: user.id,
            is_admin: user.is_admin,
            token: etoken
          }
        });
      } else {
        res.status(401.1).json({
          message: 'wrong login parameters'
        });
      }

      if (err) {
        res.status(401.1).json({
          message: 'wrong login parameters'
        });
      }
    });
  } else {
    res.status(401.1).json({
      message: 'wrong login parameters'
    });
  }
});

exports.default = router;