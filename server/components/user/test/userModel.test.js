const chai = require('chai');
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const User = require('../userModel');

const should = chai.should();

let fakeUser;
beforeEach(() => {
  fakeUser = {
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
});

describe(' - USER MODEL - ', () => {
  it('should not be valid without email', (done) => {
    delete fakeUser.email;
    const user = new User(fakeUser);
    user.validate((err) => {
      should.exist(err);
      done();
    });
  });

  it('should not be valid without password', (done) => {
    delete fakeUser.password;
    const user = new User(fakeUser);
    user.validate((err) => {
      should.exist(err);
      done();
    });
  });

  it('should not be valid if phone is not a number', (done) => {
    fakeUser.phone = 'abc';
    const user = new User(fakeUser);
    user.validate((err) => {
      should.exist(err);
      done();
    });
  });

  it('should hash the received password', (done) => {
    const user = new User(fakeUser);
    user.setPassword(fakeUser.password);

    /* eslint-disable-next-line */
    (user.hash === fakeUser.password).should.be.false;
    /* eslint-disable-next-line */
    user.hash.should.exist;
    /* eslint-disable-next-line */
    user.salt.should.exist;
    user.validate((err) => {
      if (err) {
        throw Error(err);
      }
      done();
    });
  });

  it('should be able to recognize the correct password', (done) => {
    const user = new User(fakeUser);
    user.setPassword(fakeUser.password);

    /* eslint-disable-next-line */
    user.hash.should.exist;
    /* eslint-disable-next-line */
    user.validPassword(fakeUser.password).should.be.true;
    /* eslint-disable-next-line */
    user.validPassword('123').should.be.false;
    user.validate((err) => {
      if (err) {
        throw Error(err);
      }
      done();
    });
  });
});
