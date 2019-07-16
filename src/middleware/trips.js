import express from 'express';
import addtrips from '../controller/addtrips';
import viewtrips from '../controller/viewtrips';
import verify from '../controller/verify2';
import patchTrip from '../controller/patchTrip';

const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);
  verify(req).then((result2) => {
    if (result2) {
      addtrips(req.body).then((data) => {
        res.status(201).json({
          status: 'success',
          data,
        });
      });
    } else if (result2 === false) {
      res.status(400).json({
        status: 'error',
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
            status: 'error',
            error: 'Trip patch failed',
          });
        }
      });
    } else {
      res.status(401).json({
        status: 'error',
        error: 'Not authorized to cancel trip',
      });
    }
  });
});

router.get('/', (req, res) => {
  verify(req).then((result2) => {
    if (result2) {
      console.log(result2);
      viewtrips().then((data) => {
        if (result !== 'failed') {
          res.status(200).json({
            status: 'success',
            data,
          });
        } else {
          res.status(400).json({
            status: 'error',
            error: 'no trips found',
          });
        }
      }).catch((error) => {
        if (error) {
          res.status(400).json({
            status: 'error',
            error,
          });
        }
      });
    } else {
      res.status(400).json({
        status: 'error',
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
