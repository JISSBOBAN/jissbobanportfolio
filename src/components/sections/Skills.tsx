import React from 'react';
import { skillsMatrix } from '../../data/skills';

export const Skills: React.FC = () => {
  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">06 // CAPABILITIES MATRIX</span>
          <h2 className="section-title">Engineering &amp; Technical Capabilities</h2>
          <p className="section-subtitle">
            Structured matrix of security engineering, automation, agentic AI, and systems programming.
          </p>
        </div>

        <div className="capabilities-grid">
          {skillsMatrix.map((cat, idx) => (
            <div key={idx} className="capability-card">
              <div className="capability-header">
                <span className="capability-code">{cat.code}</span>
                <h3 className="capability-title">{cat.title}</h3>
              </div>
              <ul className="capability-list">
                {cat.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="capability-item">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
