// hold user requests sign-in sign-up
import express from 'express';
import getUser from '../controller/user';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

router.post('/', (req, res) => {
  const user = getUser();
  if (user) {
    res.status(200).json({
      user,
      });
    } else {
      res.status(400).json({
      message: 'Bad Request',
      });
    }
});

export default router;
