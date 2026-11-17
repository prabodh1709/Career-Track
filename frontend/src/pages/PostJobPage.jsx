import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api.js';
import StatusMessage from '../components/StatusMessage.jsx';

const initial = {
  title: '', company: '', location: '', employmentType: 'Full-time', experienceLevel: 'Entry level',
  salary: '', description: '', skills: '', responsibilities: '', qualifications: '', benefits: '',
  applicationInstructions: '', deadline: '',
};

const splitLines = (value) => String(value || '').split(/[\n,]/).map((item) => item.trim()).filter(Boolean);

export default function PostJobPage() {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault(); setBusy(true); setError('');
    try {
      await api('/jobs', { method: 'POST', body: JSON.stringify({ ...form, skills: splitLines(form.skills), responsibilities: splitLines(form.responsibilities), qualifications: splitLines(form.qualifications), benefits: splitLines(form.benefits) }) });
      navigate('/my-jobs');
    } catch (err) { setError(err.message); } finally { setBusy(false); }
  }

  return <section className="section page-section"><div className="container form-wide">
    <p className="eyebrow">CREATE OPPORTUNITY</p>
    <h1 className="page-title">Post a new job.</h1>
    <p className="page-intro">Reach candidates who are ready for their next opportunity. Use one item per line for lists.</p>
    <form className="form-card job-form" onSubmit={submit}>
      <div className="form-row"><label>Job title<input name="title" required value={form.title} onChange={update} placeholder="e.g. Frontend Developer" /></label><label>Company<input name="company" required value={form.company} onChange={update} placeholder="Company name" /></label></div>
      <div className="form-row"><label>Location<input name="location" required value={form.location} onChange={update} placeholder="e.g. Bengaluru / Remote" /></label><label>Salary range<input name="salary" value={form.salary} onChange={update} placeholder="e.g. ₹8–12 LPA" /></label></div>
      <div className="form-row"><label>Employment type<select name="employmentType" value={form.employmentType} onChange={update}><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option></select></label><label>Experience level<select name="experienceLevel" value={form.experienceLevel} onChange={update}><option>Entry level</option><option>Mid level</option><option>Senior level</option></select></label></div>
      <label>Skills <span className="field-hint">comma or line separated</span><textarea name="skills" rows="3" value={form.skills} onChange={update} placeholder="React\nNode.js\nMongoDB" /></label>
      <label>Responsibilities <span className="field-hint">one responsibility per line</span><textarea name="responsibilities" rows="4" value={form.responsibilities} onChange={update} placeholder="Build accessible interfaces\nCollaborate with product and design" /></label>
      <label>Qualifications <span className="field-hint">one qualification per line</span><textarea name="qualifications" rows="4" value={form.qualifications} onChange={update} placeholder="B.Tech or equivalent experience\nStrong JavaScript fundamentals" /></label>
      <label>Benefits <span className="field-hint">one benefit per line</span><textarea name="benefits" rows="4" value={form.benefits} onChange={update} placeholder="Flexible work\nLearning budget" /></label>
      <label>Application deadline<input name="deadline" type="date" value={form.deadline} onChange={update} /></label>
      <label>Job description<textarea name="description" required rows="7" value={form.description} onChange={update} placeholder="Describe the role and team…" /></label>
      <label>Application instructions<textarea name="applicationInstructions" rows="4" value={form.applicationInstructions} onChange={update} placeholder="Tell candidates what to include in their application…" /></label>
      {error && <StatusMessage type="error" title="Could not post job">{error}</StatusMessage>}
      <button className="button button-primary" disabled={busy}>{busy ? 'Posting…' : 'Publish job'}</button>
    </form>
  </div></section>;
}
