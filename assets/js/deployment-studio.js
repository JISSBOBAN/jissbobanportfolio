/**
 * Interactive Microsoft Sentinel Deployment & Ingestion Studio Engine
 * Created for Jiss Boban - SIEM Deployment Engineer Portfolio
 */

(function () {
  // Enterprise Deployment Blueprints Data
  const blueprints = {
    paloalto: {
      id: 'paloalto',
      title: 'Palo Alto NGFW via Linux Syslog Forwarder (AMA + DCR)',
      category: 'Network & Perimeter Security',
      badges: ['Azure Monitor Agent (AMA)', 'Syslog/CEF Forwarder', 'DCR Stream', 'ASIM Compliant'],
      description: 'Architected high-throughput perimeter telemetry onboarding for enterprise Palo Alto Networks Next-Gen Firewalls. Deployed dedicated hardened Linux syslog forwarders with AMA and precision Data Collection Rules (DCR) ingesting directly into CommonSecurityLog with sub-second ASIM normalization.',
      nodes: [
        { step: 'Phase 01: Source', title: 'Palo Alto NGFW', sub: 'Syslog CEF (Port 514)', icon: '🛡️' },
        { step: 'Phase 02: Forwarder', title: 'Linux Rsyslog VM', sub: 'Dedicated AMA Proxy', icon: '🐧' },
        { step: 'Phase 03: Ingestion DCR', title: 'Data Collection Rule', sub: 'Stream: CommonSecurityLog', icon: '⚙️' },
        { step: 'Phase 04: Repository', title: 'Log Analytics / Sentinel', sub: 'Analytics Tier Ingestion', icon: '☁️' },
        { step: 'Phase 05: Schema', title: 'ASIM Normalization', sub: 'vimNetworkSessionPaloAlto', icon: '⚡' }
      ],
      configs: {
        dcr: `// Microsoft Sentinel Data Collection Rule (DCR) for Syslog/CEF
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "resources": [
    {
      "type": "Microsoft.Insights/dataCollectionRules",
      "name": "dcr-paloalto-perimeter-prod",
      "location": "eastus",
      "properties": {
        "dataSources": {
          "syslog": [
            {
              "name": "paloalto-cef-syslog",
              "streams": [ "Microsoft-CommonSecurityLog" ],
              "facilityNames": [ "local4", "local5" ],
              "logLevels": [ "Info", "Notice", "Warning", "Error", "Critical" ]
            }
          ]
        },
        "destinations": {
          "logAnalytics": [
            {
              "workspaceResourceId": "/subscriptions/{sub-id}/resourceGroups/rg-soc/providers/Microsoft.OperationalInsights/workspaces/law-sentinel-prod",
              "name": "SentinelWorkspace"
            }
          ]
        },
        "dataFlows": [
          {
            "streams": [ "Microsoft-CommonSecurityLog" ],
            "destinations": [ "SentinelWorkspace" ],
            "transformKql": "source | where DeviceVendor =~ 'Palo Alto Networks' | extend IngestionTime = now()"
          }
        ]
      }
    }
  ]
}`,
        kql: `// ASIM Network Session Parser & Ingestion Verification
CommonSecurityLog
| where DeviceVendor =~ "Palo Alto Networks"
| where Activity =~ "TRAFFIC"
| extend 
    SrcIp = SourceIP,
    DstIp = DestinationIP,
    SrcPort = SourcePort,
    DstPort = DestinationPort,
    Action = DeviceAction,
    BytesSent = SentBytes,
    BytesReceived = ReceivedBytes
| summarize 
    TotalSessions = count(),
    BlockedSessions = countif(Action =~ "deny" or Action =~ "drop"),
    TotalThroughputMB = round((sum(BytesSent) + sum(BytesReceived)) / (1024 * 1024), 2)
    by DeviceName, bin(TimeGenerated, 5m)
| order by TimeGenerated desc`,
        agent: `# /etc/rsyslog.d/99-paloalto-cef.conf
# Deployed and tuned on Linux Forwarder VM by Jiss Boban
$ModLoad imudp
$UDPServerRun 514
$ModLoad imtcp
$InputTCPServerRun 514

# Route Palo Alto Facilities (local4, local5) directly to AMA forwarder socket
local4.*    @@127.0.0.1:25226
local5.*    @@127.0.0.1:25226
& stop`,
        health: `// Sentinel Ingestion Pipeline Health & Dropped Packet Diagnostic
_SentinelHealth
| where SentinelResourceType =~ "DataConnector"
| where SentinelResourceName has "CEF" or SentinelResourceName has "Syslog"
| project TimeGenerated, SentinelResourceName, Status, Description
| union (
    CommonSecurityLog
    | summarize LastIngestedRecord = max(TimeGenerated) by DeviceVendor
    | extend LatencyMinutes = datetime_diff('minute', now(), LastIngestedRecord)
    | project DeviceVendor, LastIngestedRecord, LatencyMinutes, HealthStatus = iff(LatencyMinutes < 5, "Healthy", "Warning")
)`
      },
      stats: { eps: '1,420 EPS', latency: '280 ms', schema: 'ASIM NetworkSession 0.2.4', retention: 'Analytics Tier (90 Days)' },
      simLog: [
        'INIT: Binding rsyslog socket UDP:514 [Palo Alto NGFW Forwarder]... OK',
        'AMA-DAEMON: Azure Monitor Agent active on host (pid 4182)... CONNECTED',
        'DCR-RULE: Applied rule "dcr-paloalto-perimeter-prod" with stream Microsoft-CommonSecurityLog',
        'STREAM-RECEIVE: 1,420 events/sec parsed via CEF standard',
        'ASIM-NORMALIZER: Field mapping DeviceAction -> EventResultDetails successful',
        'INGESTION-STATUS: 100% telemetry delivered to law-sentinel-prod. Zero dropped packets.'
      ]
    },

    aws: {
      id: 'aws',
      title: 'Multi-Cloud AWS CloudTrail to Microsoft Sentinel via S3/SQS',
      category: 'Cloud Infrastructure Monitoring',
      badges: ['Multi-Cloud', 'AWS S3 / SQS', 'OIDC Role Federation', 'CloudTrail Ingestion'],
      description: 'Provisioned cross-cloud telemetry pipeline routing AWS multi-region CloudTrail, GuardDuty, and VPC Flow logs directly into Microsoft Sentinel using event-driven S3 bucket notifications and SQS queues, eliminating ingestion polling delays.',
      nodes: [
        { step: 'Phase 01: Cloud Source', title: 'AWS CloudTrail', sub: 'Multi-Region Management', icon: '☁️' },
        { step: 'Phase 02: Storage Event', title: 'Amazon S3 & SQS', sub: 'KMS Encrypted Bucket', icon: '📦' },
        { step: 'Phase 03: Connector', title: 'Sentinel AWS Connector', sub: 'AssumeRole OIDC Auth', icon: '🔗' },
        { step: 'Phase 04: Workspace', title: 'AWSCloudTrail Table', sub: 'Partitioned Analytics', icon: '📊' },
        { step: 'Phase 05: Correlation', title: 'Cross-Cloud Alerts', sub: 'Entra ID & AWS Fusion', icon: '⚡' }
      ],
      configs: {
        dcr: `// Sentinel AWS S3 SQS Connector Configuration Template
{
  "type": "Microsoft.SecurityInsights/dataConnectors",
  "name": "aws-cloudtrail-global-connector",
  "properties": {
    "connectorDefinitionName": "AmazonWebServicesCloudTrail",
    "auth": {
      "type": "RoleArn",
      "roleArn": "arn:aws:iam::123456789012:role/SentinelCloudTrailIngestionRole"
    },
    "request": {
      "sqsUrls": [
        "https://sqs.us-east-1.amazonaws.com/123456789012/sentinel-cloudtrail-queue"
      ]
    },
    "dataTypes": {
      "logs": { "state": "Enabled" }
    }
  }
}`,
        kql: `// Multi-Cloud Privileged Identity & IAM Tampering Detection
AWSCloudTrail
| where EventName in~ ("CreateUser", "AttachUserPolicy", "CreateAccessKey", "PutUserPolicy")
| extend Actor = coalesce(UserIdentityArn, UserIdentityUserName), TargetResource = tostring(RequestParameters)
| project TimeGenerated, EventName, Actor, SourceIPAddress, AwsRegion, TargetResource
| order by TimeGenerated desc`,
        agent: `# AWS Cross-Account IAM Trust Policy for Microsoft Sentinel
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::197857026523:root" }, // Microsoft Sentinel Tenant ID
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": { "sts:ExternalId": "73c68a42-9f3b-48c1-bfa0-soc-sentinel" }
      }
    }
  ]
}`,
        health: `// AWS SQS Ingestion Latency & Dead Letter Queue Diagnostic
_SentinelHealth
| where SentinelResourceType =~ "DataConnector" and SentinelResourceName has "Amazon"
| extend ConnectorStatus = tostring(Status)
| summarize arg_max(TimeGenerated, *) by SentinelResourceName
| project SentinelResourceName, ConnectorStatus, Description, TimeGenerated`
      },
      stats: { eps: '840 EPS', latency: '420 ms', schema: 'AWSCloudTrail v1.08', retention: 'Analytics Tier (90 Days)' },
      simLog: [
        'AUTH-OIDC: Authenticating with AWS STS AssumeRole ARN... SUCCESS',
        'SQS-LISTENER: Connected to sentinel-cloudtrail-queue in us-east-1',
        'EVENT-POLL: Pulling batch of 250 S3 CloudTrail manifests',
        'KMS-DECRYPT: Decrypting S3 gzip objects with AWS KMS CMK... OK',
        'INGESTION: Transformed AWS JSON objects to AWSCloudTrail native schema',
        'HEALTH-CHECK: SQS Queue backlog count: 0. Latency < 500ms.'
      ]
    },

    windows: {
      id: 'windows',
      title: 'Windows Server Security via AMA & Granular XPath DCR',
      category: 'Endpoint & Identity Telemetry',
      badges: ['Azure Monitor Agent (AMA)', 'XPath Filtering', '65% Cost Optimization', 'SecurityEvent Table'],
      description: 'Engineered targeted Windows Security Event onboarding across enterprise domain controllers. Configured precision XPath filters in the Data Collection Rule to eliminate noisy event IDs (like 5156/5158 network filters) while retaining all critical MITRE ATT&CK telemetry, reducing log ingestion expenditure by 65%.',
      nodes: [
        { step: 'Phase 01: Endpoints', title: 'Domain Controllers', sub: 'Windows Server 2022', icon: '🖥️' },
        { step: 'Phase 02: Modern Agent', title: 'Azure Monitor Agent', sub: 'Native Managed Identity', icon: '⚙️' },
        { step: 'Phase 03: DCR XPath Filter', title: 'Precision Filter DCR', sub: 'Noise Dropped at Agent', icon: '🎯' },
        { step: 'Phase 04: Cost Optimization', title: '65% Ingestion Savings', sub: 'Filtered SecurityEvent', icon: '💰' },
        { step: 'Phase 05: Analytics', title: 'Sentinel Detections', sub: 'Kerberoasting & Pass-the-Hash', icon: '🛡️' }
      ],
      configs: {
        dcr: `// Precision DCR XPath Query Filtering - Eliminates Noise & Cuts Cost
{
  "type": "Microsoft.Insights/dataCollectionRules",
  "name": "dcr-windows-domaincontrollers-optimized",
  "properties": {
    "dataSources": {
      "windowsEventLogs": [
        {
          "name": "HighValueSecurityEvents",
          "streams": [ "Microsoft-SecurityEvent" ],
          "xPathQueries": [
            "Security!*[System[(EventID=4624 or EventID=4625 or EventID=4688 or EventID=4720 or EventID=4726 or EventID=4738 or EventID=7045)]]"
          ]
        }
      ]
    },
    "destinations": {
      "logAnalytics": [ { "workspaceResourceId": "/subscriptions/.../law-sentinel-prod", "name": "SentinelLaw" } ]
    },
    "dataFlows": [
      {
        "streams": [ "Microsoft-SecurityEvent" ],
        "destinations": [ "SentinelLaw" ]
      }
    ]
  }
}`,
        kql: `// High-Value Authentication & Process Creation Telemetry
SecurityEvent
| where EventID in (4624, 4625, 4688)
| extend 
    Account = TargetAccount,
    ProcessName = Process,
    IpAddress = IpAddress
| summarize 
    LogonSuccesses = countif(EventID == 4624),
    LogonFailures = countif(EventID == 4625),
    ProcessesSpawned = countif(EventID == 4688)
    by Computer, bin(TimeGenerated, 1h)
| order by Computer asc`,
        agent: `# PowerShell Deployment: Association of DCR to Domain Controllers
$dcrId = "/subscriptions/{sub}/resourceGroups/rg-soc/providers/Microsoft.Insights/dataCollectionRules/dcr-windows-domaincontrollers-optimized"
$servers = Get-AzVM -ResourceGroupName "rg-identity-prod"

foreach ($vm in $servers) {
    New-AzDataCollectionRuleAssociation -TargetResourceId $vm.Id \`
        -AssociationName "assoc-dcr-identity" \`
        -DataCollectionRuleId $dcrId
    Write-Output "Successfully bound DCR to: $($vm.Name)"
}`,
        health: `// AMA Heartbeat & Ingestion Rate per Domain Controller
Heartbeat
| where ComputerEnvironment =~ "Azure" or ComputerEnvironment =~ "Non-Azure"
| where Category =~ "Direct Agent" or Category =~ "Azure Monitor Agent"
| summarize arg_max(TimeGenerated, *) by Computer
| project Computer, ComputerIP, OSType, Version, LastHeartbeat = TimeGenerated`
      },
      stats: { eps: '3,200 EPS', latency: '190 ms', schema: 'SecurityEvent Table', retention: 'Analytics Tier + Long-Term Archive' },
      simLog: [
        'AGENT-CHECK: AMA heartbeat verified on 24 enterprise Domain Controllers',
        'XPATH-PARSER: Compiling precision XPath query [EventID 4624, 4625, 4688, 4720, 7045]',
        'NOISE-FILTER: Dropped 8,920 noisy EventID 5156/5158 connection events at endpoint buffer',
        'BANDWIDTH: Agent egress bandwidth decreased by 65.4%',
        'INGESTION-FLOW: Ingesting pristine high-fidelity security events into Sentinel',
        'COST-SAVINGS: Projected monthly workspace savings: ~$3,850 USD'
      ]
    },

    m365: {
      id: 'm365',
      title: 'Microsoft 365 & Defender XDR Native Bi-directional Connector',
      category: 'Cloud SaaS & Identity Security',
      badges: ['Defender XDR', 'Entra ID (Azure AD)', 'Bi-directional Sync', 'Zero-Agent Cloud-to-Cloud'],
      description: 'Configured native zero-agent cloud-to-cloud data connectors synchronizing Microsoft Entra ID (Sign-in & Audit logs), Exchange Online, SharePoint, and Microsoft Defender XDR incidents into Sentinel with bi-directional alert closure and entity synchronization.',
      nodes: [
        { step: 'Phase 01: Identity/SaaS', title: 'Microsoft Entra ID', sub: 'User & Risk Signals', icon: '👤' },
        { step: 'Phase 02: XDR Platform', title: 'Microsoft Defender', sub: 'Endpoints, Office, Identity', icon: '🛡️' },
        { step: 'Phase 03: Native Pipeline', title: 'Graph API Connector', sub: 'Zero-Agent Cloud-to-Cloud', icon: '⚡' },
        { step: 'Phase 04: Bi-directional', title: 'Incident Sync Engine', sub: 'Status, Severity, Tags', icon: '🔄' },
        { step: 'Phase 05: Sentinel SOC', title: 'Central Monitoring', sub: 'Unified Threat Management', icon: '🖥️' }
      ],
      configs: {
        dcr: `// Microsoft Defender XDR Native Connector Template
{
  "type": "Microsoft.SecurityInsights/dataConnectors",
  "name": "defender-xdr-incidents-connector",
  "properties": {
    "connectorDefinitionName": "MicrosoftDefenderAdvancedThreatProtection",
    "dataTypes": {
      "incidents": { "state": "Enabled" },
      "alerts": { "state": "Enabled" }
    }
  }
}`,
        kql: `// Correlating Entra ID Risky Sign-ins with Defender XDR Incidents
SigninLogs
| where ResultType != 0 // Failed or Risky Sign-ins
| join kind=inner (
    SecurityIncident
    | where ProviderName has "Defender"
    | project IncidentNumber, Title, Severity, IncidentTime = TimeGenerated, Owner
) on $left.UserPrincipalName == $right.Owner
| project TimeGenerated, UserPrincipalName, IPAddress, Location, ResultDescription, IncidentNumber, Title, Severity`,
        agent: `// Bi-directional Incident Integration Behavior:
// 1. Incident closed in Sentinel -> Automatically resolved in Defender Portal
// 2. Comments and Severity adjustments reflect across both consoles in < 15 seconds
// 3. Automated Logic Apps playbooks trigger on ingestion for immediate entity containment`,
        health: `// Health Status of Microsoft 365 Data Connectors
_SentinelHealth
| where SentinelResourceType =~ "DataConnector"
| where SentinelResourceName has "Office" or SentinelResourceName has "Defender" or SentinelResourceName has "Entra"
| project TimeGenerated, SentinelResourceName, Status, Description`
      },
      stats: { eps: '5,100 EPS', latency: '95 ms', schema: 'MicrosoftGraph & Defender Schema', retention: 'Included with M365 E5 / Sentinel' },
      simLog: [
        'CONNECTOR-STATUS: Native M365 Cloud-to-Cloud session established',
        'AUTH-GRAPH: Service Principal granted SecurityIncident.ReadWrite.All',
        'SYNC-PULL: Bi-directional sync operational with Microsoft Defender XDR',
        'TELEMETRY: Entra ID Interactive, Non-Interactive & ServicePrincipal Sign-in logs active',
        'LATENCY: Telemetry delivery latency < 100 milliseconds',
        'INCIDENT-HEALTH: Bi-directional reconciliation verified with 0 drift.'
      ]
    },

    customapi: {
      id: 'customapi',
      title: 'Custom REST API Logs via Azure Functions & Logs Ingestion API',
      category: 'Custom & SaaS Telemetry Integration',
      badges: ['Logs Ingestion API', 'Azure Functions', 'Ingestion-Time KQL Masking', 'Custom Table_CL'],
      description: 'Engineered serverless data collectors for proprietary cloud applications lacking native Sentinel connectors. Utilized Azure Functions calling the modern Logs Ingestion API with Ingestion-Time KQL transformations to strip sensitive PII and format logs to ASIM compliance before writing to disk.',
      nodes: [
        { step: 'Phase 01: Custom Source', title: 'Proprietary SaaS App', sub: 'REST Webhook / API', icon: '💻' },
        { step: 'Phase 02: Collector', title: 'Azure Function App', sub: 'Python Serverless Worker', icon: '⚡' },
        { step: 'Phase 03: Logs API', title: 'Logs Ingestion API', sub: 'DCR-based Endpoint', icon: '📡' },
        { step: 'Phase 04: Transform', title: 'Ingestion KQL Mask', sub: 'PII Redaction & Normalization', icon: '🔒' },
        { step: 'Phase 05: Custom Table', title: 'AppSecurity_CL', sub: 'Basic or Analytics Tier', icon: '📋' }
      ],
      configs: {
        dcr: `// Custom Log Ingestion API DCR with Ingestion-Time KQL Transformation
{
  "type": "Microsoft.Insights/dataCollectionRules",
  "name": "dcr-custom-saas-collector",
  "properties": {
    "streamDeclarations": {
      "Custom-AppSecurityRaw_CL": {
        "columns": [
          { "name": "TimeGenerated", "type": "datetime" },
          { "name": "RawPayload", "type": "string" },
          { "name": "UserEmail", "type": "string" },
          { "name": "ClientIP", "type": "string" }
        ]
      }
    },
    "dataFlows": [
      {
        "streams": [ "Custom-AppSecurityRaw_CL" ],
        "destinations": [ "SentinelLaw" ],
        "transformKql": "source | extend UserHash = hash_sha256(UserEmail) | project-away UserEmail | project-rename SanitizedClientIP = ClientIP",
        "outputStream": "Custom-AppSecurity_CL"
      }
    ]
  }
}`,
        kql: `// Querying Sanitized Custom Application Security Telemetry
AppSecurity_CL
| where TimeGenerated > ago(24h)
| extend EventData = parse_json(RawPayload)
| project TimeGenerated, UserHash, SanitizedClientIP, Action = tostring(EventData.action), StatusCode = toint(EventData.status)
| summarize count() by Action, StatusCode`,
        agent: `# Azure Function (Python) Ingestion Worker Snippet
from azure.identity import DefaultAzureCredential
from azure.monitor.ingestion import LogsIngestionClient

credential = DefaultAzureCredential()
client = LogsIngestionClient(endpoint="https://dce-soc-eastus.ingest.monitor.azure.com", credential=credential)

def send_telemetry_batch(events):
    rule_id = "dcr-0123456789abcdef0123456789abcdef"
    stream_name = "Custom-AppSecurityRaw_CL"
    client.upload(rule_id=rule_id, stream_name=stream_name, logs=events)
    print("Telemetry batch successfully pushed to Sentinel Logs Ingestion API.")`,
        health: `// Verifying Ingestion-Time Transformation Health
_SentinelHealth
| where SentinelResourceType =~ "CustomTable" or SentinelResourceName has "AppSecurity"
| project TimeGenerated, SentinelResourceName, Status, Description`
      },
      stats: { eps: '620 EPS', latency: '340 ms', schema: 'Custom ASIM Compliant', retention: 'Basic Logs Tier (Cost-Optimized)' },
      simLog: [
        'PIPELINE-START: Azure Function triggered via Event Grid timer',
        'API-PULL: Extracted 1,200 JSON security records from SaaS audit API',
        'TRANSFORM-ENGINE: Ingestion-time KQL executed hash_sha256 on UserEmail (PII masked)',
        'INGESTION-API: HTTP POST to DCE https://dce-soc-eastus.ingest.monitor.azure.com',
        'TABLE-WRITE: 1,200 records committed to AppSecurity_CL in Basic Logs tier',
        'COST-NOTE: Ingested to Basic Tier at $1.00/GB vs $4.30/GB standard Analytics tier.'
      ]
    }
  };

  let currentBlueprint = blueprints.paloalto;
  let activeTab = 'dcr';

  // Elements
  const pills = document.querySelectorAll('.scenario-pill');
  const titleEl = document.getElementById('blueprint-title');
  const descEl = document.getElementById('blueprint-desc');
  const badgesEl = document.getElementById('blueprint-badges');
  const nodesWrapper = document.getElementById('flow-nodes-wrapper');
  const codeBody = document.getElementById('inspector-code-body');
  const copyBtn = document.getElementById('inspector-copy-btn');
  const tabBtns = document.querySelectorAll('.inspector-tab-btn');
  const statEps = document.getElementById('stat-eps');
  const statLatency = document.getElementById('stat-latency');
  const statSchema = document.getElementById('stat-schema');
  const statRetention = document.getElementById('stat-retention');
  const simTerminal = document.getElementById('sim-output-terminal');
  const simTriggerBtn = document.getElementById('sim-trigger-btn');

  function renderBlueprint(bp) {
    currentBlueprint = bp;

    if (titleEl) titleEl.textContent = bp.title;
    if (descEl) descEl.textContent = bp.description;

    if (badgesEl) {
      badgesEl.innerHTML = bp.badges
        .map((b) => `<span class="blueprint-badge">${b}</span>`)
        .join('');
    }

    // Render 5 Pipeline Nodes
    if (nodesWrapper) {
      nodesWrapper.innerHTML = bp.nodes
        .map(
          (n) => `
        <div class="flow-node">
          <div class="flow-node-step">${n.step}</div>
          <div class="flow-node-icon">${n.icon}</div>
          <div class="flow-node-title">${n.title}</div>
          <div class="flow-node-sub">${n.sub}</div>
        </div>
      `
        )
        .join('');
    }

    // Update Stats
    if (statEps) statEps.textContent = bp.stats.eps;
    if (statLatency) statLatency.textContent = bp.stats.latency;
    if (statSchema) statSchema.textContent = bp.stats.schema;
    if (statRetention) statRetention.textContent = bp.stats.retention;

    // Render Code Tab
    renderCodeTab(activeTab);

    // Render Simulator initial logs
    renderSimLogs(bp.simLog);
  }

  function renderCodeTab(tabKey) {
    activeTab = tabKey;
    tabBtns.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.tab === tabKey);
    });

    if (codeBody && currentBlueprint.configs[tabKey]) {
      const rawCode = currentBlueprint.configs[tabKey];
      codeBody.textContent = rawCode;
    }
  }

  function renderSimLogs(lines) {
    if (!simTerminal) return;
    simTerminal.innerHTML = '';
    lines.forEach((line, index) => {
      const p = document.createElement('div');
      p.className = 'sim-log-line';
      if (line.includes('OK') || line.includes('SUCCESS') || line.includes('100%') || line.includes('Savings')) {
        p.classList.add('log-success');
      } else if (line.includes('WARNING') || line.includes('dropped') || line.includes('Noise')) {
        p.classList.add('log-warn');
      } else {
        p.classList.add('log-info');
      }
      p.textContent = `[${new Date().toLocaleTimeString()}] ${line}`;
      simTerminal.appendChild(p);
    });
    simTerminal.scrollTop = simTerminal.scrollHeight;
  }

  // Event Listeners
  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      const bpId = pill.dataset.scenario;
      if (blueprints[bpId]) {
        renderBlueprint(blueprints[bpId]);
      }
    });
  });

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      renderCodeTab(btn.dataset.tab);
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const code = currentBlueprint.configs[activeTab] || '';
      navigator.clipboard.writeText(code).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span>✓ Copied!</span>';
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
        }, 2000);
      });
    });
  }

  if (simTriggerBtn) {
    simTriggerBtn.addEventListener('click', () => {
      simTriggerBtn.disabled = true;
      simTriggerBtn.innerHTML = '<span>⚡ Ingesting Stream...</span>';

      const burstLogs = [
        `SIM-BURST: Generated test payload of 500 records for ${currentBlueprint.title}...`,
        'PIPELINE-VALIDATE: Checking Data Collection Endpoint (DCE) TLS 1.3 handshake... OK',
        'SCHEMA-AUDIT: Validated payload against Sentinel ASIM parser tables... PASS',
        'THROUGHPUT-MONITOR: Ingestion burst committed in 184ms with 0 errors.',
        `STATUS: All 500 events available in Microsoft Sentinel Log Analytics.`
      ];

      renderSimLogs(burstLogs);

      setTimeout(() => {
        simTriggerBtn.disabled = false;
        simTriggerBtn.innerHTML = '<span>⚡ Transmit Simulated Telemetry Stream</span>';
      }, 1500);
    });
  }

  // Initial render
  renderBlueprint(blueprints.paloalto);
})();
