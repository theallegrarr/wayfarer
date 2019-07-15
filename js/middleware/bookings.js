'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _addbooks = require('../controller/addbooks');

var _addbooks2 = _interopRequireDefault(_addbooks);

var _getbooks = require('../controller/getbooks');

var _getbooks2 = _interopRequireDefault(_getbooks);

var _verify = require('../controller/verify2');

var _verify2 = _interopRequireDefault(_verify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', function (req, res) {
  var data = req.body;
  (0, _verify2.default)(req).then(function (result2) {
    if (result2) {
      (0, _addbooks2.default)(data).then(function (result) {
        res.status(201).json({
          status: 'success',
          result: result
        });
      });
    } else if (result2 === false) {
      res.status(400).json({
        message: 'failed',
        error: 'user not valid'
      });
    }
  });
});

router.get('/', function (req, res) {
  (0, _verify2.default)(req).then(function (result2) {
    if (result2) {
      if (req.body.is_admin === true) {
        (0, _getbooks2.default)(0, 0).then(function (result) {
          res.status(200).json({
            status: 'success',
            result: result
          });
        }).catch(function (e) {
          if (e) {
            console.log(e);
          }
        });
      } else {
        (0, _getbooks2.default)(0, 0, req.body.user_id).then(function (result) {
          res.status(200).json({
            status: 'success',
            result: result
          });
        }).catch(function (e) {
          if (e) {
            console.log(e);
          }
        });
      }
    } else if (result2 === false) {
      res.status(400).json({
        message: 'failed',
        error: 'user not valid'
      });
    }
  });
});

exports.default = router;