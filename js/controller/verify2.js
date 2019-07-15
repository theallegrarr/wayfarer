'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

function verify(req) {
  return new Promise(function (resolve, reject) {
    var decode = _jsonwebtoken2.default.verify(req.body.token, process.env.JWT_KEY);
    var data = decode;
    console.log(decode);
    resolve(data);
  }).catch(function (error) {
    console.log(error);
  });
}

exports.default = verify;