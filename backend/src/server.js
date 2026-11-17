import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { existsSync } from 'fs';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobs.js';
import profileRoutes from './routes/profile.js';
import applicationRoutes from './routes/applications.js';
import savedJobRoutes from './routes/savedJobs.js';
import adminRoutes from './routes/admin.js';
import companyRoutes from './routes/companies.js';
import alertRoutes from './routes/alerts.js';
import recommendationRoutes from './routes/recommendations.js';
import Application from './models/Application.js';
import { rateLimit } from './middleware/rateLimit.js';
import { sanitizeMongoInput } from './utils.js';

const app = express();
dotenv.config({ path: resolve(dirname(fileURLToPath(import.meta.url)), '../.env') });
const port = Number(process.env.PORT || 5000);
const configuredOrigins = String(process.env.CLIENT_URL || '').split(',').map((item) => item.trim()).filter(Boolean);
app.use(helmet());
app.use(cors({ origin: configuredOrigins.length ? (origin, callback) => (!origin || configuredOrigins.includes(origin) ? callback(null, true) : callback(new Error('CORS origin denied'))) : false }));
app.use(express.json());
app.use((req, _res, next) => { if (req.body && typeof req.body === 'object') req.body = sanitizeMongoInput(req.body); next(); });
app.use(morgan('dev'));
app.use('/api', rateLimit({ windowMs: 60_000, max: 300 }));
app.use('/api/auth', rateLimit({ windowMs: 60_000, max: 30 }), authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/applications', rateLimit({ windowMs: 60_000, max: 30 }), applicationRoutes);
app.use('/api/saved-jobs', savedJobRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/recommendations', recommendationRoutes);

const frontendDist = resolve(dirname(fileURLToPath(import.meta.url)), '../../frontend/dist');
if (existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get('*', (req, res, next) => req.path.startsWith('/api') ? next() : res.sendFile(resolve(frontendDist, 'index.html')));
}
app.get('/api/health', (_req, res) => res.json({ success: true, service: 'careertrack-api', status: 'ok' }));
app.use((_req, res) => res.status(404).json({ success: false, message: 'Route not found' }));
app.use((error, _req, res, _next) => {
  console.error(error);
  if (error?.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ success: false, message: 'Resume must be 5 MB or smaller' });
  if (error?.name === 'MulterError') return res.status(400).json({ success: false, message: 'Resume upload could not be completed' });
  res.status(500).json({ success: false, message: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message || 'Internal server error' });
});

async function start() {
  if (process.env.MONGODB_URI) {
    await mongoose.connect(process.env.MONGODB_URI);
    // Older local databases may still have the original candidate-based unique index.
    // Drop it once so login-free applications can coexist for the same job.
    await Application.collection.dropIndex('job_1_candidate_1').catch(() => {});
    await Application.syncIndexes();
    console.log('MongoDB connected');
  }
  app.listen(port, () => console.log(`CareerTrack API listening on port ${port}`));
}
if (process.env.NODE_ENV !== 'test') start().catch((error) => { console.error('Unable to start API:', error.message); process.exit(1); });
export default app;

