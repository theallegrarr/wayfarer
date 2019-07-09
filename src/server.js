import http from 'http';
import app from './route/app';

const port = process.env.PORT || 3000;

const server = http.createServer(app);

// console.log('server running on port ', port);
server.listen(port);
