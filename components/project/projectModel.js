const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  dueDate: {
    type: Date
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
      applicantInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      state: {
        type: String,
        default: 'pending'
      },
      notified: {
        type: Boolean,
        default: false
      }
    }],
    default: []
  }
});

projectSchema.methods.toggleSubscription = async function toggleSubscription(userId) {
  
  let subscriberIndex = this.applicants.findIndex(userInfo => userInfo.applicantInfo.toString() == userId)
  
  if (subscriberIndex === -1){
    let mongoID = mongoose.Types.ObjectId(userId);
    this.applicants.push({applicantInfo: mongoID, state: 'pending'});
  } else {
    this.applicants.splice(subscriberIndex, 1);
  };
  
  try {
    await this.save();
  } catch(error) {
    throw new Error('Something went wrong during subscription');
  }

  return this;
}

projectSchema.methods.setApplicantState = async function setApplicantState(applicantId, state) {
  
  let subscriberIndex = this.applicants.findIndex(applicant => applicant.applicantInfo.toString() == applicantId)
  
  if (subscriberIndex === -1){
    throw new Error('Applicant not found');
  } else {
    this.applicants[subscriberIndex].state = state;
  };

  try {
    await this.save();
  } catch(error) {
    throw new Error('Something went wrong during subscription');
  }
  return {doc:this, 
          applicantId,
          state};
}

projectSchema.methods.setNotification = async function setNotification(userId) {
  let subscriberIndex = this.applicants.findIndex(applicant => applicant.applicantInfo.toString() == userId);
  
  if (subscriberIndex === -1){
    throw new Error('Applicant not found');
  } else {
    this.applicants[subscriberIndex].notified = true;
  };

  try {
    await this.save();
  } catch(error) {
    throw new Error('Something went wrong during notification set');
  }
  return this;
  
}

module.exports = mongoose.model('Project', projectSchema);