import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../lib/api.js';
import StatusMessage from '../components/StatusMessage.jsx';

function DetailList({ title, items }) {
  if (!items?.length) return null;
  return <div className="detail-block"><h2>{title}</h2><ul className="detail-list">{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}

export default function JobDetailPage() {
  const { id } = useParams(); const [job, setJob] = useState(null); const [error, setError] = useState(''); const navigate = useNavigate();
  useEffect(() => { api(`/jobs/${id}`).then((data) => setJob(data.job)).catch((err) => setError(err.message)); }, [id]);
  if (error) return <section className="section page-section"><div className="container"><StatusMessage type="error" title="Could not load job">{error}</StatusMessage><Link className="text-link" to="/jobs">← Back to jobs</Link></div></section>;
  if (!job) return <section className="section page-section"><div className="container"><p className="eyebrow">JOB DETAILS</p><h1 className="page-title">Loading opportunity…</h1></div></section>;
  const deadline = job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Open until filled';
  return <section className="section job-detail-page"><div className="container"><Link className="text-link" to="/jobs">← Back to jobs</Link><div className="job-detail-grid"><article>
    <div className="detail-company"><div className="company-logo large">{job.company.slice(0, 1).toUpperCase()}</div><div><p className="eyebrow">{job.employmentType}</p><h1 className="page-title">{job.title}</h1><p className="job-company">{job.company} · {job.location}</p></div></div>
    <div className="job-facts"><span><strong>Experience</strong>{job.experienceLevel}</span><span><strong>Salary</strong>{job.salary || 'Not disclosed'}</span><span><strong>Posted</strong>{new Date(job.createdAt).toLocaleDateString()}</span><span><strong>Deadline</strong>{deadline}</span></div>
    <div className="detail-block"><h2>About the role</h2><p>{job.description}</p></div>
    <DetailList title="Responsibilities" items={job.responsibilities} />
    <DetailList title="Qualifications" items={job.qualifications} />
    <DetailList title="Required skills" items={job.skills} />
    <DetailList title="Benefits" items={job.benefits} />
    {job.applicationInstructions && <div className="detail-block"><h2>Application instructions</h2><p>{job.applicationInstructions}</p></div>}
  </article><aside className="apply-card"><h2>Interested in this role?</h2><p>Apply with your details and resume. An account is optional.</p><button className="button button-primary" onClick={() => navigate(`/jobs/${id}/apply`)}>Apply now <span>→</span></button><p className="apply-note">No registration is required to submit an application.</p></aside></div></div></section>;
}
