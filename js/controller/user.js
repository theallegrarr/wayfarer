'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _data = require('../model/data');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUser(id) {
  if (id === null || id === undefined) {
    return _data2.default;
  }
  return _data2.default.find(function (x) {
    return x.id === id;
  });
}

exports.default = getUser;