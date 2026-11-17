import { Router } from 'express'; import Job from '../models/Job.js';
const router = Router();
router.get('/', async (_req, res, next) => { try { const companies = await Job.aggregate([{ $match: { status: 'published' } }, { $group: { _id: '$company', location: { $first: '$location' }, jobs: { $sum: 1 }, latest: { $max: '$createdAt' } } }, { $sort: { jobs: -1, latest: -1 } }]); res.json({ success: true, companies }); } catch (error) { next(error); } });
router.get('/:name', async (req, res, next) => { try { const name = decodeURIComponent(req.params.name); const jobs = await Job.find({ company: name, status: 'published' }).sort({ createdAt: -1 }); res.json({ success: true, company: { name, jobs, jobCount: jobs.length } }); } catch (error) { next(error); } });
export default router;

