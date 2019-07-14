'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _signin = require('../model/signin');

var _signin2 = _interopRequireDefault(_signin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function signIn(user) {
  return new Promise(function (resolve, reject) {
    var etoken = '';
    (0, _signin2.default)(user.email).then(function (result) {
      if (result.rowCount > 0) {
        _bcrypt2.default.compare(user.password, result.rows[0].password, function (err, response) {
          if (response === true) {
            etoken = _jsonwebtoken2.default.sign({
              email: user.email,
              id: user.id
            }, process.env.JWT_KEY, {
              expiresIn: '8h'
            });
            resolve(etoken);
          } else {
            etoken = 'failed';
            resolve(etoken);
          }
          if (err) {
            etoken = 'failed';
            resolve(etoken);
          }
        });
      }
    }).catch(function (error) {
      reject(error);
    });
  });
}

exports.default = signIn;