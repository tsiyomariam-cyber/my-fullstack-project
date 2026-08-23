function LandingPage({ onStart }) {
  return (
    <div className="landing">

      {/* NAV */}
      <nav className="nav">
        <div className="nav-brand">
          <div className="nav-logo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z" fill="white"/>
            </svg>
          </div>
          Afroawi Technologies
        </div>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <button className="btn-primary" onClick={onStart}>
              Get Started
            </button>
        </div>
       
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">Software Development</p>
          <h1>We build software<br />that works for you.</h1>
          <p className="hero-desc">
            From web apps to full enterprise systems — we design, develop,
            and ship digital products tailored to your business.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={onStart}>
              Start a Project
            </button>
            <a href="#services" className="btn-ghost">See Our Services</a>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <strong>500+</strong>
              <span>Projects Delivered</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <strong>98%</strong>
              <span>Client Satisfaction</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <strong>4+</strong>
              <span>Years Experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services" id="services">
        <p className="section-label">What We Do</p>
        <h2 className="section-title">Our Services</h2>
        <p className="section-sub">
          We handle the full product lifecycle — design, development, and deployment.
        </p>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon indigo">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <h3>Web Development</h3>
            <p>Responsive, fast web applications built with modern technologies for any scale.</p>
          </div>

          <div className="service-card">
            <div className="service-icon blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
            </div>
            <h3>Mobile Apps</h3>
            <p>iOS and Android apps that feel native and perform well on every device.</p>
          </div>

          <div className="service-card">
            <div className="service-icon green">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3"/>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
              </svg>
            </div>
            <h3>Backend & APIs</h3>
            <p>Reliable server-side systems and REST APIs built for performance and security.</p>
          </div>

          <div className="service-card">
            <div className="service-icon amber">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </div>
            <h3>UI/UX Design</h3>
            <p>User interfaces designed around clarity and usability — nothing unnecessary.</p>
          </div>

          <div className="service-card">
            <div className="service-icon red">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <h3>DevOps & Cloud</h3>
            <p>Deployment, hosting, and infrastructure on AWS, GCP, or Azure — handled end to end.</p>
          </div>

          <div className="service-card">
            <div className="service-icon purple">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3>Consulting</h3>
            <p>Architecture reviews, technical planning, and engineering support for your team.</p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="about-inner">
          <div className="about-text">
            <p className="section-label">About Us</p>
            <h2 className="section-title">Built by developers,<br />for real businesses.</h2>
            <p>
              Afroawi Technologies is a software development company focused on delivering
              clean, maintainable products. We work directly with founders,
              product teams, and businesses of all sizes — no bloated agencies,
              no unnecessary overhead.
            </p>
            <p>
              Every project gets a dedicated team, clear communication,
              and software that lasts.
            </p>
          </div>
          <div className="about-stats">
            <div className="about-stat">
              <strong>100+</strong>
              <span>Projects completed</span>
            </div>
            <div className="about-stat">
              <strong>4yrs</strong>
              <span>In business</span>
            </div>
            <div className="about-stat">
              <strong>98%</strong>
              <span>Client retention</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contact">
        <h2>Have a project in mind?</h2>
        <p>Tell us what you need and we'll follow up within 24 hours.</p>
        <p>
          <a
            className="email-link"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=afroawi.tech@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            Email us: afroawi.tech@gmail.com
          </a>
        </p>
        <button className="btn-primary" onClick={onStart}>Submit a Request</button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-brand">
          <div className="nav-logo small">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z" fill="white"/>
            </svg>
          </div>
          Afroawi Technologies
        </div>
        <p className="footer-copy">© 2026 Afroawi Technologies. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default LandingPage;
