import React from 'react';
import { profileData } from '../../data/profile';

export const ImpactStrip: React.FC = () => {
  return (
    <section className="impact-strip" aria-label="Executive Impact and Verified Sectors">
      <div className="container">
        <div className="impact-grid">
          <div className="impact-label-wrap">
            <span className="impact-label">Enterprise Deployment</span>
            <div className="impact-headline">Verified SIEM &amp; Cloud Defense Coverage</div>
          </div>
          <div className="sectors-list">
            {profileData.sectors.map((sector, idx) => (
              <div key={idx} className="sector-item">
                <span className="sector-bullet"></span>
                <span>{sector}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
