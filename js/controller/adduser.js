'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _data = require('../model/data');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addUser(info) {
  var user = _data2.default.find(function (x) {
    return x.email === info.email;
  });

  if (user) {
    return {
      message: 'Failed',
      error: 'email already exists'
    };
  }

  _data2.default.push(info);
  return 'success';
}

exports.default = addUser;