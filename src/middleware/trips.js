import express from 'express';
import dotenv from 'dotenv';
import addtrips from '../controller/addtrips';
import viewtrips from '../controller/viewtrips';
import verify from '../controller/verify';

const router = express.Router();
dotenv.config();

router.post('/', process.env.NODE_ENV === 'test' || verify, (req, res) => {
  const data = req.body;
  addtrips(data).then((result) => {
    if (result === 'failed') {
      res.status(400).json({
        message: 'failed',
        error: 'only admins can add trips',
      });
    }
    res.status(201).json({
      status: 'success',
      result,
    });
  });
});

router.get('/', process.env.NODE_ENV === 'test' || verify, (req, res) => {
  viewtrips().then((result) => {
    res.status(200).json({
      status: 'success',
      result,
    });
  });
});

export default router;
