import chai, { expect, have } from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import app from '../route/app';

dotenv.config();
chai.use(chaiHttp);

const should = chai.should();
const user = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGdhQGdtYWlsLmNvbSIsImlkIjoiNCIsImlhdCI6MTU2Mjg1MTA1MiwiZXhwIjoxNTYyODU0NjUyfQ.GEy7mkrJrHwNYFJGIt59F-T9OyABhTaOFwk9cjsVFA0',
  user_id: 4,
  is_admin: 'true',
};

describe('TRIP Tests', () => {
  it('Fail to get Trips', (done) => {
    chai.request(app)
      .get('/trips')
      .send(user)
      .end((err, res) => {
        res.should.have.status(401);
      });
    done();
  });
});
