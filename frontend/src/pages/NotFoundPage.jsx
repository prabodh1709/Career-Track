import { Link } from 'react-router-dom';

export default function NotFoundPage() { return <section className="section page-section"><div className="container narrow"><p className="eyebrow">404</p><h1 className="page-title">Page not found.</h1><p className="page-intro">That page does not exist yet. Return to the CareerTrack home page.</p><Link className="button button-primary" to="/">Go home</Link></div></section>; }

