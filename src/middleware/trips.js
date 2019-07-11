import express from 'express';
import addtrips from '../controller/addtrips';
import viewtrips from '../controller/viewtrips';
import verify from '../controller/verify';

const router = express.Router();

router.post('/', verify, (req, res) => {
  const result = addtrips(req.body);

  res.status(200).json({
    status: 'success',
    result,
  });
});

router.get('/', verify, (req, res) => {
  const result = viewtrips(req.body);

  res.status(200).json({
    status: 'success',
    result,
  });
});

export default router;
