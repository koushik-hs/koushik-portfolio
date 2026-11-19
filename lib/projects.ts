import { github } from './site';

type DiagramStage = { title: string; detail: string };
type Project = {
  slug: string;
  title: string;
  category: string;
  question: string;
  summary: string;
  problem: string;
  overview: string;
  stack: string[];
  evidence: string;
  flow: DiagramStage[];
  outputs: DiagramStage[];
  decisions: { title: string; text: string }[];
  tradeoff: string;
  repo?: string;
  sources?: { label: string; path: string }[];
};

export const projects: Project[] = [
  {
    slug: 'zerotrust-workspace',
    title: 'ZeroTrust Workspace',
    category: 'Backend security / Access control',
    question: 'Who gets access?',
    summary: 'Tenant isolation, session security, and permission checks in a shared workspace.',
    problem: 'A multi-tenant workspace needs to serve many organizations through one API. A valid login establishes who is making a request. Each tenant-scoped operation still needs to establish which organization the request can act on and which permissions apply.',
    overview: 'A Next.js dashboard and NestJS REST API handle authentication, organization membership, roles, sessions, and audit activity. Prisma connects the API to PostgreSQL. Redis supports session management and rate limiting.',
    stack: ['NestJS', 'Next.js', 'PostgreSQL', 'Prisma', 'Redis', 'JWT', 'Docker'],
    evidence: 'Simplified tenant-scoped request path, based on the repository documentation and backend source.',
    flow: [
      { title: 'Workspace dashboard', detail: 'Sends an authenticated request with organization context.' },
      { title: 'NestJS guards', detail: 'Resolve identity and check organization membership and route permissions. Redis supports session and rate-limit state.' },
      { title: 'Tenant-scoped service', detail: 'Applies the validated organization context to the operation.' },
    ],
    outputs: [
      { title: 'PostgreSQL', detail: 'Prisma reads and writes organization-scoped data.' },
    ],
    decisions: [
      { title: 'Separate identity from tenant access', text: 'The tenant guard resolves the requested organization, checks membership for regular users, and attaches the organization to the request. The project service scopes its lookup by organization ID.' },
      { title: 'Rotate refresh tokens', text: 'Authentication uses Argon2id for password hashes and short-lived JWT access tokens. Refresh tokens rotate through Redis-backed session state.' },
    ],
    tradeoff: 'The organization header gives clients a way to select a workspace. Tenant-scoped routes still need to apply the guard and pass its validated context into service calls. The supplied résumé reports 20 isolation test cases across three tenants.',
    repo: 'ZeroTrust-Workspace-Enterprise-RBAC-Platform',
    sources: [
      { label: 'Tenant guard', path: 'blob/main/backend/src/common/guards/tenant.guard.ts' },
      { label: 'Project service', path: 'blob/main/backend/src/projects/projects.service.ts' },
    ],
  },
  {
    slug: 'nexusguard-ai',
    title: 'NexusGuard AI',
    category: 'Applied ML / Payment risk',
    question: 'What connects the dots?',
    summary: 'Graph analysis for coordinated payment abuse that looks ordinary one transaction at a time.',
    problem: 'An individual payment can look harmless even when several accounts share infrastructure or repeatedly transact with the same counterparties. Detecting coordinated abuse requires reasoning about relationships and context.',
    overview: 'Built for the Razorpay AI Buildathon, NexusGuard AI ingests synthetic or manually entered payment events into an in-memory graph. It extracts cluster features and surfaces risk evidence in a React interface through FastAPI and WebSocket updates.',
    stack: ['Python', 'FastAPI', 'NetworkX', 'XGBoost', 'Isolation Forest', 'React', 'WebSockets'],
    evidence: 'Simplified live detection path, based on the repository README and the live state and scoring modules.',
    flow: [
      { title: 'Payment events', detail: 'Manual and simulated telemetry enters through a schema without ground-truth labels.' },
      { title: 'Live entity graph', detail: 'Relationships expose device reuse, refund patterns, and transaction cycles.' },
      { title: 'Hybrid risk score', detail: 'XGBoost, Isolation Forest, and structural rules contribute to cluster risk.' },
    ],
    outputs: [{ title: 'Investigation interface', detail: 'REST and WebSocket updates feed the graph explorer, event stream, and risk timeline.' }],
    decisions: [
      { title: 'Score relationships between entities', text: 'The live state updates graph features incrementally. Shared infrastructure, refund behavior, and transaction cycles contribute evidence at the cluster level.' },
      { title: 'Keep deterministic evidence in the score', text: 'The hybrid scorer combines supervised probabilities, anomaly scores, and explicit structural rules so an investigator can trace part of a score back to observable relationships.' },
    ],
    tradeoff: 'Households and offices can share an IP address too. The repository evaluates these cases using synthetic hard negatives. Calibration with historical chargebacks and analyst feedback would be needed before production use.',
    repo: 'NexusGuard-AI',
    sources: [
      { label: 'Engineering decisions', path: 'blob/main/DECISION_LOG.md' },
      { label: 'Hybrid scorer', path: 'blob/main/backend/detection/scorer.py' },
    ],
  },
  {
    slug: 'reflexxdr',
    title: 'ReflexXDR',
    category: 'Security research / Detection',
    question: 'How does web telemetry become an actionable alert?',
    summary: 'A local web intrusion monitoring pipeline and a separate deep-learning research track.',
    problem: 'Reverse-proxy logs and application events describe web activity in different formats. An analyst needs a common event format and enough context to connect related signals, prioritize alerts, and decide what to investigate.',
    overview: 'ReflexXDR collects web telemetry from an OWASP Juice Shop lab behind nginx and presents alerts through a Flask API and dashboard. The MDDHN-AM research model combines temporal convolutions, an LSTM, and attention, with RCMPA in the research pipeline.',
    stack: ['Python', 'Flask', 'PyTorch', 'nginx', 'Docker', 'OWASP Juice Shop', 'MITRE ATT&CK'],
    evidence: 'The diagram follows the current local monitoring path documented in the README and implemented in the XDR entry point. The neural model is evaluated separately in the research track.',
    flow: [
      { title: 'Web telemetry', detail: 'nginx JSON logs and Juice Shop application events provide observations from the local lab.' },
      { title: 'Event normalization', detail: 'Adapters translate telemetry into a common UnifiedEvent schema.' },
      { title: 'Live detection', detail: 'Rule-based detectors evaluate request patterns and behaviors and emit detection records.' },
      { title: 'Alert enrichment and triage', detail: 'The pipeline attaches MITRE ATT&CK context, groups related activity by source, and applies a risk score.' },
    ],
    outputs: [
      { title: 'Flask API and dashboard', detail: 'Present alerts, correlated incidents, and response guidance for investigation.' },
      { title: 'JSONL alert history', detail: 'A local record of alerts supports later review.' },
    ],
    decisions: [
      { title: 'Give detectors a common event contract', text: 'Source adapters handle differences in input formats. Detectors consume normalized events, so the pipeline can process proxy and application telemetry through the same interface.' },
      { title: 'Keep triage explainable', text: 'Technique mappings, per-source correlation, and risk scores help an analyst inspect the context behind an alert. The response layer records recommended actions for review.' },
      { title: 'Develop the neural model in a research track', text: 'MDDHN-AM explores temporal patterns in traffic with convolutional and recurrent components. The current dashboard entry point uses rule-based detection and starts with the neural detector inactive.' },
    ],
    tradeoff: 'The local demo makes it possible to trace an event through to a recommendation. Response guidance requires a human to act. The evaluation report and README describe different model results, so the case study leaves out headline metrics until the checkpoint and test split can be confirmed.',
    repo: 'ReflexXDR',
    sources: [
      { label: 'Live entry point', path: 'blob/6bce1dffa6fa7eb4b4602029785cfd8ff3b46b4b/xdr/main.py' },
      { label: 'Architecture notes', path: 'blob/6bce1dffa6fa7eb4b4602029785cfd8ff3b46b4b/docs/architecture.md' },
      { label: 'Evaluation report', path: 'blob/6bce1dffa6fa7eb4b4602029785cfd8ff3b46b4b/docs/ML_EVALUATION.md' },
    ],
  },
  {
    slug: 'man-in-the-middle-lab',
    title: 'Man-in-the-Middle Lab',
    category: 'Networking / Traffic analysis',
    question: 'Can the network be trusted?',
    summary: 'An isolated three-VM lab for observing network anomalies, raising alerts, and testing a response.',
    problem: 'Traffic can appear normal at the application layer while address mappings or DNS answers have changed underneath it. An isolated lab makes those anomalies observable and gives responders a controlled environment for examining them.',
    overview: 'Three Linux VMs in VirtualBox model an exercise host, a client, and a monitoring gateway. Python and Scapy inspect network traffic, and a Flask dashboard presents alerts and response activity.',
    stack: ['Python', 'Scapy', 'Flask', 'Linux', 'VirtualBox'],
    evidence: 'Detection-side architecture based on the lab README and ARP and DNS detector source.',
    flow: [
      { title: 'Isolated VM traffic', detail: 'Traffic from the exercise and client hosts passes through the lab network.' },
      { title: 'Gateway detectors', detail: 'Inspect ARP mappings and compare observed DNS answers with a reference resolver.' },
      { title: 'Anomaly records', detail: 'Record DNS differences or suspicious address changes for investigation.' },
    ],
    outputs: [{ title: 'Flask dashboard', detail: 'Displays monitoring alerts and records from defensive response tooling.' }],
    decisions: [
      { title: 'Observe from the gateway', text: 'The gateway is the observation point for network traffic and hosts the lab’s detection and defensive tooling.' },
      { title: 'Check independent signals', text: 'ARP and DNS detectors examine different evidence. One looks for unexpected IP–MAC mappings, while the other checks for divergent answers and unusual traffic characteristics.' },
    ],
    tradeoff: 'IP–MAC mappings can legitimately change, and resolvers can return different answers. The checks are useful investigation signals whose interpretation depends on the network environment.',
    repo: 'Man-in-the-Middle-lab',
    sources: [{ label: 'ARP detector', path: 'blob/main/MITM-Lab/detection/arp_detection.py' },
      { label: 'DNS detector', path: 'blob/main/MITM-Lab/detection/dns_detection.py' }],
  },
];

export const projectHref = (project: Project) => `/work/${project.slug}`;
export const repoHref = (project: Project) => project.repo ? `${github}/${project.repo}` : undefined;
