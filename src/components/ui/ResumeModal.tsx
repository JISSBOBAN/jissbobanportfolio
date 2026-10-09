import React from 'react';
import { profileData } from '../../data/profile';
import { workExperience, educationHistory } from '../../data/experience';
import { credentialsData, awardsData } from '../../data/credentials';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop open"
      role="dialog"
      aria-modal="true"
      aria-label="Curriculum Vitae Viewer"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="resume-modal-window">
        <div className="resume-modal-toolbar">
          <div className="resume-modal-title">CURRICULUM VITAE // ER. JISS BOBAN</div>
          <div className="resume-modal-actions">
            <button
              className="btn-editorial btn-editorial-sm btn-editorial-solid"
              onClick={() => window.print()}
            >
              PRINT / SAVE PDF
            </button>
            <button className="btn-editorial btn-editorial-sm" onClick={onClose} aria-label="Close modal">
              CLOSE ✕
            </button>
          </div>
        </div>

        <div className="resume-doc-body">
          <header className="resume-header-block">
            <h1 className="resume-doc-name">{profileData.prefix} {profileData.name}</h1>
            <div className="resume-doc-role">{profileData.headline}</div>
            <div className="resume-doc-contacts">
              Email: {profileData.email} • Phone: {profileData.phone} • LinkedIn: {profileData.linkedin}<br />
              Location: {profileData.location}
            </div>
          </header>

          <section className="resume-section">
            <h2 className="resume-section-title">Professional Summary</h2>
            <p className="resume-text">{profileData.summary}</p>
          </section>

          <section className="resume-section">
            <h2 className="resume-section-title">Work Experience</h2>
            {workExperience.map((job) => (
              <div key={job.id} className="resume-job">
                <div className="resume-job-header">
                  <span>{job.role} — {job.organization}</span>
                  <span>{job.startDate} — {job.endDate}</span>
                </div>
                <div className="resume-job-meta">
                  {job.location} · {job.employmentType}
                </div>
                <ul className="resume-bullets">
                  {job.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="resume-section">
            <h2 className="resume-section-title">Education</h2>
            {educationHistory.map((edu) => (
              <div key={edu.id} className="resume-job">
                <div className="resume-job-header">
                  <span>{edu.degree}</span>
                  <span>{edu.startDate} — {edu.endDate}</span>
                </div>
                <div className="resume-job-meta">
                  {edu.institution} · Grade: {edu.grade}
                </div>
                <ul className="resume-bullets">
                  {edu.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="resume-section">
            <h2 className="resume-section-title">Honors &amp; Awards</h2>
            <ul className="resume-bullets">
              {awardsData.map((award) => (
                <li key={award.id}>
                  <strong>{award.title}:</strong> {award.description} ({award.presentedBy})
                </li>
              ))}
            </ul>
          </section>

          <section className="resume-section">
            <h2 className="resume-section-title">Verified Certifications</h2>
            <ul className="resume-bullets">
              {credentialsData.map((cert) => (
                <li key={cert.id}>
                  {cert.title} — {cert.issuer} {cert.credentialId ? `(ID: ${cert.credentialId})` : ''}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
