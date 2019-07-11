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

var _verify = require('../controller/verify');

var _verify2 = _interopRequireDefault(_verify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', _verify2.default, function (req, res) {
  var result = (0, _addtrips2.default)(req.body);
  if (result === 'failed') {
    res.status(400).json({
      message: 'failed',
      error: 'only admins can add trips'
    });
  }
  res.status(200).json({
    status: 'success',
    result: result
  });
});

router.get('/', _verify2.default, function (req, res) {
  var result = (0, _viewtrips2.default)(req.body);

  res.status(200).json({
    status: 'success',
    result: result
  });
});

exports.default = router;