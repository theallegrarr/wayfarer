import chai, { expect, have } from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import app from '../route/app';

dotenv.config();
chai.use(chaiHttp);

const should = chai.should();
const user = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhc3RvQGdtYWlsLmNvbSIsImlkIjo3NDcsImlhdCI6MTU2MzM1OTg0OSwiZXhwIjoxNTYzMzg4NjQ5fQ.o3xdq-HHB1VcI8DhbPYvNGfF46DoWGRYQcCQ5U3DY20',
  user_id: 4,
  is_admin: true,
  trip_id: 20,
};

describe('BOOKING Tests', () => {
  it('Should return all Bookings', (done) => {
    chai.request(app)
      .get('/v1/bookings')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });
});
