import chai, { expect, have } from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import app from '../route/app';

dotenv.config();
chai.use(chaiHttp);

const should = chai.should();

const details = {
  id: 4,
  email: 'helga@gmail.com',
  first_name: 'Helga',
  last_name: 'Paul',
  password: 'batoore',
  is_admin: 'true',
};

// const signUp = request.agent(app);
describe('USER OPERATIONS', () => {
  it('Should add new user', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(details)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.have.property('message');
        // console.log('Response Body:', res.body);
      });
    done();
  });
  const user = {
    email: 'johnpaul@gmail.com',
    password: 'batoore',
    is_admin: 'true',
  };

  it('Should Fail to Sign In', (done) => {
    chai.request(app)
      .post('/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(401);
        // console.log('Response Body:', res.body);
      });
    done();
  });
});
