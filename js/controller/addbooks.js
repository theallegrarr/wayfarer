'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bookfind = require('../model/bookfind');

var _bookfind2 = _interopRequireDefault(_bookfind);

var _addbook = require('../model/addbook');

var _addbook2 = _interopRequireDefault(_addbook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addbook(info) {
  return new Promise(function (resolve, reject) {
    (0, _bookfind2.default)(info.trip_id).then(function (result) {
      var val = '';
      if (result === 'true') {
        val = 'trip exists';
        resolve(val);
      }
      if (result === 'false') {
        (0, _addbook2.default)(info);
        val = 'success';
        resolve(val);
      }
    }).catch(function (error) {
      reject(error);
    });
  });
}

exports.default = addbook;