import { Link } from 'react-router-dom';

const benefits = [
  ['01', 'Find the right fit', 'Search opportunities by role, location, experience and work type.'],
  ['02', 'Apply with confidence', 'Share your profile and resume through a simple application flow.'],
  ['03', 'Track what matters', 'Recruitment teams can review applications and move candidates forward.'],
];

export default function HomePage() {
  return <>
    <section className="hero"><div className="container hero-grid"><div><p className="eyebrow">YOUR NEXT OPPORTUNITY STARTS HERE</p><h1>Build a career you’re <em>proud</em> of.</h1><p className="hero-copy">CareerTrack brings ambitious candidates and growing teams together through a clearer, more human job search.</p><div className="hero-actions"><Link className="button button-primary" to="/jobs">Explore open roles <span>→</span></Link><Link className="button button-outline" to="/register">Create an account</Link></div></div><div className="hero-art" aria-hidden="true"><div className="art-card art-card-main"><span className="art-icon">↗</span><small>OPEN OPPORTUNITIES</small><strong>Find work that moves you forward.</strong><div className="art-line" /><div className="art-line short" /></div><div className="art-card art-card-float">✦ <span>Made for momentum</span></div></div></div></section>
    <section className="section" id="how-it-works"><div className="container"><div className="section-heading"><div><p className="eyebrow">WHY CAREERTRACK</p><h2>A better way to move <em>forward.</em></h2></div><p>Everything you need to discover meaningful work or find the people who will help your team grow.</p></div><div className="benefit-grid">{benefits.map(([number, title, text]) => <article className="benefit-card" key={number}><span className="benefit-number">{number}</span><h3>{title}</h3><p>{text}</p><span className="card-arrow">↗</span></article>)}</div></div></section>
  </>;
}

