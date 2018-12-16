const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  applicationRequirements: {
    type: String,
    required: true,
  },
  projectLocationAddress: {
    type: String,
    required: true,
  },
  projectLocationCountry: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phoneContact: {
    type: Number,
  },
  workFields: {
    type: [String],
    required: true,
  },
  workingHours: {
    type: [Number],
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: Date.now,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
  },
});

module.exports = mongoose.model('Project', projectSchema);
