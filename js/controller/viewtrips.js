'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _trips = require('../model/trips');

var _trips2 = _interopRequireDefault(_trips);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function viewTrips(info) {

  if (info.is_admin === 'true' || info.is_admin === 'false') {
    return _trips2.default;
  }

  var userTrips = _trips2.default.filter(function (trips) {
    return trips.user_id === info.user_id;
  });

  return userTrips;
}

exports.default = viewTrips;