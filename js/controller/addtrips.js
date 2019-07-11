'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _trips = require('../model/trips');

var _trips2 = _interopRequireDefault(_trips);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function makeTrips(info) {

  var value = Math.max.apply(Math, _toConsumableArray(_trips2.default.map(function (o) {
    return o.trip_id;
  })));

  var data = {
    trip_id: value + 1,
    bus_id: 4,
    origin: 'Lagos',
    destination: 'Abuja',
    trip_date: '01-08-2019',
    fare: 3000.0,
    user_id: info.user_id
  };

  _trips2.default.push(data);

  return data;
}

exports.default = makeTrips;