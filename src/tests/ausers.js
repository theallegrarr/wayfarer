import chai, { expect } from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import { AssertionError } from 'assert';
import app from '../route/app';

dotenv.config();
chai.use(chaiHttp);

const should = chai.should();

const data = {
  bus_id: 1,
  origin: 'Lagos',
  destination: 'Kaduna',
  trip_date: '2019-07-30T00:00:00.000Z',
  fare: 8500,
  status: 1,
};

pool.query('INSERT INTO btrips(id, bus_id, origin, destination, trip_date, fare, status) VALUES($1, $2, $3, $4, $5, $6, $7)', [1, data.bus_id, data.origin, data.destination, data.trip_date, data.fare, data.status], (err, res) => {
  if (err) {
    console.log(err);
  }
});

const details = {
  id: 9,
  email: 'kempo20@gmail.com',
  first_name: 'Helga',
  last_name: 'Paul',
  password: 'batoore',
  is_admin: true,
};

// const signUp = request.agent(app);
describe('USER OPERATIONS', () => {
  it('Should add users', (done) => {
    // console.log(details);
    chai.request(app)
      .post('/v1/auth/signup')
      .send(details)
      .end((err, res) => {
        try {
          res.should.have.status(201);
        } catch (error) {
          throw new AssertionError(error);
        }
        expect(res.body).to.have.property('data');

      });
    done();
  });

  const user = {
    email: 'kempo20@gmail.com',
    password: 'batoore',
    is_admin: 'true',
  };

  it('Should Sign In', (done) => {
    chai.request(app)
      .post('/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });

  const user2 = {
    email: 'kempo20@gmail.com',
    password: 'batare',
    is_admin: true,
  };

  it('Should Fail to Sign In', (done) => {
    chai.request(app)
      .post('/v1/auth/signin')
      .send(user2)
      .end((err, res) => {
        res.should.have.status(401);
      // console.log('Response Body:', res.body);
      });
    done();
  });
});
