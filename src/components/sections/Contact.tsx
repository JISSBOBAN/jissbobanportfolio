import React, { useState } from 'react';
import { profileData } from '../../data/profile';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="section" id="contact" style={{ borderBottom: 'none' }}>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">07 // DIRECT COMMUNICATION</span>
          <h2 className="section-title">Direct Contact &amp; Channels</h2>
          <p className="section-subtitle">
            Reach out for enterprise SIEM architecture, cloud security advisory, or speaking engagements.
          </p>
        </div>

        <div className="contact-panel">
          <div className="contact-layout">
            <div className="contact-bio-col">
              <div>
                <h3 className="contact-heading">{profileData.prefix} {profileData.name}</h3>
                <p className="contact-narrative">
                  Open to high-impact technical dialogues surrounding Microsoft Sentinel architecture, custom API connector engineering, SOAR playbooks, and security automation. Based in Coimbatore, TN &amp; Ernakulam, Kerala.
                </p>
              </div>
              <div className="contact-actions">
                <a href={`mailto:${profileData.email}`} className="btn-editorial btn-editorial-solid">
                  SEND DIRECT EMAIL ↗
                </a>
                <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="btn-editorial">
                  CONNECT ON LINKEDIN ↗
                </a>
                <button onClick={handleCopyEmail} className="btn-editorial">
                  {copied ? 'COPIED ✓' : 'COPY EMAIL'}
                </button>
              </div>
            </div>

            <div className="contact-data-col">
              <div className="contact-data-item">
                <span className="contact-data-label">Direct Email</span>
                <a href={`mailto:${profileData.email}`} className="contact-data-value contact-data-link">
                  {profileData.email}
                </a>
              </div>
              <div className="contact-data-item">
                <span className="contact-data-label">Telephone</span>
                <a href={`tel:${profileData.phone}`} className="contact-data-value contact-data-link">
                  {profileData.phone}
                </a>
              </div>
              <div className="contact-data-item">
                <span className="contact-data-label">LinkedIn Profile</span>
                <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="contact-data-value contact-data-link">
                  linkedin.com/in/jissboban07 ↗
                </a>
              </div>
              <div className="contact-data-item">
                <span className="contact-data-label">Operating Coordinates</span>
                <span className="contact-data-value">{profileData.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
