import React from 'react';

export const About: React.FC = () => {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">01 // ABOUT &amp; PRINCIPLES</span>
          <h2 className="section-title">About &amp; Engineering Foundation</h2>
          <p className="section-subtitle">
            Bridging low-level hardware fundamentals with enterprise cloud defense and agentic AI systems.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-portrait-wrapper">
            <img
              src="assets/images/ai-portrait-primary.png"
              alt="Er. Jiss Boban — Associate Security Engineer"
              className="about-portrait"
              loading="lazy"
            />
            <div className="about-portrait-caption">
              <span>ER. JISS BOBAN</span>
              <span>EST. 2021</span>
            </div>
          </div>

          <div className="about-content">
            <p className="about-paragraph">
              Currently serving as <strong>Associate Security Engineer</strong> at{' '}
              <strong>Paramount Computer Systems</strong> (Coimbatore, Tamil Nadu), I lead enterprise SIEM design, large-scale telemetry ingestion, and threat triage automation across critical infrastructure in India and the GCC.
            </p>
            <p className="about-paragraph">
              I hold a <strong>B.Tech in Computer Science and Engineering with a Minor in Electronics</strong> from{' '}
              <strong>AISAT</strong> with an <strong>8.65 CGPA</strong>, having earned continuous membership in the prestigious{' '}
              <strong>Principal’s Club</strong> and winning the <strong>PT Thomas MLA Excellence Award</strong>. This dual foundation enables me to trace security boundaries from low-level silicon sensors up to cloud-native SIEM architectures.
            </p>
            <p className="about-paragraph">
              As a certified <strong>Microsoft Frontier Transformation Engineer</strong>, certified{' '}
              <strong>SC-200 Security Operations Analyst</strong>, and Anthropic MCP developer, I specialize in combining KQL detection engineering with autonomous Agentic AI workflows to collapse incident dwell times.
            </p>

            <div className="principles-grid">
              <div className="principle-card">
                <span className="principle-code">PRINCIPLE // 01</span>
                <div className="principle-title">Signal Over Noise</div>
                <div className="principle-desc">
                  Aggressive DCR filtering and XPath tuning to suppress &gt;60% billable noise and surface only high-fidelity indicators.
                </div>
              </div>

              <div className="principle-card">
                <span className="principle-code">PRINCIPLE // 02</span>
                <div className="principle-title">Zero-Trust Boundaries</div>
                <div className="principle-desc">
                  Continuous verification across Entra ID identities, endpoint telemetry, and multi-tenant cloud resources.
                </div>
              </div>

              <div className="principle-card">
                <span className="principle-code">PRINCIPLE // 03</span>
                <div className="principle-title">Zero-Touch Containment</div>
                <div className="principle-desc">
                  Automated Azure Logic Apps playbooks executing boundary IP blocking and credential resets in under 60 seconds.
                </div>
              </div>

              <div className="principle-card">
                <span className="principle-code">PRINCIPLE // 04</span>
                <div className="principle-title">Agentic Forensics</div>
                <div className="principle-desc">
                  Copilot Studio skills and Anthropic MCP tools enabling autonomous synthesis of multi-stage attack chains.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
