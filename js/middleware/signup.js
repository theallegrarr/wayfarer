'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _adduser = require('../controller/adduser');

var _adduser2 = _interopRequireDefault(_adduser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', function (req, res) {
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
          message: 'Success',
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

exports.default = router;