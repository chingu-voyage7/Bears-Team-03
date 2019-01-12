const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  VAT: {
    type: String,
    required: true,
    unique: true,
  },
  localOfficeAddress: {
    type: String,
  },
  localOfficeCountry: {
    type: String,
  },
  phoneContact: {
    type: Number,
  },
  mainHeadQuarter: {
    type: String,
  },
  workFields: {
    type: [String],
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Business', businessSchema);
