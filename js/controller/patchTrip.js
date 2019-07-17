'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tripfind = require('../model/tripfind');

var _tripfind2 = _interopRequireDefault(_tripfind);

var _patchtrip = require('../model/patchtrip');

var _patchtrip2 = _interopRequireDefault(_patchtrip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deletebook(info) {

  return new Promise(function (resolve, reject) {
    (0, _tripfind2.default)(info).then(function (result) {
      if (result === 'true') {
        (0, _patchtrip2.default)(info).then(function () {
          resolve('success');
        }).catch(function (err) {
          if (err) {
            console.log(err);
          }
        });
      } else {
        resolve('trip does not exist');
      }
    }).catch(function (err) {
      if (err) {
        console.log(err);
      }
    });
  });
}

exports.default = deletebook;