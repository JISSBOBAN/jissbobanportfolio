import React from 'react';
import { profileData } from '../../data/profile';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  return (
    <section className="hero-section" id="hero">
      <div className="container">
        <div className="hero-meta">
          <span className="hero-status-indicator">
            <span className="status-dot-pulse"></span>
            DEFENSE SYSTEMS OPERATIONAL
          </span>
          <span className="hero-sep">•</span>
          <span className="mono" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            PARAMOUNT COMPUTER SYSTEMS // COIMBATORE, TN
          </span>
        </div>

        <h1 className="hero-name">{profileData.name}</h1>

        <div className="hero-title">
          <span>{profileData.headline}</span>
          <span className="hero-sep">•</span>
          <span className="hero-affiliation">{profileData.company}</span>
        </div>

        <p className="hero-summary">{profileData.summary}</p>

        <div className="hero-action-row">
          <a href={`mailto:${profileData.email}`} className="hero-link">
            <span>Email</span>
            <span className="mono">↗</span>
          </a>
          <span className="hero-sep">•</span>
          <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="hero-link">
            <span>LinkedIn</span>
            <span className="mono">↗</span>
          </a>
          <span className="hero-sep">•</span>
          <a href={`tel:${profileData.phone}`} className="hero-link">
            <span>{profileData.phone}</span>
          </a>
          <span className="hero-sep">•</span>
          <button
            onClick={onOpenResume}
            className="hero-link"
            style={{ cursor: 'pointer', background: 'none', border: 'none', fontSize: '13px', fontFamily: 'var(--font-mono)' }}
          >
            <span>Download CV / Resume [PDF]</span>
            <span className="mono">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
};
