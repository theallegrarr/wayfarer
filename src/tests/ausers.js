import chai, { expect } from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import app from '../route/app';

dotenv.config();
chai.use(chaiHttp);

const should = chai.should();

const details = {
  id: 9,
  email: 'joely@gmail.com',
  first_name: 'Helga',
  last_name: 'Paul',
  password: 'batoore',
  is_admin: 'true',
};

// const signUp = request.agent(app);
describe('USER OPERATIONS', () => {
  it('Should add users', (done) => {
    chai.request(app)
      .post('/v1/auth/signup')
      .send(details)
      .end((err, res) => {
        res.should.have.status(409);
        expect(res.body).to.have.property('message');
        // console.log('Response Body:', res.body);
      });
    done();
  });

  it('Should not add Duplicate users', (done) => {
    chai.request(app)
      .post('/v1/auth/signup')
      .send(details)
      .end((err, res) => {
        res.should.have.status(409);
        expect(res.body).to.have.property('message');
        // console.log('Response Body:', res.body);
      });
    done();
  });

  const user = {
    email: 'joely@gmail.com',
    password: 'batoore',
    is_admin: 'true',
  };

  it('Should Sign In', (done) => {
    chai.request(app)
      .post('/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        // console.log('Response Body:', res.body);
      });
    done();
  });

  const user2 = {
    email: 'joely@gmail.com',
    password: 'batare',
    is_admin: 'true',
  };

  it('Should Fail to Sign In', (done) => {
    chai.request(app)
      .post('/v1/auth/signin')
      .send(user2)
      .end((err, res) => {
        res.should.have.status(409);
      // console.log('Response Body:', res.body);
      });
    done();
  });
});
