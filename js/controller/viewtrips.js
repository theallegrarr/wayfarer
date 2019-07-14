'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _viewtrips = require('../model/viewtrips');

var _viewtrips2 = _interopRequireDefault(_viewtrips);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function viewtrips() {
  return new Promise(function (resolve, reject) {
    (0, _viewtrips2.default)().then(function (result) {
      var val = result;
      resolve(val);
    }).catch(function (error) {
      reject(error);
    });
  });
}

exports.default = viewtrips;