import React from 'react';
import { projectsData } from '../../data/projects';
import { Badge } from '../ui/Badge';

export const Projects: React.FC = () => {
  return (
    <section className="section" id="systems">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">03 // ENGINEERING SYSTEMS</span>
          <h2 className="section-title">Selected Technical Case Studies</h2>
          <p className="section-subtitle">
            Architectural breakdowns of enterprise SIEM pipelines, SOAR automation, and autonomous robotics.
          </p>
        </div>

        <div className="systems-grid">
          {projectsData.map((project, index) => (
            <article key={project.id} className="system-card">
              <div className="system-media-col">
                <img
                  src={project.imageSrc}
                  alt={project.title}
                  className="system-img"
                  loading="lazy"
                />
              </div>
              <div className="system-content-col">
                <div className="system-header-area">
                  <div className="system-index">
                    SYSTEM // {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="system-title">{project.title}</h3>
                  <div className="system-subtitle">{project.subtitle}</div>
                  <p className="system-summary">{project.summary}</p>
                  <div className="system-arch-list">
                    {project.architectureDetails.map((detail, idx) => {
                      const colonIdx = detail.indexOf(':');
                      if (colonIdx !== -1) {
                        const heading = detail.substring(0, colonIdx + 1);
                        const body = detail.substring(colonIdx + 1);
                        return (
                          <div key={idx} className="system-arch-item">
                            <strong>{heading}</strong>
                            {body}
                          </div>
                        );
                      }
                      return (
                        <div key={idx} className="system-arch-item">
                          {detail}
                        </div>
                      );
                    })}
                  </div>
                  {project.metrics && (
                    <div className="system-metric-callout">
                      <span className="system-metric-icon">✓</span>
                      <span>{project.metrics}</span>
                    </div>
                  )}
                </div>
                <div className="system-footer-area">
                  {project.technologies.map((tech, idx) => (
                    <Badge key={idx}>{tech}</Badge>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
