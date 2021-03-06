import express from 'express';
import addbooks from '../controller/addbooks';
import deletebook from '../controller/deletebook';
import getBooks from '../controller/getbooks';
import verify from '../controller/verify2';

const router = express.Router();

router.post('/', (req, res) => {
  verify(req).then((result2) => {
    if (result2) {
      addbooks(req.body).then((data) => {
        if (data === 'invalid id') {
          res.status(400).json({
            status: 'error',
            error: 'trip does not exist',
          });
        }
        res.status(201).json({
          status: 'success',
          data,
        });
      }).catch((error) => {
        res.status(400).json({
          status: 'error',
          error,
        });
      });
    }
    if (result2 === false) {
      res.status(400).json({
        status: 'error',
        error: 'user not valid',
      });
    }
  }).catch((error) => {
    res.status(400).json({
      status: 'error',
      error,
    });
  });
});

router.delete('/:id', (req, res) => {
  verify(req).then((result2) => {
    if (result2) {
      deletebook(req.params.id, req.body, result2.id).then((result) => {
        if (result === 'success') {
          res.status(200).json({
            status: 'success',
            data: {
              id: req.params.id,
              message: 'Booking deleted successfully',
            },
          });
        } else {
          res.status(400).json({
            status: 'error',
            error: result,
          });
        }
      });
    } else {
      res.status(401).json({
        status: 'error',
        error: 'user not valid',
      });
    }
  }).catch((error) => {
    if (error) {
      res.status(409).json({
        status: 'error',
        error: 'delete failed',
      });
    }
  });
});

router.get('/', (req, res) => {
  verify(req).then((result2) => {
    if (result2) {
      if (result2.is_admin === true) {
        getBooks(0, -1, -1).then((data) => {
          if (data) {
            res.status(200).json({
              status: 'success',
              data,
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
        getBooks(0, 0, req.body.user_id).then((data) => {
          res.status(200).json({
            status: 'success',
            data,
          });
        }).catch((e) => {
          if (e) {
            console.log(e);
          }
        });
      }
    } else if (result2 === false) {
      res.status(401).json({
        status: 'error',
        error: 'user not valid',
      });
    }
  });
});

export default router;
