'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _user = require('../controller/user');

var _user2 = _interopRequireDefault(_user);

var _signin = require('../controller/signin');

var _signin2 = _interopRequireDefault(_signin);

var _adduser = require('../controller/adduser');

var _adduser2 = _interopRequireDefault(_adduser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // hold user requests sign-in sign-up


router.post('/signup', function (req, res) {
  _bcrypt2.default.hash(req.body.password, 10, function (err, hash) {
    if (err) {
      return res.status(500).json({
        error: 'Invalid Password'
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

      var result = (0, _adduser2.default)(data);
      if (result === 'success') {
        res.status(200).json({
          result: result,
          data: data
        });
      } else {
        res.status(409).json({
          message: 'Failed',
          error: 'Mail Already Exists'
        });
      }
    }
    return 'hash complete';
  });
});

router.post('/signin', function (req, res) {
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
        res.status(200).json({
          message: 'success',
          user: user
        });
      } else {
        res.status(401.1).json({
          message: 'wrong login parameters'
        });

        if (err) {
          res.status(401.1).json({
            message: 'wrong login parameters'
          });
        }
      }
    });
  } else {
    res.status(401.1).json({
      message: 'wrong login parameters'
    });
  }
});

router.get('/:userId', function (req, res) {
  var id = req.params.userId;
  var data = (0, _user2.default)(id);

  if (data !== {}) {
    res.status(200).json({
      message: 'success',
      data: data
    });
  } else {
    res.status(200).json({
      message: 'Your ID is not Valid'
    });
  }
});

exports.default = router;