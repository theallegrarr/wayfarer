'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _addtrips = require('../controller/addtrips');

var _addtrips2 = _interopRequireDefault(_addtrips);

var _viewtrips = require('../controller/viewtrips');

var _viewtrips2 = _interopRequireDefault(_viewtrips);

var _verify = require('../controller/verify2');

var _verify2 = _interopRequireDefault(_verify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', function (req, res) {
  var data = req.body;
  (0, _verify2.default)(req).then(function (result2) {
    if (result2 === true) {
      (0, _addtrips2.default)(data).then(function (result) {
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

router.get('/', _verify2.default, function (req, res) {
  (0, _viewtrips2.default)().then(function (result) {
    res.status(200).json({
      status: 'success',
      result: result
    });
  });
});

exports.default = router;