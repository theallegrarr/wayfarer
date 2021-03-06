'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bookfind = require('../model/bookfind');

var _bookfind2 = _interopRequireDefault(_bookfind);

var _deletebook = require('../model/deletebook');

var _deletebook2 = _interopRequireDefault(_deletebook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deletebook(info, user, userid) {

  return new Promise(function (resolve, reject) {
    (0, _bookfind2.default)(info, -1, -1).then(function (result) {

      if (result !== undefined) {
        if (result.rowCount > 0) {
          if (result.rows[0].user_id !== userid) {
            resolve('not authorized to delete this booking');
          }

          (0, _deletebook2.default)(info).then(function () {
            resolve('success');
          }).catch(function (err) {
            if (err) {
              reject(err);
            }
          });
        } else {
          resolve('booking does not exist');
        }
      } else {
        resolve('booking does not exist');
      }
    }).catch(function (err) {
      if (err) {
        console.log('error 1:', err);
      }
    });
  });
}

exports.default = deletebook;