import express from 'express';
import addbooks from '../controller/addbooks';
import deletebook from '../controller/deletebook';
import getBooks from '../controller/getbooks';
import verify from '../controller/verify2';

const router = express.Router();

router.post('/', (req, res) => {

  verify(req).then((details) => {
    if (details) {
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
        console.log(error);
        res.status(400).json({
          status: 'error',
          error,
        });
      });
    }
    if (details === false) {
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
        console.log('test result: ',result2.id,result);
        if (result === 'success') {
          res.status(200).json({
            status: 'success',
            data: {
              id: req.params.id,
              message: 'Booking deleted successfully',
            },
          });
        } else {
          console.log(req.body);
          res.status(400).json({
            status: 'error',
            error: result,
          });
        }
      });
    } else {
      console.log(req.body);
      res.status(401).json({
        status: 'error',
        error: 'user not valid',
      });
    }
  }).catch((error) => {
    if (error) {
      console.log(req.body);
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
      if (req.body.is_admin === true) {
        getBooks(0, 0, -1).then((data) => {
          console.log(data);
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
      res.status(400).json({
        status: 'error',
        error: 'user not valid',
      });
    }
  });
});

export default router;
