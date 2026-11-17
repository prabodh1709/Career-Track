import { Link } from 'react-router-dom';

export default function JobCard({ job }) {
  return <article className="job-card"><div className="job-card-top"><div className="company-logo">{job.company?.slice(0, 1).toUpperCase() || 'J'}</div><span className="job-status">{job.employmentType || 'Full-time'}</span></div><h3>{job.title}</h3><p className="job-company">{job.company} · {job.location}</p><div className="job-meta"><span>{job.experienceLevel || 'Any experience'}</span>{job.salary && <span>{job.salary}</span>}</div><div className="job-card-bottom"><span>{job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently posted'}</span><Link className="text-link" to={`/jobs/${job._id}`}>View details <span>→</span></Link></div></article>;
}

