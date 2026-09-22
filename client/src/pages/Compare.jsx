import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { 
  CheckCircle, 
  Warning, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Coins, 
  Factory, 
  Broadcast, 
  Gear, 
  Database, 
  Terminal,
  ChartBar, 
  Calculator, 
  Robot, 
  PlugsConnected, 
  Pulse as Activity, 
  Calendar, 
  MagnifyingGlass, 
  CaretDown, 
  CaretRight,
  UserCheck,
  TrendUp,
  FileText,
  Cloud
} from '@phosphor-icons/react'

// --- Dynamic Odometer / Counter Component ---
const AnimatedCounter = ({ target, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let startTime = null
        const targetVal = parseFloat(target)
        if (isNaN(targetVal)) {
          setCount(target)
          return
        }

        const animate = (timestamp) => {
          if (!startTime) startTime = timestamp
          const progress = Math.min((timestamp - startTime) / duration, 1)
          const current = progress * targetVal
          
          if (target.toString().includes('.')) {
            setCount(current.toFixed(1))
          } else {
            setCount(Math.floor(current))
          }

          if (progress < 1) {
            window.requestAnimationFrame(animate)
          } else {
            setCount(target)
          }
        }
        window.requestAnimationFrame(animate)
        observer.disconnect()
      }
    }, { threshold: 0.1 })

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={elementRef}>{count}{suffix}</span>
}

// --- Comparison Data ---
const comparisonFeatures = [
  {
    id: "integration",
    title: "ERP Integration Architecture",
    icon: PlugsConnected,
    desc: "How the automation system connects to your enterprise database (SAP, Oracle, Dynamics, etc.).",
    agentfloww: {
      text: "API-Native (REST/OData & Service Layer API)",
      rating: "check",
      detail: "Direct secure writebacks and transactional commits to ERP database without middleware. Reads and logs data instantly with 0ms sync delay."
    },
    rpa: {
      text: "UI Screen Scraping",
      rating: "warning",
      detail: "Simulates manual clicks on desktop windows. Fails whenever any input field shifts slightly or browser updates UI."
    },
    manual: {
      text: "No Integration",
      rating: "cross",
      detail: "Requires human operators to download attachment emails, open SAP screens, and manually copy-paste values cell-by-cell."
    }
  },
  {
    id: "engine",
    title: "Process Execution Logic",
    icon: Robot,
    desc: "The reasoning engine behind extracting fields and resolving operational deviations.",
    agentfloww: {
      text: "Autonomous Agentic AI",
      rating: "check",
      detail: "Understands intent via natural language. Parses unformatted documents dynamically and adapts to invoice formatting layout changes."
    },
    rpa: {
      text: "Hardcoded Static Rules",
      rating: "warning",
      detail: "Relies on rigid templates. If a vendor adds a new column or moves the invoice total cell, the RPA script halts with an exception."
    },
    manual: {
      text: "Human Work",
      rating: "cross",
      detail: "FTEs reading sheets and keying in data. Plagued by fatigue, distractions, and typing errors."
    }
  },
  {
    id: "resilience",
    title: "System Resilience & Alerting",
    icon: Activity,
    desc: "How failures, anomalies, or document mismatch exceptions are managed.",
    agentfloww: {
      text: "24/7 RPA Log Intelligence & Auto-Retry",
      rating: "check",
      detail: "Automatically scans logs, discovers mismatch root causes, auto-heals layout changes, and drafts alerts only on critical errors."
    },
    rpa: {
      text: "Silent Failures & Halting",
      rating: "warning",
      detail: "Halts the queue entirely when validation fails. Requires specialized RPA developers to fix code before operations resume."
    },
    manual: {
      text: "Delayed Auditing",
      rating: "cross",
      detail: "Errors are usually found days later during manual financial closing reconciliations, costing time and supplier goodwill."
    }
  },
  {
    id: "interface",
    title: "Operational Interface",
    icon: Terminal,
    desc: "The user experience for checking values, retrieving reports, or triggering processes.",
    agentfloww: {
      text: "Conversational NLP (Type or Talk)",
      rating: "check",
      detail: "Get real-time inventory updates, PO drafts, or PDF spend reports via simple chat commands. Built-in SQL auto-generator."
    },
    rpa: {
      text: "CLI / System Console Only",
      rating: "warning",
      detail: "Requires logging into complex orchestrator panels. No natural language control for non-technical operations staff."
    },
    manual: {
      text: "Complex ERP WebGUI / Excel sheets",
      rating: "cross",
      detail: "Operators must navigate nested menus, multiple filters, and heavy spreadsheets to assemble a single report."
    }
  },
  {
    id: "time-to-value",
    title: "Deployment & Setup Sprints",
    icon: Calendar,
    desc: "Onboarding speed and custom development cycles before first business value.",
    agentfloww: {
      text: "16-Week Agile Accelerators",
      rating: "check",
      detail: "Built using preconfigured modules (Gate Entry, Job Work, Quality Control) that map immediately to standard SAP schemas."
    },
    rpa: {
      text: "Multi-Month Custom Dev Cycles",
      rating: "warning",
      detail: "Requires massive process mapping workshops, layout recorders, and bespoke scripting from scratch."
    },
    manual: {
      text: "Immediate / Weeks of Training",
      rating: "cross",
      detail: "No software setup, but high onboarding friction. Days spent training operators on company guidelines and rules."
    }
  },
  {
    id: "analytics",
    title: "Cognitive Decision Capabilities",
    icon: ChartBar,
    desc: "How the system performs forecasting and analytics.",
    agentfloww: {
      text: "Predictive Analytics & Forecasters",
      rating: "check",
      detail: "Performs demand inventory forecasting, detects micro production losses, and audits spend compliance automatically."
    },
    rpa: {
      text: "Zero Intelligence (Calculators Only)",
      rating: "warning",
      detail: "Limited to moving data. Cannot predict stock shortages, analyze spend trends, or discover inefficiencies."
    },
    manual: {
      text: "Manual Report Analysis",
      rating: "cross",
      detail: "Ops managers review historical reports in retrospect, making reactive rather than proactive decisions."
    }
  }
]

// --- FAQ Data ---
const faqQuestions = [
  {
    category: "general",
    q: "How does Agentfloww differ from traditional RPA platforms?",
    a: "Traditional RPA uses static screen recording scripts to replicate human clicks. If a button moves 5 pixels, RPA breaks. Agentfloww is API-native and cognitive; it integrates directly with the ERP Service Layer and uses AI agents that parse document intent, adapting dynamically to document layout changes without breaking."
  },
  {
    category: "general",
    q: "Is 80%+ automation realistic in manufacturing ERPs?",
    a: "Yes. By combining API writebacks with LLM document parsers, Agentfloww processes straight-through transactions automatically. Most manufacturing clients reach an 85% to 92% straight-through processing rate within the first 30 days of deployment."
  },
  {
    category: "technical",
    q: "What ERP systems and databases are supported?",
    a: "We offer native accelerators for SAP Business One (REST Service Layer), SAP S/4HANA, Oracle NetSuite, Microsoft Dynamics 365, Odoo Enterprise, and Epicor. Databases supported include SAP HANA, MS SQL Server, PostgreSQL, and Oracle DB."
  },
  {
    category: "technical",
    q: "How do AI agents handle data verification and compliance?",
    a: "Agentfloww acts as a secure co-pilot inside your ERP workflow. AI agents parse transaction parameters (e.g. quantity, rate) and cross-verify them against Purchase Orders (POs) and Goods Receipts (GRNs). Any variance triggers role-based approvals and audit logs, securing transaction compliance."
  },
  {
    category: "performance",
    q: "What typical cost savings and productivity gains do clients experience?",
    a: "AI ERP engagements deliver a 20-30% increase in productivity for our manufacturing clients. By reducing PO cycle times from 45 minutes to under 5 minutes and eliminating invoice entry errors, operational costs are slashed by up to 75%."
  },
  {
    category: "performance",
    q: "What is the typical timeline to launch an Agentfloww module?",
    a: "A typical deployment takes 16 weeks. This includes system mapping, configuring pre-built Service Layer accelerators, validating schemas, custom AI training, user acceptance testing (UAT), and a 30-day hypercare support window."
  }
]

// --- Enterprise AI Intelligence Mesh Modules ---
const meshModules = [
  { id: "erp", title: "ERP Databases", icon: Database, desc: "Direct Service Layer transactions & writebacks for SAP, Oracle, and Dynamics.", angle: -90, status: "Connected" },
  { id: "crm", title: "CRM Pipelines", icon: UserCheck, desc: "Synchronize pipeline leads, customer accounts, and billing files.", angle: -50, status: "Connected" },
  { id: "email", title: "Email Queues", icon: Broadcast, desc: "Monitor supplier inboxes for incoming request attachments.", angle: -10, status: "Active" },
  { id: "docs", title: "Document OCR", icon: FileText, desc: "Cognitive parsing of PDFs, spreadsheets, and layout structures.", angle: 30, status: "Connected" },
  { id: "apis", title: "APIs & Webhooks", icon: PlugsConnected, desc: "Trigger external systems and verify dynamic vendor parameters.", angle: 70, status: "Active" },
  { id: "db", title: "Local DBs", icon: Database, desc: "Secure direct queries, logging histories, and data ledger transactions.", angle: 110, status: "Connected" },
  { id: "cloud", title: "Cloud Store", icon: Cloud, desc: "Automatic S3/Azure file archives of audited transaction records.", angle: 150, status: "Active" },
  { id: "human", title: "Human Review", icon: UserCheck, desc: "Escalation queues for verification of unmatched anomalies.", angle: 190, status: "Standby" },
  { id: "analytics", title: "KPI Analytics", icon: ChartBar, desc: "Real-time cost anomaly reporting and spend scorecard calculations.", angle: 230, status: "Connected" }
]

// --- Isometric Enterprise Integration Stack Layers ---
const stackLayers = [
  { 
    id: 3, 
    title: "Transactional ERP Commit", 
    role: "Database Writebacks & Commit Logs", 
    desc: "Automates direct transactional ledger updates with zero human data-entry latency. Commits verified line items natively into core ERP registers.", 
    status: "Active", 
    metric: "0.8s sync writeback latency", 
    connected: ["SAP S/4HANA & B1", "Oracle NetSuite", "Dynamics 365", "MS SQL Tables"],
    color: "#22c55e",
    glowColor: "rgba(34, 197, 94, 0.15)",
    cardOffset: -120
  },
  { 
    id: 2, 
    title: "Cognitive AI Processing & RAG", 
    role: "Validation, Extraction, and Matching Engine", 
    desc: "Performs three-way match reconciliations of invoice data against Purchase Orders (POs) and Goods Receipts (GRNs). AI agents extract unformatted PDF invoice fields and dynamically resolve variances.", 
    status: "Running", 
    metric: "94.2% straight-through accuracy", 
    connected: ["Agentfloww RAG Vector Registers", "Cognitive LLM Pipelines", "Auditing Guardrails"],
    color: "#6366f1",
    glowColor: "rgba(99, 102, 241, 0.15)",
    cardOffset: 0
  },
  { 
    id: 1, 
    title: "Edge & Ingestion Capture", 
    role: "Multi-channel Real-time Ingestion", 
    desc: "Gathers raw data straight from the source. Monitors supplier email attachments, logs factory floor IoT sensors, and receives inbound webhooks.", 
    status: "Connected", 
    metric: "12+ channels active", 
    connected: ["Gmail/Outlook API queues", "IoT REST sensor telemetry", "FTP secure uploads", "S3 buckets"],
    color: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.15)",
    cardOffset: 120
  }
]

const Compare = () => {
  const [expandedRow, setExpandedRow] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [faqCategory, setFaqCategory] = useState("all")
  const [poVolume, setPoVolume] = useState(1500)
  const [activeFaq, setActiveFaq] = useState(0)

  // Odometer calculator state variables
  const hoursSavedValue = Math.round(poVolume * (40 / 60)) // 40 mins saved per PO
  const costSavingsValue = Math.round(poVolume * 15) // $15 average labor + error cost saved per PO
  const stpValue = 94.2

  // Prevent auto-scroll on mount
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  // Filter FAQ questions
  const filteredFaqs = faqQuestions.filter(item => {
    const matchesCategory = faqCategory === "all" || item.category === faqCategory
    const matchesSearch = item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.a.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Connected architecture hovered node state
  const [hoveredBenefit, setHoveredBenefit] = useState(null)
  const benefitDetails = {
    ERP: "Direct API writebacks for Purchase Requisitions, Sales Orders, and Goods Receipts (GRN) with 0% data lag.",
    IoT: "Synchronize factory floor sensor logs with ERP inventory ledgers, enabling real-time stock checks.",
    Manufacturing: "Auto-parse Bill of Materials (BOM) revisions and feed stock requirements straight to production schedules.",
    AI: "Cognitive parsing of supplier emails and PDFs. Automatically matching rate variables with historical data.",
    CRM: "Direct sync between sales team leads, pipeline accounts, and ERP invoice billing lines.",
    Analytics: "Real-time cost anomaly alarms, demand forecasting charts, and vendor scorecard calculations."
  }

  // Isometric Enterprise Integration Stack state
  const [hoveredLayer, setHoveredLayer] = useState(2)

  // Enterprise AI Intelligence Mesh state
  const [hoveredModule, setHoveredModule] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.05
    const y = (e.clientY - rect.top - rect.height / 2) * 0.05
    setMousePos({ x, y })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
  }

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024) // Match responsive breakpoints
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const size = isMobile ? 380 : 600
  const radius = isMobile ? 115 : 210

  return (
    <div className="Compare-Page bg-slate-50 text-slate-900 overflow-x-hidden pt-16">
      <Helmet>
        <title>Agentfloww vs Traditional ERP Automation | Agentfloww</title>
        <meta name="description" content="See why Agentfloww's API-native cognitive AI operating system outperforms manual processes, screen scraping, and traditional RPA. Explore interactive matrices, calculators, and network architecture." />
      </Helmet>

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden py-16 md:py-24 border-b border-slate-100 bg-white">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />

        {/* Skewed background visual gradient - like original design */}
        <div
          className="absolute bottom-6 left-0 w-full h-[250px] opacity-30 transform -skew-y-12 origin-top-left z-10"
          style={{ 
            background: 'linear-gradient(45deg, #ff6b6b 0%, #4ecdc4 15%, #45b7d1 30%, #96ceb4 45%, #feca57 60%, #ff9ff3 75%, #54a0ff 90%, #5f27cd 100%)', 
            backgroundSize: '500% 300%', 
            backgroundPosition: 'top left', 
            animation: 'gradientFlow 20s ease infinite' 
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left side text */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-150 px-4 py-1.5 rounded-full text-indigo-650 font-mono text-xs uppercase tracking-wider"
              >
                <Activity className="w-4 h-4 animate-pulse" />
                <span>Enterprise Protocol Redefined</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight font-sans"
              >
                Agentfloww <span className="text-indigo-655">vs</span> Traditional ERP Automation
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
              >
                Purpose-built AI agents outperform manual processes, screen scraping, and traditional RPA. Compare how native API writebacks and cognitive intelligence resolve enterprise busywork.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <a
                  href="#comparison"
                  className="btn-primary text-lg px-8 py-3.5 flex items-center space-x-2 group shadow-lg cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </div>

            {/* Right side split visualization */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-2xl relative overflow-hidden"
              >
                {/* Background grid */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

                <div className="grid grid-cols-2 gap-4 relative z-10">
                  
                  {/* Glowing split divider */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-transparent via-indigo-500 to-transparent flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-ping filter drop-shadow(0 0 8px #6366f1)"></div>
                  </div>

                  {/* LEFT: Manual processes */}
                  <div className="pr-4 space-y-4 text-left">
                    <div className="flex items-center space-x-2 border-b border-red-100/60 pb-2 mb-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      <span className="text-xs font-mono font-bold text-red-650 uppercase tracking-wide">Manual Process</span>
                    </div>
                    {[
                      { title: "Excel Matching", desc: "Manual comparison of sheet rows." },
                      { title: "Email Pipeline", desc: "PDFs stuck in attachments." },
                      { title: "Approval Lag", desc: "PO pending manager reviews." },
                      { title: "Errors & Typos", desc: "Data entered incorrectly." }
                    ].map((item, i) => (
                      <div key={i} className="bg-red-50 border border-red-200 rounded-xl p-3 space-y-1 relative hover:bg-red-100/50 transition-colors">
                        <span className="text-xs font-bold text-red-800 font-sans block">{item.title}</span>
                        <span className="text-[10px] text-slate-500 leading-tight block">{item.desc}</span>
                        <X className="absolute top-3 right-3 text-red-500 w-3.5 h-3.5" />
                      </div>
                    ))}
                  </div>

                  {/* RIGHT: Agentfloww AI */}
                  <div className="pl-4 space-y-4 text-left">
                    <div className="flex items-center space-x-2 border-b border-green-100/60 pb-2 mb-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-xs font-mono font-bold text-green-650 uppercase tracking-wide">Agentfloww AI</span>
                    </div>
                    {[
                      { title: "Connected ERP", desc: "Service Layer transactional sync." },
                      { title: "AI Automation", desc: "Autonomous matching workflows." },
                      { title: "Live Dashboards", desc: "Telemetry monitoring active data." },
                      { title: "AI Agents", desc: "Cognitive parsing & routing." }
                    ].map((item, i) => (
                      <div key={i} className="bg-green-50 border border-green-200 rounded-xl p-3 space-y-1 relative hover:bg-green-100/50 transition-colors">
                        <span className="text-xs font-bold text-green-800 font-sans block">{item.title}</span>
                        <span className="text-[10px] text-slate-655 leading-tight block">{item.desc}</span>
                        <CheckCircle className="absolute top-3 right-3 text-green-500 w-3.5 h-3.5" />
                      </div>
                    ))}
                  </div>

                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= COMPARISON SECTION ================= */}
      <section id="comparison" className="py-24 relative overflow-hidden bg-slate-50 border-b border-slate-200/60">
        <div className="absolute inset-0 bg-dot-pattern opacity-25 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-indigo-650 font-mono text-xs uppercase tracking-wider font-semibold">Side-by-Side Analysis</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">Compare Architecture Models</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base font-normal">
              A breakdown of integration capabilities, failure recovery systems, and operational parameters. Click on any row to expand developer-level details.
            </p>
          </div>

          {/* Sticky header container */}
          <div className="bg-white border border-slate-200/80 shadow-xl rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

            {/* Grid Header - Hidden on Mobile */}
            <div className="hidden md:grid grid-cols-12 border-b border-slate-200 text-xs font-mono uppercase tracking-wider font-bold text-slate-700 py-0 px-0">
              <div className="col-span-4 bg-emerald-50/20 px-6 py-5 border-r border-slate-200/80 text-left font-sans text-sm font-bold text-slate-800 flex items-center">
                Enterprise Features
              </div>
              <div className="col-span-3 bg-emerald-50/30 px-6 py-4 border-r border-slate-200/80 text-center flex flex-col justify-center items-center">
                <span className="text-sm font-extrabold text-green-650 tracking-tight block">Agentfloww AI</span>
                <span className="text-[9px] text-slate-400 font-mono tracking-wide mt-0.5 font-bold uppercase">Recommended</span>
              </div>
              <div className="col-span-3 bg-blue-50/15 px-6 py-4 border-r border-slate-200/80 text-center flex flex-col justify-center items-center">
                <span className="text-sm font-bold text-slate-700 tracking-tight block">Traditional RPA</span>
                <span className="text-[9px] text-slate-400 font-mono tracking-wide mt-0.5 uppercase">Basic</span>
              </div>
              <div className="col-span-2 bg-blue-50/25 px-6 py-4 text-center flex flex-col justify-center items-center">
                <span className="text-sm font-bold text-slate-750 tracking-tight block">Manual Process</span>
                <span className="text-[9px] text-slate-400 font-mono tracking-wide mt-0.5 uppercase">Legacy</span>
              </div>
            </div>

            {/* Expandable Rows */}
            <div className="divide-y divide-slate-150">
              {comparisonFeatures.map((row) => {
                const Icon = row.icon
                const isExpanded = expandedRow === row.id
                return (
                  <div key={row.id} className="relative transition-all duration-300">
                    
                    {/* Main row grid layout */}
                    <div 
                      onClick={() => setExpandedRow(isExpanded ? null : row.id)}
                      className={`grid grid-cols-1 md:grid-cols-12 items-stretch cursor-pointer transition-all duration-300 py-0 px-0 gap-0 border-b border-slate-150 ${isExpanded ? 'bg-indigo-50/10' : ''}`}
                    >
                      {/* Column 1: Feature details */}
                      <div className="col-span-1 md:col-span-4 bg-emerald-50/20 py-5 px-6 border-r border-slate-200/80 flex items-center space-x-3 text-left">
                        <div className={`p-2.5 rounded-lg border transition-all ${isExpanded ? 'bg-indigo-50 border-indigo-200 text-indigo-650' : 'bg-white border-slate-200 text-slate-400'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-sm font-extrabold text-slate-800 block">{row.title}</span>
                          <span className="text-[11px] text-slate-500 leading-normal block max-w-xs mt-0.5">{row.desc}</span>
                        </div>
                      </div>

                      {/* Column 2: Agentfloww */}
                      <div className="col-span-1 md:col-span-3 bg-emerald-50/30 py-5 px-6 border-r border-slate-200/80 flex items-center space-x-2.5 text-left md:justify-center">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-xs font-extrabold text-slate-800">{row.agentfloww.text}</span>
                        </div>
                      </div>

                      {/* Column 3: Traditional RPA */}
                      <div className="col-span-1 md:col-span-3 bg-blue-50/15 py-5 px-6 border-r border-slate-200/80 flex items-center space-x-2.5 text-left md:justify-center">
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex-shrink-0"></div>
                          <span className="text-xs font-semibold text-slate-500">{row.rpa.text}</span>
                        </div>
                      </div>

                      {/* Column 4: Manual */}
                      <div className="col-span-1 md:col-span-2 bg-blue-50/25 py-5 px-6 flex items-center space-x-2.5 text-left md:justify-center relative">
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex-shrink-0"></div>
                          <span className="text-xs font-semibold text-slate-500">{row.manual.text}</span>
                        </div>

                        {/* Expand Chevron */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block">
                          {isExpanded ? (
                            <CaretDown className="w-4 h-4 text-slate-400" />
                          ) : (
                            <CaretRight className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                      </div>

                    </div>

                    {/* Detailed Expansion Content */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden border-t border-slate-150 bg-slate-50/40"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 font-sans text-xs leading-relaxed">
                            {/* Agentfloww card */}
                            <div className="bg-indigo-50 border border-indigo-150 p-4 rounded-xl space-y-2 text-left">
                              <span className="font-mono text-indigo-800 font-bold uppercase tracking-wide block">Agentfloww Advantage:</span>
                              <p className="text-slate-700 font-normal">{row.agentfloww.detail}</p>
                            </div>
                            {/* RPA card */}
                            <div className="bg-amber-50 border border-amber-150 p-4 rounded-xl space-y-2 text-left">
                              <span className="font-mono text-amber-800 font-bold uppercase tracking-wide block">RPA Limitations:</span>
                              <p className="text-slate-655 font-normal">{row.rpa.detail}</p>
                            </div>
                            {/* Manual card */}
                            <div className="bg-red-50 border border-red-150 p-4 rounded-xl space-y-2 text-left">
                              <span className="font-mono text-red-800 font-bold uppercase tracking-wide block">Manual Drawbacks:</span>
                              <p className="text-slate-655 font-normal">{row.manual.detail}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                )
              })}

              {/* Verdict Row */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-stretch py-0 px-0 gap-0 border-t border-slate-150">
                <div className="col-span-4 bg-emerald-50/20 py-6 px-6 border-r border-slate-200/80 text-left flex items-center justify-between">
                  <span className="text-sm font-extrabold text-slate-800">Verdict</span>
                </div>
                <div className="col-span-3 bg-emerald-50/30 py-6 px-6 border-r border-slate-200/80 flex items-center justify-start md:justify-center">
                  <span className="px-4 py-1.5 bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-full text-xs font-bold font-sans flex items-center space-x-1.5 shadow-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Winner</span>
                  </span>
                </div>
                <div className="col-span-3 bg-blue-50/15 py-6 px-6 border-r border-slate-200/80 flex items-center justify-start md:justify-center">
                  <span className="px-4 py-1.5 bg-slate-105 border border-slate-200 text-slate-600 rounded-full text-xs font-semibold font-sans">
                    Basic RPA
                  </span>
                </div>
                <div className="col-span-2 bg-blue-50/25 py-6 px-6 flex items-center justify-start md:justify-center">
                  <span className="px-4 py-1.5 bg-slate-105 border border-slate-200 text-slate-500 rounded-full text-xs font-semibold font-sans">
                    Legacy Manual
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Swipe stack indicator for mobile responsiveness */}
          <div className="md:hidden mt-6 text-center text-xs text-slate-500 font-mono">
            <span>💡 Select any feature row to view technical differences.</span>
          </div>

        </div>
      </section>

      {/* ================= ONE INTELLIGENCE LAYER STACK ================= */}
      <section className="py-24 relative bg-white border-b border-slate-150">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-green-650 font-mono text-xs uppercase tracking-wider font-semibold">AI Orchestration Layer</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight font-sans">
              One Intelligence Layer. <span className="text-green-600">Every Enterprise System.</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base font-normal leading-relaxed">
              How Agentfloww operates inside your technical stack, moving transactions from edge capture layers directly into audited ERP records.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Interactive 3D Isometric Stack */}
            <div className="lg:col-span-6 flex items-center justify-center relative min-h-[500px]">
              
              {/* Glowing aura behind stack */}
              <div className="absolute w-[80%] h-[80%] bg-gradient-to-tr from-indigo-50/10 via-cyan-50/10 to-green-50/10 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>

              {/* Stack container */}
              <div 
                className="relative flex flex-col justify-center items-center w-full max-w-[400px] h-[480px] z-20"
                style={{ 
                  perspective: isMobile ? 'none' : '1000px',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Vertical SVG connection line inside stack container (pixel-perfect alignment) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" viewBox="0 0 400 480">
                  <defs>
                    <linearGradient id="beam-grad" x1="0" y1="0" x2="0" y2="100%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="50%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                  
                  {/* Glowing vertical laser beam */}
                  <line 
                    x1="200" 
                    y1="80" 
                    x2="200" 
                    y2="400" 
                    stroke="url(#beam-grad)" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    strokeOpacity="0.8"
                  />
                  <line 
                    x1="200" 
                    y1="80" 
                    x2="200" 
                    y2="400" 
                    stroke="url(#beam-grad)" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                    strokeOpacity="0.2"
                    className="blur-[2px]"
                  />
                  
                  {/* Flowing animated light particles moving UP */}
                  <circle r="4.5" fill="#22c55e" filter="drop-shadow(0 0 6px #22c55e)">
                    <animate 
                      attributeName="cy" 
                      from="400" 
                      to="80" 
                      dur="2.5s" 
                      repeatCount="indefinite" 
                    />
                  </circle>
                  <circle r="4.5" fill="#6366f1" filter="drop-shadow(0 0 6px #6366f1)">
                    <animate 
                      attributeName="cy" 
                      from="400" 
                      to="80" 
                      dur="2.5s" 
                      begin="1.25s"
                      repeatCount="indefinite" 
                    />
                  </circle>
                </svg>

                {stackLayers.map((layer) => {
                  const isHovered = hoveredLayer === layer.id
                  return (
                    <motion.div
                      key={layer.id}
                      onMouseEnter={() => setHoveredLayer(layer.id)}
                      onClick={() => setHoveredLayer(layer.id)}
                      className="absolute cursor-pointer transition-all duration-300 w-[260px] h-[100px] md:w-[300px] md:h-[110px]"
                      style={{
                        top: `calc(50% + ${layer.cardOffset}px)`,
                        left: '50%',
                        transformStyle: 'preserve-3d',
                      }}
                      animate={{
                        x: '-50%',
                        y: isHovered ? '-60%' : '-50%',
                        z: isHovered ? 40 : 0,
                        rotateX: isMobile ? 0 : 60,
                        rotateZ: isMobile ? 0 : -45,
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 180, 
                        damping: 20 
                      }}
                    >
                      {/* Tilted Glassmorphism Layer Card */}
                      <div 
                        className={`w-full h-full rounded-2xl p-4 flex flex-col justify-between backdrop-blur-md border transition-all duration-300 ${isHovered ? "bg-white/95 shadow-2xl text-slate-800" : "bg-white/70 shadow-lg border-slate-200/80"}`}
                        style={{
                          borderColor: isHovered ? layer.color : '',
                          boxShadow: isHovered ? `0 20px 40px -10px ${layer.glowColor}` : ''
                        }}
                      >
                        {/* Layer Title & Dot status */}
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-slate-500">
                            Layer 0{layer.id}
                          </span>
                          <div className="flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: layer.color }}></span>
                            <span className="text-[8px] font-mono text-slate-450 uppercase">{layer.status}</span>
                          </div>
                        </div>

                        {/* Layer details */}
                        <div className="text-left space-y-1">
                          <h4 className="text-xs md:text-sm font-extrabold text-slate-800 leading-tight">
                            {layer.title}
                          </h4>
                          <span className="text-[9px] text-slate-450 block truncate font-medium uppercase tracking-wide">
                            {layer.role}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

            </div>

            {/* Right side: Detailed Description Board */}
            <div className="lg:col-span-6 flex relative">
              
              {/* Glowing aura behind details card */}
              <div className="absolute w-[95%] h-[95%] bg-gradient-to-tr from-purple-500/10 via-indigo-500/10 to-blue-500/10 rounded-[2.5rem] blur-3xl -z-10 animate-pulse-slow"></div>

              {stackLayers.map((layer) => {
                if (layer.id !== hoveredLayer) return null
                return (
                  <motion.div
                    key={layer.id}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-slate-200/80 shadow-2xl rounded-3xl p-6 md:p-8 flex flex-col justify-between w-full text-left min-h-[380px] relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

                    <div className="space-y-6 relative z-10">
                      
                      {/* Header Badge */}
                      <div className="flex items-center space-x-3">
                        <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: layer.color }}></span>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: layer.color }}>
                          {layer.title} Architecture
                        </span>
                      </div>

                      {/* Role & Description */}
                      <div className="space-y-2">
                        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
                          {layer.role}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed font-normal">
                          {layer.desc}
                        </p>
                      </div>

                      {/* Status Metric tag */}
                      <div className="inline-flex items-center bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl font-mono text-[10px] text-slate-655 font-bold uppercase">
                        <Activity className="w-3.5 h-3.5 mr-1.5 animate-pulse text-indigo-600" />
                        <span>Active Telemetry: {layer.metric}</span>
                      </div>

                      {/* Connected systems tag list */}
                      <div className="space-y-2 pt-2">
                        <span className="text-[10px] font-mono font-bold text-slate-450 uppercase tracking-widest block">Supported Connectors:</span>
                        <div className="flex flex-wrap gap-2">
                          {layer.connected.map((sys, sIdx) => (
                            <span 
                              key={sIdx} 
                              className="px-2.5 py-1 bg-slate-50/80 border border-slate-150 rounded-lg text-[10px] text-slate-600 font-semibold"
                            >
                              {sys}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>

                    <div className="border-t border-slate-100 pt-4 mt-6 text-[10px] text-slate-400 font-mono flex justify-between items-center relative z-10">
                      <span>SECURE TRANSACTION TUNNEL</span>
                      <span>SYSTEM LOG ENCRYPTION: TLS 1.3</span>
                    </div>

                  </motion.div>
                )
              })}

            </div>

          </div>

          {/* Bottom glass metrics panel */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12 w-full max-w-7xl mx-auto z-20">
            {[
              { label: "Connected Systems", target: "12", suffix: "+" },
              { label: "Active AI Agents", target: "8", suffix: "" },
              { label: "Docs Processed Today", target: "14240", suffix: "" },
              { label: "Automations Running", target: "99.8", suffix: "%" },
              { label: "Avg Response Time", target: "1.2", suffix: "s" },
              { label: "Success Rate", target: "94.2", suffix: "%" }
            ].map((m, idx) => (
              <div 
                key={idx} 
                className="text-center space-y-2 p-4 bg-white/90 border border-slate-200 shadow-lg rounded-2xl relative z-10 transition-all hover:shadow-xl hover:border-slate-300"
              >
                <div className="text-2xl md:text-3xl font-extrabold text-slate-800 font-sans tracking-tight leading-none">
                  <AnimatedCounter target={m.target} suffix={m.suffix} />
                </div>
                <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider font-semibold leading-tight">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= HOW AGENTFLOWW BENEFITS MANUFACTURERS ================= */}
      <section className="py-24 relative overflow-hidden bg-slate-50 border-b border-slate-200/60">
        <div className="absolute inset-0 bg-dot-pattern opacity-25 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-indigo-650 font-mono text-xs uppercase tracking-wider font-semibold font-bold">Business Outcomes</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight font-sans">
              How Agentfloww Benefits Manufacturers
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base font-normal leading-relaxed">
              Three primary ways Agentfloww drives autonomous efficiency and transactional compliance on the factory floor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "ERP-Native Expertise",
                body: "Deep integration with SAP S/4HANA, SAP Build, and ERP/CRM — not bolt-on middleware.",
                badge: "Native Integration",
                icon: Database,
                color: "from-blue-500 to-indigo-650",
                glow: "rgba(99, 102, 241, 0.15)"
              },
              {
                title: "60+ Projects Delivered",
                body: "A proven track record across manufacturing, automotive, logistics, and government.",
                badge: "Enterprise Scale",
                icon: CheckCircle,
                color: "from-purple-500 to-pink-600",
                glow: "rgba(236, 72, 153, 0.15)"
              },
              {
                title: "AI + IoT + ERP Together",
                body: "AI agents, IoT sensors, and enterprise systems combined for end-to-end automation.",
                badge: "Cognitive Mesh",
                icon: PlugsConnected,
                color: "from-green-500 to-cyan-600",
                glow: "rgba(34, 197, 94, 0.15)"
              }
            ].map((card, idx) => {
              const CardIcon = card.icon
              return (
                <div 
                  key={idx}
                  className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 md:p-10 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between items-start text-left min-h-[320px] relative overflow-hidden group"
                  style={{
                    boxShadow: `hover: 0 20px 40px -10px ${card.glow}`
                  }}
                >
                  {/* Grid pattern background inside card */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

                  <div className="space-y-6 relative z-10 w-full">
                    {/* Floating Glowing Badge & Icon Header */}
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-slate-450 bg-slate-100 border border-slate-200/60 px-3 py-1 rounded-full">
                        {card.badge}
                      </span>
                      
                      {/* Floating glowing circle icon container */}
                      <div className="relative flex items-center justify-center">
                        <div className={`absolute inset-0 rounded-full blur-md opacity-45 bg-gradient-to-tr ${card.color} group-hover:scale-125 transition-transform duration-300`}></div>
                        <div className={`w-12 h-12 rounded-full p-[1.5px] bg-gradient-to-tr ${card.color} relative z-10 shadow-lg`}>
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-slate-800 group-hover:bg-slate-50 transition-colors">
                            <CardIcon size={20} className="group-hover:scale-110 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Title & Body */}
                    <div className="space-y-3 pt-4">
                      <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors font-sans">
                        {card.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed font-normal">
                        {card.body}
                      </p>
                    </div>
                  </div>

                  {/* Visual bottom indicator bar */}
                  <div className={`w-full h-1 mt-8 rounded-full bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ================= PROOF, NOT PROMISES SECTION ================= */}
      <section className="py-24 relative overflow-hidden bg-white border-b border-slate-150">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-indigo-650 font-mono text-xs uppercase tracking-wider font-semibold">Live Operational Proof</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">Proof, Not Promises</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base font-normal">
              Explore live metrics and simulate calculated savings based on your company's actual transaction volume.
            </p>
          </div>

          {/* Interactive slider & live odometer dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
            
            {/* Left Col: Interactive calculator controller */}
            <div className="lg:col-span-5 flex">
              <div className="bg-slate-50 border border-slate-200 shadow-2xl rounded-3xl p-6 md:p-8 flex flex-col justify-between w-full text-left">
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 border-b border-slate-200 pb-4">
                    <Calculator className="w-5 h-5 text-indigo-500" />
                    <span className="text-sm font-mono font-bold text-slate-800 uppercase tracking-wider">Savings Calculator</span>
                  </div>

                  <p className="text-slate-500 text-xs leading-relaxed">
                    Adjust the slider to match your estimated monthly Purchase Order (PO) or invoice transaction volume. Watch calculated savings update in real time.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-655 font-medium">Monthly Transactions:</span>
                      <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded">{poVolume} POs</span>
                    </div>
                    <input 
                      type="range" 
                      min="100" 
                      max="10000" 
                      step="100"
                      value={poVolume} 
                      onChange={(e) => setPoVolume(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>100</span>
                      <span>5,000</span>
                      <span>10,000</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-6 mt-8 space-y-3 text-xs leading-normal">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Average Manual Cycle:</span>
                    <span className="text-red-500 font-bold">45 min / PO</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Agentfloww AI Cycle:</span>
                    <span className="text-green-600 font-bold">&lt; 5 min / PO</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Live dashboards */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              
              {/* Card 1: Cycle Time Timeline */}
              <div className="bg-slate-50 border border-slate-200 shadow-2xl rounded-3xl p-6 flex flex-col justify-between text-left">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <span className="text-xs font-mono font-bold text-indigo-500 uppercase tracking-wide">Cycle Time Analysis</span>
                    <Clock className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800">Timeline Shrinking Proof</h3>
                  
                  <div className="space-y-4 pt-2">
                    {/* Before bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Manual Process Cycle:</span>
                        <span>45 mins</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-red-400 h-full w-full rounded-full"></div>
                      </div>
                    </div>
                    {/* After bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Agentfloww AI Cycle:</span>
                        <span>&lt; 5 mins</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: "100%" }}
                          animate={{ width: "11%" }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="bg-green-500 h-full rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200 mt-6 text-[10px] text-slate-400 font-mono">
                  <span>Reduction: ~89% time savings</span>
                </div>
              </div>

              {/* Card 2: Cost Savings counter */}
              <div className="bg-slate-50 border border-slate-200 shadow-2xl rounded-3xl p-6 flex flex-col justify-between text-left">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <span className="text-xs font-mono font-bold text-indigo-500 uppercase tracking-wide">Financial Return</span>
                    <Coins className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800">Calculated Monthly Benefit</h3>
                  
                  <div className="py-2 space-y-1">
                    <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 font-sans tracking-tight">
                      $<AnimatedCounter target={costSavingsValue} />
                    </div>
                    <span className="text-xs text-slate-500">Operator cost + error recovery saved</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200 mt-6 text-[10px] text-slate-400 font-mono">
                  <span>Based on {poVolume} PO volume</span>
                </div>
              </div>

              {/* Card 3: Capacity Released */}
              <div className="bg-slate-50 border border-slate-200 shadow-2xl rounded-3xl p-6 flex flex-col justify-between text-left">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <span className="text-xs font-mono font-bold text-indigo-500 uppercase tracking-wide">Efficiency Release</span>
                    <Activity className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800">Labor Hours Reallocated</h3>
                  
                  <div className="py-2 space-y-1">
                    <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-650 font-sans tracking-tight">
                      <AnimatedCounter target={hoursSavedValue} /> hrs
                    </div>
                    <span className="text-xs text-slate-500">Reallocated to strategic tasks</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200 mt-6 text-[10px] text-slate-400 font-mono">
                  <span>Calculated: {hoursSavedValue} hrs/month</span>
                </div>
              </div>

              {/* Card 4: STP Meter (gauge style) */}
              <div className="bg-slate-50 border border-slate-200 shadow-2xl rounded-3xl p-6 flex flex-col justify-between text-left">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <span className="text-xs font-mono font-bold text-indigo-500 uppercase tracking-wide">Automation Meter</span>
                    <TrendUp className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800">Straight-Through Processing</h3>
                  
                  {/* Circle Progress */}
                  <div className="flex items-center space-x-6 py-1">
                    <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="4" />
                        <motion.circle 
                          cx="32" 
                          cy="32" 
                          r="28" 
                          fill="none" 
                          stroke="#6366f1" 
                          strokeWidth="4" 
                          strokeDasharray="176"
                          initial={{ strokeDashoffset: 176 }}
                          animate={{ strokeDashoffset: 176 - (176 * 94.2) / 100 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-[10px] font-mono font-bold text-slate-800">94%</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">Auto-pilot Transactions</span>
                      <span className="text-[10px] text-slate-500 leading-normal block">Transactions completed without any manual key-in intervention.</span>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200 mt-6 text-[10px] text-slate-400 font-mono">
                  <span>Goal threshold: 90%+ auto-processing</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= FAQ KNOWLEDGE BASE SECTION ================= */}
      <section className="py-24 relative overflow-hidden bg-slate-50 border-b border-slate-200/60">
        <div className="absolute inset-0 bg-dot-pattern opacity-25 pointer-events-none"></div>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-indigo-650 font-mono text-xs uppercase tracking-wider font-semibold">Enterprise Knowledge Base</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base font-normal">
              Technical answers covering integrations, security protocols, development timeline sprint plans, and pricing logic.
            </p>
          </div>

          {/* Search and Category Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
            
            {/* Category tabs */}
            <div className="flex bg-white border border-slate-200 rounded-xl p-1 overflow-x-auto space-x-1">
              {[
                { id: "all", label: "All Questions" },
                { id: "general", label: "General RPA vs AI" },
                { id: "technical", label: "Technical & DBs" },
                { id: "performance", label: "Performance & ROI" }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setFaqCategory(cat.id)
                    setActiveFaq(0)
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${faqCategory === cat.id ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-900"}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative max-w-sm w-full">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlass className="h-5 w-5 text-slate-400" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setActiveFaq(0)
                }}
                placeholder="Search knowledge base..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm font-sans text-left"
              />
            </div>

          </div>

          {/* FAQ split grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-h-[380px]">
            
            {/* Left Col: list of questions */}
            <div className="lg:col-span-5 space-y-3 max-h-[460px] overflow-y-auto pr-2">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveFaq(idx)}
                    className={`w-full px-5 py-4 rounded-xl border text-left transition-all duration-300 font-sans ${activeFaq === idx ? "bg-indigo-50 border-indigo-200/80 text-slate-900" : "bg-white border-slate-200 text-slate-655 hover:bg-slate-50"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold leading-normal">{faq.q}</span>
                      <CaretRight className={`w-4 h-4 ml-3 flex-shrink-0 transition-transform ${activeFaq === idx ? "rotate-90 text-indigo-500" : "text-slate-400"}`} />
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-12 text-slate-500 bg-white border border-slate-200 rounded-xl">
                  <span>No questions matching search term.</span>
                </div>
              )}
            </div>

            {/* Right Col: Detailed answer card */}
            <div className="lg:col-span-7">
              {filteredFaqs.length > 0 && filteredFaqs[activeFaq] && (
                <motion.div
                  key={activeFaq}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white border border-slate-200/80 shadow-2xl rounded-3xl p-6 md:p-8 shadow-2xl relative min-h-[320px] flex flex-col justify-between text-left"
                >
                  <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center space-x-2 text-indigo-650 font-mono text-xs uppercase tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-550"></span>
                      <span>Verified System Answer</span>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 font-sans leading-snug">
                      {filteredFaqs[activeFaq].q}
                    </h3>
                    
                    <p className="text-slate-600 text-base leading-relaxed pt-2 font-normal">
                      {filteredFaqs[activeFaq].a}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-4 mt-8 flex justify-between items-center text-xs text-slate-450 font-mono relative z-10">
                    <span className="uppercase">Category: {filteredFaqs[activeFaq].category}</span>
                    <span>Knowledge base active</span>
                  </div>
                </motion.div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* ================= FINAL CTA SECTION ================= */}
      <section className="py-24 relative overflow-hidden text-center border-t border-slate-200/60 bg-gradient-to-br from-green-500 via-blue-500 to-purple-600">
        {/* Glow and background circles */}
        <div className="absolute top-20 left-20 w-80 h-80 bg-white/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2.5s' }}></div>

        {/* SVG architecture blueprint circles in background */}
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="50%" r="300" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="5 15" />
          <circle cx="50%" cy="50%" r="200" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        </svg>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-5 py-2 rounded-full text-white text-xs font-mono font-bold uppercase tracking-wider">
              <span>Ready for Cognitive Integration?</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-sans">
              Ready to Replace Manual ERP Work?
            </h2>

            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Connect your SAP S/4HANA or Business One environment directly to our pre-built accelerators and launch your first AI agent workflow within weeks.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
              <Link
                to="/live-demo"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-indigo-650 px-10 py-5 rounded-xl font-bold hover:bg-indigo-50 shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <span>Schedule a Demo</span>
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white border border-white/40 px-10 py-5 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02]"
              >
                <span>Contact Sales</span>
              </Link>
            </div>

            {/* Floating Trust Indicators */}
            <div className="pt-10 flex flex-wrap justify-center items-center gap-8 md:gap-12 text-white font-mono text-xs uppercase tracking-wide">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <span className="font-semibold text-white">Free Consultation</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-white" />
                <span className="font-semibold text-white">Secure & Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-white" />
                <span className="font-semibold text-white">Quick Setup</span>
              </div>
            </div>

          </motion.div>
        </div>

      </section>

    </div>
  )
}

export default Compare