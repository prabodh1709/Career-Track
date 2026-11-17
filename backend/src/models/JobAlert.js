import mongoose from 'mongoose';
const jobAlertSchema = new mongoose.Schema({ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, name: { type: String, required: true, trim: true }, keyword: { type: String, trim: true }, location: { type: String, trim: true }, employmentType: { type: String, trim: true }, active: { type: Boolean, default: true } }, { timestamps: true });
export default mongoose.model('JobAlert', jobAlertSchema);

