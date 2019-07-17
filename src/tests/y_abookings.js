import chai, { expect, have } from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import app from '../route/app';

dotenv.config();
chai.use(chaiHttp);

const should = chai.should();
const user = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvZWx5QGdtYWlsLmNvbSIsImlkIjo5LCJpYXQiOjE1NjMzNjk2NzYsImV4cCI6MTU2MzM5ODQ3Nn0.m1sbdBLi6yVUODKWm6afNzSs9xOGQYIXWS1rLgoCPMI',
  user_id: 4,
  is_admin: true,
  trip_id: 1,
};

describe('BOOKING Tests', () => {
  it('Should Create booking', (done) => {
    chai.request(app)
      .post('/v1/bookings')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
      });
    done();
  });
});
