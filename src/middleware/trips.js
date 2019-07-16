import express from 'express';
import addtrips from '../controller/addtrips';
import viewtrips from '../controller/viewtrips';
import verify from '../controller/verify2';
import patchTrip from '../controller/patchTrip';

const router = express.Router();

router.post('/', (req, res) => {
  const data = req.body;
  verify(req).then((result2) => {
    if (result2) {
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

router.patch('/:tripId', (req, res) => {
  verify(req).then((result2) => {
    if (result2 && req.body.is_admin === true) {
      patchTrip(req.params.tripId).then((result) => {
        if (result === 'success') {
          res.status(200).json({
            status: 'success',
            data: {
              message: 'Trip canceled successfully',
            },
          });
        } else {
          res.status(401).json({
            status: 'failed',
            result,
          });
        }
      });
    } else {
      res.status(401).json({
        message: 'failed',
        error: 'Not authorized to cancel trip',
      });
    }
  });
});

router.get('/', (req, res) => {
  verify(req).then((result2) => {
    if (result2) {
      console.log(result2);
      viewtrips().then((result) => {
        res.status(200).json({
          status: 'success',
          result,
        });
      });
    } else {
      res.status(400).json({
        message: 'failed',
        error: 'user not valid',
      });
    }
  }).catch((error) => {
    if (error) {
      console.log(error);
    }
  });
});

export default router;
