import { Project } from '../types/project';

export const projectsData: Project[] = [
  {
    id: 'golden-eye-drone',
    title: 'Golden Eye – The Rescue Drone',
    subtitle: 'State Government Selected · Autonomous Disaster Reconnaissance',
    summary:
      'Autonomous emergency response and survivor reconnaissance drone selected by APJ Abdul Kalam Technological University (KTU) for exhibition at Kerala’s 4th Anniversary ENTE KERALAM state expo. Engineered with edge computer vision and high-efficiency payload transport for disaster triage.',
    architectureDetails: [
      'Edge Detection: Real-time human target acquisition using YOLOv8 optimized neural models running at low inference latency.',
      'Telemetry & Vision: Low-power ESP32-CAM wireless video streaming module feeding video telemetry to ground control station.',
      'Aero-Mechanical Payload: Servo-actuated mechanical release mechanism designed to deliver emergency medical payloads to remote flood/landslide victims.'
    ],
    technologies: ['YOLOv8 AI', 'ESP32-CAM', 'IoT Robotics', 'Computer Vision', 'Microcontrollers'],
    metrics: 'Officially selected by KTU for the State Government Ente Keralam Expo',
    imageSrc: 'assets/images/drone.jpg'
  },
  {
    id: 'sentinel-workbooks',
    title: 'Sentinel Interactive Workbooks & Executive Dashboards',
    subtitle: 'Multi-Cloud Threat Intelligence & SOC Operational Visibility',
    summary:
      'Enterprise visual SOC telemetry dashboards mapping multi-cloud attack surfaces, authentication anomalies, and MITRE ATT&CK detection coverage in real time. Deployed across government and commercial flight operations.',
    architectureDetails: [
      'Visual SOC Canvas: Parameterized KQL telemetry metrics cross-referencing Defender XDR and Sentinel incident tables.',
      'Attack Matrix Overlay: Dynamic MITRE ATT&CK matrix heatmap highlighting high-risk tactics (Initial Access, Persistence, Exfiltration).',
      'Executive KPI Views: Granular dwell-time analytics, Mean Time To Acknowledge (MTTA), and Mean Time To Remediate (MTTR) calculation.'
    ],
    technologies: ['Microsoft Sentinel', 'KQL', 'Workbook Architecture', 'SOC KPIs', 'Threat Intelligence'],
    metrics: 'Active operational visibility for Dubai/Kuwait govt & airline SOC teams',
    imageSrc: 'assets/images/project-workbook.jpg'
  },
  {
    id: 'api-logstash-pipelines',
    title: 'High-Throughput API Ingestion & Logstash Pipelines',
    subtitle: 'Azure Monitor Logs Ingestion API (DCE) & Linux Forwarders',
    summary:
      'Enterprise ingestion pipelines routing multi-terabyte unformatted log streams into Azure Log Analytics. Engineered utilizing Azure Data Collection Endpoints (DCE) and clustered Linux Logstash forwarders with custom grok filtering.',
    architectureDetails: [
      'API Ingestion Engine: RESTful batch ingestion using Azure Monitor Logs Ingestion API with custom JSON stream definitions.',
      'Linux Forwarders: Clustered Logstash instances with multi-threaded grok parsing, PII sanitization, and timestamp normalization.',
      'Schema Mapping: ASIM (Advanced Security Information Model) compliance ensuring native Sentinel detection rule compatibility.'
    ],
    technologies: ['Azure DCE', 'Logs Ingestion API', 'Linux Logstash', 'Grok Filtering', 'ASIM Normalization'],
    metrics: 'Processes high-throughput multi-source feeds with <3s ingestion lag',
    imageSrc: 'assets/images/project-logstash.jpg'
  },
  {
    id: 'security-copilot-agentic',
    title: 'Microsoft Security Copilot & Agentic AI Triage',
    subtitle: 'Copilot Studio, Anthropic MCP & Forensic Investigation Promptbooks',
    summary:
      'Autonomous forensic investigation framework integrating Microsoft Security Copilot, Copilot Studio, and Anthropic Model Context Protocol (MCP). Accelerates incident triage by synthesising multi-vector alerts into prioritized investigation briefs.',
    architectureDetails: [
      'Agentic Architecture: Custom Copilot Studio skills executing dynamic KQL lookups and Defender XDR evidence gathering.',
      'MCP Integration: Model Context Protocol endpoints allowing LLM agents to safely query enterprise SIEM telemetry.',
      'Promptbook Engineering: Forensic prompt playbooks synthesizing complex attack chains into actionable incident timelines.'
    ],
    technologies: ['Security Copilot', 'Copilot Studio', 'Model Context Protocol (MCP)', 'Claude API', 'Azure AI Foundry'],
    metrics: 'Dramatic reduction in Level 1 analyst triage fatigue',
    imageSrc: 'assets/images/project-copilot.jpg'
  },
  {
    id: 'soar-logic-apps',
    title: 'Azure Logic Apps (SOAR) Automated Playbooks',
    subtitle: 'Zero-Touch Containment & Incident Auto-Remediation',
    summary:
      'Automated incident remediation playbooks triggered on high-severity Microsoft Sentinel alerts. Performs zero-touch perimeter containment, user credential quarantine, threat intelligence enrichment, and real-time SOC escalation.',
    architectureDetails: [
      'Automated Containment: Dynamic REST API webhooks pushing malicious IP indicators to enterprise boundary firewalls.',
      'Identity Quarantine: Immediate Microsoft Entra ID user session revocation and conditional access step-up authentication enforcement.',
      'SOC Collaboration: Automated interactive Adaptive Cards sent to SOC Microsoft Teams channels with single-click analyst overrides.'
    ],
    technologies: ['Azure Logic Apps', 'SOAR Automation', 'Entra ID Session Revocation', 'Firewall APIs', 'Adaptive Cards'],
    metrics: 'Sub-minute autonomous threat containment response time',
    imageSrc: 'assets/images/project-soar.jpg'
  },
  {
    id: 'sentinel-ccf-rules',
    title: 'Sentinel Codeless Connector Framework (CCF) & Custom Analytic Rules',
    subtitle: 'REST API Ingestion & MITRE ATT&CK KQL Detection Engineering',
    summary:
      'Turnkey data connector integration leveraging Microsoft Sentinel Codeless Connector Framework (CCF / CCP) combined with bespoke high-fidelity Scheduled and Near-Real-Time (NRT) Analytic Rules.',
    architectureDetails: [
      'Codeless Connectors: Declarative JSON-based CCP connector definitions polling SaaS security APIs with OAuth 2.0 token cycling.',
      'Precision Detections: Advanced KQL analytic rules mapped to MITRE ATT&CK with threshold tuning to eliminate alert fatigue.',
      'Noise Suppression: XPath and DCR transformation filters achieving over 60% billable ingestion reduction.'
    ],
    technologies: ['Sentinel CCF / CCP', 'KQL Analytic Rules', 'Data Collection Rules (DCR)', 'MITRE ATT&CK', 'OAuth 2.0'],
    metrics: '>60% cost reduction through DCR ingestion optimization',
    imageSrc: 'assets/images/project-ccf-rules.jpg'
  }
];
