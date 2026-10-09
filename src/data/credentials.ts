import { Credential, Award } from '../types/credential';

export const credentialsData: Credential[] = [
  {
    id: 'cert-frontier-transformation',
    title: 'Frontier Transformation Engineer',
    issuer: 'Microsoft',
    issueDate: 'Aug 2026',
    expiryDate: 'Aug 2027',
    credentialId: '248072e9-1319-42df-add0-3684a6ba1c24',
    verificationUrl: 'https://www.credly.com/badges/248072e9-1319-42df-add0-3684a6ba1c24/linked_in_profile',
    badgeTag: 'Microsoft AI Frontiers Research Lab',
    skills: 'Agentic AI Systems, LLM Orchestration, Frontier Architecture'
  },
  {
    id: 'cert-cancer-diagnosis',
    title: 'Electronic Systems for Cancer Diagnosis (ELITE Tag)',
    issuer: 'IISc Bangalore / NPTEL',
    issueDate: '2024',
    credentialId: 'Elite Tag (Score: 69%)',
    badgeTag: 'Elite Tag Verified · Ministry of Education, Govt of India',
    skills: 'Biomedical Electronic Systems, Healthcare Detection, Clinical Diagnostics'
  },
  {
    id: 'cert-mems-sensors',
    title: 'Fabrication Techniques for MEMs-Based Sensors: Clinical Perspective',
    issuer: 'IISc Bangalore / NPTEL',
    issueDate: 'Oct 2024',
    credentialId: 'Course Completed',
    badgeTag: 'NPTEL SWAYAM · Govt of India',
    skills: 'MEMS Microfabrication, Clinical Healthcare Sensors, Microelectronics'
  },
  {
    id: 'cert-agentic-ai-architect',
    title: 'Agentic AI Business Solutions Architect',
    issuer: 'Microsoft',
    issueDate: 'Jul 2026',
    expiryDate: 'Jul 2027',
    credentialId: '3B82C5E9CBAA80CC',
    verificationUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/JissBoban-9373/3B82C5E9CBAA80CC',
    badgeTag: 'Microsoft Certified',
    skills: 'Microsoft Copilot Studio, Autonomous Workflows'
  },
  {
    id: 'cert-azure-ai-apps',
    title: 'Azure AI Apps and Agents Developer Associate',
    issuer: 'Microsoft',
    issueDate: 'Jul 2026',
    expiryDate: 'Jul 2027',
    credentialId: 'C0331647B47FB79F',
    verificationUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/JissBoban-9373/C0331647B47FB79F',
    badgeTag: 'Microsoft Certified',
    skills: 'Azure AI Foundry, Agent Tooling'
  },
  {
    id: 'cert-github-copilot',
    title: 'GitHub Copilot (GH 300)',
    issuer: 'Microsoft',
    issueDate: 'Jul 2026',
    expiryDate: 'Jul 2028',
    credentialId: 'E8B9A47EF5D908E',
    verificationUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/JissBoban-9373/E8B9A47EF5D908E',
    badgeTag: 'Microsoft Certified',
    skills: 'AI-Assisted Engineering, Copilot Enterprise'
  },
  {
    id: 'cert-sc-200',
    title: 'Security Operations Analyst Associate (SC-200)',
    issuer: 'Microsoft',
    issueDate: 'May 2026',
    expiryDate: 'May 2027',
    credentialId: 'CD094410B84FFB5D',
    verificationUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/JissBoban-9373/CD094410B84FFB5D',
    badgeTag: 'Microsoft Certified Associate',
    skills: 'Microsoft Sentinel, Defender XDR, KQL Incident Triage'
  },
  {
    id: 'cert-mcp-anthropic',
    title: 'Introduction to Model Context Protocol (MCP)',
    issuer: 'Anthropic',
    issueDate: 'May 2026',
    credentialId: 'sk976swhpc2z',
    verificationUrl: 'https://verify.skilljar.com/c/sk976swhpc2z',
    badgeTag: 'Anthropic Certified',
    skills: 'Model Context Protocol, Tool Call Architecture'
  },
  {
    id: 'cert-claude-api',
    title: 'Building with the Claude API',
    issuer: 'Anthropic',
    issueDate: 'May 2026',
    credentialId: 's8mz9m5ds74h',
    verificationUrl: 'https://verify.skilljar.com/c/s8mz9m5ds74h',
    badgeTag: 'Anthropic Certified',
    skills: 'Claude API, Function Calling, System Prompts'
  },
  {
    id: 'cert-az-900',
    title: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft',
    issueDate: 'Oct 2025',
    credentialId: '5DA501A873AF0C1',
    verificationUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/JissBoban-9373/5DA501A873AF0C1',
    badgeTag: 'Microsoft Certified',
    skills: 'Cloud Architecture, Azure Core Services'
  },
  {
    id: 'cert-sc-900',
    title: 'Security, Compliance, and Identity Fundamentals (SC-900)',
    issuer: 'Microsoft',
    issueDate: 'Aug 2025',
    credentialId: '595208280845D4D1',
    verificationUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/JissBoban-9373/595208280845D4D1',
    badgeTag: 'Microsoft Certified',
    skills: 'Zero Trust, Entra ID, Cloud Security Governance'
  }
];

export const awardsData: Award[] = [
  {
    id: 'award-pt-thomas',
    title: 'PT Thomas MLA Excellence Award',
    category: 'State Legislative Honor',
    description:
      'Honored for academic excellence in Computer Science & Engineering and Electronics & Communication Engineering. Presented by MLA Uma Thomas.',
    presentedBy: 'MLA Uma Thomas · Kerala'
  },
  {
    id: 'award-ente-keralam',
    title: 'KTU State Project Selection — ENTE KERALAM',
    category: 'Government Exhibition Selection',
    description:
      'Golden Eye – The Rescue Drone was officially selected by APJ Abdul Kalam Technological University (KTU) to be showcased at the prestigious ENTE KERALAM state government expo celebrating Kerala’s 4th Anniversary.',
    presentedBy: 'KTU & Kerala State Government'
  },
  {
    id: 'award-principals-club',
    title: 'AISAT Principal’s Club Induction',
    category: 'Academic Distinction',
    description:
      'Inducted into the elite Principal’s Club at Albertian Institute of Science and Technology for continuous academic excellence, maintaining a consistent CGPA above 8.0 (8.65) throughout four years of engineering study.',
    presentedBy: 'Albertian Institute of Science & Technology'
  }
];
