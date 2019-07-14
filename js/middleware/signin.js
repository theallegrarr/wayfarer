'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

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

  (0, _signin2.default)(data).then(function (result) {
    if (result !== 'failed') {
      res.status(200).json({
        message: 'success',
        data: {
          user_id: data.id,
          is_admin: data.is_admin,
          token: result
        }
      });
    } else {
      res.status(401.1).json({
        message: 'wrong login parameters'
      });
    }
  }).catch(function (error) {
    throw error;
  });
});

exports.default = router;