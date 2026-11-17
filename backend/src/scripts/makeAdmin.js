import dotenv from 'dotenv'; import mongoose from 'mongoose'; import User from '../models/User.js';
dotenv.config({ path: new URL('../../.env', import.meta.url) });
const email = process.argv[2];
if (!email) { console.error('Usage: npm run make-admin -- user@example.com'); process.exit(1); }
await mongoose.connect(process.env.MONGODB_URI); const user = await User.findOneAndUpdate({ email: email.toLowerCase() }, { role: 'admin' }, { new: true }); console.log(user ? `${user.email} is now an admin` : 'User not found'); await mongoose.disconnect();

