import { Router } from 'express';
import User from '../models/User.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import SavedJob from '../models/SavedJob.js';
import JobAlert from '../models/JobAlert.js';
import { requireAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';
import { asList } from '../utils.js';

const router = Router();
router.use(requireAuth, requireAdmin);

const jobFields = ['title', 'company', 'location', 'employmentType', 'experienceLevel', 'salary', 'description', 'skills', 'responsibilities', 'qualifications', 'benefits', 'applicationInstructions', 'deadline', 'status', 'owner'];
const applicationStatuses = ['Submitted', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Selected', 'Rejected'];
const pick = (source, fields) => Object.fromEntries(Object.entries(source || {}).filter(([key]) => fields.includes(key)));

router.get('/stats', async (_req, res, next) => {
  try {
    const [users, jobs, applications, publishedJobs] = await Promise.all([
      User.countDocuments(), Job.countDocuments(), Application.countDocuments(), Job.countDocuments({ status: 'published' }),
    ]);
    res.json({ success: true, stats: { users, jobs, applications, publishedJobs } });
  } catch (error) { next(error); }
});

router.get('/jobs', async (_req, res, next) => {
  try { res.json({ success: true, jobs: await Job.find().populate('owner', 'name email').sort({ createdAt: -1 }) }); } catch (error) { next(error); }
});

function normalizeJob(body) {
  const data = pick(body, jobFields);
  for (const field of ['skills', 'responsibilities', 'qualifications', 'benefits']) if (field in data) data[field] = asList(data[field]);
  return data;
}

router.post('/jobs', async (req, res, next) => {
  try { const job = await Job.create({ ...normalizeJob(req.body), owner: req.body.owner || req.user.id }); res.status(201).json({ success: true, job }); } catch (error) { next(error); }
});

router.patch('/jobs/:id/status', async (req, res, next) => {
  try { const job = await Job.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true }); if (!job) return res.status(404).json({ success: false, message: 'Job not found' }); res.json({ success: true, job }); } catch (error) { next(error); }
});

router.patch('/jobs/:id', async (req, res, next) => {
  try { const job = await Job.findByIdAndUpdate(req.params.id, normalizeJob(req.body), { new: true, runValidators: true }).populate('owner', 'name email'); if (!job) return res.status(404).json({ success: false, message: 'Job not found' }); res.json({ success: true, job }); } catch (error) { next(error); }
});

router.delete('/jobs/:id', async (req, res, next) => {
  try { const job = await Job.findById(req.params.id).select('_id'); if (!job) return res.status(404).json({ success: false, message: 'Job not found' }); await Promise.all([Application.deleteMany({ job: job._id }), SavedJob.deleteMany({ job: job._id }), Job.deleteOne({ _id: job._id })]); res.json({ success: true, message: 'Job and related applications deleted' }); } catch (error) { next(error); }
});

router.get('/users', async (_req, res, next) => {
  try { res.json({ success: true, users: await User.find().select('-passwordHash').sort({ createdAt: -1 }) }); } catch (error) { next(error); }
});

router.patch('/users/:id/role', async (req, res, next) => {
  try { if (String(req.params.id) === String(req.user.id) && req.body.role !== 'admin') return res.status(400).json({ success: false, message: 'You cannot remove your own owner access' }); if (!['candidate', 'admin'].includes(req.body.role)) return res.status(400).json({ success: false, message: 'Invalid account role' }); const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true }).select('-passwordHash'); if (!user) return res.status(404).json({ success: false, message: 'User not found' }); res.json({ success: true, user }); } catch (error) { next(error); }
});

router.delete('/users/:id', async (req, res, next) => {
  try { if (String(req.params.id) === String(req.user.id)) return res.status(400).json({ success: false, message: 'You cannot delete your own owner account' }); const jobs = await Job.find({ owner: req.params.id }).select('_id'); await Promise.all([Application.deleteMany({ candidate: req.params.id }), Application.deleteMany({ job: { $in: jobs.map((job) => job._id) } }), SavedJob.deleteMany({ user: req.params.id }), JobAlert.deleteMany({ user: req.params.id }), Job.deleteMany({ owner: req.params.id }), User.findByIdAndDelete(req.params.id)]); res.json({ success: true, message: 'User and associated recruitment records deleted' }); } catch (error) { next(error); }
});

router.get('/applications', async (_req, res, next) => {
  try { const applications = await Application.find().populate('job', 'title company owner').populate('candidate', 'name email phone headline skills').sort({ createdAt: -1 }); res.json({ success: true, applications }); } catch (error) { next(error); }
});

router.patch('/applications/:id/status', async (req, res, next) => {
  try { if (req.body.status && !applicationStatuses.includes(req.body.status)) return res.status(400).json({ success: false, message: 'Invalid application status' }); const application = await Application.findByIdAndUpdate(req.params.id, { ...(req.body.status ? { status: req.body.status } : {}), ...(req.body.recruiterNotes !== undefined ? { recruiterNotes: req.body.recruiterNotes } : {}) }, { new: true, runValidators: true }).populate('job', 'title company').populate('candidate', 'name email phone headline skills'); if (!application) return res.status(404).json({ success: false, message: 'Application not found' }); res.json({ success: true, application }); } catch (error) { next(error); }
});

router.get('/applications.csv', async (_req, res, next) => {
  try { const applications = await Application.find().populate('job', 'title').populate('candidate', 'name email'); const rows = ['Job,Candidate,Email,Status,Applied At', ...applications.map((item) => [item.job?.title || 'Deleted job', item.candidate?.name || item.candidateName, item.candidate?.email || item.candidateEmail, item.status, item.createdAt.toISOString()].map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))]; res.setHeader('Content-Type', 'text/csv'); res.setHeader('Content-Disposition', 'attachment; filename="careertrack-all-applications.csv"'); res.send(rows.join('\n')); } catch (error) { next(error); }
});

export default router;
