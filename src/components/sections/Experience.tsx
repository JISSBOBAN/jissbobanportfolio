import React from 'react';
import { workExperience, educationHistory } from '../../data/experience';
import { Badge } from '../ui/Badge';

export const Experience: React.FC = () => {
  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">02 // CHRONOLOGICAL DOSSIER</span>
          <h2 className="section-title">Work Experience &amp; Academic Background</h2>
          <p className="section-subtitle">
            A unified chronological record of enterprise security delivery and academic achievements.
          </p>
        </div>

        <div className="dossier-timeline">
          {workExperience.map((job) => (
            <article key={job.id} className={`timeline-entry ${job.current ? 'current' : ''}`}>
              <span className="timeline-dot"></span>
              <div className="timeline-header">
                <div className="timeline-role-row">
                  <h3 className="timeline-role">{job.role}</h3>
                  <Badge>{job.current ? 'CURRENT // FULL-TIME' : job.employmentType.toUpperCase()}</Badge>
                </div>
                <div className="timeline-org">{job.organization}</div>
              </div>
              <div className="timeline-meta">
                <span>{job.startDate} — {job.endDate}</span>
                {job.duration && (
                  <>
                    <span className="hero-sep">•</span>
                    <span>{job.duration}</span>
                  </>
                )}
                <span className="hero-sep">•</span>
                <span>{job.location} [{job.locationType}]</span>
              </div>
              <ul className="timeline-bullets">
                {job.bullets.map((bullet, idx) => (
                  <li key={idx} className="timeline-bullet-item">{bullet}</li>
                ))}
              </ul>
            </article>
          ))}

          {educationHistory.map((edu) => (
            <article key={edu.id} className="timeline-entry">
              <span className="timeline-dot"></span>
              <div className="timeline-header">
                <div className="timeline-role-row">
                  <h3 className="timeline-role">{edu.degree}</h3>
                  <Badge>{edu.specialization.toUpperCase()}</Badge>
                </div>
                <div className="timeline-org">{edu.institution}</div>
              </div>
              <div className="timeline-meta">
                <span>{edu.startDate} — {edu.endDate}</span>
                <span className="hero-sep">•</span>
                <span>Grade: {edu.grade}</span>
                <span className="hero-sep">•</span>
                <span>Principal’s Club Member</span>
              </div>
              <ul className="timeline-bullets">
                {edu.bullets.map((bullet, idx) => (
                  <li key={idx} className="timeline-bullet-item">{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
