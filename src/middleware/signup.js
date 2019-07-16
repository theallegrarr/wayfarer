import express from 'express';
import jwt from 'jsonwebtoken';
import validator from 'email-validator';
import encrypt from '../controller/encrypt';
import addUser from '../controller/adduser';
import getUserInfo from '../model/userfind';

const router = express.Router();

router.post('/', (req, res) => {
  const validEmail = validator.validate(req.body.email);
  if (req.body.password === undefined || validEmail === false) {
    res.status(401.1).json({
      status: 'error',
      error: 'wrong login parameters',
    });
  }

  encrypt(req.body.password).then((hashed) => {
    if (hashed === 'failed') {
      res.status(400).json({
        status: 'error',
        error: 'Bad password',
      });
    }

    getUserInfo('', 1).then((rowcount) =>{
      const etoken = jwt.sign({
        email: req.body.email,
        id: rowcount + 1,
      },
      process.env.JWT_KEY,
      {
        expiresIn: '8h',
      });

      const data = {
        id: rowcount + 1,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: hashed,
        is_admin: true,
        token: etoken,
      };

      addUser(data).then((result) => {
        if (result === 'success') {
          res.status(201).json({
            status: 'Success',
            data,
          });
        } else {
          res.status(409).json({
            status: 'error',
            error: 'Mail Already Exists',
          });
        }
      }).catch((error)  => { 
        if (error) {
          console.log(error);
          res.status(409).json({
            status: 'error',
            error: 'Sign up failed',
          });
        }
      });
    }).catch((error)=>{
      console.log(error);
    });
    return 'hash complete';
  }).catch((error)=>{
    console.log(error);
  })
});

export default router;
