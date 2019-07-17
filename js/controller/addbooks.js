'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tripfind = require('../model/tripfind');

var _tripfind2 = _interopRequireDefault(_tripfind);

var _addbook = require('../model/addbook');

var _addbook2 = _interopRequireDefault(_addbook);

var _bookfind = require('../model/bookfind');

var _bookfind2 = _interopRequireDefault(_bookfind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addBook(info) {

  return new Promise(function (resolve, reject) {
    var rowcount = -1;
    console.log(info);
    (0, _bookfind2.default)(0).then(function (result) {
      if (result) {
        rowcount = result.rowCount;
      } else {
        rowcount = 0;
      }
      (0, _tripfind2.default)(info.trip_id, 0).then(function (xresult) {
        var val = '';
        if (xresult === 'false') {
          val = 'trip is not valid';
          resolve(val);
        } else {
          (0, _addbook2.default)(info, rowcount).then(function (value) {
            if (value === 'invalid id') {
              resolve('invalid id');
            }
            resolve(value);
          }).catch(function (err) {
            if (err) {
              reject(err);
            }
          });
        }
      }).catch(function (error) {
        reject(error);
      });
    }).catch(function (err) {
      if (err) {
        reject(err);
      }
    });
  });
} // Add your code here
exports.default = addBook;