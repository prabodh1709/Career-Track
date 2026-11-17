import { Router } from 'express'; import SavedJob from '../models/SavedJob.js'; import Job from '../models/Job.js'; import { requireAuth } from '../middleware/auth.js';
const router = Router();
router.get('/', requireAuth, async (req, res, next) => { try { res.json({ success: true, jobs: await SavedJob.find({ user: req.user.id }).populate('job').sort({ createdAt: -1 }) }); } catch (error) { next(error); } });
router.post('/:jobId', requireAuth, async (req, res, next) => { try { const job = await Job.findOne({ _id: req.params.jobId, status: 'published' }); if (!job) return res.status(404).json({ success: false, message: 'Job not found' }); await SavedJob.create({ user: req.user.id, job: job._id }); res.status(201).json({ success: true, message: 'Job saved' }); } catch (error) { if (error.code === 11000) return res.status(409).json({ success: false, message: 'Job already saved' }); next(error); } });
router.delete('/:jobId', requireAuth, async (req, res, next) => { try { await SavedJob.findOneAndDelete({ user: req.user.id, job: req.params.jobId }); res.json({ success: true, message: 'Job removed from saved jobs' }); } catch (error) { next(error); } });
export default router;

