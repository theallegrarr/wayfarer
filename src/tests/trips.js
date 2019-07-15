import chai, { expect, have } from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import app from '../route/app';

dotenv.config();
chai.use(chaiHttp);

const should = chai.should();
const user = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhbHNva2VsQGdtYWlsLmNvbSIsImlhdCI6MTU2MzE3OTMzNiwiZXhwIjoxNTYzMjA4MTM2fQ.BqC4ITBnS4aIaLFq4gh9rRn0YUp0XJcZQgatKgmcIec',
  user_id: 4,
  is_admin: 'true',
};

describe('TRIP Tests', () => {
  it('Should Fail to Create Trip', (done) => {
    chai.request(app)
      .post('/v1/trips')
      .send(user)
      .end((err, res) => {
        res.should.have.status(401);
      });
    done();
  });
  it('Should Fail to return all Trips', (done) => {
    chai.request(app)
      .get('/v1/trips')
      .send(user)
      .end((err, res) => {
        res.should.have.status(401);
      });
    done();
  });
});
