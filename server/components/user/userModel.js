const mongoose = require('mongoose');
const crypto = require('crypto');

const timespanSchema = new mongoose.Schema({
  days: {
    type: [String],
    required: true,
  },
  hours: {
    type: [String],
    required: true,
  },
});

const addressSchema = new mongoose.Schema({
  streetAddress: {
    type: String,
  },
  city: {
    type: String,
  },
  stateOrProvince: {
    type: String,
  },
  country: {
    type: String,
  },
  zipCode: {
    type: Number,
  },
});

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  volunteerField: {
    type: [String],
  },
  timeAvailability: {
    type: [timespanSchema],
    required: true,
  },
  addressData: [addressSchema],
});

userSchema.methods.setPassword = function setPwd(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function checkPwd(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');

  return this.hash === hash;
};

module.exports = mongoose.model('User', userSchema);
