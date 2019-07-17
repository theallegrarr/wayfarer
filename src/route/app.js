import express from 'express';
import bodyParser from 'body-parser';
import swagger from 'swagger-ui-express';
import logRoute from '../middleware/signin';
import regRoute from '../middleware/signup';
import trips from '../middleware/trips';
import bookings from '../middleware/bookings';
import swaggerDoc from '../../swagger.json';

const app = express();

app.use(bodyParser.json());
app.use('/v1/auth/signin', logRoute);
app.use('/v1/auth/signup', regRoute);
app.use('/v1/trips', trips);
app.use('/v1/bookings', bookings);
app.use('/api-docs', swagger.serve, swagger.setup(swaggerDoc));

app.use('/', (req, res) => {
  res.status(200).json({
    message: 'success',
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Error! Not Found',
  });
});

export default app;
