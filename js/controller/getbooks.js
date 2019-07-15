'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bookfind = require('../model/bookfind');

var _bookfind2 = _interopRequireDefault(_bookfind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getBooks(info, info2, info3) {
  return new Promise(function (resolve, reject) {
    (0, _bookfind2.default)(info, info2, info3).then(function (result) {
      var val = '';
      if (result === false) {
        val = 'no bookings found';
        resolve(val);
      }
      if (result !== false) {
        val = result.rows;
        resolve(val);
      }
    }).catch(function (error) {
      reject(error);
    });
  });
}

exports.default = getBooks;