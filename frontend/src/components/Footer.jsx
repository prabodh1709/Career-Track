import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer" id="about">
      <div className="container footer-grid">
        <div><Link className="brand footer-brand" to="/"><span className="brand-mark">C</span><span>Career<span className="brand-accent">Track</span></span></Link><p>Connecting capable people with meaningful opportunities.</p></div>
        <div><h3>Explore</h3><Link to="/jobs">Browse jobs</Link><a href="#about">About us</a></div>
        <div><h3>Project</h3><span>MERN stack recruitment portal</span><span>Built for candidates and teams</span></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 CareerTrack</span><span>Built with care for better careers.</span></div>
    </footer>
  );
}

