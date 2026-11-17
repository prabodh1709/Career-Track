import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true, maxlength: 120 },
  company: { type: String, required: true, trim: true, maxlength: 120 },
  location: { type: String, required: true, trim: true, maxlength: 100 },
  employmentType: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], required: true },
  experienceLevel: { type: String, enum: ['Entry level', 'Mid level', 'Senior level'], required: true },
  salary: { type: String, trim: true, maxlength: 80 },
  description: { type: String, required: true, maxlength: 5000 },
  skills: [{ type: String, trim: true }],
  responsibilities: [{ type: String, trim: true, maxlength: 300 }],
  qualifications: [{ type: String, trim: true, maxlength: 300 }],
  benefits: [{ type: String, trim: true, maxlength: 300 }],
  applicationInstructions: { type: String, trim: true, maxlength: 2000 },
  deadline: { type: Date },
  status: { type: String, enum: ['draft', 'published', 'closed'], default: 'published' },
}, { timestamps: true });

jobSchema.index({ status: 1, createdAt: -1 });
jobSchema.index({ location: 1, employmentType: 1, experienceLevel: 1 });
jobSchema.index({ company: 1 });

export default mongoose.model('Job', jobSchema);

