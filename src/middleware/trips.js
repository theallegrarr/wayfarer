import express from 'express';
import addtrips from '../controller/addtrips';
import viewtrips from '../controller/viewtrips';
import verify from '../controller/verify2';

const router = express.Router();

router.post('/', (req, res) => {
  const data = req.body;
  verify(req).then((result2) => {
    if (result2 === true) {
      addtrips(data).then((result) => {
        res.status(201).json({
          status: 'success',
          result,
        });
      });
    } else if (result2 === false) {
      res.status(400).json({
        message: 'failed',
        error: 'user not valid',
      });
    }
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
