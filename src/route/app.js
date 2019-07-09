import express from 'express';

const app = express();

app.use((req, res) => {
  res.status(200).json({
    message: 'Success',
  });
});

export default app;
