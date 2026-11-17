import { Router } from 'express';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';
import { upload, uploadDir } from '../middleware/upload.js';
import { existsSync } from 'fs';
import { isAbsolute, resolve } from 'path';

const router = Router();
router.get('/me', requireAuth, async (req, res, next) => { try { const user = await User.findById(req.user.id).select('-passwordHash'); res.json({ success: true, user }); } catch (error) { next(error); } });
router.get('/me/resume', requireAuth, async (req, res, next) => { try { const user = await User.findById(req.user.id).select('resumeUrl name'); if (!user?.resumeUrl) return res.status(404).json({ success: false, message: 'No resume uploaded' }); const storedName = user.resumeUrl.replace(/^uploads[\\/]/, ''); const filePath = isAbsolute(user.resumeUrl) ? user.resumeUrl : resolve(uploadDir, storedName); if (!existsSync(filePath)) return res.status(404).json({ success: false, message: 'Resume file is no longer available' }); res.download(filePath, `${user.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-resume`); } catch (error) { next(error); } });
router.patch('/me', requireAuth, upload.single('resume'), async (req, res, next) => { try { const allowed = ['name', 'phone', 'location', 'headline', 'skills', 'education', 'experience', 'preferredRole', 'preferredLocation', 'expectedSalary', 'linkedinUrl', 'portfolioUrl', 'githubUrl', 'certifications', 'languages', 'openToWork']; const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key))); if (typeof updates.skills === 'string') updates.skills = updates.skills.split(',').map((skill) => skill.trim()).filter(Boolean); if (updates.openToWork !== undefined) updates.openToWork = updates.openToWork === true || updates.openToWork === 'true'; if (req.file) updates.resumeUrl = req.file.filename; const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true }).select('-passwordHash'); res.json({ success: true, user }); } catch (error) { next(error); } });
export default router;

