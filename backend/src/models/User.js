import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  phone: { type: String, trim: true },
  location: { type: String, trim: true, maxlength: 120 },
  headline: { type: String, trim: true, maxlength: 160 },
  skills: [{ type: String, trim: true }],
  education: { type: String, trim: true, maxlength: 500 },
  experience: { type: String, trim: true, maxlength: 500 },
  preferredRole: { type: String, trim: true },
  preferredLocation: { type: String, trim: true },
  expectedSalary: { type: String, trim: true },
  linkedinUrl: { type: String, trim: true, maxlength: 300 },
  portfolioUrl: { type: String, trim: true, maxlength: 300 },
  githubUrl: { type: String, trim: true, maxlength: 300 },
  certifications: { type: String, trim: true, maxlength: 1000 },
  languages: { type: String, trim: true, maxlength: 500 },
  openToWork: { type: Boolean, default: true },
  resumeUrl: { type: String, trim: true },
  role: { type: String, enum: ['candidate', 'admin'], default: 'candidate' },
}, { timestamps: true });

export default mongoose.model('User', userSchema);

