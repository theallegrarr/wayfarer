import express from 'express';
import bodyParser from 'body-parser';
import logRoute from '../middleware/signin';
import regRoute from '../middleware/signup';
import trips from '../middleware/trips';
import users from '../middleware/users';

const app = express();

app.use(bodyParser.json());
app.use('/auth/signin', logRoute);
app.use('/auth/signup', regRoute);
app.use('/trips', trips);
app.use('/users', users);

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
