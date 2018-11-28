const mongoose = require('mongoose');

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
    default: 'Jhon Smith',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
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

module.exports = mongoose.model('User', userSchema);
