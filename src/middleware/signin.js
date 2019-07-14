// hold user requests sign-in sign-up
import express from 'express';
import dotenv from 'dotenv';
import signIn from '../controller/signin';

const router = express.Router();
dotenv.config();

router.post('/', (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
    is_admin: req.body.is_admin,
  };

  signIn(data).then((result) => {
    if (result !== 'failed') {
      res.status(200).json({
        message: 'success',
        data: {
          user_id: data.id,
          is_admin: data.is_admin,
          token: result,
        },
      });
    } else {
      res.status(401.1).json({
        message: 'wrong login parameters',
      });
    }
  }).catch((error) => {
    throw error;
  });
});

export default router;
