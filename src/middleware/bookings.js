import express from 'express';
import addbooks from '../controller/addbooks';
import deletebook from '../controller/deletebook';
import getBooks from '../controller/getbooks';
import verify from '../controller/verify2';

const router = express.Router();

router.post('/', (req, res) => {
  const data = req.body;
  verify(req).then((result2) => {
    if (result2) {
      addbooks(data).then((result) => {
        if (result === 'invalid id') {
          res.status(400).json({
            status: 'error',
            message: 'trip does not exist',
          });
        }
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

router.delete('/:id', (req, res) => {
  const data = req.body;
  verify(req).then((result2) => {
    if (result2) {
      deletebook(req.params.id, req.body).then((result) => {
        if (result === 'success') {
          res.status(200).json({
            status: 'success',
            data: {
              message: 'Booking deleted successfully',
            },
          });
        } else {
          res.status(401).json({
            status: 'failed',
            result,
          });
        }
      });
    } else if (result2 === false) {
      res.status(401).json({
        message: 'failed',
        error: 'user not valid',
      });
    }
  });
});

router.get('/', (req, res) => {
  verify(req).then((result2) => {
    console.log(result2);
    if (result2) {
      if (req.body.is_admin === true) {
        getBooks(0, 0).then((result) => {
          if (result) {
            res.status(200).json({
              status: 'success',
              result,
            });
          } else {
            res.status(400).json({
              status: 'error',
              message: 'no bookings found',
            });
          }
        }).catch((e) => {
          if (e) {
            console.log(e);
          }
        });
      } else {
        getBooks(0, 0, req.body.user_id).then((result) => {
          res.status(200).json({
            status: 'success',
            result,
          });
        }).catch((e) => {
          if (e) {
            console.log(e);
          }
        });
      }
    } else if (result2 === false) {
      res.status(400).json({
        message: 'failed',
        error: 'user not valid',
      });
    }
  });
});

export default router;
