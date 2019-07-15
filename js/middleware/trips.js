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

var _patchTrip = require('../controller/patchTrip');

var _patchTrip2 = _interopRequireDefault(_patchTrip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', function (req, res) {
  var data = req.body;
  (0, _verify2.default)(req).then(function (result2) {
    if (result2) {
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

router.patch('/:tripId', function (req, res) {
  (0, _verify2.default)(req).then(function (result2) {
    if (result2 && req.body.is_admin === true) {
      (0, _patchTrip2.default)(req.params.tripId).then(function (result) {
        if (result === 'success') {
          res.status(201).json({
            status: 'success',
            data: {
              message: 'Trip canceled successfully'
            }
          });
        } else {
          res.status(401).json({
            status: 'failed',
            result: result
          });
        }
      });
    } else {
      res.status(401).json({
        message: 'failed',
        error: 'Not authorized to cancel trip'
      });
    }
  });
});

router.get('/', function (req, res) {
  (0, _verify2.default)(req).then(function (result2) {
    if (result2) {
      console.log(result2);
      (0, _viewtrips2.default)().then(function (result) {
        res.status(200).json({
          status: 'success',
          result: result
        });
      });
    } else {
      res.status(400).json({
        message: 'failed',
        error: 'user not valid'
      });
    }
  }).catch(function (error) {
    if (error) {
      console.log(error);
    }
  });
});

exports.default = router;