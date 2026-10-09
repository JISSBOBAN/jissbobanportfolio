export interface SkillCategory {
  title: string;
  code: string;
  skills: string[];
}

export const skillsMatrix: SkillCategory[] = [
  {
    title: 'SIEM & Threat Detection',
    code: 'SEC.SIEM',
    skills: [
      'Microsoft Sentinel',
      'Kusto Query Language (KQL)',
      'Codeless Connector Framework (CCF/CCP)',
      'Data Collection Rules (DCR)',
      'Azure Monitor Agent (AMA)',
      'ASIM Schema Normalization',
      'Microsoft Defender XDR',
      'MITRE ATT&CK Framework',
      'Near-Real-Time (NRT) Analytic Rules',
      'Custom Interactive Workbooks'
    ]
  },
  {
    title: 'SOAR & Incident Response',
    code: 'SEC.SOAR',
    skills: [
      'Azure Logic Apps',
      'Automated Containment Playbooks',
      'Entra ID Session Revocation',
      'Firewall Boundary IP Isolation',
      'Threat Intelligence Enrichment',
      'REST APIs & Webhooks',
      'Teams Adaptive Cards',
      'PowerShell Automation'
    ]
  },
  {
    title: 'AI & Agentic Systems',
    code: 'ENG.AI',
    skills: [
      'Microsoft Security Copilot',
      'Copilot Studio',
      'Model Context Protocol (MCP)',
      'Claude API Orchestration',
      'Azure AI Foundry',
      'GitHub Copilot Enterprise',
      'Promptbook Engineering',
      'YOLOv8 Edge Computer Vision'
    ]
  },
  {
    title: 'Core Engineering & Hardware',
    code: 'ENG.CORE',
    skills: [
      'Python',
      'C Language',
      'SQL',
      'Linux (Ubuntu / RHEL)',
      'Git & CI/CD Pipelines',
      'Logstash & Grok Filters',
      'ESP32-CAM Microcontrollers',
      'MEMS Sensors Microelectronics'
    ]
  }
];
