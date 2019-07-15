'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _addtrips = require('../model/addtrips');

var _addtrips2 = _interopRequireDefault(_addtrips);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addTrip(info) {
  return new Promise(function (resolve, reject) {

    (0, _addtrips2.default)(info).then(function (result) {
      var val = result;
      console.log(info);
      resolve(val);
    }).catch(function (error) {
      console.log(error);
      reject(error);
    });
  });
}

exports.default = addTrip;