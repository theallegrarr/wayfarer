import chai, { expect, have } from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import app from '../route/app';

dotenv.config();
chai.use(chaiHttp);

const user = {
  id: 4,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhc3RvQGdtYWlsLmNvbSIsImlkIjo3NDcsImlhdCI6MTU2MzI4Nzk0MCwiZXhwIjoxNTYzMzE2NzQwfQ.DZgNzf8hlF8yHek7dorqZ3kDyUlkU1rUqVHhzJ-35ow',
  user_id: 4,
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
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
      });
    done();
  });
  it('Should return all Trips', (done) => {
    chai.request(app)
      .get('/v1/trips')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });
});
