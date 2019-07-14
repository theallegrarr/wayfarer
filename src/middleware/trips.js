import express from 'express';
import addtrips from '../controller/addtrips';
import viewtrips from '../controller/viewtrips';
import verify from '../controller/verify';

const router = express.Router();

router.post('/', verify, (req, res) => {
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

router.get('/', verify, (req, res) => {
  viewtrips().then((result) => {
    res.status(200).json({
      status: 'success',
      result,
    });
  });
});

export default router;
