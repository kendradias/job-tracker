const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  jobDescription: {
    type: String
  },
  location: {
    type: String,
    trim: true
  },
  salary: {
    type: String,
    trim: true
  },
  jobPostingUrl: {
    type: String,
    trim: true
  },
  applicationDate: {
    type: Date
  },
  applicationStatus: {
    type: String,
    enum: ['Interested', 'Applied', 'Phone Screen', 'Interview', 'Offer', 'Rejected', 'Declined', 'Accepted'],
    default: 'Interested'
  },
  followUpDate: {
    type: Date
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', JobSchema);