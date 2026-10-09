import React from 'react';
import { awardsData } from '../../data/credentials';

export const Awards: React.FC = () => {
  return (
    <section className="section" id="awards">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">04 // HONORS &amp; RECOGNITION</span>
          <h2 className="section-title">Honors &amp; State Recognitions</h2>
          <p className="section-subtitle">
            Distinctions awarded for academic excellence, engineering innovations, and social impact.
          </p>
        </div>

        <div className="awards-grid">
          {awardsData.map((award) => (
            <article key={award.id} className="award-card">
              <div className="award-top">
                <div className="award-category">{award.category}</div>
                <h3 className="award-title">{award.title}</h3>
                <p className="award-desc">{award.description}</p>
              </div>
              <div className="award-presenter">{award.presentedBy}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
