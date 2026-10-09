import React, { useEffect, useState } from 'react';

export const Footer: React.FC = () => {
  const [timeStr, setTimeStr] = useState('22:00:00 IST');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${h}:${m}:${s} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-left">
          <div className="footer-copy">© 2026 Er. Jiss Boban. All rights reserved.</div>
          <div>Associate Security Engineer · Microsoft Transformation Engineer</div>
        </div>

        <div className="footer-status-pill">
          <span className="footer-status-dot"></span>
          <span>ALL SYSTEMS OPERATIONAL // MONOCHROME DOSSIER v2.0</span>
        </div>

        <div className="footer-telemetry">
          <span>{timeStr}</span>
          <span>TLS 1.3</span>
          <span>LATENCY: 0ms</span>
        </div>
      </div>
    </footer>
  );
};
