import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import HomeBlogSection from '../components/HomeBlogSection'
import {
  ArrowRight,
  Play,
  CheckCircle,
  Calendar,
  Clock,
  Briefcase,
  User,
  Users,
  UserCheck,
  Star,
  Globe,
  Cpu,
  Robot,
  Hourglass,
  WarningOctagon,
  EyeSlash,
  FileText,
  ChatCenteredText,
  ShoppingCart,
  ShieldCheck,
  Coins,
  Database,
  TerminalWindow,
  SignIn,
  CurrencyDollar,
  FilePlus,
  EnvelopeOpen,
  Receipt,
  ClipboardText,
  Package,
  ChartLineUp,
  TrendDown,
  Calculator,
  ArrowsLeftRight,
  Medal,
  FileShield,
  TrendUp,
  PlugsConnected,
  RocketLaunch,
  Envelope,
  Phone,
  MapPin,
  Warehouse,
  Gear,
  Gauge,
  Wrench,
  ChartBar,
  Terminal,
  Check,
  Percent,
  ThumbsUp,
  Factory,
  Broadcast,
  Shield,
  ChevronDown,
  List,
  X
} from '../components/Icons'

const Zf = ["ERP Agentic AI", "Conversational ERP", "Browser AI", "Predictive Analytics"];

const Rf = [
  {
    num: "01",
    title: "Conversational Automation",
    desc: "Handle invoices, POs, GRNs, leads & deals via simple natural-language commands.",
    gradient: "from-blue-500 to-indigo-600",
    icon: ChatCenteredText
  },
  {
    num: "02",
    title: "End-to-End Procurement",
    desc: "POs, vendor invoices & subcontractor billing run on autopilot with ERP integration.",
    gradient: "from-green-500 to-teal-600",
    icon: ShoppingCart
  },
  {
    num: "03",
    title: "Smart Compliance",
    desc: "Automated workflows with real-time ERP reports, role-based access, and audit trails.",
    gradient: "from-purple-500 to-pink-600",
    icon: ShieldCheck
  },
  {
    num: "04",
    title: "Cost & Inventory Control",
    desc: "Project costing, budgeting & site-wise inventory always up-to-date and accurate.",
    gradient: "from-orange-500 to-red-600",
    icon: Coins
  },
  {
    num: "05",
    title: "Unified ERP + CRM",
    desc: "Natural-language access across your ERP & CRM - faster ops, fewer errors.",
    gradient: "from-cyan-500 to-blue-600",
    icon: Database
  },
  {
    num: "06",
    title: "RPA Log Intelligence",
    desc: "24/7 auto-detection of errors, root-cause analysis, and instant severity-based alerts.",
    gradient: "from-rose-500 to-pink-600",
    icon: TerminalWindow
  }
];

const qC = [
  { name: "Höganäs", desc: "AI ERP - Predictive operations & production schedule optimization", tag: "AI ERP" },
  { name: "Bharat Forge", desc: "AI ERP - Automated production workflows, quality detection", tag: "AI ERP" },
  { name: "Alfa Laval", desc: "AI ERP - Smart factory intelligence, inventory & downtime reduction", tag: "AI ERP" },
  { name: "Crompton Greaves", desc: "AI ERP - Real-time operational data & supply chain agility", tag: "AI ERP" },
  { name: "Al Amir Foods Industries LLC", desc: "ERP Automation - Manufacturing & production ops streamlining (built on SAP)", tag: "ERP Automation" },
  { name: "ARM Welders", desc: "ERP Automation - MRP, vendor management, approval workflows, inventory (built on SAP)", tag: "ERP Automation" }
];

const QC = [
  { title: "ERP-Native Expertise", desc: "Deep integration with SAP S/4HANA, SAP Build, and ERP/CRM - not bolt-on middleware.", icon: Cpu },
  { title: "60+ Projects Delivered", desc: "Proven track record across manufacturing, automotive, logistics, and government sectors.", icon: Shield },
  { title: "AI + IoT + ERP Together", desc: "We combine AI agents, IoT sensors, and enterprise systems for end-to-end automation.", icon: PlugsConnected },
  { title: "Fast Time to Value", desc: "Agile delivery with measurable ROI from the first deployment sprint.", icon: RocketLaunch }
];

const Ff = [
  { name: "Compare", href: "/compare" },
  { name: "About Us", href: "/about" },
  { name: "Measurable ROI", href: "/measurable-roi" },
  { name: "Blogs", href: "/blogs" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
  { name: "Live Demo", href: "/live-demo" }
];

// --- Custom Animated Widgets for Enterprise Repositioning ---

const HeroEcosystem = () => {
  return (
    <div className="w-full max-w-xl aspect-square relative bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-indigo-200/80 shadow-2xl shadow-indigo-100/50 overflow-hidden blueprint-grid-bg flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none animate-pulse-slow" />
      
      <svg className="w-full h-full overflow-visible" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="hero-flow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <radialGradient id="hero-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Orbit circle */}
        <circle cx="200" cy="200" r="125" fill="none" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1.5" strokeDasharray="6 12" className="circuit-line" />

        {/* Connections and packets */}
        {[
          { x: 200, y: 75, id: "ai-agents" },
          { x: 310, y: 135, id: "procurement" },
          { x: 310, y: 265, id: "inventory" },
          { x: 200, y: 325, id: "finance" },
          { x: 90, y: 265, id: "manufacturing" },
          { x: 90, y: 135, id: "analytics" }
        ].map((pt, idx) => (
          <g key={pt.id}>
            <line x1="200" y1="200" x2={pt.x} y2={pt.y} stroke="url(#hero-flow-grad)" strokeWidth="1.5" strokeOpacity="0.3" />
            {/* Outgoing packet */}
            <circle r="3.5" fill="#22d3ee" filter="drop-shadow(0 0 4px #22d3ee)">
              <animateMotion dur={`${2 + idx * 0.4}s`} repeatCount="indefinite" path={`M 200,200 L ${pt.x},${pt.y}`} />
            </circle>
            {/* Incoming packet */}
            <circle r="3.5" fill="#a855f7" filter="drop-shadow(0 0 4px #a855f7)">
              <animateMotion dur={`${2.3 + idx * 0.3}s`} repeatCount="indefinite" path={`M ${pt.x},${pt.y} L 200,200`} />
            </circle>
          </g>
        ))}

        {/* ERP Core Node */}
        <circle cx="200" cy="200" r="48" fill="url(#hero-core-glow)" />
        <g transform="translate(160, 160)">
          <circle cx="40" cy="40" r="36" fill="#ffffff" stroke="#6366f1" strokeWidth="2.5" className="shadow-lg" />
          <circle cx="40" cy="40" r="30" fill="rgba(99,102,241,0.06)" className="pulse-slow" />
          <text x="40" y="44" fill="#1e293b" fontSize="9" fontWeight="extrabold" textAnchor="middle" letterSpacing="0.8" className="font-sans">ERP Core</text>
        </g>

        {/* Orbit Nodes */}
        {[
          { label: "AI Agents", x: 200, y: 75, icon: Robot, color: "#a855f7" },
          { label: "Procurement", x: 310, y: 135, icon: ShoppingCart, color: "#6366f1" },
          { label: "Inventory", x: 310, y: 265, icon: Warehouse, color: "#06b6d4" },
          { label: "Finance", x: 200, y: 325, icon: Coins, color: "#10b981" },
          { label: "Manufacturing", x: 90, y: 265, icon: Factory, color: "#f59e0b" },
          { label: "Analytics", x: 90, y: 135, icon: ChartBar, color: "#ec4899" }
        ].map((node, idx) => {
          const Icon = node.icon;
          return (
            <motion.g 
              key={idx} 
              transform={`translate(${node.x - 22}, ${node.y - 22})`}
              whileHover={{ scale: 1.15 }}
            >
              <circle cx="22" cy="22" r="20" fill="#ffffff" stroke={node.color} strokeWidth="1.5" className="shadow-md" />
              <circle cx="22" cy="22" r="16" fill="rgba(255,255,255,0.8)" />
              <g transform="translate(12, 12)">
                <Icon size={20} style={{ color: node.color }} />
              </g>
              <text x="22" y="-10" fill="#475569" fontSize="8" fontWeight="bold" textAnchor="middle" className="font-mono">
                {node.label}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
};

const ConversationalAssistant = () => {
  const [step, setStep] = useState(0);
  const [typedCommand, setTypedCommand] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  
  const commandText = "Match and log invoice PDF for GRN #891";
  const reasoningSteps = [
    "Analyzing uploaded invoice attachment...",
    "Vendor identified: SteelCorp (ID: DE-8910)",
    "Line items parsed: 450 MT Structural Steel Plates, total amount $14,200",
    "Matching parameters with GRN #891... Match validated.",
    "Drafting ERP record entries for approval queue..."
  ];
  const apiLogs = [
    "POST https://api.agentfloww.local/sap/v1/Invoices",
    "Payload: { vendor: 'DE-8910', grn: 891, amt: 14200, items: 1 }",
    "Status: 201 Created | Transaction ID: TXN_891023B"
  ];
  const successResponse = "Invoice matched with GRN #891. Success! ERP Purchase Order updated.";

  useEffect(() => {
    let timer;
    if (step === 0) {
      setTypedCommand("");
      setResponseMsg("");
      const type = (currentIdx) => {
        if (currentIdx < commandText.length) {
          setTypedCommand(commandText.substring(0, currentIdx + 1));
          timer = setTimeout(() => type(currentIdx + 1), 50);
        } else {
          timer = setTimeout(() => setStep(1), 1000);
        }
      };
      type(0);
    } else if (step === 1) {
      timer = setTimeout(() => setStep(2), 2500);
    } else if (step === 2) {
      timer = setTimeout(() => setStep(3), 2000);
    } else if (step === 3) {
      const typeResponse = (currentIdx) => {
        if (currentIdx < successResponse.length) {
          setResponseMsg(successResponse.substring(0, currentIdx + 1));
          timer = setTimeout(() => typeResponse(currentIdx + 1), 30);
        } else {
          timer = setTimeout(() => setStep(0), 4000);
        }
      };
      typeResponse(0);
    }
    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="bg-white border border-indigo-150 rounded-2xl shadow-2xl shadow-purple-500/5 overflow-hidden max-w-lg mx-auto w-full h-[420px] flex flex-col font-mono text-sm text-slate-700">
      <div className="bg-slate-50/90 px-4 py-3.5 border-b border-indigo-50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping" />
          <span className="text-xs text-slate-700 font-bold uppercase tracking-wider">Conversational ERP Shell</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-red-400" />
          <span className="w-2 h-2 rounded-full bg-yellow-400" />
          <span className="w-2 h-2 rounded-full bg-green-400" />
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between overflow-y-auto space-y-4">
        <div className="space-y-1 text-left">
          <div className="flex items-center space-x-2">
            <span className="text-purple-600 font-bold text-sm md:text-base">user@agentfloww:~$</span>
            <span className={step === 0 ? "streaming-cursor text-slate-900 font-bold text-sm md:text-base" : "text-slate-900 font-bold text-sm md:text-base"}>
              {typedCommand}
            </span>
          </div>
        </div>

        {step >= 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2 border-l border-indigo-200 pl-3.5 text-left">
            <div className="text-xs font-bold text-indigo-650 tracking-wider uppercase mb-1">AI Reasoning Logs:</div>
            {reasoningSteps.slice(0, step === 1 ? 3 : 5).map((log, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -5 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: idx * 0.3 }} 
                key={idx} 
                className="text-slate-700 text-xs font-medium"
              >
                ● {log}
              </motion.div>
            ))}
          </motion.div>
        )}

        {step >= 2 && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-50 border border-indigo-100 p-3.5 rounded-lg text-indigo-900 text-xs space-y-1.5 text-left">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-1.5">
              <span className="font-bold text-slate-600">ERP Write-Back Activity Log:</span>
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase animate-pulse">Running</span>
            </div>
            {apiLogs.map((log, idx) => (
              <div key={idx} className="font-mono text-xs text-slate-700">{log}</div>
            ))}
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-purple-50 border border-purple-200/80 rounded-xl p-4 flex items-start space-x-3 text-left">
            <Robot size={22} className="text-purple-600 flex-shrink-0 mt-0.5 animate-pulse" />
            <div className="flex-1">
              <div className="text-[11px] font-bold text-purple-600 tracking-wider uppercase mb-1">ERP Agent response:</div>
              <p className="text-sm font-bold text-purple-900 streaming-cursor leading-relaxed">{responseMsg}</p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="bg-slate-50/90 px-4 py-2.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
        <div>Database sync: Connected</div>
        <div className="flex items-center space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>System active</span>
        </div>
      </div>
    </div>
  );
};

const BrowserSimulation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({ vendor: "", sku: "", qty: "", invoiceNum: "" });

  const steps = [
    { label: "ERP Login", detail: "Authenticating session secure token..." },
    { label: "Read Email", detail: "Opening inbox and scanning incoming vendor invoice attachments..." },
    { label: "Extract RFQ", detail: "Extracting RFQ line items and matching vendor parameters..." },
    { label: "Generate PO", detail: "Auto-populating SAP Purchase Order screen..." },
    { label: "Invoice Processing", detail: "Submitting invoice document via SAP Build Process Automation..." },
    { label: "Goods Receipt", detail: "Verifying stocks and generating transactional logs..." }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => {
        const next = (prev + 1) % steps.length;
        if (next === 0) {
          setFormData({ vendor: "", sku: "", qty: "", invoiceNum: "" });
        } else if (next === 1) {
          setFormData({ vendor: "SteelCorp", sku: "", qty: "", invoiceNum: "" });
        } else if (next === 2) {
          setFormData({ vendor: "SteelCorp", sku: "STEEL-PLATE-A", qty: "", invoiceNum: "" });
        } else if (next === 3) {
          setFormData({ vendor: "SteelCorp", sku: "STEEL-PLATE-A", qty: "450 MT", invoiceNum: "" });
        } else if (next === 4) {
          setFormData({ vendor: "SteelCorp", sku: "STEEL-PLATE-A", qty: "450 MT", invoiceNum: "INV-89102" });
        }
        return next;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden max-w-lg mx-auto w-full h-[420px] flex flex-col font-sans">
      <div className="bg-slate-100 border-b border-slate-200 px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-2 flex-shrink-0">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="bg-white border border-slate-200 rounded-lg px-4 py-1 text-xs text-slate-600 font-mono flex items-center justify-center space-x-1.5 w-64 select-all truncate">
          <span className="text-emerald-500">🔒</span>
          <span>https://sap.agentfloww.local/sap/webgui</span>
        </div>
        <div className="w-8 flex-shrink-0" />
      </div>

      <div className="flex-1 flex flex-col justify-between p-5 relative bg-slate-50">
        <motion.div 
          animate={{
            x: activeStep === 0 ? 30 : activeStep === 1 ? 160 : activeStep === 2 ? 180 : activeStep === 3 ? 280 : activeStep === 4 ? 300 : 250,
            y: activeStep === 0 ? 50 : activeStep === 1 ? 85 : activeStep === 2 ? 125 : activeStep === 3 ? 165 : activeStep === 4 ? 215 : 190
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute pointer-events-none z-35 w-5 h-5 text-indigo-650 drop-shadow"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.5,1.5 L20.5,12.5 L12.5,14.5 L17.5,21.5 L14.5,22.5 L9.5,15.5 L4.5,18.5 Z" stroke="white" strokeWidth="1.5" />
          </svg>
        </motion.div>

        <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 mb-3.5">
          <span className="text-sm font-bold text-slate-800">SAP Business One Web Portal</span>
          <span className="text-[11px] bg-indigo-50 border border-indigo-100 text-indigo-600 px-2 py-0.5 rounded font-mono font-bold">Agent Mode</span>
        </div>

        <div className="grid grid-cols-6 gap-1 mb-4">
          {steps.map((st, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center transition-all ${activeStep >= idx ? "bg-indigo-650 border-indigo-600" : "bg-white border-slate-300"}`} />
              <span className={`text-[9px] font-bold mt-1 text-center truncate w-full ${activeStep === idx ? "text-indigo-600 font-extrabold" : "text-slate-400"}`}>
                {st.label}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 flex-1 flex flex-col justify-between shadow-inner">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-left">
              <span className="text-slate-500 font-medium">Vendor ID:</span>
              <span className={`font-mono bg-slate-55/30 border px-3 py-1 rounded w-44 text-left transition-all ${formData.vendor ? "text-slate-800 font-bold border-indigo-200 bg-white" : "text-transparent border-slate-100"}`}>{formData.vendor || "Placeholder"}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-left">
              <span className="text-slate-500 font-medium">Material SKU:</span>
              <span className={`font-mono bg-slate-55/30 border px-3 py-1 rounded w-44 text-left transition-all ${formData.sku ? "text-slate-800 font-bold border-indigo-200 bg-white" : "text-transparent border-slate-100"}`}>{formData.sku || "Placeholder"}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-left">
              <span className="text-slate-500 font-medium">Qty Order:</span>
              <span className={`font-mono bg-slate-55/30 border px-3 py-1 rounded w-44 text-left transition-all ${formData.qty ? "text-slate-800 font-bold border-indigo-200 bg-white" : "text-transparent border-slate-100"}`}>{formData.qty || "Placeholder"}</span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-600 font-mono italic text-left">{steps[activeStep].detail}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase ${activeStep === 5 ? "bg-emerald-100 text-emerald-700" : "bg-indigo-100 text-indigo-700"}`}>
              {activeStep === 5 ? "Complete" : "Processing"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PredictiveDashboard = () => {
  const [activeTab, setActiveTab] = useState("kpis");
  const [telemetry, setTelemetry] = useState({ forecast: 850, loss: 12.4, compliance: 99.2 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry(prev => ({
        forecast: prev.forecast + Math.floor(Math.random() * 5 - 2),
        loss: +(prev.loss + (Math.random() * 0.4 - 0.2)).toFixed(1),
        compliance: +(prev.compliance + (Math.random() * 0.1 - 0.05)).toFixed(2)
      }));
    }, 2050);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white border border-indigo-150 rounded-3xl p-6 shadow-2xl shadow-indigo-100/50 overflow-hidden max-w-xl mx-auto w-full h-[420px] flex flex-col justify-between relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      
      <div className="flex items-center justify-between border-b border-slate-200 pb-3.5 z-10">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-600 animate-pulse" />
          <span className="text-xs text-slate-700 font-bold uppercase tracking-wider font-mono">Predictive Analysis Console</span>
        </div>
        <div className="flex bg-slate-100 border border-slate-200 rounded-lg p-0.5 space-x-1">
          {["kpis", "charts", "vendors"].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-bold font-mono px-3 py-1 rounded-md uppercase transition-all ${activeTab === tab ? "bg-cyan-600 text-white font-extrabold" : "text-slate-600 hover:text-slate-900"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 py-4 flex flex-col justify-center z-10">
        {activeTab === "kpis" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between text-left">
              <span className="text-[11px] text-slate-500 font-mono font-bold uppercase">Demand Forecast</span>
              <div className="text-2xl font-bold text-slate-800 mt-1">{telemetry.forecast} MT</div>
              <span className="text-xs text-green-600 font-semibold font-mono mt-2">▲ Optimal stock level</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between text-left">
              <span className="text-[11px] text-slate-500 font-mono font-bold uppercase">Production Loss</span>
              <div className="text-2xl font-bold text-red-600 mt-1">{telemetry.loss}%</div>
              <span className="text-xs text-slate-500 font-mono mt-2">Casting Line 4 status</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between text-left">
              <span className="text-[11px] text-slate-500 font-mono font-bold uppercase">Spend Compliance</span>
              <div className="text-2xl font-bold text-indigo-650 mt-1">{telemetry.compliance}%</div>
              <span className="text-xs text-green-600 font-semibold font-mono mt-2">Zero policy drift</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between text-left">
              <span className="text-[11px] text-slate-500 font-mono font-bold uppercase">PO Lifecycle Tracking</span>
              <div className="text-sm font-bold text-emerald-600 mt-1">48 active POs</div>
              <span className="text-xs text-slate-500 font-mono mt-2">100% on schedule</span>
            </div>
          </div>
        )}

        {activeTab === "charts" && (
          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-slate-600 font-mono uppercase font-bold">Demand & Inventory Forecasting</span>
                <span className="text-[10px] text-cyan-600 font-mono">30-day Horizon</span>
              </div>
              <div className="h-32 w-full">
                <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                  <path d="M0,70 C80,70 120,90 180,65 C220,45 260,25 300,30 L300,100 L0,100 Z" fill="rgba(6, 182, 212, 0.06)" />
                  <motion.path 
                    d="M0,70 C80,70 120,90 180,65 C220,45 260,25 300,30" 
                    fill="none" 
                    stroke="#0891b2" 
                    strokeWidth="2.5"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5 }}
                  />
                  <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(0,0,0,0.06)" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(0,0,0,0.06)" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(0,0,0,0.06)" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="300" cy="30" r="4.5" fill="#0891b2" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {activeTab === "vendors" && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5 text-left">
            <span className="text-xs text-slate-600 font-mono uppercase font-bold block mb-1.5">Vendor Performance Scorecard</span>
            <div className="space-y-3 max-h-[170px] overflow-y-auto">
              {[
                { name: "Höganäs", score: "9.8/10", width: "w-[98%]", color: "bg-emerald-500" },
                { name: "Bharat Forge", score: "9.5/10", width: "w-[95%]", color: "bg-emerald-400" },
                { name: "Alfa Laval", score: "9.4/10", width: "w-[94%]", color: "bg-teal-500" },
                { name: "Crompton Greaves", score: "9.2/10", width: "w-[92%]", color: "bg-indigo-500" }
              ].map((v, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-slate-700 w-28 truncate">{v.name}</span>
                  <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden mx-3 border border-slate-200">
                    <div className={`${v.color} h-full rounded-full ${v.width}`} />
                  </div>
                  <span className="text-slate-655 font-mono text-xs">{v.score}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-slate-200 pt-3 flex items-center justify-between font-mono text-xs text-slate-600 z-10">
        <span>Anomaly engine active</span>
        <span>Hourly sync complete</span>
      </div>
    </div>
  );
};

const SQLQueryVisualizer = () => {
  const [activeQ, setActiveQ] = useState(0);
  const queries = [
    {
      q: "List all active vendor spend for Q2",
      sql: "SELECT CardName, SUM(DocTotal) FROM OPOR WHERE DocDate >= '2026-04-01' AND DocDate <= '2026-06-30' AND DocStatus = 'O' GROUP BY CardName",
      result: [
        { name: "Höganäs", amt: "$450,200", status: "Approved" },
        { name: "Bharat Forge", amt: "$380,500", status: "Approved" },
        { name: "Alfa Laval", amt: "$120,400", status: "Review" }
      ]
    },
    {
      q: "Show equipment breakdown alerts on Line 4",
      sql: "SELECT MachineID, Severity, LogTime FROM OOT_Alerts WHERE FloorLine = 4 AND Status = 'Open' ORDER BY LogTime DESC",
      result: [
        { name: "Casting Furnace B", amt: "High", status: "Active" },
        { name: "Weigh Conveyor L4", amt: "Medium", status: "Warning" }
      ]
    }
  ];

  return (
    <div className="bg-white border border-indigo-150 rounded-3xl p-6 shadow-2xl shadow-indigo-100/50 w-full max-w-lg mx-auto flex flex-col justify-between h-[460px] font-mono text-slate-700">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center space-x-2">
            <Database size={18} className="text-cyan-600" />
            <span className="text-xs text-slate-800 font-bold uppercase tracking-wider">SQL AI Generator</span>
          </div>
          <span className="text-xs text-emerald-600 border border-emerald-500/20 px-2 py-0.5 bg-emerald-500/10 rounded">Online</span>
        </div>

        <div className="space-y-2.5 text-left">
          <div className="text-xs text-slate-500 font-bold uppercase">Natural Language Query:</div>
          <div className="flex bg-indigo-50 border border-indigo-100 p-3 rounded-lg text-sm text-indigo-950 font-bold justify-between items-center">
            <span>"{queries[activeQ].q}"</span>
            <button 
              onClick={() => setActiveQ(prev => (prev + 1) % queries.length)}
              className="bg-indigo-650 text-white font-sans text-xs font-bold px-3 py-1.5 rounded hover:bg-indigo-700 transition"
            >
              Next
            </button>
          </div>
        </div>

        <div className="space-y-2.5 text-left">
          <div className="text-xs text-slate-500 font-bold uppercase">Generated SQL query:</div>
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-xs text-cyan-800 overflow-x-auto leading-relaxed select-all text-left">
            {queries[activeQ].sql}
          </div>
        </div>

        <div className="space-y-2.5 text-left">
          <div className="text-xs text-slate-500 font-bold uppercase">Query Results:</div>
          <div className="space-y-2 text-xs">
            {queries[activeQ].result.map((row, idx) => (
              <div key={idx} className="flex justify-between bg-slate-100/40 border border-slate-200 px-3 py-2 rounded text-xs">
                <span className="text-slate-700 font-sans">{row.name}</span>
                <span className="text-cyan-750">{row.amt}</span>
                <span className={row.status === "Approved" || row.status === "Active" ? "text-green-600 font-semibold" : "text-amber-600 font-semibold"}>{row.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Counter = ({ target, duration = 1500, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let startTimestamp = 0;
        const isFloat = target.toString().includes('.');
        const targetVal = isFloat ? parseFloat(target) : parseInt(target, 10);
        if (isNaN(targetVal) || targetVal === 0) {
          setCount(target);
          return;
        }
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const currentCount = progress * targetVal;
          setCount(isFloat ? currentCount.toFixed(1) : Math.floor(currentCount));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            setCount(isFloat ? targetVal.toFixed(1) : targetVal);
          }
        };
        window.requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentAgent, setCurrentAgent] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const challengeSectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: challengeSectionRef,
    offset: ["start end", "end start"]
  });

  const [manualAiMode, setManualAiMode] = useState(null);
  const [challengeAiActive, setChallengeAiActive] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (manualAiMode === null) {
      if (latest > 0.48 && latest < 0.82) {
        setChallengeAiActive(true);
      } else {
        setChallengeAiActive(false);
      }
    }
  });

  const handleAiModeToggle = (val) => {
    setManualAiMode(val);
    setChallengeAiActive(val);
  };

  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredWarning, setHoveredWarning] = useState(null);
  const [hoveredPillar, setHoveredPillar] = useState(null);
  const [hoveredWhyNode, setHoveredWhyNode] = useState(null);
  const [chatStep, setChatStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setChatStep((prev) => (prev + 1) % 5);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const [telemetry, setTelemetry] = useState({
    efficiency: 94.2,
    throughput: 1420,
    activeAgents: 6
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        efficiency: +(prev.efficiency + (Math.random() * 0.4 - 0.2)).toFixed(1),
        throughput: prev.throughput + Math.floor(Math.random() * 5 - 2),
        activeAgents: 6
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    setTimeout(() => {
      if (window.scrollY > 0) window.scrollTo(0, 0);
    }, 100);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAgent((prev) => (prev + 1) % Zf.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isVideoPlaying && videoRef.current) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVideoPlaying]);

  return (
    <div className="home-page">
      <Helmet>
        <title>Agentfloww | AI-Powered Manufacturing Automation</title>
        <meta name="description" content="Agentfloww delivers AI-powered automation for Manufacturing, with smarter procurement, faster ERP, and zero busywork. SAP, Oracle, Microsoft Dynamics, NetSuite, AI Agents, and ERP automation." />
        <meta name="keywords" content="Manufacturing AI, ERP Automation, ERP AI Agents, AI Procurement, Manufacturing Intelligence, SAP, Oracle, Dynamics, NetSuite, Odoo" />
      </Helmet>

      {/* Hero Section with Integrated Navigation */}
      <section 
        className="relative overflow-hidden bg-grid-pattern animate-grid-shift"
        style={{
          background: "linear-gradient(45deg, var(--gradientColorZero) 0%, var(--gradientColorOne) 25%, var(--gradientColorTwo) 50%, var(--gradientColorThree) 75%, var(--gradientColorZero) 100%)",
          backgroundSize: "500% 300%",
          backgroundPosition: "top left",
          animation: "gradientFlow 20s ease infinite"
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: "2s" }} />

        {/* Navigation Bar */}
        <div className="relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-start h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2 mr-12">
                <img src="/images/logo/Agentflow svg.svg" alt="Agentfloww Logo" className="h-12 md:h-14 w-auto mt-1" />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                {Ff.map((item) => (
                  <div key={item.name} className="relative group">
                    <Link to={item.href} className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200">
                      {item.name}
                    </Link>
                  </div>
                ))}
              </nav>

              {/* Mobile menu button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="md:hidden p-2 rounded-md transition-colors duration-200 text-white/90 hover:text-white hover:bg-white/10 ml-auto"
              >
                {isMenuOpen ? <X size={24} /> : <List size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white/10 backdrop-blur-md">
              <div className="px-4 py-4 space-y-4">
                {Ff.map((item) => (
                  <div key={item.name}>
                    <Link 
                      to={item.href} 
                      onClick={() => setIsMenuOpen(false)} 
                      className="block text-white/90 hover:text-white text-base font-medium transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>        {/* Skewed bottom border visual */}
        <div className="absolute bottom-0 right-20 w-[180%] h-[380px] bg-white transform -rotate-12 origin-bottom-right" style={{ bottom: "0px", right: "-80px" }} />

        {/* Hero content */}
        <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-12 md:pb-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 md:gap-12">
            {/* Left Side - Text Content */}
            <div className="w-full lg:flex-1 text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
              >
                Autonomous Enterprise
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl text-white/95 mb-8 max-w-2xl lg:max-w-none"
              >
                Smarter procurement · Faster ERP · Zero busywork
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
              >
                <Link
                  to="/contact"
                  className="btn-primary text-lg px-8 py-3.5 flex items-center space-x-2 group shadow-lg"
                >
                  <span>Schedule a Free Discovery Session</span>
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* Right Side - Desktop Screen */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full lg:flex-1 flex justify-center lg:justify-end relative"
            >
              {/* Desktop Screen Container */}
              <div className="relative w-full max-w-7xl">
                {/* Desktop Frame */}
                <div className="relative bg-gray-100/50 backdrop-blur-sm rounded-t-3xl p-1 shadow-2xl border border-gray-200/30">
                  {/* Desktop Screen */}
                  <div className="bg-white rounded-2xl overflow-hidden shadow-inner">
                    {/* Screen Header */}
                    <div className="bg-gray-100 px-6 py-3 flex items-center justify-between border-b">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="text-sm text-gray-600 font-medium">Agentflow Dashboard</div>
                      <div className="w-6"></div>
                    </div>
                    
                    {/* Video Content */}
                    <div className="relative w-full" style={{ height: '457px' }}>
                      <video
                        src="/images/Pictures/final.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        ref={videoRef}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Light purple gradient overlay - Only show when video is not playing */}
                      {!isVideoPlaying && (
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/15 via-indigo-50/10 to-transparent z-10 transition-opacity duration-500"></div>
                      )}
                      
                      {/* Play Button - Only show when video is not playing */}
                      {!isVideoPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="cursor-pointer group"
                            onClick={() => {
                              if (videoRef.current) {
                                videoRef.current.play();
                                setIsVideoPlaying(true);
                              }
                            }}
                          >
                            <div className="relative">
                              {/* Outer Circle Ring */}
                              <div
                                className="absolute inset-0 bg-white/30 rounded-full"
                                style={{ width: '160px', height: '160px', left: '-16px', top: '-16px' }}
                              />
                              
                              {/* White Circle Background */}
                              <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.12)] group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.2)] transition-all duration-300">
                                {/* Equilateral Triangle with Rounded Corners */}
                                <svg 
                                  width="54" 
                                  height="54" 
                                  viewBox="0 0 40 40" 
                                  className="ml-1 group-hover:scale-110 transition-transform duration-300"
                                >
                                  <path 
                                    d="M12 10 L12 30 L28 20 Z" 
                                    fill="#000000"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      )}
                      
                      {/* Active Agent Badge Overlay */}
                      <motion.div 
                        className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg z-25"
                        key={Math.random()}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="text-xs text-gray-600">
                          <motion.div 
                            className="font-medium"
                            key={currentAgent}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            {Zf[currentAgent]}
                          </motion.div>
                          <motion.div 
                            className="text-green-600 mt-0.5"
                            animate={{ 
                              opacity: [1, 0.5, 1],
                              scale: [1, 1.05, 1]
                            }}
                            transition={{ 
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            ● Active
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: The Challenge */}
      <section 
        ref={challengeSectionRef} 
        className="relative bg-transparent overflow-hidden py-20"
      >
        {/* Layered backgrounds */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute inset-0 bg-grid-pattern opacity-30 animate-grid-shift" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-blue-600/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '3s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-150 px-3.5 py-1 rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-650 font-bold text-xs uppercase tracking-wider font-mono">THE CHALLENGE IN MANUFACTURING & ERP</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                The Challenge in Manufacturing & ERP
              </h2>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Every purchase request, invoice, approval and inventory update travels through multiple disconnected systems before reaching your ERP. These bottlenecks cost time, money and accuracy.
              </p>
            </motion.div>

            <div className="mt-6 flex justify-center items-center space-x-3">
              <div className="bg-gray-150/75 border border-gray-250 p-1 rounded-xl flex items-center gap-1.5 relative z-20">
                <button 
                  onClick={() => handleAiModeToggle(false)}
                  className={`text-xs font-semibold px-4 py-1.5 rounded-lg transition-all duration-300 ${!challengeAiActive ? 'bg-red-600 text-white shadow-md font-bold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'}`}
                >
                  Disconnected Systems
                </button>
                <button 
                  onClick={() => handleAiModeToggle(true)}
                  className={`text-xs font-semibold px-4 py-1.5 rounded-lg transition-all duration-300 ${challengeAiActive ? 'bg-purple-600 text-white shadow-md font-bold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'}`}
                >
                  Agentfloww AI Flow
                </button>
              </div>
            </div>

            <div className="mt-3 flex justify-center">
              <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-mono border transition-all duration-500 ${challengeAiActive ? 'bg-green-50 border-green-150 text-green-700' : 'bg-red-50 border-red-150 text-red-700'}`}>
                <span className={`w-1 h-1 rounded-full ${challengeAiActive ? 'bg-green-500 animate-ping' : 'bg-red-500 animate-ping'}`} />
                <span>SYSTEM STATUS: {challengeAiActive ? 'AGENTFLOWW AI ACTIVE' : 'DISCONNECTED MANUAL FLOW (SCROLL FOR AI)'}</span>
              </span>
            </div>
          </div>

          {/* Desktop & Mobile Canvas Wrapper with Glow */}
          <div className="relative w-full">
            {/* Logo themed glow background */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-500 rounded-3xl blur-2xl opacity-65 pointer-events-none" />
            
            {/* Desktop Canvas (Light Theme style) */}
            <div className="hidden lg:block relative w-full aspect-[1000/310] bg-white border border-gray-200 shadow-xl rounded-3xl p-6 overflow-hidden z-10">
              <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

            <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 290">
              <g opacity="0.06">
                <line x1="50" y1="135" x2="950" y2="135" stroke="#000000" strokeWidth="1.2" strokeDasharray="3 3" />
                <ellipse cx="500" cy="135" rx="140" ry="80" fill="none" stroke="#000000" strokeWidth="1.2" strokeDasharray="2 4" />
              </g>

              {/* Connections */}
              {(challengeAiActive 
                ? [
                    { from: 'agentfloww_ai', to: 'erp', id: 'ai-erp' },
                    { from: 'agentfloww_ai', to: 'procurement', id: 'ai-proc' },
                    { from: 'agentfloww_ai', to: 'inventory', id: 'ai-inv' },
                    { from: 'agentfloww_ai', to: 'finance', id: 'ai-fin' },
                    { from: 'agentfloww_ai', to: 'production', id: 'ai-prod' },
                    { from: 'agentfloww_ai', to: 'warehouse', id: 'ai-wh' },
                    { from: 'agentfloww_ai', to: 'reporting', id: 'ai-rep' },
                    { from: 'agentfloww_ai', to: 'sales', id: 'ai-sales' }
                  ] 
                : [
                    { from: 'email', to: 'procurement', id: 'm-email' },
                    { from: 'procurement', to: 'excel', id: 'm-proc' },
                    { from: 'excel', to: 'erp', id: 'm-excel' },
                    { from: 'erp', to: 'approval', id: 'm-erp' },
                    { from: 'approval', to: 'inventory', id: 'm-appr' },
                    { from: 'inventory', to: 'finance', id: 'm-inv' },
                    { from: 'finance', to: 'reporting', id: 'm-fin' }
                  ]
              ).map((conn) => {
                const getCoords = (nodeId) => ({
                  email: challengeAiActive ? { x: 120, y: 55 } : { x: 70, y: 135 },
                  procurement: challengeAiActive ? { x: 590, y: 65 } : { x: 190, y: 135 },
                  excel: challengeAiActive ? { x: 290, y: 135 } : { x: 310, y: 135 },
                  erp: challengeAiActive ? { x: 500, y: 40 } : { x: 430, y: 135 },
                  approval: challengeAiActive ? { x: 520, y: 135 } : { x: 550, y: 135 },
                  inventory: challengeAiActive ? { x: 590, y: 185 } : { x: 670, y: 135 },
                  finance: challengeAiActive ? { x: 500, y: 210 } : { x: 790, y: 135 },
                  reporting: challengeAiActive ? { x: 370, y: 125 } : { x: 910, y: 135 },
                  production: challengeAiActive ? { x: 410, y: 185 } : { x: 300, y: 235 },
                  warehouse: challengeAiActive ? { x: 410, y: 65 } : { x: 700, y: 235 },
                  sales: challengeAiActive ? { x: 630, y: 125 } : { x: 790, y: 235 },
                  agentfloww_ai: { x: 500, y: 125 }
                })[nodeId] || { x: 500, y: 125 };

                const start = getCoords(conn.from);
                const end = getCoords(conn.to);
                const isHighlighted = hoveredNode === conn.from || hoveredNode === conn.to || (hoveredNode === 'erp' && (conn.from === 'agentfloww_ai' || conn.to === 'agentfloww_ai'));

                return (
                  <g key={conn.id}>
                    <motion.path 
                      d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`} 
                      stroke={challengeAiActive 
                        ? (isHighlighted ? '#7c3aed' : 'rgba(124, 58, 237, 0.25)') 
                        : (isHighlighted ? '#ef4444' : 'rgba(239, 68, 68, 0.15)')
                      }
                      strokeWidth={isHighlighted ? 2.5 : 1.5}
                      strokeDasharray={challengeAiActive ? "none" : "4 5"}
                      className="transition-colors duration-300"
                    />
                  </g>
                );
              })}

              {/* Data Flow Packets */}
              {challengeAiActive 
                ? [
                    { x: 590, y: 65 }, { x: 500, y: 40 }, { x: 590, y: 185 }, { x: 500, y: 210 },
                    { x: 410, y: 185 }, { x: 410, y: 65 }, { x: 370, y: 125 }, { x: 630, y: 125 }
                  ].map((pt, idx) => (
                    <circle key={idx} r="2.5" fill="#10b981">
                      <animateMotion dur={`${1 + idx * 0.15}s`} repeatCount="indefinite" path={`M 500,125 L ${pt.x},${pt.y}`} />
                    </circle>
                  ))
                : (
                  <>
                    <circle r="3" fill="#ef4444">
                      <animateMotion 
                        dur="12s" 
                        repeatCount="indefinite" 
                        path="M 70,135 L 910,135"
                        keyPoints="0; 0.14; 0.14; 0.28; 0.28; 0.42; 0.42; 0.57; 0.57; 0.71; 0.71; 0.85; 0.85; 1"
                        keyTimes="0; 0.08; 0.15; 0.22; 0.32; 0.40; 0.50; 0.58; 0.68; 0.76; 0.86; 0.92; 0.96; 1"
                      />
                    </circle>
                    <circle r="3" fill="#f97316" className="animate-pulse">
                      <animateMotion 
                        dur="12s" 
                        repeatCount="indefinite" 
                        path="M 70,135 L 910,135"
                        begin="4s"
                        keyPoints="0; 0.14; 0.14; 0.28; 0.28; 0.42; 0.42; 0.57; 0.57; 0.71; 0.71; 0.85; 0.85; 1"
                        keyTimes="0; 0.08; 0.15; 0.22; 0.32; 0.40; 0.50; 0.58; 0.68; 0.76; 0.86; 0.92; 0.96; 1"
                      />
                    </circle>
                  </>
                )
              }

              {/* Node Groups */}
              {[
                { id: "email", label: "Vendor Email", icon: Envelope, manualPos: { x: 70, y: 135 }, aiPos: { x: 120, y: 55 }, showInAi: false },
                { id: "procurement", label: "Procurement", icon: ShoppingCart, manualPos: { x: 190, y: 135 }, aiPos: { x: 590, y: 65 }, showInAi: true },
                { id: "excel", label: "Excel", icon: FileText, manualPos: { x: 310, y: 135 }, aiPos: { x: 310, y: 135 }, showInAi: false },
                { id: "erp", label: challengeAiActive ? "Core ERP" : "Manual ERP Entry", icon: Database, manualPos: { x: 430, y: 135 }, aiPos: { x: 500, y: 40 }, showInAi: true },
                { id: "approval", label: "Approval", icon: UserCheck, manualPos: { x: 550, y: 135 }, aiPos: { x: 550, y: 135 }, showInAi: false },
                { id: "inventory", label: "Inventory", icon: Package, manualPos: { x: 670, y: 135 }, aiPos: { x: 590, y: 185 }, showInAi: true },
                { id: "finance", label: "Finance", icon: Coins, manualPos: { x: 790, y: 135 }, aiPos: { x: 500, y: 210 }, showInAi: true },
                { id: "reporting", label: challengeAiActive ? "Analytics" : "Reporting", icon: ChartBar, manualPos: { x: 910, y: 135 }, aiPos: { x: 370, y: 125 }, showInAi: true },
                { id: "production", label: "Production", icon: Gear, manualPos: { x: 300, y: 235 }, aiPos: { x: 410, y: 185 }, showInAi: true, onlyAi: true },
                { id: "warehouse", label: "Warehouse", icon: Warehouse, manualPos: { x: 700, y: 235 }, aiPos: { x: 410, y: 65 }, showInAi: true, onlyAi: true },
                { id: "sales", label: "Sales / CRM", icon: Users, manualPos: { x: 790, y: 235 }, aiPos: { x: 630, y: 125 }, showInAi: true, onlyAi: true },
                { id: "agentfloww_ai", label: "Agentfloww AI", icon: Robot, manualPos: { x: 500, y: 125 }, aiPos: { x: 500, y: 125 }, showInAi: true, onlyAi: true }
              ].map((node) => {
                const isVisible = challengeAiActive ? node.showInAi : !node.onlyAi;
                const pos = challengeAiActive ? node.aiPos : node.manualPos;
                const IconComp = node.icon;
                const isNodeHovered = hoveredNode === node.id;

                return (
                  <motion.g 
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      x: pos.x - 20, 
                      y: pos.y - 20, 
                      opacity: isVisible ? 1 : 0, 
                      scale: isVisible ? (isNodeHovered ? 1.15 : 1) : 0 
                    }}
                    transition={{ type: "spring", stiffness: 90, damping: 14 }}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <circle 
                      cx="20" 
                      cy="20" 
                      r="20" 
                      fill={node.id === "agentfloww_ai" ? "#7c3aed" : isNodeHovered ? "#f3e8ff" : "#ffffff"} 
                      stroke={node.id === "agentfloww_ai" ? "#c084fc" : isNodeHovered ? "#a855f7" : "rgba(0, 0, 0, 0.08)"} 
                      strokeWidth="1.5"
                      className="transition-all duration-300"
                    />
                    <g transform="translate(10, 10)">
                      <IconComp size={20} className={node.id === "agentfloww_ai" ? "text-white animate-pulse" : isNodeHovered ? "text-purple-600" : "text-gray-500"} />
                    </g>
                    <text 
                      x="20" 
                      y="52" 
                      fill={isNodeHovered ? "#111827" : "rgba(0, 0, 0, 0.6)"} 
                      fontSize="9" 
                      fontWeight="bold" 
                      textAnchor="middle"
                      className="pointer-events-none transition-colors duration-300 font-mono"
                    >
                      {node.label}
                    </text>
                  </motion.g>
                );
              })}

              {/* Warning Icons (Manual mode only) */}
              {!challengeAiActive && [
                { nodeId: "procurement", text: "Manual Processes", x: 190, y: 80 },
                { nodeId: "excel", text: "Manual Processes", x: 310, y: 80 },
                { nodeId: "erp", text: "ERP Errors", x: 430, y: 80 },
                { nodeId: "approval", text: "Manual Processes", x: 550, y: 80 },
                { nodeId: "inventory", text: "Poor Visibility", x: 670, y: 80 },
                { nodeId: "finance", text: "Manual Processes", x: 790, y: 80 },
                { nodeId: "reporting", text: "Reporting Delays", x: 910, y: 80 }
              ].map((warn) => (
                <motion.g
                  key={warn.nodeId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transform={`translate(${warn.x - 8}, ${warn.y - 8})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredWarning(warn.nodeId)}
                  onMouseLeave={() => setHoveredWarning(null)}
                >
                  <circle cx="8" cy="8" r="8" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="1.5" className="animate-pulse" />
                  <text x="8" y="11.5" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle" className="select-none pointer-events-none font-sans">!</text>
                </motion.g>
              ))}
            </svg>

            {/* Hover Tooltips (Manual mode only) */}
            {!challengeAiActive && [
              { id: "procurement", title: "Manual Processes", desc: "Procurement, invoicing, and approvals run on manual effort - slow, error-prone, and costly.", x: 190 },
              { id: "excel", title: "Manual Processes", desc: "Procurement, invoicing, and approvals run on manual effort - slow, error-prone, and costly.", x: 310 },
              { id: "erp", title: "ERP Errors", desc: "Manual ERP data entry causes costly errors in POs, GRNs, and vendor invoices.", x: 430 },
              { id: "approval", title: "Manual Processes", desc: "Procurement, invoicing, and approvals run on manual effort - slow, error-prone, and costly.", x: 550 },
              { id: "inventory", title: "Poor Visibility", desc: "No real-time inventory or cost data means reactive decisions and missed opportunities.", x: 670 },
              { id: "finance", title: "Manual Processes", desc: "Procurement, invoicing, and approvals run on manual effort - slow, error-prone, and costly.", x: 790 },
              { id: "reporting", title: "Reporting Delays", desc: "Finance and ops teams spend hours generating ERP reports instead of driving strategy.", x: 910 }
            ].map((warn) => (
              <div 
                key={warn.id}
                className="absolute bg-white border border-red-200 rounded-xl p-3 shadow-xl transition-all duration-300 pointer-events-none w-52 text-left z-30 font-sans"
                style={{
                  top: "20px",
                  left: `${warn.x - 104}px`,
                  opacity: hoveredWarning === warn.id ? 1 : 0,
                  transform: hoveredWarning === warn.id ? "translateY(0) scale(1)" : "translateY(10px) scale(0.95)"
                }}
              >
                <h5 className="text-red-650 text-xs font-bold font-mono mb-1">⚠️ {warn.title}</h5>
                <p className="text-gray-600 text-[10px] leading-relaxed font-sans">{warn.desc}</p>
              </div>
            ))}

            {/* Bottom status pipeline overlay */}
            <div className="absolute bottom-3 left-6 right-6 bg-gray-50/55 border border-gray-150 rounded-xl p-3 min-h-[50px] flex items-center justify-between text-left select-none">
              <div className="flex items-center space-x-3">
                <span className={`w-2 h-2 rounded-full ${challengeAiActive ? 'bg-purple-500' : 'bg-red-500'} animate-ping`} />
                <p className="text-[11px] text-gray-700 leading-relaxed font-mono">
                  {hoveredNode !== null ? (
                    <span>
                      <strong className="text-gray-900 font-bold">
                        {
                          ["Vendor Email", "Procurement", "Excel", "Core ERP", "Approval", "Inventory", "Finance", "Analytics", "Production", "Warehouse", "Sales / CRM", "Agentfloww AI"][
                            ["email", "procurement", "excel", "erp", "approval", "inventory", "finance", "reporting", "production", "warehouse", "sales", "agentfloww_ai"].indexOf(hoveredNode)
                          ]
                        }:
                      </strong>{" "}
                      {
                        [
                          "Quotes, specs, and incoming vendor PDFs.",
                          "Procurement tracking, specs checks, manual verification.",
                          "Excel spreadsheets used to track and reconcile entries.",
                          "Direct Core ERP system entries, writebacks and validation.",
                          "Approval queue workflows for transactions.",
                          "Inventory updates, variance checks, and stock reports.",
                          "Finance ledgers, supplier payments validation.",
                          "Automated visual report logs and SQL charts.",
                          "Manufacturing floor logs and active scheduling boards.",
                          "Inbound raw check sheets and dispatch orders.",
                          "Sales orders, lead pipelines, and customer correspondence.",
                          "Autonomous agent core syncing all nodes."
                        ][
                          ["email", "procurement", "excel", "erp", "approval", "inventory", "finance", "reporting", "production", "warehouse", "sales", "agentfloww_ai"].indexOf(hoveredNode)
                        ]
                      }
                    </span>
                  ) : (
                    <span>
                      {challengeAiActive 
                        ? "CONNECTED NETWORK: All systems orchestrate seamlessly through Agentfloww AI into ERP." 
                        : "DISCONNECTED ENTERPRISE: Hover over nodes or alert badges to inspect manual bottlenecks."}
                    </span>
                  )}
                </p>
              </div>
              <span className={`text-[8px] border px-1.5 py-0.5 rounded font-bold font-mono uppercase ${challengeAiActive ? 'bg-purple-50 text-purple-600 border-purple-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                {challengeAiActive ? "Optimized" : "Manual"}
              </span>
            </div>
          </div>

          {/* Mobile Fallback (Timeline) */}
          <div className="lg:hidden bg-white border border-gray-150 rounded-3xl p-6 shadow-xl relative overflow-hidden z-10">
            <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
            <div className="flex justify-center mb-8">
              <button 
                onClick={() => setChallengeAiActive(!challengeAiActive)}
                className={`text-xs font-bold font-mono px-6 py-2.5 rounded-lg border transition-all duration-300 ${challengeAiActive ? 'bg-green-600 border-green-500 text-white shadow-lg shadow-green-600/20' : 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/20'}`}
              >
                {challengeAiActive ? "Disable AI Simulation" : "Enable AI Simulation"}
              </button>
            </div>
            <div className="relative border-l border-gray-200 pl-6 space-y-8 text-left max-w-md mx-auto">
              {challengeAiActive && (
                <motion.div initial={{ height: 0 }} animate={{ height: "100%" }} className="absolute left-0 top-0 w-0.5 bg-gradient-to-b from-purple-500 via-green-500 to-blue-500 z-0" />
              )}
              {[
                { title: "Vendor Email", desc: "PDF invoices, specs, and raw attachments.", warn: "Manual Processes" },
                { title: "Procurement", desc: "Manual matching and parameter checks.", warn: "Manual Processes" },
                { title: "Excel", desc: "Isolated spreadsheets tracking quantities.", warn: "Manual Processes" },
                { title: "Manual ERP Entry", desc: "Keying data into ERP by hand.", warn: "ERP Errors" },
                { title: "Approval", desc: "Requests blocking in manager mailboxes.", warn: "Manual Processes" },
                { title: "Inventory", desc: "Physical stock levels lag behind records.", warn: "Poor Visibility" },
                { title: "Finance", desc: "Supplier validation and manual reconciliation.", warn: "Manual Processes" },
                { title: "Reporting", desc: "Compiling weekly CSV reports.", warn: "Reporting Delays" }
              ].map((step, idx) => (
                <div key={idx} className="relative z-10">
                  <span className={`absolute -left-[30px] top-1.5 w-4 h-4 rounded-full border flex items-center justify-center ${challengeAiActive ? 'bg-purple-50 border-purple-500' : 'bg-red-50 border-red-500'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${challengeAiActive ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`} />
                  </span>
                  <div>
                    <h4 className="text-gray-900 font-bold text-sm">{step.title}</h4>
                    <p className="text-gray-500 text-xs mt-0.5">{challengeAiActive ? "Automated parameters extracted instantly." : step.desc}</p>
                    {!challengeAiActive && (
                      <span className="inline-block mt-1.5 text-[9px] font-bold font-mono text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded">⚠️ {step.warn}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* ERP Integration Logos Showcase Ribbon */}
      <section className="py-12 border-t border-b border-gray-200/50 bg-gray-50/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            viewport={{ once: true }} 
            className="text-center mb-8"
          >
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Natively Integrated with Your Enterprise ERP Ecosystem</h3>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.15 }} 
            viewport={{ once: true }} 
            className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 px-4"
          >
            <div className="flex items-center justify-center min-w-[160px]">
              <img src="/images/logo/sap.png" alt="SAP" className="h-12 md:h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-all duration-300 transform hover:scale-108 cursor-pointer" />
            </div>
            <div className="flex items-center justify-center min-w-[160px]">
              <img src="/images/logo/oracle.png" alt="Oracle" className="h-12 md:h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-all duration-300 transform hover:scale-108 cursor-pointer" />
            </div>
            <div className="flex items-center justify-center min-w-[160px]">
              <img src="/images/logo/dynamics.png" alt="Dynamics 365" className="h-16 md:h-20 w-auto object-contain opacity-90 hover:opacity-100 transition-all duration-300 transform hover:scale-108 cursor-pointer" />
            </div>
            <div className="flex items-center justify-center min-w-[160px]">
              <img src="/images/logo/netsuite.png" alt="NetSuite" className="h-16 md:h-20 w-auto object-contain opacity-90 hover:opacity-100 transition-all duration-300 transform hover:scale-108 cursor-pointer" />
            </div>
            <div className="flex items-center justify-center min-w-[160px]">
              <img src="/images/logo/odoo.png" alt="Odoo" className="h-12 md:h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-all duration-300 transform hover:scale-108 cursor-pointer" />
            </div>
            <div className="flex items-center justify-center min-w-[160px]">
              <img src="/images/logo/epicor.png" alt="Epicor" className="h-12 md:h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-all duration-300 transform hover:scale-108 cursor-pointer" />
            </div>
          </motion.div>
        </div>
      </section>
      {/* Master Solutions Section with Continuous Background & Shared Vibrant Pebbles */}
      <section className="bg-transparent relative overflow-hidden">
        {/* Continuous Floating background pebbles */}
        <div className="absolute top-10 left-[10%] w-[450px] h-[450px] bg-pink-400/20 rounded-full blur-3xl z-[-1] pointer-events-none" />
        <div className="absolute top-[20%] right-[10%] w-[480px] h-[480px] bg-cyan-400/20 rounded-full blur-3xl z-[-1] pointer-events-none" />
        <div className="absolute top-[40%] left-[12%] w-[450px] h-[450px] bg-purple-400/20 rounded-full blur-3xl z-[-1] pointer-events-none" />
        <div className="absolute top-[65%] right-[12%] w-[500px] h-[500px] bg-orange-400/20 rounded-full blur-3xl z-[-1] pointer-events-none" />
        <div className="absolute top-[80%] left-[8%] w-[420px] h-[420px] bg-emerald-400/20 rounded-full blur-3xl z-[-1] pointer-events-none" />
        <div className="absolute bottom-10 right-[8%] w-[480px] h-[480px] bg-indigo-400/20 rounded-full blur-3xl z-[-1] pointer-events-none" />

        {/* Section 4 sub-div: ERP Agentic AI Automation */}
        <div className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block text-[#6633FF] font-bold text-lg mb-4">OUR SOLUTION</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">ERP Agentic AI Automation</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Six pillars of intelligent automation purpose-built for ERP environments, from conversational commands to 24/7 error detection.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Orbiting Ecosystem Diagram (Light Theme) */}
            <div className="lg:col-span-6 flex justify-center relative">
              {/* Logo themed glow background */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-500 rounded-3xl blur-2xl opacity-65 max-w-[496px] mx-auto pointer-events-none" />
              
              <div className="bg-white border border-gray-150 rounded-3xl p-8 w-full max-w-[480px] shadow-lg relative overflow-hidden flex flex-col items-center z-10">
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

                <div className="relative w-full max-w-[340px] aspect-square">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 400 400">
                    <circle cx="200" cy="200" r="130" fill="none" stroke="rgba(0, 0, 0, 0.04)" strokeWidth="1" />
                    <circle cx="200" cy="200" r="130" fill="none" stroke="rgba(147, 51, 234, 0.15)" strokeWidth="1.5" strokeDasharray="6 8" className="circuit-line" />

                    {[
                      { x: 330, y: 200 }, { x: 265, y: 312 }, { x: 135, y: 312 },
                      { x: 70, y: 200 }, { x: 135, y: 88 }, { x: 265, y: 88 }
                    ].map((pt, idx) => {
                      const isActive = hoveredPillar === idx;
                      return (
                        <g key={idx}>
                          <path 
                            d={`M200,200 L${pt.x},${pt.y}`} 
                            stroke={isActive ? '#c084fc' : 'rgba(0,0,0,0.06)'} 
                            strokeWidth={isActive ? 2.5 : 1.5}
                            className="transition-all duration-300"
                          />
                          {isActive && (
                            <circle cx={pt.x} cy={pt.y} r="3" fill="#c084fc" className="circuit-line">
                              <animateMotion dur="2s" repeatCount="indefinite" path={`M200,200 L${pt.x},${pt.y}`} />
                            </circle>
                          )}
                        </g>
                      );
                    })}

                    {/* Central ERP Core Node */}
                    <g transform="translate(160, 160)" className="cursor-pointer">
                      <circle cx="40" cy="40" r="38" fill="#f3e8ff" stroke="rgba(147, 51, 234, 0.4)" strokeWidth="2" />
                      <circle cx="40" cy="40" r="32" fill="url(#core-gradient)" />
                      <text x="40" y="44" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">ERP Core</text>
                    </g>
                    <defs>
                      <linearGradient id="core-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>

                    {/* Render Orbiting Agent Nodes */}
                    {[
                      { x: 330, y: 200, icon: ChatCenteredText },
                      { x: 265, y: 312, icon: ShoppingCart },
                      { x: 135, y: 312, icon: ShieldCheck },
                      { x: 70, y: 200, icon: Coins },
                      { x: 135, y: 88, icon: Database },
                      { x: 265, y: 88, icon: TerminalWindow }
                    ].map((node, idx) => {
                      const isActive = hoveredPillar === idx;
                      const IconComponent = node.icon;
                      return (
                        <g key={idx} transform={`translate(${node.x - 20}, ${node.y - 20})`} className="cursor-pointer">
                          <circle 
                            cx="20" 
                            cy="20" 
                            r={isActive ? 25 : 21} 
                            fill={isActive ? '#7c3aed' : '#ffffff'} 
                            stroke={isActive ? '#c084fc' : 'rgba(0, 0, 0, 0.08)'} 
                            strokeWidth={isActive ? '2' : '1.5'} 
                            className="transition-all duration-300"
                          />
                          <g transform="translate(10, 10)">
                            <IconComponent size={20} className={isActive ? 'text-white' : 'text-gray-500'} />
                          </g>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Subtext description panel */}
                <div className="w-full bg-gray-50/50 border border-gray-150 rounded-xl p-4 mt-6 text-center min-h-[70px] flex flex-col justify-center transition-all duration-300">
                  {hoveredPillar !== null ? (
                    <div>
                      <h5 className="text-purple-600 font-bold text-xs uppercase tracking-wide mb-1">
                        {Rf[hoveredPillar].title}
                      </h5>
                      <p className="text-gray-600 text-[11px] leading-relaxed">
                        API Writeback and real-time execution logs synced to core.
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-xs">
                      Hover over any pillar to see its real-time data sync pipeline to the ERP Core.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: 6 Pillars Cards */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Rf.map((pillar, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 20 }} 
                   whileInView={{ opacity: 1, y: 0 }} 
                   transition={{ duration: 0.5, delay: i * 0.08 }} 
                   viewport={{ once: true }}
                   onMouseEnter={() => setHoveredPillar(i)}
                   onMouseLeave={() => setHoveredPillar(null)}
                   className={`bg-white rounded-xl p-5 shadow-sm border transition-all duration-300 cursor-pointer ${hoveredPillar === i ? 'border-purple-500/50 shadow-md shadow-purple-500/5 scale-[1.02]' : 'border-gray-100 hover:border-purple-300'}`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${hoveredPillar === i ? 'bg-purple-500/10 text-purple-600' : 'bg-gray-100 text-gray-500'}`}>
                      <pillar.icon size={22} className={hoveredPillar === i ? 'animate-pulse' : ''} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm leading-tight">{pillar.title}</h3>
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>



        {/* Section 5: Conversational ERP Assistant */}
        <div className="py-20 border-t border-gray-250/20 relative z-10 mesh-gradient-indigo blueprint-grid-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-left">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                  <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-150 px-3 py-1 rounded-full mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                    <span className="text-indigo-600 font-bold text-xs uppercase tracking-wider font-mono">Conversational ERP Assistant</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Conversational ERP Assistant</h2>
                  <p className="text-lg text-gray-650 leading-relaxed mb-6">
                    Talk or type in plain language and Agentfloww handles it inside your ERP - create a sales order, log an invoice, check a GRN, or pull a spend report, all through natural-language commands, with 24/7 automated log scanning catching errors before they become problems.
                  </p>
                  <div className="inline-flex items-center space-x-2.5 bg-gradient-to-r from-purple-50 to-indigo-50 px-4 py-3 rounded-xl border border-purple-250/50">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping flex-shrink-0" />
                    <span className="text-purple-700 text-sm font-semibold">Purpose-built ERP automation - faster procurement, tighter cost control, zero busywork.</span>
                  </div>
                </motion.div>
              </div>
              <div className="flex-1 w-full relative">
                {/* Logo themed glow background */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-500 rounded-2xl blur-2xl opacity-65 max-w-[520px] mx-auto pointer-events-none" />
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="relative z-10">
                  <ConversationalAssistant />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: ERP Browser AI - What We Automate */}
        <div className="py-20 border-t border-gray-250/20 relative z-10 mesh-gradient-teal blueprint-grid-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-left order-1 lg:order-2">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                  <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-150 px-3 py-1 rounded-full mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
                    <span className="text-teal-600 font-bold text-xs uppercase tracking-wider font-mono">ERP Browser AI</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">ERP Browser AI - What We Automate</h2>
                  
                  <div className="space-y-4">
                    {[
                      { title: "ERP Login", desc: "Automates the full login process, no manual credentials required." },
                      { title: "Cash to Order", desc: "Quote-to-order automation with PDF invoice generation." },
                      { title: "Sales Order Creation", desc: "Automates sales order creation from email or chat." },
                      { title: "RFQ Processing", desc: "Reads RFQ emails and auto-generates structured responses." },
                      { title: "Invoice Processing", desc: "End-to-end invoicing from submission to approval via SAP Build." },
                      { title: "Purchase Requisition", desc: "Approval workflow with SAP S/4HANA integration." },
                      { title: "Goods Receipt for PO", desc: "Full procurement flow via SAP Build Process Automation." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-3 bg-white/60 border border-slate-100 p-3 rounded-xl hover:border-teal-300 hover:shadow-sm transition-all duration-300">
                        <CheckCircle size={18} className="text-teal-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                          <p className="text-gray-550 text-xs mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
              <div className="flex-1 w-full order-2 lg:order-1 relative">
                {/* Logo themed glow background */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-500 rounded-2xl blur-2xl opacity-65 max-w-[520px] mx-auto pointer-events-none" />
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="relative z-10">
                  <BrowserSimulation />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 7: AI Predictive Analysis for Manufacturing */}
        <div className="py-20 border-t border-gray-250/20 relative z-10 mesh-gradient-indigo blueprint-grid-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-left">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                  <div className="inline-flex items-center space-x-2 bg-purple-50 border border-purple-150 px-3 py-1 rounded-full mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
                    <span className="text-purple-650 font-bold text-xs uppercase tracking-wider font-mono">Predictive Intelligence</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">AI Predictive Analysis for Manufacturing</h2>
                  <div className="space-y-4">
                    {[
                      { title: "Demand & Inventory Forecasting", desc: "Anticipate stock needs before they become a problem." },
                      { title: "Production Loss Analysis", desc: "Spot where output is being lost on the line." },
                      { title: "Spend Analysis", desc: "See exactly where procurement budget is going." },
                      { title: "PO Lifecycle Tracking", desc: "Follow every purchase order from request to receipt." },
                      { title: "Vendor Performance", desc: "Score suppliers on delivery, quality, and reliability." },
                      { title: "Spend Compliance", desc: "Flag purchases outside policy automatically." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-3 bg-white/60 border border-slate-100 p-3 rounded-xl hover:border-purple-300 hover:shadow-sm transition-all duration-300">
                        <CheckCircle size={18} className="text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                          <p className="text-gray-550 text-xs mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
              <div className="flex-1 w-full relative">
                {/* Logo themed glow background */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-500 rounded-3xl blur-2xl opacity-65 max-w-[580px] mx-auto pointer-events-none" />
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="relative z-10">
                  <PredictiveDashboard />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Global Scale & SVG Globe */}
      <section className="py-20 md:py-24 bg-[#0a192f] text-white relative overflow-hidden">
        {/* Subtle grid and glows in background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side: Text content & stats */}
            <div className="lg:col-span-7 text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }} 
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-blue-400 font-bold text-xs uppercase tracking-wider font-mono">Backbone</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                  The Backbone for Manufacturing Operations - Proven, Not Promised
                </h2>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                  <p className="text-base text-gray-300 leading-relaxed font-medium">
                    AI ERP engagements have typically delivered a 20–30% increase in productivity for Agentfloww's manufacturing clients.
                  </p>
                </div>

                {/* Stat grid with custom sparklines */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
                  {[
                    { value: "2+", label: "Years", spark: "M0,25 Q20,10 40,20 T80,5 L100,12" },
                    { value: "60+", label: "Projects", spark: "M0,20 Q15,28 35,15 T70,8 L100,2" },
                    { value: "30+", label: "Team Members", spark: "M0,28 Q25,12 50,22 T80,10 L100,4" },
                    { value: "3", label: "Countries", spark: "M0,18 Q30,18 60,10 T80,15 L100,10" },
                    { value: "9.5/10", label: "Satisfaction", spark: "M0,22 Q20,10 40,15 T80,2 L100,1" }
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:bg-white/10 transition-colors duration-300">
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-white">
                          <Counter target={stat.value.replace(/[^0-9.]/g, "")} suffix={stat.value.replace(/[0-9.]/g, "")} />
                        </div>
                        <div className="text-[10px] text-blue-200/70 font-bold tracking-wider uppercase mt-1">
                          {stat.label}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right side: Colorful animated SVG Globe */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className="relative w-full max-w-[420px] aspect-square flex justify-center items-center cursor-pointer"
              >
                {/* External pulsing orbit rings around the globe */}
                <div className="absolute w-[94%] h-[94%] rounded-full border border-blue-500/10 animate-ping pointer-events-none" style={{ animationDuration: '4s' }} />
                <div className="absolute w-[86%] h-[86%] rounded-full border border-purple-500/10 animate-ping pointer-events-none" style={{ animationDuration: '6s', animationDelay: '1s' }} />

                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 400">
                  <defs>
                    {/* Globe spherical background radial gradient */}
                    <radialGradient id="globe-gradient" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="35%" stopColor="#1d4ed8" />
                      <stop offset="70%" stopColor="#1e40af" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </radialGradient>

                    {/* Glowing point filters */}
                    <filter id="glow-orange" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="glow-pink" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    <linearGradient id="arc-gradient-orange-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#eab308" />
                    </linearGradient>
                    <linearGradient id="arc-gradient-blue-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>

                  {/* Spherical Globe Body */}
                  <circle cx="200" cy="200" r="140" fill="url(#globe-gradient)" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" className="shadow-2xl" />

                  {/* Longitudinal and Latitudinal Dotted Grid Lines */}
                  <g className="opacity-40">
                    {/* Latitudes */}
                    <path d="M 68,160 Q 200,200 332,160" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 4" />
                    <path d="M 60,200 Q 200,250 340,200" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" strokeDasharray="3 4" />
                    <path d="M 68,240 Q 200,290 332,240" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 4" />
                    
                    {/* Longitudes */}
                    <path d="M 200,60 Q 140,200 200,340" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 4" />
                    <path d="M 200,60 Q 260,200 200,340" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 4" />
                    <path d="M 200,60 Q 200,200 200,340" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="2 3" />
                  </g>

                  {/* Animated rotating orbit paths */}
                  <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    style={{ originX: '200px', originY: '200px' }}
                  >
                    <circle cx="200" cy="200" r="148" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1.5" />
                    {/* Glowing dashes moving on outer orbit */}
                    <circle cx="200" cy="200" r="148" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeDasharray="15 300" strokeDashoffset="0" className="orbiting-dash-1" />
                    <circle cx="200" cy="200" r="148" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="20 400" strokeDashoffset="200" className="orbiting-dash-2" />
                  </motion.g>

                  {/* Connection Arcs (Curves between nodes) */}
                  <g className="opacity-90">
                    {/* Arc 1: Blue (left) to Orange (center) */}
                    <path d="M 120,150 Q 145,210 180,240" fill="none" stroke="url(#arc-gradient-blue-purple)" strokeWidth="1.8" />
                    
                    {/* Arc 2: Orange (center) to Yellow (right) */}
                    <path d="M 180,240 Q 220,195 270,210" fill="none" stroke="url(#arc-gradient-orange-yellow)" strokeWidth="2" />
                    
                    {/* Arc 3: Yellow (right) to Purple (lower) */}
                    <path d="M 270,210 Q 275,250 250,285" fill="none" stroke="rgba(236, 72, 153, 0.5)" strokeWidth="1.5" />

                    {/* Arc 4: Purple (lower) to Violet (lowest) */}
                    <path d="M 250,285 Q 230,300 220,310" fill="none" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="1.2" />
                  </g>

                  {/* Glowing Nodes (Vibrant Colorful Points) */}
                  {/* Left edge Node (Blue) */}
                  <g transform="translate(120, 150)">
                    <circle cx="0" cy="0" r="10" fill="#3b82f6" fillOpacity="0.2" className="animate-ping" style={{ animationDuration: '3s' }} />
                    <circle cx="0" cy="0" r="6" fill="#3b82f6" filter="url(#glow-blue)" />
                    <circle cx="0" cy="0" r="3.5" fill="#ffffff" />
                  </g>

                  {/* Center Node (Orange) */}
                  <g transform="translate(180, 240)">
                    <circle cx="0" cy="0" r="14" fill="#f97316" fillOpacity="0.2" className="animate-ping" style={{ animationDuration: '2.5s' }} />
                    <circle cx="0" cy="0" r="8" fill="#f97316" filter="url(#glow-orange)" />
                    <circle cx="0" cy="0" r="4.5" fill="#ffffff" />
                  </g>

                  {/* Right Node (Yellow) */}
                  <g transform="translate(270, 210)">
                    <circle cx="0" cy="0" r="11" fill="#eab308" fillOpacity="0.25" className="animate-ping" style={{ animationDuration: '3.5s' }} />
                    <circle cx="0" cy="0" r="6.5" fill="#eab308" />
                    <circle cx="0" cy="0" r="3.5" fill="#ffffff" />
                  </g>

                  {/* Lower Node (Pink) */}
                  <g transform="translate(250, 285)">
                    <circle cx="0" cy="0" r="12" fill="#ec4899" fillOpacity="0.2" className="animate-ping" style={{ animationDuration: '2.8s' }} />
                    <circle cx="0" cy="0" r="7" fill="#ec4899" filter="url(#glow-pink)" />
                    <circle cx="0" cy="0" r="4" fill="#ffffff" />
                  </g>

                  {/* Lowest Node (Purple) */}
                  <g transform="translate(220, 310)">
                    <circle cx="0" cy="0" r="5" fill="#a855f7" />
                    <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
                  </g>

                  {/* Outside Orbiting Satellite (Green) */}
                  <motion.g
                    animate={{
                      x: [0, 10, -5, 0],
                      y: [0, -12, 6, 0]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 6,
                      ease: "easeInOut"
                    }}
                    transform="translate(230, 80)"
                  >
                    <circle cx="0" cy="0" r="8" fill="#22c55e" fillOpacity="0.3" className="animate-pulse" />
                    <circle cx="0" cy="0" r="4" fill="#22c55e" />
                  </motion.g>
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Proven in Manufacturing Clients Cards */}
      <section className="py-20 bg-transparent relative overflow-hidden z-10 mesh-gradient-teal blueprint-grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-150 px-3 py-1 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
              <span className="text-teal-600 font-bold text-xs uppercase tracking-wider font-mono">Case Studies</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Proven in Manufacturing - Trusted by Global Industry Leaders</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">Trusted by Global Industry Leaders, delivering real results across manufacturing and enterprise operations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qC.map((client, i) => {
              const details = [
                { industry: "Metallurgy & Materials", outcome: "30% reduction in planning latency, optimized furnace schedules" },
                { industry: "Automotive & Forging", outcome: "99.8% quality verification accuracy, reduced scrap rates" },
                { industry: "Industrial Equipment & Flow", outcome: "40% reduction in unplanned downtime, automated stock checks" },
                { industry: "Electrical Equipment & Power", outcome: "25% throughput acceleration, zero-lag supplier coordination" },
                { industry: "Food Processing & Packaged Goods", outcome: "Streamlined recipe costing & ingredient tracking, automated batches" },
                { industry: "Industrial Welding & Machinery", outcome: "Automated purchase requisition flows, real-time inventory visibility" }
              ][i] || { industry: "Manufacturing", outcome: "Optimized operational efficiency" };

              return (
                <motion.div 
                  key={i}
                  className="glass-overlay-card rounded-2xl border border-white/60 p-6 shadow-lg hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 sweep-shine cursor-pointer group flex flex-col justify-between"
                  initial={{ opacity: 0, y: 25 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.6, delay: i * 0.08 }} 
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-900 transition-colors">{client.name}</h3>
                      <span className={`text-[9px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full ${client.tag === 'AI ERP' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                        {client.tag}
                      </span>
                    </div>

                    <div className="space-y-3.5 text-left">
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Industry</span>
                        <span className="text-xs font-semibold text-gray-800">{details.industry}</span>
                      </div>
                      
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Solution</span>
                        <span className="text-xs text-gray-600 leading-relaxed block">{client.desc}</span>
                      </div>

                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Outcome</span>
                        <span className="text-xs font-bold text-indigo-950 block">{details.outcome}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-gray-50 flex items-center text-[10px] font-bold text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity space-x-1">
                    <span>View Case Study</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 10: Why Choose Us (Light Theme) */}
      <section className="py-20 bg-transparent relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }} 
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="inline-block text-purple-600 font-semibold text-sm uppercase tracking-wide mb-4">Why Choose Us</div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Agentfloww</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">Four reasons manufacturing leaders choose Agentfloww for their ERP and AI automation needs.</p>
              <div className="space-y-6">
                {QC.map((item, i) => (
                  <motion.div 
                    key={i}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, x: -20 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.6, delay: i * 0.15 }} 
                    viewport={{ once: true }}
                  >
                    <div className="text-purple-600 flex-shrink-0 mt-1">
                      <item.icon size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Orchestration network card (Light Theme) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: 0.2 }} 
              viewport={{ once: true, amount: 0.3 }} 
              className="relative w-full z-10"
            >
              {/* Logo themed glow background */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-500 rounded-3xl blur-2xl opacity-65 max-w-[580px] mx-auto pointer-events-none" />
              <div className="bg-white rounded-3xl border border-gray-150 shadow-xl relative overflow-hidden group hover:border-purple-500/30 transition-all duration-700 p-8 flex flex-col justify-between min-h-[460px] z-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none transform group-hover:bg-purple-600/10 transition-all duration-700 animate-pulse-slow" />
                <div className="absolute bottom-1/3 left-10 w-72 h-72 bg-blue-600/5 rounded-full blur-[80px] pointer-events-none transform group-hover:bg-blue-600/10 transition-all duration-700 animate-pulse-slow" style={{ animationDelay: "2.5s" }} />
                <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Enterprise Orchestration Core</span>
                  </div>
                  <span className="text-[9px] font-mono text-purple-600 font-semibold">Status: Automated</span>
                </div>

                <div className="relative z-10 flex-1 flex items-center justify-center py-4">
                  <svg className="w-full h-full max-w-[420px] aspect-[4/3] overflow-visible" viewBox="0 0 400 300">
                    <defs>
                      <filter id="glow-purple-light" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Connection lines */}
                    {[
                      { x: 70, y: 55 }, { x: 60, y: 150 }, { x: 70, y: 245 },
                      { x: 330, y: 55 }, { x: 340, y: 150 }, { x: 330, y: 245 }
                    ].map((pt, idx) => {
                      const isActive = hoveredWhyNode === idx;
                      return (
                        <g key={idx}>
                          <path 
                            d={`M200,150 L${pt.x},${pt.y}`} 
                            stroke={isActive ? '#c084fc' : 'rgba(0,0,0,0.06)'} 
                            strokeWidth={isActive ? 2.5 : 1.5}
                            strokeDasharray={isActive ? "none" : "4 6"}
                            className="transition-all duration-300"
                          />
                          <circle cx="0" cy="0" r="3" fill={isActive ? '#d8b4fe' : '#a855f7'} className="circuit-line">
                            <animateMotion dur="2.5s" repeatCount="indefinite" path={`M${pt.x},${pt.y} L200,150`} />
                          </circle>
                        </g>
                      );
                    })}

                    {/* Central Brain core Node */}
                    <g transform="translate(160, 110)">
                      <circle cx="40" cy="40" r="34" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2.5" filter="url(#glow-purple-light)" />
                      <circle cx="40" cy="40" r="28" fill="#a855f7" fillOpacity="0.15" className="pulse-slow" />
                      <g transform="translate(18, 18)">
                        <svg viewBox="0 0 145 122" width="44" height="44" className="overflow-visible">
                          <defs>
                            <linearGradient id="logo-symbol-gradient" x1="134.49" y1="0.6" x2="26.49" y2="115.6" gradientUnits="userSpaceOnUse">
                              <stop offset="0" stopColor="#FF6F00" stopOpacity={0.8} />
                              <stop offset="0.33" stopColor="#D301A8" stopOpacity={0.9} />
                              <stop offset="0.55" stopColor="#A702CC" stopOpacity={0.8} />
                              <stop offset="1" stopColor="#36A9FA" stopOpacity={0.7} />
                            </linearGradient>
                          </defs>
                          <path d="M138.5,61.3c0.5,36.3-34.2,65.7-69.9,59.4C6.3,110.6-0.7,23.9,58.8,3.6c38.2-13.2,80.1,16.4,79.7,57.1 L138.5,61.3Z" fill="url(#logo-symbol-gradient)" />
                          <path d="M21.5,85.7c7,6,15.5-3,20-7c4.5-4,17-20.5,17-20.5c4-4.6,10.5-6.6,16.5,0l9.5,10.5c4.3,3.4,8.5,3.5,13,0 c4.5-3.5,19.5-24,23-27.5c3.5-3.5,8.5-8.5,15-5.5" fill="none" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
                        </svg>
                      </g>
                    </g>

                    {/* Outer Nodes */}
                    {[
                      { x: 70, y: 55, label: 'Core ERP', icon: Database },
                      { x: 60, y: 150, label: 'IoT Sensors', icon: Cpu },
                      { x: 70, y: 245, label: 'Manufacturing', icon: Factory },
                      { x: 330, y: 55, label: 'AI Agents', icon: Robot },
                      { x: 340, y: 150, label: 'Analytics', icon: ChartBar },
                      { x: 330, y: 245, label: 'Custom APIs', icon: PlugsConnected }
                    ].map((node, idx) => {
                      const isActive = hoveredWhyNode === idx;
                      const IconComponent = node.icon;
                      return (
                        <g 
                          key={idx} 
                          transform={`translate(${node.x - 18}, ${node.y - 18})`} 
                          onMouseEnter={() => setHoveredWhyNode(idx)}
                          onMouseLeave={() => setHoveredWhyNode(null)}
                          className="cursor-pointer"
                        >
                          <circle 
                            cx="18" 
                            cy="18" 
                            r={isActive ? 25 : 21} 
                            fill={isActive ? '#7c3aed' : '#ffffff'} 
                            stroke={isActive ? '#c084fc' : 'rgba(0, 0, 0, 0.08)'} 
                            strokeWidth={isActive ? '2' : '1.5'} 
                            className="transition-all duration-300"
                          />
                          <g transform="translate(8, 8) scale(0.8)">
                            <IconComponent size={24} className={isActive ? 'text-white' : 'text-gray-500'} />
                          </g>
                          <text 
                            x="18" 
                            y={node.x < 200 ? -12 : 50} 
                            fill={isActive ? '#7c3aed' : 'rgba(0,0,0,0.6)'} 
                            fontSize="9.5" 
                            fontWeight="bold" 
                            textAnchor="middle"
                            className="transition-colors duration-300 pointer-events-none font-mono"
                          >
                            {node.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Subtext description panel */}
                <div className="bg-gray-50/50 border border-gray-150 rounded-xl p-4 mt-4 min-h-[64px] flex flex-col justify-center text-center transition-all duration-300 relative z-10">
                  {hoveredWhyNode !== null ? (
                    <div>
                      <span className="text-xs text-purple-700 font-bold tracking-wide block mb-0.5">
                        {['ERP Systems Integration', 'Real-time IoT Telemetry', 'Manufacturing Workflow Sync', 'Autonomous AI Agents', 'Predictive Performance Analytics', 'Custom API Integrations'][hoveredWhyNode]}
                      </span>
                      <p className="text-[10px] text-gray-500">
                        {['Natively connects S/4HANA & B1 fields.', 'Tracks machine signals in real-time.', 'Automates floor logs & job tasks.', 'Deploys 24/7 worker agents.', 'Yield forecasting & trend charts.', 'Hooks into legacy database fields.'][hoveredWhyNode]}
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500">Hover over any edge node to inspect how Agentfloww integrates your systems natively.</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 11: Pre-Built ERP Accelerators */}
      <section className="py-20 bg-transparent relative overflow-hidden z-10 mesh-gradient-indigo blueprint-grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-150 px-3 py-1 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
              <span className="text-indigo-600 font-bold text-xs uppercase tracking-wider font-mono">Launch Fast</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Launch Fast - With Pre-Built ERP Accelerators</h2>
            <p className="text-lg text-gray-650 max-w-3xl mx-auto leading-relaxed">
              For manufacturers on SAP Business One, Agentfloww offers ready-to-deploy operational modules built on the SAP Service Layer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Gate Entry Management",
                desc: "Digitized inbound/outbound vehicle tracking with SAP GRPO auto-sync, QR-based driver ID, and weighbridge integration.",
                img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
                icon: Warehouse,
                badges: ["SAP GRPO Auto-Sync", "QR Driver ID", "Weighbridge API"]
              },
              {
                title: "Job Work Management",
                desc: "Subcontracting, BOM-based material issue/return, WIP tracking, and SAP production order write-back.",
                img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
                icon: Gear,
                badges: ["Subcontracting", "BOM Management", "WIP Tracking"]
              },
              {
                title: "Quality Control Management",
                desc: "Centralized inspection, tolerance-based pass/fail, NCR automation, and SAP batch/lot synchronization.",
                img: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=600&fit=crop",
                icon: CheckCircle,
                badges: ["Inspections", "NCR Automation", "Batch Sync"]
              }
            ].map((module, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: idx * 0.1 }} 
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-150 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 sweep-shine h-full flex flex-col justify-between">
                  <div>
                    <div className="bg-gray-105 rounded-lg h-44 mb-6 overflow-hidden relative">
                      <img src={module.img} alt={module.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-purple-950/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                    <div className="text-purple-600 mb-3 flex justify-start">
                      <module.icon size={26} className="group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-900 transition-colors">{module.title}</h3>
                    <p className="text-gray-550 leading-relaxed text-xs mb-4">{module.desc}</p>
                    
                    {/* Integration Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {module.badges.map((badge, bIdx) => (
                        <span key={bIdx} className="text-[9px] font-bold font-mono px-2 py-0.5 rounded bg-indigo-55 border border-indigo-100 text-indigo-700">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 pt-3 border-t border-gray-50 flex items-center text-xs font-bold text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity space-x-1">
                    <span>Explore Module Details</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 12: ERP Intelligence on Demand */}
      <section className="py-20 bg-transparent relative z-10 mesh-gradient-teal blueprint-grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-left">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8 }} 
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-150 px-3 py-1 rounded-full mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
                  <span className="text-teal-600 font-bold text-xs uppercase tracking-wider font-mono">ERP Intelligence on Demand</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">ERP Intelligence on Demand</h2>
                
                <div className="space-y-6">
                  <div className="bg-white/60 border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-bold text-gray-900 mb-2 text-sm">AI-Powered Data Retrieval & Analytics</h4>
                    <p className="text-xs text-gray-650 leading-relaxed">Natural-language ERP queries, AI-based SQL generation, executive KPI dashboards, trend & anomaly detection, PDF/Excel exports, automated hourly sync.</p>
                  </div>
                  <div className="bg-white/60 border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-bold text-gray-900 mb-2 text-sm">ERP AI Integration & Support Services</h4>
                    <p className="text-xs text-gray-655 leading-relaxed">Intelligent write-back (PO drafts, production orders, stock transfers), retry/failure recovery, full audit trail, AI support assistant, integration health monitoring.</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="flex-1 w-full relative">
              {/* Logo themed glow background */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-500 rounded-3xl blur-2xl opacity-65 max-w-[520px] mx-auto pointer-events-none" />
              <motion.div 
                initial={{ opacity: 0, x: 20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8, delay: 0.2 }} 
                viewport={{ once: true }} 
                className="relative z-10"
              >
                <SQLQueryVisualizer />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 13: Simple Setup Process */}
      <section className="py-20 bg-transparent relative overflow-hidden z-10 mesh-gradient-indigo blueprint-grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-150 px-3 py-1 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
              <span className="text-indigo-600 font-bold text-xs uppercase tracking-wider font-mono font-bold">Setup Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Simple Setup Process</h2>
            <p className="text-lg text-gray-650 max-w-3xl mx-auto leading-relaxed">
              Get up and running with Agentfloww in three straightforward steps. No extensive ERP redevelopment required.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto px-4">
            {/* Animated filling connector line */}
            <div className="absolute top-8 left-[16%] right-[16%] h-0.5 bg-gray-200 hidden md:block z-0">
              <motion.div 
                className="h-full bg-indigo-600"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                viewport={{ once: true }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {[
                { step: 1, title: "Choose Your Agent", desc: "Pick from the six ERP Agentic AI Automation pillars." },
                { step: 2, title: "Configure Settings", desc: "Connect via your ERP's integration layer (e.g., SAP Service Layer / S/4HANA)." },
                { step: 3, title: "Start Using", desc: "Your agent is live inside your ERP workflow." }
              ].map((step, idx) => (
                <motion.div 
                  key={idx}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 rounded-full bg-indigo-600 border-4 border-white shadow-lg flex items-center justify-center text-white font-extrabold text-xl mb-4 relative">
                    {step.step}
                    <motion.div 
                      className="absolute inset-0 rounded-full border-2 border-indigo-400"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                    />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-xs text-gray-550 leading-relaxed px-4">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Homepage Latest Blog Section */}
      <HomeBlogSection />

      {/* Section 14: Let's Build the Future of Your Manufacturing Operations (Final CTA) */}
      <section className="py-20 md:py-24 bg-[#0a192f] text-white relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              viewport={{ once: true }}
              className="text-center md:text-left md:col-span-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">Let's Build the Future of Your Manufacturing Operations</h2>
              <p className="text-sm text-gray-300 mb-8 leading-relaxed font-medium">Schedule a free 30-minute discovery session to see exactly how Agentfloww can automate your ERP & manufacturing workflows.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/contact" className="inline-flex items-center bg-white text-gray-900 px-6 py-3.5 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-200 group">
                  <span>Schedule Discovery Session</span>
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.1 }} 
              viewport={{ once: true }}
              className="text-center md:col-span-1"
            >
              <div className="text-cyan-400 mb-4 flex justify-center md:justify-start">
                <Envelope size={32} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 md:text-left">Contact Info</h3>
              <p className="text-gray-300 mb-1 text-sm md:text-left font-mono">Email: aditya@agentfloww.com</p>
              <p className="text-gray-300 mb-1 text-sm md:text-left font-mono">Web: www.agentfloww.com</p>
              <div className="md:text-left mt-4">
                <Link to="/contact" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-200 group">
                  <span>Contact Page</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }} 
              viewport={{ once: true }}
              className="text-center md:text-right md:col-span-1"
            >
              <div className="text-cyan-400 mb-4 flex justify-center md:justify-end">
                <MapPin size={32} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Our Offices</h3>
              <p className="text-gray-300 text-sm mb-2 font-mono">UAE: +971 58 525 4420 · Dubai</p>
              <p className="text-gray-300 text-sm font-mono">India: +91 8956512955 · Pune</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;