import React, { useState } from 'react';
import { ThemeToggle } from '../ui/ThemeToggle';

interface HeaderProps {
  onOpenResume: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenResume }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="site-header" id="site-header">
        <div className="container header-container">
          <div className="header-brand">
            <a href="#hero" className="brand-title">Jiss Boban</a>
            <span className="brand-dot"></span>
            <span className="brand-role-tag">[SEC.ENG]</span>
          </div>

          <nav className="header-nav" aria-label="Main Navigation">
            <ul className="nav-list">
              <li><a href="#about" className="nav-link">About</a></li>
              <li><a href="#experience" className="nav-link">Dossier</a></li>
              <li><a href="#systems" className="nav-link">Systems</a></li>
              <li><a href="#awards" className="nav-link">Honors</a></li>
              <li><a href="#credentials" className="nav-link">Credentials</a></li>
              <li><a href="#skills" className="nav-link">Capabilities</a></li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>
          </nav>

          <div className="header-actions">
            <button
              className="btn-editorial btn-editorial-sm"
              onClick={onOpenResume}
              aria-label="Open printable curriculum vitae modal"
            >
              CV / RESUME
            </button>

            <ThemeToggle />

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation drawer"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobile-nav-drawer open" aria-label="Mobile Navigation Menu">
          <ul className="mobile-nav-list">
            <li><a href="#about" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>01 // About &amp; Principles</a></li>
            <li><a href="#experience" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>02 // Experience &amp; Education</a></li>
            <li><a href="#systems" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>03 // Selected Systems</a></li>
            <li><a href="#awards" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>04 // Honors &amp; Recognitions</a></li>
            <li><a href="#credentials" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>05 // Verified Credentials</a></li>
            <li><a href="#skills" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>06 // Technical Capabilities</a></li>
            <li><a href="#contact" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>07 // Direct Communication</a></li>
          </ul>
          <div style={{ marginTop: '16px' }}>
            <button
              className="btn-editorial"
              style={{ width: '100%' }}
              onClick={() => {
                setMobileOpen(false);
                onOpenResume();
              }}
            >
              VIEW FULL PRINTABLE CV (PDF)
            </button>
          </div>
        </div>
      )}
    </>
  );
};
