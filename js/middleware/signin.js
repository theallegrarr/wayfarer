'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _signin = require('../controller/signin');

var _signin2 = _interopRequireDefault(_signin);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// hold user requests sign-in sign-up
var router = _express2.default.Router();

router.post('/', function (req, res) {
  var data = {
    email: req.body.email,
    password: req.body.password,
    is_admin: req.body.is_admin
  };

  var user = (0, _signin2.default)(data.email);

  if (user) {
    _bcrypt2.default.compare(data.password, user.password, function (err, response) {
      console.log(response);
      if (response === true) {
        var etoken = _jsonwebtoken2.default.sign({
          email: user.email,
          id: user.id
        }, 'secret', {
          expiresIn: "1h"
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