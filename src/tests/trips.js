import chai, { expect, have } from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import app from '../route/app';

dotenv.config();
chai.use(chaiHttp);

const trip = {
  email: 'joely@gmail.com',
  first_name: 'John',
  last_name: 'Van',
  password: 'batoore',
  is_admin: true,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvZWx5QGdtYWlsLmNvbSIsImlkIjo5LCJpYXQiOjE1NjMzNjk2NzYsImV4cCI6MTU2MzM5ODQ3Nn0.m1sbdBLi6yVUODKWm6afNzSs9xOGQYIXWS1rLgoCPMI',
  bus_id: 1,
  origin: 'Lagos',
  destination: 'Kaduna',
  trip_date: '2019-07-30T00:00:00.000Z',
  fare: 8500,
  trip_id: 3,
};

describe('TRIP Tests', () => {
  it('Should Create Trip', (done) => {
    chai.request(app)
      .post('/v1/trips')
      .send(trip)
      .end((err, res) => {
        console.log(res.body.data.id);
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
  it('Should patch a Trip', (done) => {
    chai.request(app)
      .patch('/v1/trips/1')
      .send(trip)
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });
});
