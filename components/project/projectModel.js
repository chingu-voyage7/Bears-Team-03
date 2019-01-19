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
    type: String
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
  workDays: {
    type: [String]
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  ownerId: {
    type: String
  },
  applicants: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    default: []
  }
});

projectSchema.methods.toggleSubscription = async function toggleSubscription(id) {
  const subscriberIndex = this.applicants.indexOf(id);

  if (subscriberIndex === -1) {
    this.applicants.push(id);
  } else {
    this.applicants.splice(subscriberIndex, 1);
  }
  await this.save();
  return this;
}

module.exports = mongoose.model('Project', projectSchema);