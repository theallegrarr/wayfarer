'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function produce(value) {
  return new Promise(function (resolve, reject) {
    _bcrypt2.default.hash(value, 10, function (err, hash) {
      if (err) {
        resolve('failed');
      }

      if (hash) {
        resolve(hash);
      }
      reject(err);
    });
  });
}

exports.default = produce;