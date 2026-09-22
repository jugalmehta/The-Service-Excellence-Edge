export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/ai-agents", label: "AI Agents" },
  { href: "/workflow-automation", label: "Workflow Automation" },
  { href: "/it-service-management", label: "IT Service Management" },
  { href: "/ai-transformation-framework", label: "Transformation Framework" },
  { href: "/enterprise-ai-capabilities", label: "Enterprise Capabilities" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/contact", label: "Contact" },
] as const;

export const SITE = {
  name: "Service Excellence Edge",
  shortName: "SEE",
  tagline: "Where AI Meets Service Excellence.",
  positioning: "AI Transformation · IT Service Management · Process Excellence",
  email: "hello@serviceexcellenceedge.com",
  location: "Berlin, Germany",
};

// ---------------------------------------------------------------
// Services — AI Transformation (left) / IT Service Excellence (right)
// ---------------------------------------------------------------
export const AI_SERVICES = [
  { slug: "ai-agents-development", icon: "bot", name: "AI Agents Development", desc: "Role-specific AI agents built for one job, with guardrails and escalation paths." },
  { slug: "workflow-automation", icon: "workflow", name: "Workflow Automation", desc: "Multi-step, cross-system processes automated end-to-end." },
  { slug: "document-ai", icon: "file-text", name: "Document AI", desc: "Extraction, classification and routing of unstructured documents." },
  { slug: "voice-ai", icon: "mic", name: "Voice AI", desc: "Natural, multilingual voice agents for phone-based service." },
  { slug: "ai-chatbots", icon: "message-circle", name: "AI Chatbots", desc: "Governed chat assistants scoped to approved knowledge and actions." },
  { slug: "knowledge-ai", icon: "search", name: "Knowledge AI", desc: "Enterprise search that finally makes internal documentation useful." },
  { slug: "email-automation", icon: "mail", name: "Email Automation", desc: "Triage, drafting and routing for high-volume inboxes." },
  { slug: "process-intelligence", icon: "activity", name: "Process Intelligence", desc: "Mining real process data to find bottlenecks worth automating." },
] as const;

export const ITSM_SERVICES = [
  { slug: "itil-transformation", icon: "layers", name: "ITIL Transformation", desc: "Re-platforming service management practice around ITIL 4." },
  { slug: "incident-management", icon: "alert-triangle", name: "Incident Management", desc: "Faster detection, response and communication when things break." },
  { slug: "problem-management", icon: "search-code", name: "Problem Management", desc: "Root-cause analysis that turns recurring incidents into fixes." },
  { slug: "change-enablement", icon: "git-branch", name: "Change Enablement", desc: "Lower-risk change with AI-assisted impact and risk scoring." },
  { slug: "request-management", icon: "list-checks", name: "Request Management", desc: "Self-service portals that actually resolve requests, not just log them." },
  { slug: "service-desk-modernization", icon: "headset", name: "Service Desk Modernization", desc: "Rebuilding the desk around AI triage and known-error resolution." },
  { slug: "sla-kpi-optimization", icon: "gauge", name: "SLA & KPI Optimization", desc: "SLA design and live monitoring that reflects real customer impact." },
  { slug: "operational-excellence", icon: "target", name: "Operational Excellence", desc: "Lean + Agile + SAFe practice design across the service organisation." },
] as const;

// ---------------------------------------------------------------
// AI Agents — 12 agents
// ---------------------------------------------------------------
export const AI_AGENTS = [
  { slug: "it-support-agent", icon: "headset", name: "IT Support Agent", outcome: "Auto-triage incidents and resolve known errors directly.", detail: "Classifies incoming tickets, matches them against the known-error database, resolves what it can, and routes the rest with full context attached." },
  { slug: "executive-ai-assistant", icon: "briefcase", name: "Executive AI Assistant", outcome: "Generate reports and summaries on demand.", detail: "Briefs leaders on service health, SLA performance and risk in plain language, on a schedule or on request." },
  { slug: "hr-agent", icon: "users", name: "HR Agent", outcome: "Onboarding automation, end to end.", detail: "Runs onboarding checklists, answers policy questions, and handles leave and benefits requests within approval rules." },
  { slug: "knowledge-agent", icon: "search", name: "Knowledge Agent", outcome: "Enterprise search over documentation.", detail: "Answers questions grounded in approved internal knowledge, with source citations, instead of a generic search box." },
  { slug: "voice-reception-ai", icon: "phone", name: "Voice Reception AI", outcome: "Multilingual phone assistant.", detail: "Answers inbound calls naturally in the caller's language, triages the request, and hands off cleanly to a human when needed." },
  { slug: "finance-agent", icon: "coins", name: "Finance Agent", outcome: "Invoice approval automation.", detail: "Matches invoices to purchase orders, flags anomalies, and routes for approval by amount and entity." },
  { slug: "customer-service-agent", icon: "message-square", name: "Customer Service Agent", outcome: "24/7 multilingual support.", detail: "Handles first-line customer enquiries across chat and email, escalating on low confidence or sentiment risk." },
  { slug: "compliance-agent", icon: "shield-check", name: "Compliance Agent", outcome: "ISO & TISAX readiness.", detail: "Tracks control evidence, flags gaps against ISO 27001 / TISAX requirements, and keeps audit documentation current." },
  { slug: "change-risk-agent", icon: "git-branch", name: "Change Risk Agent", outcome: "Automated change risk scoring.", detail: "Scores every change request against historical incident data and flags conflicts with the release calendar." },
  { slug: "procurement-agent", icon: "shopping-cart", name: "Procurement Agent", outcome: "Purchase request triage and routing.", detail: "Classifies purchase requests, checks budget and vendor status, and routes for the right approval." },
  { slug: "quality-assurance-agent", icon: "check-circle", name: "Quality Assurance Agent", outcome: "Ticket and call quality scoring.", detail: "Reviews closed tickets and call transcripts against quality criteria, flagging coaching opportunities." },
  { slug: "onboarding-copilot", icon: "graduation-cap", name: "Onboarding Copilot", outcome: "New-hire IT and access provisioning.", detail: "Provisions accounts, hardware requests and access rights automatically once an offer is accepted." },
] as const;

// ---------------------------------------------------------------
// Workflow automation examples
// ---------------------------------------------------------------
export const WORKFLOW_EXAMPLES = [
  { department: "IT", workflow: "Email → AI Classification → Jira → Teams Notification", before: "Support inbox manually triaged once an hour; average first response 4+ hours.", after: "Emails classified and ticketed within seconds; team notified in Teams instantly." },
  { department: "HR", workflow: "Resume → AI Screening → Interview Scheduling", before: "Recruiters manually screen every CV before a candidate is even contacted.", after: "AI pre-screens against role criteria and books first-round interviews automatically." },
  { department: "Finance", workflow: "Invoice OCR → SAP Approval → Payment", before: "Invoices keyed in by hand from PDFs, approvals chased over email.", after: "Invoices extracted, matched and routed inside SAP without manual entry." },
  { department: "Operations", workflow: "Approval Workflow → AI Routing", before: "Approval requests sit in a shared inbox waiting for the right person to notice.", after: "Requests are routed to the correct approver automatically based on type and value." },
  { department: "Customer Support", workflow: "Chatbot → AI Agent → Human Escalation", before: "Every enquiry, simple or complex, waits in the same queue for a human.", after: "Routine enquiries resolved instantly; complex ones escalate with full context attached." },
] as const;

export const WORKFLOW_PLATFORMS = [
  "Jira", "ServiceNow", "SAP", "Microsoft Teams", "Slack", "Salesforce", "Zendesk", "Microsoft 365",
];

// ---------------------------------------------------------------
// ITSM lifecycle / ITIL modules
// ---------------------------------------------------------------
export const ITIL_MODULES = [
  { practice: "Incident Management", solution: "AI-driven incident resolution.", icon: "alert-triangle" },
  { practice: "Problem Management", solution: "Root cause AI analysis.", icon: "search-code" },
  { practice: "Change Enablement", solution: "Risk scoring using AI.", icon: "git-branch" },
  { practice: "Request Management", solution: "Self-service AI portal.", icon: "list-checks" },
  { practice: "Knowledge Management", solution: "Enterprise AI search.", icon: "book-open" },
  { practice: "SLA Management", solution: "Live KPI dashboards.", icon: "gauge" },
  { practice: "CMDB Integration", solution: "Asset & configuration visibility.", icon: "database" },
] as const;

export const MATURITY_LEVELS = [
  { level: 1, name: "Reactive", desc: "Firefighting. Tickets logged manually, no consistent process, resolution depends on who picks it up." },
  { level: 2, name: "Managed", desc: "Core ITIL practices exist on paper. Tooling is in place but underused; reporting is manual." },
  { level: 3, name: "Defined", desc: "Practices are consistently followed and measured. SLAs exist and are mostly met." },
  { level: 4, name: "Governed", desc: "AI-assisted triage and routing are live. KPIs drive continuous improvement, not just reporting." },
  { level: 5, name: "Optimized", desc: "AI agents handle the majority of routine volume. The service organisation improves itself continuously." },
] as const;

// ---------------------------------------------------------------
// AI Transformation Framework — 5 stages
// ---------------------------------------------------------------
export const FRAMEWORK_STAGES = [
  { stage: "Discover", desc: "AI opportunity assessment across your current service operation." },
  { stage: "Design", desc: "Define the future operating model, guardrails and success metrics." },
  { stage: "Build", desc: "Build the AI agents and workflows against your real systems." },
  { stage: "Deploy", desc: "Roll out with integrations, governance and a controlled pilot." },
  { stage: "Optimize", desc: "Continuous improvement against SLAs, retraining as you scale." },
] as const;

// ---------------------------------------------------------------
// Enterprise AI capabilities
// ---------------------------------------------------------------
export const CAPABILITIES = [
  { capability: "Generative AI", value: "Knowledge assistants grounded in your own documentation.", icon: "sparkles" },
  { capability: "Voice AI", value: "Customer support automation over the phone, in your customers' language.", icon: "mic" },
  { capability: "Document AI", value: "OCR and document processing without manual re-keying.", icon: "file-text" },
  { capability: "Predictive AI", value: "Incident prediction before customers notice a problem.", icon: "trending-up" },
  { capability: "Process Mining", value: "Operational bottleneck discovery from real process data.", icon: "activity" },
  { capability: "Enterprise Search", value: "One internal knowledge assistant instead of five broken wikis.", icon: "search" },
] as const;

// ---------------------------------------------------------------
// Case studies
// ---------------------------------------------------------------
export const CASE_STUDIES = [
  {
    slug: "automotive-ai-service-desk",
    industry: "Automotive & Mobility",
    title: "AI Service Desk for a Tier-1 Automotive Supplier",
    challenge: "A Tier-1 automotive supplier's IT service desk was handling rising ticket volumes across engineering, plant and corporate IT, with response times slipping against contracted SLAs.",
    solution: "Deployed an IT Support Agent trained on the existing known-error database, integrated with the ticketing system to triage, resolve known issues directly, and route the rest with full context attached.",
    technologies: ["IT Support Agent", "ServiceNow", "Incident Management"],
    impact: "Routine requests are now resolved without human involvement, and major incident communication is automatic.",
    kpis: [{ metric: "46%", label: "Faster P1 resolution" }, { metric: "31%", label: "Tickets deflected" }, { metric: "3 weeks", label: "To first pilot live" }],
  },
  {
    slug: "finance-invoice-automation",
    industry: "Financial Services",
    title: "Invoice Automation for a Multi-Entity Finance Team",
    challenge: "A financial services group was processing supplier invoices manually across five European entities, each with different approval chains and a growing backlog of exceptions.",
    solution: "Built a Finance Agent workflow combining Document AI extraction, three-way matching against purchase orders, and entity-specific approval routing inside SAP.",
    technologies: ["Finance Agent", "Document AI", "SAP"],
    impact: "Manual data entry was removed from the majority of invoices, and approval cycle time dropped sharply.",
    kpis: [{ metric: "€2.1M", label: "Processed monthly" }, { metric: "68%", label: "Manual touch removed" }, { metric: "5", label: "Entities covered" }],
  },
  {
    slug: "hr-employee-onboarding",
    industry: "Human Resources",
    title: "Employee Onboarding for a Scaling Tech Company",
    challenge: "A fast-growing technology company was onboarding dozens of new hires a month through a 14-step manual checklist spread across HR, IT and facilities.",
    solution: "Deployed an Onboarding Copilot to run the workflow end-to-end: accounts, equipment and a day-one checklist triggered automatically once an offer was accepted.",
    technologies: ["Onboarding Copilot", "HR Agent", "Microsoft 365"],
    impact: "New hires arrive to fully provisioned accounts and equipment on day one as standard.",
    kpis: [{ metric: "9→1", label: "Days to full readiness" }, { metric: "100%", label: "Day-one readiness" }, { metric: "0", label: "Manual tickets for standard onboarding" }],
  },
  {
    slug: "itsm-change-risk-transformation",
    industry: "ITSM AI Supported Process Transformations",
    title: "Change Request & Risk Assessment for a Multinational Enterprise",
    challenge: "A multinational enterprise ran change management through spreadsheets and email, with every request manually risk-assessed by a stretched CAB, and conflicts with the release calendar surfacing late.",
    solution: "Introduced AI-assisted Change Enablement: each request is automatically risk-scored against historical incident data and routed for approval based on its risk tier.",
    technologies: ["Change Risk Agent", "ServiceNow", "Change Enablement"],
    impact: "The CAB now spends its time on genuinely high-risk changes, and emergency changes have dropped sharply.",
    kpis: [{ metric: "58%", label: "Faster CAB approval cycle" }, { metric: "24%", label: "Fewer change-related incidents" }, { metric: "3x", label: "More changes processed weekly" }],
  },
] as const;

// ---------------------------------------------------------------
// Contact form
// ---------------------------------------------------------------
export const INDUSTRY_OPTIONS = [
  "Automotive & Mobility", "Manufacturing", "Healthcare", "Financial Services", "Logistics", "Professional Services", "Other",
];

export const COMPANY_SIZE_OPTIONS = [
  "1–50", "51–250", "251–1,000", "1,001–5,000", "5,000+",
];

export const ITSM_TOOL_OPTIONS = [
  "ServiceNow", "Jira Service Management", "Freshservice", "SAP", "BMC Helix", "None / Spreadsheets", "Other",
];

// ---------------------------------------------------------------
// About page
// ---------------------------------------------------------------
export const WHY_SEE = [
  { title: "AI-First Consulting", desc: "Every engagement starts from what AI can automate, not which tool to sell you.", icon: "sparkles" },
  { title: "Enterprise ITSM Expertise", desc: "ITIL 4 practice design from someone who has run major incident management at enterprise scale.", icon: "layers" },
  { title: "Lean + Agile + SAFe Transformation", desc: "Process redesign grounded in Lean Six Sigma and scaled agile, not just automation for its own sake.", icon: "target" },
  { title: "AI Automation with Measurable ROI", desc: "Every agent and workflow ships with a success metric agreed before day one.", icon: "trending-up" },
] as const;

export const FOUNDER_EXPERTISE = [
  "Process Management Specialist",
  "Project Management",
  "Volkswagen (CARIAD)",
  "ITIL Expert",
  "Lean Six Sigma",
  "SAFe",
  "AI Automation",
  "Enterprise Operations",
] as const;
