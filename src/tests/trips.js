import chai, { expect, have } from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import app from '../route/app';

dotenv.config();
chai.use(chaiHttp);

const should = chai.should();
const user = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhbHNva2VsQGdtYWlsLmNvbSIsImlhdCI6MTU2MzE4MjE5NiwiZXhwIjoxNTYzMjEwOTk2fQ.a2lwnqLbuxMYF_tZGdVkWxNPgrz42DolTsU0cW2JyeI',
  user_id: 4,
  is_admin: true,
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
