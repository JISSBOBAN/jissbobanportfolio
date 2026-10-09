import React from 'react';
import { credentialsData } from '../../data/credentials';

export const Credentials: React.FC = () => {
  return (
    <section className="section" id="credentials">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">05 // VERIFIED CREDENTIALS</span>
          <h2 className="section-title">Verified Certifications Index</h2>
          <p className="section-subtitle">
            Official credential records across Microsoft, Anthropic, IISc Bangalore, and NPTEL.
          </p>
        </div>

        <div className="credentials-table-wrap">
          <table className="credentials-table" aria-label="Verified Credentials Table">
            <thead>
              <tr>
                <th scope="col">Credential Title</th>
                <th scope="col">Issuing Body</th>
                <th scope="col">Issue Date</th>
                <th scope="col">Credential ID / Reference</th>
                <th scope="col">Verification</th>
              </tr>
            </thead>
            <tbody>
              {credentialsData.map((cert) => (
                <tr key={cert.id}>
                  <td className="cert-title-cell">{cert.title}</td>
                  <td className="cert-issuer-cell">{cert.issuer}</td>
                  <td className="cert-id-cell">{cert.issueDate}</td>
                  <td className="cert-id-cell">{cert.credentialId || 'Verified Record'}</td>
                  <td>
                    {cert.verificationUrl ? (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-verify-link"
                      >
                        Verify ↗
                      </a>
                    ) : (
                      <span className="cert-verified-badge">✓ Verified</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
