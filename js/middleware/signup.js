'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _emailValidator = require('email-validator');

var _emailValidator2 = _interopRequireDefault(_emailValidator);

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

  _bcrypt2.default.hash(req.body.password, 10, function (err, hash) {
    if (err) {
      return res.status(401.1).json({
        status: 'error',
        error: 'wrong login parameters'
      });
    }

    if (hash) {
      var data = {
        id: req.body.id,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: hash,
        is_admin: req.body.is_admin
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
      });
      return 'hash complete';
    }
  });
});

exports.default = router;