import chai, { expect, have } from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import app from '../route/app';

dotenv.config();
chai.use(chaiHttp);

const trip = {
  id: 568,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhc3RvNDdAZ21haWwuY29tIiwiaWQiOjY2LCJpYXQiOjE1NjMzNjcyMDcsImV4cCI6MTU2MzM5NjAwN30.Wj6B1b7BIPpi7c8817BJLrQ3r62b9kxUyUllL70L9A0',
  user_id: 66,
  is_admin: true,
  bus_id: 1,
  origin: 'Lagos',
  destination: 'Kaduna',
  trip_date: '2019-07-30T00:00:00.000Z',
  fare: 8500,
  status: 1,
};

describe('TRIP Tests', () => {
  it('Should Create Trip', (done) => {
    chai.request(app)
      .post('/v1/trips')
      .send(trip)
      .end((err, res) => {
        res.should.have.status(201);
      });
    done();
  });
  it('Should return all Trips', (done) => {
    chai.request(app)
      .get('/v1/trips')
      .send(trip)
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });
  it('Should patch a Trips', (done) => {
    chai.request(app)
      .get('/v1/trips/568')
      .send(trip)
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });
});
