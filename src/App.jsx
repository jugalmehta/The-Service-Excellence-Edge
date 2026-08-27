import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  ChevronRight, ChevronLeft, Check, Plus, ArrowRight, Layers,
  Users, GitBranch, Table2, ClipboardList, Trash2, Loader2, Sparkles,
  Move, Pencil, RotateCcw
} from "lucide-react";

/* ----------------------------- DESIGN TOKENS ----------------------------- */
const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=IBM+Plex+Mono:wght@500;600&family=Inter:wght@400;500;600&display=swap');`;

/* ----------------------------- DOMAIN DATA ----------------------------- */
const LEVEL_LABELS = [
  "1st Line — Service Desk",
  "2nd Line Support",
  "3rd Line / Specialist Support",
  "4th Line / Vendor Support",
];

const RACI_META = {
  R: { label: "Responsible", color: "#B24A1D" },
  A: { label: "Accountable", color: "#2C5985" },
  C: { label: "Consulted", color: "#6B7A8A" },
  I: { label: "Informed", color: "#98A2AB" },
};

const PROCESSES = {
  incident: {
    id: "incident", name: "Incident Management",
    goal: "Restore normal service operation as quickly as possible, minimizing business impact.",
    pmLabel: "Incident Manager",
    activities: [
      { id: "log", name: "Log & Categorize Incident", raci: { L1: "R", PM: "A", EU: "C" } },
      { id: "prio", name: "Prioritize & Initial Diagnosis", raci: { L1: "R", L2: "C", PM: "A" } },
      { id: "esc", name: "Escalate to Next Line", raci: { L1: "R", L2: "R", L3: "C", PM: "A" } },
      { id: "inv", name: "Investigate & Diagnose", raci: { L2: "R", L3: "R", PM: "A", VN: "C" } },
      { id: "res", name: "Resolve & Recover Service", raci: { L1: "C", L2: "R", L3: "R", PM: "A" } },
      { id: "close", name: "Close & Confirm with User", raci: { L1: "R", PM: "A", EU: "I" } },
    ],
    extraRoles: [
      { id: "SO", label: "Service Owner", defaultChecked: false },
      { id: "EU", label: "End User / Customer", defaultChecked: true },
      { id: "VN", label: "Vendor / Third-Party Support", defaultChecked: false },
    ],
    sipoc: {
      suppliers: ["End Users", "Monitoring & Alerting Tools", "Service Desk", "Third-Party Vendors"],
      inputs: ["User-reported issue", "System alert / event", "Incident ticket", "Known Error Database"],
      outputs: ["Restored service", "Closed incident record", "Root-cause flag to Problem Mgmt", "User communication"],
      customers: ["End Users", "Business Units", "IT Operations"],
    },
  },
  problem: {
    id: "problem", name: "Problem Management",
    goal: "Identify and remove the root cause of recurring incidents to prevent future disruption.",
    pmLabel: "Problem Manager",
    activities: [
      { id: "log", name: "Log Problem (trend / major incident)", raci: { L2: "R", PM: "A" } },
      { id: "cat", name: "Categorize & Prioritize Problem", raci: { L2: "C", L3: "C", PM: "A" } },
      { id: "rca", name: "Investigate Root Cause", raci: { L2: "C", L3: "R", PM: "A", VN: "C" } },
      { id: "work", name: "Identify Workaround", raci: { L1: "I", L3: "R", PM: "A" } },
      { id: "ked", name: "Raise Known Error Record", raci: { L3: "R", PM: "A" } },
      { id: "fix", name: "Implement Permanent Fix (via Change)", raci: { L3: "C", CM: "R", PM: "A" } },
      { id: "rev", name: "Review & Close Problem", raci: { L3: "C", PM: "A" } },
    ],
    extraRoles: [
      { id: "CM", label: "Change Manager", defaultChecked: true },
      { id: "IM", label: "Incident Manager (major incident link)", defaultChecked: false },
      { id: "SO", label: "Service Owner", defaultChecked: false },
    ],
    sipoc: {
      suppliers: ["Incident Management", "Monitoring Tools", "Service Desk Trend Reports"],
      inputs: ["Recurring incidents", "Major incident review", "Problem ticket"],
      outputs: ["Root cause analysis", "Known Error Record", "Change request", "Permanent fix"],
      customers: ["Service Desk", "End Users", "IT Management"],
    },
  },
  change: {
    id: "change", name: "Change Management",
    goal: "Ensure standardized methods are used for efficient handling of all changes, minimizing risk.",
    pmLabel: "Change Manager",
    activities: [
      { id: "rfc", name: "Submit Request for Change (RFC)", raci: { L2: "R", PM: "A" } },
      { id: "risk", name: "Assess Risk & Impact", raci: { PM: "R", L3: "C", SO: "C" } },
      { id: "cab", name: "Review at CAB", raci: { CAB: "R", PM: "A", SO: "C" } },
      { id: "app", name: "Approve / Reject Change", raci: { CAB: "A", PM: "R" } },
      { id: "sched", name: "Schedule & Communicate", raci: { PM: "R", L1: "I", EU: "I" } },
      { id: "impl", name: "Implement Change", raci: { L2: "R", L3: "R", VN: "C", PM: "A" } },
      { id: "pir", name: "Post-Implementation Review", raci: { PM: "R", CAB: "I", SO: "C" } },
    ],
    extraRoles: [
      { id: "CAB", label: "Change Advisory Board (CAB)", defaultChecked: true },
      { id: "SO", label: "Service Owner", defaultChecked: false },
      { id: "EU", label: "End User / Customer", defaultChecked: false },
      { id: "VN", label: "Vendor / Third-Party", defaultChecked: false },
    ],
    sipoc: {
      suppliers: ["Requesters (IT/Business)", "Problem Management", "Project Teams"],
      inputs: ["Request for Change (RFC)", "Risk assessment", "Release plan"],
      outputs: ["Approved / rejected change", "Updated CMDB", "Implemented change", "PIR report"],
      customers: ["End Users", "Business Units", "Service Owner"],
    },
  },
  request: {
    id: "request", name: "Request Fulfillment",
    goal: "Manage the lifecycle of service requests from users, from submission to delivery.",
    pmLabel: "Request Fulfillment Manager",
    activities: [
      { id: "sub", name: "Submit Service Request", raci: { EU: "R", L1: "I" } },
      { id: "val", name: "Validate & Categorize Request", raci: { L1: "R", PM: "A" } },
      { id: "appr", name: "Obtain Approval (if required)", raci: { APR: "R", PM: "A" } },
      { id: "ful", name: "Fulfill Request", raci: { L1: "R", L2: "C", PM: "A" } },
      { id: "conf", name: "Confirm Delivery with Requester", raci: { L1: "R", EU: "I" } },
      { id: "close", name: "Close Request", raci: { L1: "R", PM: "A" } },
    ],
    extraRoles: [
      { id: "APR", label: "Approver (Manager / Budget Owner)", defaultChecked: true },
      { id: "EU", label: "End User / Requester", defaultChecked: true },
      { id: "VN", label: "Vendor / Fulfillment Partner", defaultChecked: false },
    ],
    sipoc: {
      suppliers: ["End Users", "Service Catalog", "HR / Procurement"],
      inputs: ["Service request", "Approval", "Catalog item definition"],
      outputs: ["Fulfilled request", "Provisioned access / asset", "Closed ticket"],
      customers: ["End Users", "Business Units"],
    },
  },
  sla: {
    id: "sla", name: "Service Level Management",
    goal: "Negotiate, agree and monitor service levels to ensure they meet business needs.",
    pmLabel: "Service Level Manager",
    activities: [
      { id: "def", name: "Define Service Level Requirements", raci: { PM: "R", SO: "C", EU: "C" } },
      { id: "neg", name: "Negotiate & Agree SLA", raci: { PM: "R", SO: "A", EU: "C" } },
      { id: "mon", name: "Monitor Service Performance", raci: { L2: "C", PM: "A", SO: "I" } },
      { id: "rep", name: "Report SLA Performance", raci: { PM: "R", SO: "I", EU: "I" } },
      { id: "rev", name: "Review & Improve SLA", raci: { PM: "R", SO: "A", EU: "C" } },
    ],
    extraRoles: [
      { id: "SO", label: "Service Owner", defaultChecked: true },
      { id: "EU", label: "Business Relationship Manager / Customer", defaultChecked: true },
      { id: "VN", label: "Vendor (Underpinning Contracts)", defaultChecked: false },
    ],
    sipoc: {
      suppliers: ["Business Stakeholders", "Service Owners", "Vendors"],
      inputs: ["Business requirements", "Performance data", "Underpinning contracts"],
      outputs: ["Signed SLA", "Performance reports", "Improvement plan"],
      customers: ["Business Units", "Executive Management"],
    },
  },
  knowledge: {
    id: "knowledge", name: "Knowledge Management",
    goal: "Ensure the right information is delivered to the right people to enable informed decisions.",
    pmLabel: "Knowledge Manager",
    activities: [
      { id: "gap", name: "Identify Knowledge Gap", raci: { L1: "R", L2: "C", PM: "A" } },
      { id: "create", name: "Create Knowledge Article", raci: { L2: "R", L3: "C", PM: "A" } },
      { id: "valid", name: "Review & Validate Article", raci: { PM: "R", L3: "C" } },
      { id: "pub", name: "Publish to Knowledge Base", raci: { PM: "A", L1: "I" } },
      { id: "use", name: "Use Article in Resolution", raci: { L1: "R", L2: "R" } },
      { id: "retire", name: "Retire / Update Outdated Article", raci: { PM: "R", L2: "C" } },
    ],
    extraRoles: [
      { id: "SO", label: "Service Owner", defaultChecked: false },
      { id: "EU", label: "End User (Self-Service)", defaultChecked: false },
    ],
    sipoc: {
      suppliers: ["Support Teams", "Subject Matter Experts", "Problem Management"],
      inputs: ["Resolved tickets", "SME input", "Knowledge gap reports"],
      outputs: ["Published KB article", "Self-service content", "Updated KEDB"],
      customers: ["Service Desk", "End Users"],
    },
  },
  release: {
    id: "release", name: "Release Management",
    goal: "Plan, schedule and control the build, test and deployment of releases into production.",
    pmLabel: "Release Manager",
    activities: [
      { id: "plan", name: "Plan Release", raci: { PM: "R", SO: "C", CAB: "I" } },
      { id: "build", name: "Build & Package Release", raci: { L3: "R", VN: "C", PM: "A" } },
      { id: "test", name: "Test Release", raci: { TST: "R", L3: "C", PM: "A" } },
      { id: "approve", name: "Approve for Deployment", raci: { CAB: "A", PM: "R" } },
      { id: "deploy", name: "Deploy to Production", raci: { L2: "R", L3: "R", PM: "A" } },
      { id: "rev", name: "Post-Release Review", raci: { PM: "R", SO: "C", CAB: "I" } },
    ],
    extraRoles: [
      { id: "CAB", label: "Change Advisory Board (CAB)", defaultChecked: true },
      { id: "TST", label: "Test Manager / QA", defaultChecked: true },
      { id: "SO", label: "Service Owner", defaultChecked: false },
      { id: "VN", label: "Vendor / Third-Party", defaultChecked: false },
    ],
    sipoc: {
      suppliers: ["Development Teams", "Change Management", "Vendors"],
      inputs: ["Approved changes", "Build artifacts", "Test plan"],
      outputs: ["Deployed release", "Release notes", "Updated CMDB"],
      customers: ["End Users", "Service Owner", "Operations"],
    },
  },
  asset: {
    id: "asset", name: "IT Asset & Configuration Management",
    goal: "Maintain accurate, trusted information on assets and configuration items across their lifecycle.",
    pmLabel: "Asset / Configuration Manager",
    activities: [
      { id: "id", name: "Identify & Record Asset / CI", raci: { L1: "C", PM: "A" } },
      { id: "class", name: "Classify & Relate CIs", raci: { PM: "R", L3: "C" } },
      { id: "maintain", name: "Maintain CMDB", raci: { PM: "R", L2: "C" } },
      { id: "audit", name: "Audit & Verify Assets", raci: { PM: "A", FIN: "C" } },
      { id: "life", name: "Track Asset Lifecycle (procure–retire)", raci: { PM: "R", FIN: "C", VN: "C" } },
    ],
    extraRoles: [
      { id: "FIN", label: "Finance / Procurement", defaultChecked: false },
      { id: "VN", label: "Vendor / Supplier", defaultChecked: false },
      { id: "SO", label: "Service Owner", defaultChecked: false },
    ],
    sipoc: {
      suppliers: ["Procurement", "Vendors", "IT Operations"],
      inputs: ["Purchase orders", "Discovery scan data", "Asset requests"],
      outputs: ["Accurate CMDB", "Asset register", "Compliance report"],
      customers: ["Finance", "IT Management", "Audit / Compliance"],
    },
  },
};

const PROCESS_ORDER = ["incident", "problem", "change", "request", "sla", "knowledge", "release", "asset"];

/* ----------------------------- HELPERS ----------------------------- */
function roleCatalogFor(process, levels) {
  const levelRoles = LEVEL_LABELS.slice(0, levels).map((label, i) => ({
    id: `L${i + 1}`, label, group: "level",
  }));
  const pmRole = { id: "PM", label: process.pmLabel, group: "process" };
  const extra = process.extraRoles.map((r) => ({ ...r, group: "extra" }));
  return [...levelRoles, pmRole, ...extra];
}

function computeOutputs(record) {
  const process = PROCESSES[record.processId];
  const fullCatalog = roleCatalogFor(process, record.levels);
  const roleCatalog = fullCatalog.filter((r) => record.roles.includes(r.id));
  const activities = process.activities.map((a) => {
    const raci = {};
    roleCatalog.forEach((r) => { if (a.raci[r.id]) raci[r.id] = a.raci[r.id]; });
    return { ...a, raci };
  });
  return { process, roleCatalog, activities, sipoc: process.sipoc };
}

function primaryRole(activity, roleCatalog) {
  let r = roleCatalog.find((rc) => activity.raci[rc.id] === "R");
  if (!r) r = roleCatalog.find((rc) => activity.raci[rc.id] === "A");
  return r || roleCatalog[0];
}

function wrapLabel(text, maxChars = 15) {
  const words = text.split(" ");
  const lines = [];
  let cur = "";
  words.forEach((w) => {
    if ((cur + " " + w).trim().length > maxChars && cur) { lines.push(cur.trim()); cur = w; }
    else cur = (cur + " " + w).trim();
  });
  if (cur) lines.push(cur);
  return lines.slice(0, 3);
}

const NODE_W = 168;
const NODE_H = 60;
const LEFT_MARGIN = 240;
const TOP_MARGIN = 32;
const LANE_H = 108;
const COL_W = 220;

function computeDefaultPositions(roleCatalog, activities) {
  const laneIndex = {};
  roleCatalog.forEach((r, i) => { laneIndex[r.id] = i; });
  const out = {};
  activities.forEach((a, i) => {
    const role = primaryRole(a, roleCatalog);
    const lane = laneIndex[role?.id] ?? 0;
    out[a.id] = {
      pos: { x: LEFT_MARGIN + i * COL_W + COL_W / 2, y: TOP_MARGIN + lane * LANE_H + LANE_H / 2 },
      role,
      code: a.raci[role?.id] || "",
    };
  });
  return out;
}

/* ----------------------------- STORAGE ----------------------------- */
/* Full records (including levels/roles/layout/names) are stored together in
   one index key, so the dashboard and result view always have everything
   they need without extra round trips. */
const INDEX_KEY = "process-index";
async function loadIndex() {
  try {
    const res = await window.storage.get(INDEX_KEY, false);
    return res ? JSON.parse(res.value) : [];
  } catch { return []; }
}
async function saveIndex(list) {
  await window.storage.set(INDEX_KEY, JSON.stringify(list), false);
}

/* ----------------------------- SVG PROCESS MAP (draggable + renamable) ----------------------------- */
function ProcessMapSVG({ roleCatalog, activities, layoutOverrides, nameOverrides, onNodeMove, onNodeMoveCommit, onRename }) {
  const svgRef = useRef(null);
  const dragRef = useRef(null);
  const [dragId, setDragId] = useState(null);

  const basePositions = useMemo(() => computeDefaultPositions(roleCatalog, activities), [roleCatalog, activities]);

  const positions = useMemo(() => {
    const merged = {};
    activities.forEach((a) => {
      merged[a.id] = layoutOverrides?.[a.id] || basePositions[a.id]?.pos || { x: 0, y: 0 };
    });
    return merged;
  }, [basePositions, layoutOverrides, activities]);

  function clientToSvg(clientX, clientY) {
    const svg = svgRef.current;
    if (!svg) return { x: clientX, y: clientY };
    const pt = svg.createSVGPoint();
    pt.x = clientX; pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: clientX, y: clientY };
    const transformed = pt.matrixTransform(ctm.inverse());
    return { x: transformed.x, y: transformed.y };
  }

  function handleMouseDown(id, e) {
    e.preventDefault();
    const startSvg = clientToSvg(e.clientX, e.clientY);
    dragRef.current = { id, startSvg, startPos: positions[id] };
    setDragId(id);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }
  function handleMouseMove(e) {
    if (!dragRef.current) return;
    const cur = clientToSvg(e.clientX, e.clientY);
    const dx = cur.x - dragRef.current.startSvg.x;
    const dy = cur.y - dragRef.current.startSvg.y;
    const newPos = {
      x: Math.max(NODE_W / 2 + 10, dragRef.current.startPos.x + dx),
      y: Math.max(NODE_H / 2 + 10, dragRef.current.startPos.y + dy),
    };
    onNodeMove(dragRef.current.id, newPos);
  }
  function handleMouseUp() {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    if (dragRef.current) onNodeMoveCommit();
    dragRef.current = null;
    setDragId(null);
  }
  useEffect(() => () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const allX = Object.values(positions).map((p) => p.x);
  const allY = Object.values(positions).map((p) => p.y);
  const width = Math.max(LEFT_MARGIN + activities.length * COL_W + 40, Math.max(...allX, 0) + NODE_W / 2 + 60);
  const laneAreaHeight = TOP_MARGIN + roleCatalog.length * LANE_H + 24;
  const height = Math.max(laneAreaHeight, Math.max(...allY, 0) + NODE_H / 2 + 40);

  return (
    <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} width="100%" style={{ minWidth: width, display: "block" }}>
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#7C8A96" />
        </marker>
        <filter id="nodeShadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="2" stdDeviation="3.2" floodColor="#1B2430" floodOpacity="0.28" />
        </filter>
      </defs>

      {/* lane bands */}
      {roleCatalog.map((r, i) => (
        <g key={r.id}>
          <rect x="0" y={TOP_MARGIN + i * LANE_H} width={width} height={LANE_H}
            fill={i % 2 === 0 ? "#FFFFFF" : "#F4F6F7"} />
          <line x1={LEFT_MARGIN - 14} y1={TOP_MARGIN + i * LANE_H} x2={width} y2={TOP_MARGIN + i * LANE_H} stroke="#E4E8EB" strokeWidth="1" />
          <text x="18" y={TOP_MARGIN + i * LANE_H + LANE_H / 2 - 8} fontFamily="IBM Plex Mono" fontSize="12" fill="#3C4A56" fontWeight="600">
            {r.label.length > 24 ? r.label.slice(0, 23) + "…" : r.label}
          </text>
          <text x="18" y={TOP_MARGIN + i * LANE_H + LANE_H / 2 + 12} fontFamily="IBM Plex Mono" fontSize="10.5" fill="#B24A1D" fontWeight="700">
            {r.id}
          </text>
        </g>
      ))}
      <line x1={LEFT_MARGIN - 14} y1={TOP_MARGIN} x2={LEFT_MARGIN - 14} y2={height - 16} stroke="#C7CDD2" strokeWidth="1.4" />

      {/* connectors */}
      {activities.slice(1).map((a, i) => {
        const p = positions[activities[i].id];
        const n = positions[a.id];
        const x1 = p.x + NODE_W / 2, y1 = p.y;
        const x2 = n.x - NODE_W / 2, y2 = n.y;
        const midX = (x1 + x2) / 2;
        const path = `M${x1},${y1} C${midX},${y1} ${midX},${y2} ${x2},${y2}`;
        return <path key={a.id} d={path} fill="none" stroke="#7C8A96" strokeWidth="1.8" markerEnd="url(#arrow)" />;
      })}

      {/* nodes */}
      {activities.map((a, i) => {
        const pos = positions[a.id];
        const base = basePositions[a.id];
        const displayName = nameOverrides?.[a.id] || a.name;
        const roleColor = base?.code ? RACI_META[base.code]?.color : "#2C5985";
        return (
          <g key={a.id}
            onMouseDown={(e) => handleMouseDown(a.id, e)}
            onDoubleClick={() => onRename(a.id, displayName)}
            style={{ cursor: dragId === a.id ? "grabbing" : "grab" }}>
            <rect x={pos.x - NODE_W / 2} y={pos.y - NODE_H / 2} width={NODE_W} height={NODE_H} rx="9"
              fill="#1B2430" filter="url(#nodeShadow)" />
            <rect x={pos.x - NODE_W / 2} y={pos.y - NODE_H / 2} width="30" height={NODE_H} rx="9"
              fill={roleColor || "#2C5985"} />
            <rect x={pos.x - NODE_W / 2 + 15} y={pos.y - NODE_H / 2} width="15" height={NODE_H} fill={roleColor || "#2C5985"} />
            <text x={pos.x - NODE_W / 2 + 15} y={pos.y + 5} textAnchor="middle" fontFamily="IBM Plex Mono"
              fontSize="13" fontWeight="700" fill="#FFFFFF">{i + 1}</text>
            {wrapLabel(displayName, 16).map((line, li, arr) => (
              <text key={li} x={pos.x + 12} y={pos.y - ((arr.length - 1) * 6.5) + li * 13}
                textAnchor="middle" fontFamily="Inter" fontSize="11" fontWeight="600" fill="#F3F5F6">
                {line}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/* ----------------------------- SMALL UI PARTS ----------------------------- */
function Chip({ code }) {
  if (!code) return <span style={{ color: "#D8DCDF" }}>·</span>;
  const meta = RACI_META[code];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 30, height: 30, borderRadius: 7, fontFamily: "IBM Plex Mono",
      fontWeight: 700, fontSize: 13, color: "#fff", background: meta.color,
      boxShadow: "0 1px 2px rgba(27,36,48,0.18)",
    }}>{code}</span>
  );
}

function OptionCard({ selected, onClick, title, subtitle, icon }) {
  return (
    <button onClick={onClick} className="opt-card" data-selected={selected}>
      <div className="opt-icon">{icon}</div>
      <div>
        <div className="opt-title">{title}</div>
        {subtitle && <div className="opt-sub">{subtitle}</div>}
      </div>
      {selected && <Check size={18} color="#2C5985" style={{ marginLeft: "auto" }} />}
    </button>
  );
}

/* ----------------------------- MAIN APP ----------------------------- */
export default function ITSMProcessStudio() {
  const [view, setView] = useState("loading"); // loading | dashboard | interview | result
  const [records, setRecords] = useState([]);
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState({ processId: null, levels: 3, roles: [] });
  const [activeId, setActiveId] = useState(null);
  const [resultTab, setResultTab] = useState("map");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const idx = await loadIndex();
      setRecords(idx);
      setView("dashboard");
    })();
  }, []);

  function startNew() {
    setDraft({ processId: null, levels: 3, roles: [] });
    setStep(0);
    setView("interview");
  }

  function chooseProcess(pid) {
    setDraft((d) => ({ ...d, processId: pid }));
    setStep(1);
  }

  function chooseLevels(n) {
    setDraft((d) => ({ ...d, levels: n }));
    setStep(2);
  }

  function enterRoleStep() {
    const process = PROCESSES[draft.processId];
    const catalog = roleCatalogFor(process, draft.levels);
    const defaults = catalog.filter((r) => r.group !== "extra" || r.defaultChecked).map((r) => r.id);
    setDraft((d) => ({ ...d, roles: defaults }));
  }

  useEffect(() => { if (step === 2 && draft.processId) enterRoleStep(); }, [step]);

  function toggleRole(id) {
    setDraft((d) => ({
      ...d,
      roles: d.roles.includes(id) ? d.roles.filter((r) => r !== id) : [...d.roles, id],
    }));
  }

  async function finishInterview() {
    setSaving(true);
    const process = PROCESSES[draft.processId];
    const sameType = records.filter((r) => r.processId === draft.processId).length;
    const name = sameType === 0 ? process.name : `${process.name} (${sameType + 1})`;
    const record = {
      id: `p_${Date.now()}`,
      name,
      processId: draft.processId,
      levels: draft.levels,
      roles: draft.roles,
      layout: {},
      names: {},
      createdAt: new Date().toISOString(),
    };
    const newIndex = [record, ...records];
    await saveIndex(newIndex);
    setRecords(newIndex);
    setActiveId(record.id);
    setResultTab("map");
    setSaving(false);
    setView("result");
  }

  async function openRecord(id) {
    setActiveId(id);
    setResultTab("map");
    setView("result");
  }

  async function removeRecord(id, e) {
    e.stopPropagation();
    const newIndex = records.filter((r) => r.id !== id);
    await saveIndex(newIndex);
    setRecords(newIndex);
  }

  async function updateRecord(id, patch) {
    const newIndex = records.map((r) => (r.id === id ? { ...r, ...patch } : r));
    await saveIndex(newIndex);
    setRecords(newIndex);
  }

  return (
    <div className="app">
      <style>{`
        ${FONT_IMPORT}
        .app { font-family: 'Inter', sans-serif; background: #EEF1F2; color: #1B2430; min-height: 640px; border-radius: 14px; overflow: hidden; border: 1px solid #DDE2E5; }

        .hero { background: linear-gradient(135deg, #171E28 0%, #22344A 55%, #2C5985 100%); padding: 40px 24px 34px 24px; text-align: center; position: relative; }
        .hero-badge { display:inline-flex; align-items:center; gap:7px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.18); color:#CFE0EE; font-family:'IBM Plex Mono'; font-size:10.5px; letter-spacing:1.2px; padding:6px 13px; border-radius:20px; margin-bottom:16px; }
        .hero-title { font-family:'Space Grotesk',sans-serif; font-weight:800; font-size:40px; letter-spacing:0.2px; color:#fff; margin:0; }
        .hero-sub { font-family:'Inter'; font-size:14px; color:#B9C7D4; margin:10px auto 0 auto; max-width:520px; }
        .subnav { display:flex; align-items:center; justify-content:center; gap:8px; background:#151B24; padding:11px 20px; }
        .subnav .tag { font-family:'IBM Plex Mono'; font-size:10.5px; color:#8598A8; letter-spacing:0.6px; }

        .body { padding: 32px; }
        .grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(230px,1fr)); gap: 14px; }
        .card { background:#fff; border:1px solid #E1E5E8; border-radius:10px; padding:18px; cursor:pointer; transition: all .15s ease; position:relative; }
        .card:hover { border-color:#2C5985; box-shadow: 0 3px 10px rgba(27,36,48,0.08); transform: translateY(-1px); }
        .card .del { position:absolute; top:10px; right:10px; opacity:0; transition:opacity .15s; color:#B24A1D; background:none; border:none; cursor:pointer; }
        .card:hover .del { opacity:1; }
        .card .pname { font-family:'Space Grotesk'; font-weight:700; font-size:15px; margin-bottom:6px; padding-right:20px; }
        .card .pmeta { font-family:'IBM Plex Mono'; font-size:10.5px; color:#7A8896; }
        .new-card { border:1.5px dashed #B7C0C7; background:transparent; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; color:#5C6B79; font-weight:600; min-height:110px; }
        .new-card:hover { border-color:#2C5985; color:#2C5985; }
        .section-title { font-family:'Space Grotesk'; font-weight:700; font-size:13px; text-transform:uppercase; letter-spacing:0.6px; color:#5C6B79; margin: 0 0 14px 0; text-align:center; }

        /* Interview — centered */
        .hstepper { display:flex; align-items:flex-start; justify-content:center; gap:4px; max-width:640px; margin:0 auto 36px auto; }
        .hstep { display:flex; flex-direction:column; align-items:center; gap:7px; width:130px; }
        .hstep-num { width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'IBM Plex Mono'; font-size:11.5px; font-weight:700; border:1.5px solid #C7CDD2; color:#8A97A3; background:#fff; flex-shrink:0; }
        .hstep[data-active="true"] .hstep-num { background:#2C5985; border-color:#2C5985; color:#fff; }
        .hstep[data-done="true"] .hstep-num { background:#1B2430; border-color:#1B2430; color:#fff; }
        .hstep-label { font-size:11px; text-align:center; color:#8A97A3; font-weight:500; line-height:1.3; }
        .hstep[data-active="true"] .hstep-label { color:#1B2430; font-weight:700; }
        .hstep-line { flex:1; height:1.5px; background:#C7CDD2; margin-top:12px; min-width:20px; }
        .hstep-line[data-done="true"] { background:#1B2430; }

        .q-col { max-width: 620px; margin: 0 auto; text-align:center; }
        .q-title { font-family:'Space Grotesk'; font-size:23px; font-weight:700; margin: 0 0 6px 0; }
        .q-sub { color:#5C6B79; font-size:13.5px; margin-bottom:24px; }
        .opt-list { display:flex; flex-direction:column; gap:9px; text-align:left; }
        .opt-card { display:flex; align-items:center; gap:12px; text-align:left; padding:14px 16px; background:#fff; border:1.5px solid #E1E5E8; border-radius:9px; cursor:pointer; font-family:'Inter'; transition: all .12s ease; width:100%; }
        .opt-card:hover { border-color:#8FA6BA; }
        .opt-card[data-selected="true"] { border-color:#2C5985; background:#F0F5F9; }
        .opt-icon { width:32px;height:32px;border-radius:7px;background:#EEF1F2; display:flex;align-items:center;justify-content:center; color:#2C5985; flex-shrink:0; }
        .opt-title { font-weight:600; font-size:13.5px; }
        .opt-sub { font-size:11.5px; color:#7A8896; margin-top:1px; }
        .role-group { margin-bottom: 22px; text-align:center; }
        .role-group-label { font-family:'IBM Plex Mono'; font-size:10.5px; color:#8A97A3; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:10px; }
        .locked-chip { display:inline-flex; align-items:center; gap:6px; background:#1B2430; color:#fff; font-size:12px; font-weight:500; padding:7px 12px; border-radius:20px; margin:0 6px 6px 0; font-family:'IBM Plex Mono'; }
        .toggle-chip { display:inline-flex; align-items:center; gap:6px; border:1.5px solid #D3D9DD; background:#fff; font-size:12px; font-weight:500; padding:7px 12px; border-radius:20px; margin:0 6px 6px 0; cursor:pointer; }
        .toggle-chip[data-on="true"] { border-color:#2C5985; background:#F0F5F9; color:#1B2430; }
        .nav-row { display:flex; gap:10px; margin-top:26px; justify-content:center; }
        .btn { font-family:'Inter'; font-weight:600; font-size:13.5px; padding:10px 18px; border-radius:8px; border:none; cursor:pointer; display:inline-flex; align-items:center; gap:6px; }
        .btn-primary { background:#2C5985; color:#fff; }
        .btn-primary:hover { background:#25496D; }
        .btn-ghost { background:transparent; color:#5C6B79; border:1.5px solid #D3D9DD; }
        .btn-ghost:hover { border-color:#8FA6BA; color:#1B2430; }
        .btn-sm { padding:7px 12px; font-size:12px; }
        .review-panel { text-align:left; }

        /* Result screen */
        .result-head { text-align:center; margin-bottom:20px; }
        .result-name { font-family:'Space Grotesk'; font-size:23px; font-weight:700; }
        .result-goal { color:#5C6B79; font-size:13px; max-width:600px; margin:6px auto 0 auto;}
        .tabs { display:flex; gap:4px; background:#fff; border:1px solid #E1E5E8; border-radius:9px; padding:4px; width:fit-content; margin:0 auto 18px auto; }
        .tab { padding:9px 17px; border-radius:6px; font-size:13px; font-weight:600; color:#5C6B79; cursor:pointer; display:flex; align-items:center; gap:6px; }
        .tab[data-active="true"] { background:#1B2430; color:#fff; }
        .panel { background:#fff; border:1px solid #E1E5E8; border-radius:14px; padding:24px; overflow-x:auto; box-shadow: 0 1px 3px rgba(27,36,48,0.05); }
        .panel-caption { font-family:'IBM Plex Mono'; font-size:11px; color:#8A97A3; margin-bottom:16px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; }

        table.sipoc { border-collapse: separate; border-spacing:0; width:100%; border-radius:10px; overflow:hidden; border:1px solid #E4E8EB; }
        table.sipoc th { font-family:'Space Grotesk'; font-size:12.5px; letter-spacing:0.3px; color:#fff; padding:13px 14px; text-align:left; }
        table.sipoc th:nth-child(1) { background:#1B2430; }
        table.sipoc th:nth-child(2) { background:#2C5985; }
        table.sipoc th:nth-child(3) { background:#B24A1D; }
        table.sipoc th:nth-child(4) { background:#2C5985; }
        table.sipoc th:nth-child(5) { background:#1B2430; }
        table.sipoc td { border-bottom:1px solid #EDF0F1; padding:12px 14px; font-size:13px; vertical-align:top; line-height:1.45; }
        table.sipoc tr:last-child td { border-bottom:none; }
        table.sipoc tr:nth-child(even) td { background:#F8F9FA; }
        table.sipoc tr:hover td { background:#F0F5F9; }
        table.sipoc td:nth-child(3) { font-weight:600; color:#1B2430; }

        table.raci { border-collapse: separate; border-spacing:0; width:100%; }
        table.raci th { font-family:'IBM Plex Mono'; font-size:10.5px; color:#5C6B79; padding:10px 8px; text-align:center; border-bottom:2.5px solid #1B2430; white-space:nowrap; vertical-align:bottom; }
        table.raci th:first-child { text-align:left; }
        table.raci td { border-bottom:1px solid #EDF0F1; padding:10px 8px; text-align:center; font-size:13px; }
        table.raci tbody tr:hover td { background:#F5F8F9; }
        table.raci td.actname { text-align:left; font-weight:600; font-size:13px; padding-right:16px; white-space:nowrap; }
        table.raci td.actname span.num { display:inline-flex; align-items:center; justify-content:center; width:20px; height:20px; border-radius:5px; background:#1B2430; color:#fff; font-family:'IBM Plex Mono'; font-size:10.5px; margin-right:8px; }
        .legend { display:flex; gap:16px; margin-top:20px; flex-wrap:wrap; border-top:1px solid #EDF0F1; padding-top:16px; }
        .legend-item { display:flex; align-items:center; gap:7px; font-size:12px; color:#5C6B79; font-weight:500; }

        .map-toolbar { display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:14px; flex-wrap:wrap; }
        .map-hint { display:flex; align-items:center; gap:16px; font-size:11.5px; color:#8A97A3; flex-wrap:wrap; }
        .map-hint span { display:flex; align-items:center; gap:5px; }
        .map-scroll { overflow-x:auto; border-radius:10px; }

        .back-link { display:flex; align-items:center; gap:6px; color:#5C6B79; font-size:12.5px; cursor:pointer; margin-bottom:18px; font-weight:600; justify-content:center; }
        .back-link:hover { color:#1B2430; }
        .empty { text-align:center; padding: 60px 20px; color:#8A97A3; }
        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      <div className="hero">
        <div className="hero-badge"><GitBranch size={13} /> ITSM PROCESS STUDIO</div>
        <h1 className="hero-title">Service Excellence Edge</h1>
        <p className="hero-sub">Answer a short click-through interview and get a process map, SIPOC table and RACI matrix — built to your organization's structure.</p>
      </div>
      <div className="subnav"><span className="tag">PROCESS MAP · SIPOC · RACI MATRIX</span></div>

      <div className="body">
        {view === "loading" && (
          <div className="empty"><Loader2 className="spin" size={20} /> Loading…</div>
        )}

        {view === "dashboard" && (
          <Dashboard records={records} onOpen={openRecord} onNew={startNew} onDelete={removeRecord} />
        )}

        {view === "interview" && (
          <Interview
            step={step} setStep={setStep} draft={draft}
            chooseProcess={chooseProcess} chooseLevels={chooseLevels}
            toggleRole={toggleRole} finishInterview={finishInterview}
            saving={saving} onCancel={() => setView("dashboard")}
          />
        )}

        {view === "result" && activeId && (
          <Result
            record={records.find((r) => r.id === activeId)}
            resultTab={resultTab} setResultTab={setResultTab}
            onBack={() => setView("dashboard")}
            onUpdateRecord={updateRecord}
          />
        )}
      </div>
    </div>
  );
}

/* ----------------------------- DASHBOARD ----------------------------- */
function Dashboard({ records, onOpen, onNew, onDelete }) {
  return (
    <div>
      <p className="section-title">Your process interviews ({records.length})</p>
      <div className="grid">
        <div className="new-card card" onClick={onNew} style={{ cursor: "pointer" }}>
          <Plus size={20} />
          <span>Start new interview</span>
        </div>
        {records.map((r) => {
          const process = PROCESSES[r.processId];
          return (
            <div className="card" key={r.id} onClick={() => onOpen(r.id)}>
              <button className="del" onClick={(e) => onDelete(r.id, e)}><Trash2 size={15} /></button>
              <div className="pname">{r.name}</div>
              <div className="pmeta">{process?.name.toUpperCase()}</div>
              <div className="pmeta" style={{ marginTop: 4 }}>{new Date(r.createdAt).toLocaleDateString()}</div>
            </div>
          );
        })}
      </div>
      {records.length === 0 && (
        <p style={{ color: "#8A97A3", fontSize: 13, marginTop: 12, textAlign: "center" }}>
          No processes mapped yet. Start an interview to generate your first process map, SIPOC and RACI matrix.
        </p>
      )}
    </div>
  );
}

/* ----------------------------- INTERVIEW ----------------------------- */
const STEP_LABELS = ["ITIL Process", "Support Levels", "Roles Involved", "Review & Generate"];

function Interview({ step, setStep, draft, chooseProcess, chooseLevels, toggleRole, finishInterview, saving, onCancel }) {
  const process = draft.processId ? PROCESSES[draft.processId] : null;
  const catalog = process ? roleCatalogFor(process, draft.levels) : [];

  return (
    <div>
      <span className="back-link" onClick={onCancel}><ChevronLeft size={14} /> Back to dashboard</span>

      <div className="hstepper">
        {STEP_LABELS.map((label, i) => (
          <React.Fragment key={label}>
            <div className="hstep" data-active={i === step} data-done={i < step}>
              <div className="hstep-num">{i < step ? <Check size={12} /> : i + 1}</div>
              <div className="hstep-label">{label}</div>
            </div>
            {i < STEP_LABELS.length - 1 && <div className="hstep-line" data-done={i < step} />}
          </React.Fragment>
        ))}
      </div>

      {step === 0 && (
        <div className="q-col">
          <h2 className="q-title">Which ITIL/ITSM process are we mapping?</h2>
          <p className="q-sub">Pick the process this interview will build a process map, SIPOC table and RACI matrix for.</p>
          <div className="opt-list">
            {PROCESS_ORDER.map((pid) => (
              <OptionCard key={pid} selected={draft.processId === pid} onClick={() => chooseProcess(pid)}
                title={PROCESSES[pid].name} subtitle={PROCESSES[pid].goal}
                icon={<Layers size={15} />} />
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="q-col">
          <h2 className="q-title">How many levels of support exist in your organization?</h2>
          <p className="q-sub">This defines the support lanes used in your process map and RACI matrix.</p>
          <div className="opt-list">
            {[1, 2, 3, 4].map((n) => (
              <OptionCard key={n} selected={draft.levels === n} onClick={() => chooseLevels(n)}
                title={`${n} Level${n > 1 ? "s" : ""} of Support`}
                subtitle={LEVEL_LABELS.slice(0, n).join(" → ")}
                icon={<Layers size={15} />} />
            ))}
          </div>
          <div className="nav-row">
            <button className="btn btn-ghost" onClick={() => setStep(0)}><ChevronLeft size={14} /> Back</button>
          </div>
        </div>
      )}

      {step === 2 && process && (
        <div className="q-col">
          <h2 className="q-title">Which roles are involved in {process.name}?</h2>
          <p className="q-sub">Support levels and the process owner are always included. Toggle any additional roles present in your organization.</p>

          <div className="role-group">
            <div className="role-group-label">Always included</div>
            {catalog.filter((r) => r.group !== "extra").map((r) => (
              <span className="locked-chip" key={r.id}><Check size={11} /> {r.label}</span>
            ))}
          </div>

          <div className="role-group">
            <div className="role-group-label">Additional roles in your organization</div>
            {catalog.filter((r) => r.group === "extra").map((r) => (
              <span key={r.id} className="toggle-chip" data-on={draft.roles.includes(r.id)} onClick={() => toggleRole(r.id)}>
                {draft.roles.includes(r.id) ? <Check size={11} /> : <Plus size={11} />} {r.label}
              </span>
            ))}
          </div>

          <div className="nav-row">
            <button className="btn btn-ghost" onClick={() => setStep(1)}><ChevronLeft size={14} /> Back</button>
            <button className="btn btn-primary" onClick={() => setStep(3)}>Review <ArrowRight size={14} /></button>
          </div>
        </div>
      )}

      {step === 3 && process && (
        <div className="q-col">
          <h2 className="q-title">Review your inputs</h2>
          <p className="q-sub">Confirm before generating the process map, SIPOC and RACI matrix.</p>
          <div className="panel review-panel">
            <p style={{ fontSize: 13, marginBottom: 10 }}><strong>Process:</strong> {process.name}</p>
            <p style={{ fontSize: 13, marginBottom: 10 }}><strong>Support levels:</strong> {draft.levels} — {LEVEL_LABELS.slice(0, draft.levels).join(", ")}</p>
            <p style={{ fontSize: 13, marginBottom: 0 }}><strong>Roles:</strong> {catalog.filter((r) => draft.roles.includes(r.id) || r.group !== "extra").map((r) => r.label).join(", ")}</p>
          </div>
          <div className="nav-row">
            <button className="btn btn-ghost" onClick={() => setStep(2)}><ChevronLeft size={14} /> Back</button>
            <button className="btn btn-primary" onClick={finishInterview} disabled={saving}>
              {saving ? <Loader2 size={14} className="spin" /> : <Sparkles size={14} />} Generate outputs
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------------------------- RESULT ----------------------------- */
function Result({ record, resultTab, setResultTab, onBack, onUpdateRecord }) {
  const [layoutOverrides, setLayoutOverrides] = useState(record?.layout || {});
  const [nameOverrides, setNameOverrides] = useState(record?.names || {});

  useEffect(() => {
    setLayoutOverrides(record?.layout || {});
    setNameOverrides(record?.names || {});
  }, [record?.id]);

  if (!record) return null;
  const { process, roleCatalog, activities, sipoc } = useMemo(() => computeOutputs(record), [record]);
  const displayActivities = activities.map((a) => ({ ...a, name: nameOverrides[a.id] || a.name }));

  function handleNodeMove(id, pos) {
    setLayoutOverrides((prev) => ({ ...prev, [id]: pos }));
  }
  function handleNodeMoveCommit() {
    setLayoutOverrides((prev) => {
      onUpdateRecord(record.id, { layout: prev, names: nameOverrides });
      return prev;
    });
  }
  function handleRename(id, currentName) {
    const next = typeof window !== "undefined" ? window.prompt("Rename this step", currentName) : null;
    if (next && next.trim() && next.trim() !== currentName) {
      setNameOverrides((prev) => {
        const merged = { ...prev, [id]: next.trim() };
        onUpdateRecord(record.id, { layout: layoutOverrides, names: merged });
        return merged;
      });
    }
  }
  function handleResetLayout() {
    setLayoutOverrides({});
    onUpdateRecord(record.id, { layout: {}, names: nameOverrides });
  }

  return (
    <div>
      <span className="back-link" onClick={onBack}><ChevronLeft size={14} /> Back to dashboard</span>

      <div className="result-head">
        <div className="result-name">{record.name}</div>
        <div className="result-goal">{process.goal}</div>
      </div>

      <div className="tabs">
        <div className="tab" data-active={resultTab === "map"} onClick={() => setResultTab("map")}><GitBranch size={14} /> Process Map</div>
        <div className="tab" data-active={resultTab === "sipoc"} onClick={() => setResultTab("sipoc")}><ClipboardList size={14} /> SIPOC</div>
        <div className="tab" data-active={resultTab === "raci"} onClick={() => setResultTab("raci")}><Table2 size={14} /> RACI Matrix</div>
      </div>

      {resultTab === "map" && (
        <div className="panel">
          <div className="map-toolbar">
            <div className="map-hint">
              <span><Move size={13} /> Drag a step to move it</span>
              <span><Pencil size={13} /> Double-click a step to rename it</span>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={handleResetLayout}><RotateCcw size={13} /> Reset layout</button>
          </div>
          <div className="map-scroll">
            <ProcessMapSVG
              roleCatalog={roleCatalog} activities={activities}
              layoutOverrides={layoutOverrides} nameOverrides={nameOverrides}
              onNodeMove={handleNodeMove} onNodeMoveCommit={handleNodeMoveCommit} onRename={handleRename}
            />
          </div>
        </div>
      )}

      {resultTab === "sipoc" && (
        <div className="panel">
          <div className="panel-caption">SIPOC — SUPPLIERS · INPUTS · PROCESS · OUTPUTS · CUSTOMERS</div>
          <table className="sipoc">
            <thead>
              <tr>
                <th>Suppliers</th><th>Inputs</th><th>Process</th><th>Outputs</th><th>Customers</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.max(sipoc.suppliers.length, sipoc.inputs.length, displayActivities.length, sipoc.outputs.length, sipoc.customers.length) }).map((_, i) => (
                <tr key={i}>
                  <td>{sipoc.suppliers[i] || ""}</td>
                  <td>{sipoc.inputs[i] || ""}</td>
                  <td>{displayActivities[i] ? `${i + 1}. ${displayActivities[i].name}` : ""}</td>
                  <td>{sipoc.outputs[i] || ""}</td>
                  <td>{sipoc.customers[i] || ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {resultTab === "raci" && (
        <div className="panel">
          <div className="panel-caption">RACI MATRIX — WHO DOES WHAT</div>
          <table className="raci">
            <thead>
              <tr>
                <th>Activity</th>
                {roleCatalog.map((r) => <th key={r.id}>{r.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {displayActivities.map((a, i) => (
                <tr key={a.id}>
                  <td className="actname"><span className="num">{i + 1}</span>{a.name}</td>
                  {roleCatalog.map((r) => <td key={r.id}><Chip code={a.raci[r.id]} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="legend">
            {Object.entries(RACI_META).map(([code, meta]) => (
              <div className="legend-item" key={code}><Chip code={code} /> {meta.label}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
