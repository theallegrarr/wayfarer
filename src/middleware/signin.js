// hold user requests sign-in sign-up
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import signIn from '../controller/signin';

const router = express.Router();

router.post('/', (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
    is_admin: req.body.is_admin,
  };

  const user = signIn(data.email);

  if (user) {
    bcrypt.compare(data.password, user.password, (err, response) => {
      console.log(response);
      if (response === true) {
        const etoken = jwt.sign({
          email: user.email,
          id: user.id,
        }, 
          'secret', 
        {
          expiresIn: '1h',
        });

        res.status(200).json({
          message: 'success',
          data: {
            user_id: user.id,
            is_admin: user.is_admin,
            token: etoken,
          }
        });
      } else {
        res.status(401.1).json({
          message: 'wrong login parameters',
        });
      }

      if(err){
        res.status(401.1).json({
          message: 'wrong login parameters',
        });
      }
    }); 
  } else {
    res.status(401.1).json({
      message: 'wrong login parameters',
    });
  }
});

export default router;