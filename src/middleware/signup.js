import express from 'express';
import bcrypt from 'bcrypt';
import validator from 'email-validator';
import addUser from '../controller/adduser';

const router = express.Router();

router.post('/', (req, res) => {
  const validEmail = validator.validate(req.body.email);
  if (req.body.password === undefined || validEmail === false) {
    res.status(401.1).json({
      status: 'error',
      error: 'wrong login parameters',
    });
  }

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(401.1).json({
        status: 'error',
        error: 'wrong login parameters',
      });
    }

    if (hash) {
      const data = {
        id: req.body.id,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: hash,
        is_admin: req.body.is_admin,
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
      });
      return 'hash complete';
    }
  });
});

export default router;
