'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _app = require('./route/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 3000;

var server = _http2.default.createServer(_app2.default);

// console.log('server running on port ', port);
server.listen(port);