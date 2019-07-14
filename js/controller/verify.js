'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

console.log(process.env.NODE_ENV);

module.exports = function (req, res, next) {
  try {
    if (process.env.NODE_ENV === undefined) {
      next();
    }
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