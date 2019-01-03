const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  dueDate: {
    type: String
  },
  projectName: {
    type: String,
    required: true,
    unique: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  applicationRequirements: {
    type: String,
   // required: true,
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
    type: [String],
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
    type: String//mongoose.Schema.Types.ObjectId,
    //ref: 'Business',
  },
});

module.exports = mongoose.model('Project', projectSchema);