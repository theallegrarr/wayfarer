'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userfind = require('../model/userfind');

var _userfind2 = _interopRequireDefault(_userfind);

var _adduser = require('../model/adduser');

var _adduser2 = _interopRequireDefault(_adduser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addUser(info) {
  return new Promise(function (resolve, reject) {
    (0, _userfind2.default)(info.email).then(function (result) {
      var val = '';
      if (result === 'true') {
        val = 'failed';
        resolve(val);
      }
      if (result === 'false') {
        (0, _adduser2.default)(info);
        val = 'success';
        resolve(val);
      }
    }).catch(function (error) {
      reject(error);
    });
  });
}

exports.default = addUser;