import { Router } from 'express';
import Job from '../models/Job.js';
import { requireAuth } from '../middleware/auth.js';
import { asList, escapeRegex } from '../utils.js';

const router = Router();
router.get('/', async (req, res, next) => {
  try {
    const filters = [{ status: 'published' }, { $or: [{ deadline: null }, { deadline: { $gte: new Date() } }] }];
    if (req.query.search) { const search = escapeRegex(req.query.search); filters.push({ $or: [{ title: new RegExp(search, 'i') }, { company: new RegExp(search, 'i') }, { location: new RegExp(search, 'i') }, { skills: new RegExp(search, 'i') }] }); }
    if (req.query.location) filters.push({ location: new RegExp(escapeRegex(req.query.location), 'i') });
    if (req.query.employmentType) filters.push({ employmentType: req.query.employmentType });
    if (req.query.experienceLevel) filters.push({ experienceLevel: req.query.experienceLevel });
    const query = { $and: filters };
    const page = Math.max(Number(req.query.page) || 1, 1); const limit = Math.min(Math.max(Number(req.query.limit) || 12, 1), 50);
    const sort = req.query.sort === 'title' ? { title: 1 } : req.query.sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };
    const total = await Job.countDocuments(query); const jobs = await Job.find(query).sort(sort).skip((page - 1) * limit).limit(limit).populate('owner', 'name');
    res.json({ success: true, jobs, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) { next(error); }
});
router.get('/mine', requireAuth, async (req, res, next) => { try { res.json({ success: true, jobs: await Job.find({ owner: req.user.id }).sort({ createdAt: -1 }) }); } catch (error) { next(error); } });
router.get('/:id', async (req, res, next) => { try { const job = await Job.findOne({ _id: req.params.id, status: 'published', $or: [{ deadline: null }, { deadline: { $gte: new Date() } }] }).populate('owner', 'name'); if (!job) return res.status(404).json({ success: false, message: 'Job not found or no longer available' }); res.json({ success: true, job }); } catch (error) { next(error); } });
router.post('/', requireAuth, async (req, res, next) => {
  try { const body = { ...req.body, skills: asList(req.body.skills), responsibilities: asList(req.body.responsibilities), qualifications: asList(req.body.qualifications), benefits: asList(req.body.benefits), owner: req.user.id }; const job = await Job.create(body); res.status(201).json({ success: true, job }); } catch (error) { next(error); }
});
router.patch('/:id', requireAuth, async (req, res, next) => {
  try { const body = { ...req.body }; for (const field of ['skills', 'responsibilities', 'qualifications', 'benefits']) if (field in body) body[field] = asList(body[field]); const job = await Job.findOneAndUpdate({ _id: req.params.id, owner: req.user.id }, body, { new: true, runValidators: true }); if (!job) return res.status(404).json({ success: false, message: 'Job not found or not owned by you' }); res.json({ success: true, job }); } catch (error) { next(error); }
});
router.delete('/:id', requireAuth, async (req, res, next) => {
  try { const job = await Job.findOneAndDelete({ _id: req.params.id, owner: req.user.id }); if (!job) return res.status(404).json({ success: false, message: 'Job not found or not owned by you' }); res.json({ success: true, message: 'Job deleted' }); } catch (error) { next(error); }
});
export default router;

