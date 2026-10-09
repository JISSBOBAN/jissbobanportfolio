import { ExperienceItem, EducationItem } from '../types/experience';

export const workExperience: ExperienceItem[] = [
  {
    id: 'exp-paramount-associate',
    role: 'Associate Security Engineer',
    organization: 'Paramount Computer Systems',
    employmentType: 'Full-time',
    startDate: 'Nov 2025',
    endDate: 'Present',
    duration: '11 mos',
    location: 'Coimbatore, Tamil Nadu, India',
    locationType: 'On-site',
    current: true,
    bullets: [
      'Leading enterprise Microsoft Sentinel SIEM workspace architecture and monitoring deployment for Dubai & Kuwait government entities, commercial airlines, telecommunications, and healthcare providers.',
      'Engineering custom REST API connectors using Microsoft Sentinel Codeless Connector Framework (CCF / CCP) and high-throughput Data Collection Endpoints (DCE) for seamless third-party log integration.',
      'Authoring precision custom Analytic Rules in KQL (Scheduled & Near-Real-Time [NRT] rules) mapped directly to MITRE ATT&CK tactics, with automated entity mapping, alert aggregation, and threshold alerting.',
      'Building automated incident response playbooks in Azure Logic Apps (SOAR) for automated firewall IP blocking, Entra ID session revocation, threat intel enrichment, and adaptive cards dispatch.',
      'Authoring custom interactive Microsoft Sentinel Workbooks for multi-cloud threat visibility, executive KPI reporting, and incident triage velocity.',
      'Configuring Azure Monitor Agent (AMA) and precision Data Collection Rules (DCRs) with XPath filtering to suppress high-volume noise and optimize billable ingestion costs by over 60%.'
    ]
  },
  {
    id: 'exp-paramount-intern',
    role: 'Cloud Security Intern',
    organization: 'Paramount Computer Systems',
    employmentType: 'Internship',
    startDate: 'Jul 2025',
    endDate: 'Oct 2025',
    duration: '4 mos',
    location: 'Coimbatore, Tamil Nadu, India',
    locationType: 'Hybrid',
    current: false,
    bullets: [
      'Monitored multi-tenant security telemetry and analyzed security incidents across Microsoft 365, Entra ID, and Azure resources.',
      'Assisted in onboarding data connectors, auditing telemetry ingestion integrity, and investigating alert anomalies.',
      'Gained hands-on experience in cloud compliance, Defender XDR incident management, and KQL querying.'
    ]
  }
];

export const educationHistory: EducationItem[] = [
  {
    id: 'edu-aisat-btech',
    degree: 'Bachelor of Technology - B.Tech, Computer Science and Engineering',
    institution: 'Albertian Institute of Science & Technology (AISAT)',
    startDate: 'Jun 2021',
    endDate: 'Jun 2025',
    grade: '8.65 CGPA',
    specialization: 'Minor in Electronics',
    bullets: [
      "Principal's Club Member: Honored member of the prestigious Principal's Club at AISAT for maintaining a continuous CGPA of 8.0 and above throughout the degree program.",
      'Specialized coursework in Computer Networks, Operating Systems, Linux Internals, Database Management Systems, and Python Programming.',
      'Completed a Minor in Electronics, bridging low-level hardware communication, embedded microcontrollers, and cyber defense.'
    ]
  }
];
