import express from 'express';
import bodyParser from 'body-parser';
import logRoute from '../middleware/signin';
import regRoute from '../middleware/signup';

const app = express();

app.use(bodyParser.json());
app.use('/auth/signin', logRoute);
app.use('/auth/signup', regRoute);

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
