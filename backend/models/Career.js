const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    enum: ['Head Chef', 'Sous Chef', 'Server', 'Host/Hostess', 'Kitchen Assistant', 'Manager'],
    trim: true
  },
  experience: {
    type: String,
    required: [true, 'Experience level is required'],
    enum: ['0-1 years', '2-3 years', '4-5 years', '6-10 years', '10+ years']
  },
  coverLetter: {
    type: String,
    trim: true,
    maxlength: [2000, 'Cover letter cannot exceed 2000 characters']
  },
  cvPath: {
    type: String,
    required: [true, 'CV file is required']
  },
  cvOriginalName: {
    type: String,
    required: [true, 'CV original name is required']
  },
  cvSize: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'reviewing', 'interview', 'accepted', 'rejected'],
    default: 'new'
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Index for better query performance
careerSchema.index({ email: 1, createdAt: -1 });
careerSchema.index({ position: 1, status: 1 });
careerSchema.index({ status: 1 });

// Virtual for full name
careerSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for formatted date
careerSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Virtual for formatted file size
careerSchema.virtual('formattedFileSize').get(function() {
  const bytes = this.cvSize;
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
});

// Ensure virtual fields are serialized
careerSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Career', careerSchema);

