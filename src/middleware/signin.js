// hold user requests sign-in sign-up
import express from 'express';
import dotenv from 'dotenv';
import validator from 'email-validator';
import signIn from '../controller/signin';

const router = express.Router();
dotenv.config();

router.post('/', (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
    is_admin: req.body.is_admin,
  };

  const validEmail = validator.validate(data.email);
  if (data.password === undefined || validEmail === false) {
    res.status(401.1).json({
      status: 'error',
      error: 'wrong login parameters',
    });
  }

  signIn(data).then((result) => {
    if (result !== 'failed') {
      res.status(200).json({
        status: 'success',
        data: {
          user_id: data.id,
          is_admin: data.is_admin,
          token: result,
        },
      });
      // noone
    } else {
      res.status(401.1).json({
        status: 'error',
        error: 'wrong login parameters',
      });
    }
  }).catch((error) => {
    throw error;
  });
});

export default router;
