import express from 'express';
import addbooks from '../controller/addbooks';
import verify from '../controller/verify';

const router = express.Router();

router.post('/', verify, (req, res) => {
  addbooks(req.body).then((result) => {
    if (result === 'failed') {
      res.status(400).json({
        message: 'failed',
        error: 'only admins can add trips',
      });
    }
    if (result === 'success') {
      res.status(200).json({
        status: 'success',
        result,
      });
    }
  });
});

export default router;
