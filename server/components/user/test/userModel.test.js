const chai = require('chai');
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const User = require('../userModel');

const should = chai.should();

describe(' - USER MODEL -  ', () => {
  it('should not be valid without email', (done) => {
    const fakeUser = new User({
      fullname: 'tester test',
      // email: 'test@test.com',
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
    });

    fakeUser.validate((err) => {
      should.exist(err);
      done();
    });
  });
});
