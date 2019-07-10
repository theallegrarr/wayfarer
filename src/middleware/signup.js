import express from 'express';
import bcrypt from 'bcrypt';
import addUser from '../controller/adduser';

const router = express.Router();

router.post('/', (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: 'Invalid Password',
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

      const result = addUser(data);
      if (result === 'success') {
        res.status(200).json({
          message: 'Success',
          data,
        });
      } else {
        res.status(409).json({
          message: 'Failed',
          error: 'Mail Already Exists',
        });
      }
    }
    return 'hash complete';
  });
});

export default router;
