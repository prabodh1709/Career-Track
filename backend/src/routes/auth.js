import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = Router();
const signToken = (user) => jwt.sign({ id: user._id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = String(email || '').trim().toLowerCase();
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) || !password || password.length < 6) return res.status(400).json({ success: false, message: 'Name, valid email and password of 6+ characters are required' });
    if (await User.findOne({ email: normalizedEmail })) return res.status(409).json({ success: false, message: 'An account with this email already exists' });
    const user = await User.create({ name, email: normalizedEmail, passwordHash: await bcrypt.hash(password, 12) });
    res.status(201).json({ success: true, token: signToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) { next(error); }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: String(req.body.email || '').trim().toLowerCase() });
    if (!user || !(await bcrypt.compare(req.body.password || '', user.passwordHash))) return res.status(401).json({ success: false, message: 'Invalid email or password' });
    if (req.body.accountType === 'owner' && user.role !== 'admin') return res.status(403).json({ success: false, message: 'This account does not have owner access' });
    res.json({ success: true, token: signToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) { next(error); }
});

export default router;

