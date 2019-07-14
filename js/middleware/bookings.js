'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _addbooks = require('../controller/addbooks');

var _addbooks2 = _interopRequireDefault(_addbooks);

var _verify = require('../controller/verify');

var _verify2 = _interopRequireDefault(_verify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', _verify2.default, function (req, res) {
  (0, _addbooks2.default)(req.body).then(function (result) {
    if (result === 'failed') {
      res.status(400).json({
        message: 'failed',
        error: 'only admins can add trips'
      });
    }
    if (result === 'success') {
      res.status(200).json({
        status: 'success',
        result: result
      });
    }
  });
});

exports.default = router;