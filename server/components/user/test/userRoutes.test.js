const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
const app = require('../../../app');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const testDbUrl = 'mongodb://localhost/test_db';

chai.use(chaiHttp);
chai.should();

const fakeUser = {
  fullname: 'tester test',
  email: 'test@test.com',
  password: '@boBOROro51932#',
  adult: 'true',
  gender: 'myBusiness',
  addressData: {
    streetAddress: 'main str 543',
    city: 'Cristobal',
    stateOrProvince: 'Colon',
    zipCode: '0301',
    country: 'panama',
  },
  phone: '1231212123',
  volunteerField: ['children, poors'],
  timeAvailability: {
    days: ['mon, thu'],
    hours: ['07:00/10:00', '19:00/22:00'],
  },
};

// const fakeToken = jwt.sign({ id: '123' }, 'no-secret');

before(() => {
  mongoose.connect(
    testDbUrl,
    (err) => {
      if (err) {
        // eslint-disable-next-line
        console.log('Error connecting to test db', err);
      }
    },
  );
});

describe(' - USER ROUTES - ', () => {
  describe('GET /users-test-route', () => {
    it('should reach the endpoint', (done) => {
      chai
        .request(app)
        .get('/user/users-test-route')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('GET /user/get-all', () => {
    it('should reach the endpoint', (done) => {
      chai
        .request(app)
        .get('/user/get-all')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should return an array', (done) => {
      chai
        .request(app)
        .get('/user/get-all')
        .end((err, res) => {
          res.body.should.be.a('array');
          done();
        });
    });
  });
  describe('POST /user/register', () => {
    it('should reach the endpoint', (done) => {
      chai
        .request(app)
        .post('/user/register')
        .send(fakeUser)
        .end((err, res) => {
          res.should.have.status(201);
        });
      mongoose.connection.db.dropDatabase(done);
    });
    it('should return an object', (done) => {
      chai
        .request(app)
        .post('/user/register')
        .send(fakeUser)
        .end((err, res) => {
          res.body.should.be.a('object');
          done();
        });
    });
    it('should fail if email already exists', (done) => {
      chai
        .request(app)
        .post('/user/register')
        .send(fakeUser)
        .end((err, res) => {
          res.should.have.status(409);
        });

      mongoose.connection.db.dropDatabase(done);
    });
  });
});
