'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (req, res, next) {
  try {
    var decode = _jsonwebtoken2.default.verify(req.body.token, process.env.JWT_KEY);
    req.userData = decode;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'failed',
      error: 'Invalid Request Token'
    });
  }
};