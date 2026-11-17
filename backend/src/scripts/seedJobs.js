import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Job from '../models/Job.js';

dotenv.config();

const roles = [
  ['Frontend Developer', ['React', 'JavaScript', 'CSS']], ['Backend Developer', ['Node.js', 'Express', 'MongoDB']], ['Full Stack Developer', ['React', 'Node.js', 'MongoDB']],
  ['UI/UX Designer', ['Figma', 'Wireframing', 'User Research']], ['Data Analyst', ['SQL', 'Excel', 'Power BI']], ['QA Engineer', ['Manual Testing', 'API Testing', 'Selenium']],
  ['DevOps Engineer', ['AWS', 'Docker', 'CI/CD']], ['Product Manager', ['Product Strategy', 'Agile', 'Analytics']], ['Business Analyst', ['Requirements', 'SQL', 'Documentation']],
  ['Mobile App Developer', ['React Native', 'Android', 'REST APIs']],
];
const companies = ['BrightLabs', 'Orbit Systems', 'Northstar Digital', 'PixelForge', 'CloudNest', 'Greenline Tech', 'ApexWorks', 'Mosaic Commerce', 'Riverstone Apps', 'Vertex Insights'];
const locations = ['Bengaluru', 'Hyderabad', 'Pune', 'Mumbai', 'Delhi NCR', 'Chennai', 'Indore', 'Jaipur', 'Remote', 'Ahmedabad'];
const types = ['Full-time', 'Full-time', 'Full-time', 'Contract', 'Internship'];
const levels = ['Entry level', 'Entry level', 'Mid level', 'Senior level'];

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  let owner = await User.findOne().sort({ createdAt: 1 });
  if (!owner) owner = await User.create({ name: 'CareerTrack Demo Employer', email: 'demo-employer@careertrack.local', passwordHash: await bcrypt.hash('CareerTrackDemo123!', 12) });
  const jobs = Array.from({ length: 50 }, (_, index) => {
    const [role, skills] = roles[index % roles.length]; const company = companies[index % companies.length]; const location = locations[index % locations.length];
    return { owner: owner._id, title: `${role}${index >= roles.length ? ` - ${Math.floor(index / roles.length) + 1}` : ''}`, company, location, employmentType: types[index % types.length], experienceLevel: levels[index % levels.length], salary: index % 4 === 0 ? '₹6 - ₹12 LPA' : index % 4 === 1 ? '₹10 - ₹18 LPA' : '₹4 - ₹8 LPA', description: `Join ${company} as a ${role} and help us build useful, reliable products for customers. You will collaborate with a cross-functional team, ship improvements, and grow your craft in a supportive environment.`, skills, deadline: new Date(Date.now() + (30 + (index % 90)) * 86400000), status: 'published' };
  });
  const existing = await Job.find({ title: { $in: jobs.map((job) => job.title) }, company: { $in: companies } }).select('title company');
  const keys = new Set(existing.map((job) => `${job.company}:${job.title}`)); const missing = jobs.filter((job) => !keys.has(`${job.company}:${job.title}`));
  if (missing.length) await Job.insertMany(missing);
  console.log(`Seed complete: added ${missing.length} jobs; ${await Job.countDocuments({ status: 'published' })} published jobs available.`);
  await mongoose.disconnect();
}

run().catch((error) => { console.error('Job seed failed:', error.message); process.exitCode = 1; });
