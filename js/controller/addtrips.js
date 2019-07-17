'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _addtrips = require('../model/addtrips');

var _addtrips2 = _interopRequireDefault(_addtrips);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addTrip(info) {
  return new Promise(function (resolve, reject) {
    var data = {
      id: null,
      bus_id: info.bus_id,
      origin: info.origin,
      destination: info.destination,
      trip_date: info.trip_date,
      fare: info.fare,
      status: 1.0
    };

    (0, _addtrips2.default)(data).then(function (result) {

      var productData = {
        id: result,
        bus_id: info.bus_id,
        origin: info.origin,
        destination: info.destination,
        trip_date: info.trip_date,
        fare: info.fare,
        status: 1.0
      };

      resolve(productData);
    }).catch(function (error) {
      console.log(error);
    });
  });
}

exports.default = addTrip;