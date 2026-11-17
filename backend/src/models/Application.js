import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  candidateName: { type: String, required: true, trim: true, maxlength: 120 },
  candidateEmail: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
  phone: { type: String, required: true, trim: true, maxlength: 30 },
  education: { type: String, required: true, trim: true, maxlength: 300 },
  experience: { type: String, required: true, trim: true, maxlength: 300 },
  technicalSkills: { type: String, required: true, trim: true, maxlength: 1000 },
  coverLetter: { type: String, required: true, maxlength: 3000 },
  resumeUrl: { type: String, required: true },
  status: { type: String, enum: ['Submitted', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Selected', 'Rejected'], default: 'Submitted' },
  recruiterNotes: { type: String, maxlength: 2000, default: '' },
}, { timestamps: true });
applicationSchema.index({ job: 1, candidateEmail: 1 }, { unique: true });
export default mongoose.model('Application', applicationSchema);

