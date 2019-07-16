'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bookfind = require('../model/bookfind');

var _bookfind2 = _interopRequireDefault(_bookfind);

var _deletebook = require('../model/deletebook');

var _deletebook2 = _interopRequireDefault(_deletebook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deletebook(info, user) {

  return new Promise(function (resolve, reject) {
    (0, _bookfind2.default)(info, -1, -1).then(function (result) {
      if (result.rowCount > 0) {
        if (result.rows[0].user_id !== user.id) {
          console.log(result.rows[0].user_id);
          resolve('not authorized to delete this booking');
        }
        (0, _deletebook2.default)(info).then(function (result2) {
          resolve('success');
        }).catch(function (err) {
          if (err) {
            console.log(err);
            reject(err);
          }
        });
      } else {
        resolve('booking does not exist');
      }
    }).catch(function (err) {
      if (err) {
        console.log(err);
        reject(err);
      }
    });
  });
}

exports.default = deletebook;