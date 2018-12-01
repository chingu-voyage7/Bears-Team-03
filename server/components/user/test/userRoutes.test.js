const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const configVars = require('../../../config/keys');
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

const id = mongoose.Types.ObjectId();
const fakeToken = jwt.sign({ id }, configVars.JWT_SECRET);

describe(' - USER ROUTES - ', () => {
  before((done) => {
    mongoose.connect(
      testDbUrl,
      (err) => {
        if (err) {
          // eslint-disable-next-line
          console.log('Error connecting to test db', err);
        }
        done();
      },
    );
  });

  beforeEach('emptying database', (done) => {
    mongoose.connection.collections.users.drop(() => done());
  });

  after((done) => {
    mongoose.connection.close();
    done();
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
          done();
        });
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
        .then(() => {
          chai
            .request(app)
            .post('/user/register')
            .send(fakeUser)
            .end((error, result) => {
              result.should.have.status(409);
              done();
            });
        });
    });
  });
  describe('GET /user/get-by-id', () => {
    it('should reach the endpoint', (done) => {
      chai
        .request(app)
        .get('/user/get-by-id')
        .set('Authorization', fakeToken)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it('should return the user with the corresponded ID', (done) => {
      chai
        .request(app)
        .post('/user/register')
        .send(fakeUser)
        .end((err, res) => {
          /* eslint-disable-next-line */
          const newToken = jwt.sign({ id: res.body._id }, configVars.JWT_SECRET);
          chai
            .request(app)
            .get('/user/get-by-id')
            .set('Authorization', newToken)
            .end((getErr, getRes) => {
              getRes.body.should.include({ fullname: 'tester test' });
              done();
            });
        });
    });
  });
  describe('PATCH /user/update-by-id', () => {
    it('should reach the endpoint', (done) => {
      chai
        .request(app)
        .patch('/user/update-by-id')
        .set('Authorization', fakeToken)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it('should return the updated user', (done) => {
      chai
        .request(app)
        .post('/user/register')
        .send(fakeUser)
        .end((err, res) => {
          /* eslint-disable-next-line */
          const newToken = jwt.sign({ id: res.body._id }, configVars.JWT_SECRET);
          chai
            .request(app)
            .patch('/user/update-by-id')
            .set('Authorization', newToken)
            .send({ fullname: 'untester untest' })
            .end((getErr, getRes) => {
              getRes.body.should.include({ fullname: 'untester untest' });
              done();
            });
        });
    });
  });
  describe('DELETE /user/delete-by-id', () => {
    it('should reach the endpoint', (done) => {
      chai
        .request(app)
        .get('/user/delete-by-id')
        .set('Authorization', fakeToken)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it('should delete the user and return nothing', (done) => {
      chai
        .request(app)
        .post('/user/register')
        .send(fakeUser)
        .end((err, res) => {
          /* eslint-disable-next-line */
          const newToken = jwt.sign({ id: res.body._id }, configVars.JWT_SECRET);
          chai
            .request(app)
            .get('/user/delete-by-id')
            .set('Authorization', newToken)
            .end((getErr, getRes) => {
              /* eslint-disable-next-line */
              getRes.body.should.be.an('object').that.is.empty;
              done();
            });
        });
    });
  });
  describe('MW authorization', () => {
    it('should validate the token', (done) => {
      chai
        .request(app)
        .get('/user/get-by-id') // Randomly chosen protected route
        .set('Authorization', fakeToken)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it('should reject not authorized request', (done) => {
      chai
        .request(app)
        .get('/user/get-by-id')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});
