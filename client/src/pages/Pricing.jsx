import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { 
  FileText, Cpu, Robot, RocketLaunch, Pulse, 
  CheckCircle, Clock, Users, ArrowRight, Sparkle, 
  Plus, Minus, ShieldCheck, Database, Factory, 
  CaretRight, ChatCircleText, PlugsConnected
} from '@phosphor-icons/react'

// --- 1. Hero Implementation Flow Visual Node Component ---
const HeroImplementationFlow = () => {
  const [hoveredNode, setHoveredNode] = useState(null);

  const steps = [
    { 
      title: "Business requirements", 
      desc: "Auditing manual processes, target ERP modules, and workflow gaps.",
      deliverables: ["Process maps", "API capability audits", "Automation opportunity log"],
      icon: FileText 
    },
    { 
      title: "AI Architecture", 
      desc: "Defining LLM agents, prompt routing paths, and validation rules.", 
      deliverables: ["Agent prompt blueprints", "System routing flowcharts", "Data schema design"],
      icon: Cpu 
    },
    { 
      title: "Implementation", 
      desc: "Developing agents, writeback APIs, and database sync hooks.", 
      deliverables: ["Agent logic sandbox", "API gateway integrations", "Audit logging setup"],
      icon: PlugsConnected 
    },
    { 
      title: "Staged deployment", 
      desc: "Releasing through testing environments with safe shadow run configurations.", 
      deliverables: ["UAT test scripts", "Canary rollout parameters", "Rollback setup"],
      icon: RocketLaunch 
    },
    { 
      title: "Continuous optimization", 
      desc: "Monitoring writebacks, agent accuracy, and SLA-backed optimization.", 
      deliverables: ["Writeback reports", "Accuracy tuning logs", "Performance dashboard"],
      icon: Pulse 
    }
  ];

  return (
    <div className="relative w-full py-16 px-4 max-w-6xl mx-auto">
      {/* Background SVG connecting line (Desktop only) */}
      <div className="absolute top-[88px] left-0 w-full h-6 -translate-y-6 hidden md:block z-0">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 30">
          <defs>
            <linearGradient id="purple-glow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#EC4899" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <line x1="100" y1="15" x2="900" y2="15" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6 6" />
          <motion.line 
            x1="100" y1="15" x2="900" y2="15" 
            stroke="url(#purple-glow-gradient)" strokeWidth="2.5" 
            strokeDasharray="16 8"
            animate={{ strokeDashoffset: -120 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          />
        </svg>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isHovered = hoveredNode === idx;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              onMouseEnter={() => setHoveredNode(idx)}
              onMouseLeave={() => setHoveredNode(null)}
              className={`bg-white/95 backdrop-blur-md border p-6 rounded-3xl transition-all duration-300 flex flex-col justify-between text-left relative group min-h-[310px] ${
                isHovered 
                  ? 'border-purple-500 shadow-md shadow-purple-500/5 -translate-y-2' 
                  : 'border-slate-200/50 shadow-sm'
              }`}
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                  isHovered 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'bg-purple-500/10 border border-purple-500/20 text-purple-600'
                }`}>
                  <Icon size={22} />
                </div>
                <div className="absolute top-4 right-4 bg-slate-50 text-slate-400 font-mono text-[10px] w-5 h-5 rounded-full flex items-center justify-center border border-slate-200">
                  {idx + 1}
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm md:text-base mb-2">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>

              {/* Scope details are now permanently displayed and styled beautifully */}
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-left text-slate-500 space-y-1.5">
                <span className="font-bold text-[9px] text-purple-600 block uppercase tracking-wider mb-1">Scope Details:</span>
                {step.deliverables.map((item, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-1.5 leading-tight">
                    <span className="w-1 h-1 rounded-full bg-purple-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-600 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// --- 2. Engagement Model Cards ---
const EngagementModels = () => {
  const cards = [
    {
      title: "Starter",
      subtitle: "Single Workflow Automation",
      badge: "Workflow Pilot",
      desc: "One ERP Browser AI automation.",
      examples: ["Sales Order Creation", "Invoice Processing"],
      delivery: "Approximately 3–4 weeks",
      bestFor: "Companies wanting to validate AI automation on one workflow before expanding.",
      pricing: "Contact Us for a Quote",
      scope: ["Single workflow integration", "Standard data field mapping", "Read/Write validation rules"],
      team: ["1 AI Engineer", "1 Solution Architect (Part-time)"],
      architecture: ["ERP Browser Interface", "Standard API Access"],
      color: "from-purple-500/10 to-indigo-500/10",
      borderGlow: "group-hover:border-purple-400/40",
      shadowGlow: "hover:shadow-purple-500/10",
      icon: Robot
    },
    {
      title: "Growth",
      subtitle: "ERP Agentic AI Package",
      badge: "Department Scale",
      desc: "Multiple automation pillars working together.",
      pillars: [
        { name: "Conversational Automation", desc: "Natural-language ERP queries & actions." },
        { name: "End-to-End Procurement", desc: "RFQ processing, vendor compliance & bid audits." },
        { name: "Smart Compliance", desc: "Automated writeback validation & anomaly detection." },
        { name: "Cost & Inventory Control", desc: "Dynamic raw material checks & ledger sync." }
      ],
      delivery: "Scoped by selected pillars",
      deliveryTimeline: ["Support phased implementation"],
      bestFor: "Teams automating an entire department such as Procurement or Finance.",
      pricing: "Contact Us for a Quote",
      scope: ["Cross-module data flow", "Multi-agent orchestration", "Custom verification screens"],
      team: ["2 AI Engineers", "1 Solution Architect", "1 QA Specialist"],
      architecture: ["Multi-Agent Orchestrator", "Direct Database Mirroring"],
      popular: true,
      color: "from-purple-600/15 to-pink-600/15",
      borderGlow: "group-hover:border-pink-400/40",
      shadowGlow: "hover:shadow-pink-500/15",
      icon: PlugsConnected
    },
    {
      title: "Enterprise",
      subtitle: "Full ERP Platform Build",
      badge: "ERP Transformation",
      desc: "Custom enterprise implementation including Gate Entry, Job Work, Quality Control, AI Analytics, and Support Services.",
      delivery: "Approximately 16 weeks",
      deliveryTimeline: ["Weekly demos", "UAT reviews"],
      bestFor: "Complex organizations needing isolated cloud environments and legacy database integrations.",
      pricing: "Contact Us for a Quote",
      scope: [
        "Gate Entry Management",
        "Job Work Management",
        "Quality Control Management",
        "AI Analytics",
        "ERP AI Integration",
        "Support Services"
      ],
      builtOn: ["SAP Service Layer", "SAP Business One", "SAP S/4HANA"],
      team: ["2 Full Stack Developers", "Shared Functional Consultant", "1 QA Engineer", "1 Project Coordinator"],
      postLaunch: ["30-day Hypercare", "Optional Annual AMC"],
      color: "from-indigo-600/10 to-blue-600/10",
      borderGlow: "group-hover:border-blue-400/40",
      shadowGlow: "hover:shadow-blue-500/10",
      icon: Factory
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto px-4 py-8">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.15 }}
            whileHover={{ y: -6 }}
            className={`group relative bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 border border-slate-200/60 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden text-left ${card.shadowGlow} ${card.borderGlow}`}
          >
            {/* Animated card border background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

            <div className="space-y-6">
              {/* Top Row: Badge & Icon */}
              <div className="flex justify-between items-center">
                <span className="bg-slate-100 border border-slate-200/80 px-3 py-1 rounded-md text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                  {card.badge}
                </span>
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center border border-purple-100">
                  <Icon size={22} className="text-purple-650" />
                </div>
              </div>

              {/* Package Title */}
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{card.title}</h3>
                <p className="text-xs font-bold text-purple-600 mt-1 uppercase tracking-wide">{card.subtitle}</p>
                <p className="text-slate-500 text-xs mt-2.5 leading-relaxed">{card.desc}</p>
              </div>

              {/* Architecture Badge / Built on */}
              {card.builtOn && (
                <div className="pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Integrated Platform</span>
                  <div className="flex flex-wrap gap-1.5">
                    {card.builtOn.map((tech, tIdx) => (
                      <span key={tIdx} className="bg-blue-50/50 border border-blue-200 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold tracking-tight">
                        ⚙️ {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Implementation Scope */}
              <div className="pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Implementation Scope</span>
                {card.pillars ? (
                  <div className="space-y-2">
                    {card.pillars.map((pillar, pIdx) => (
                      <div key={pIdx} className="text-xs">
                        <span className="font-extrabold text-slate-800 block">✦ {pillar.name}</span>
                        <span className="text-slate-500 text-[11px] leading-tight block ml-3">{pillar.desc}</span>
                      </div>
                    ))}
                  </div>
                ) : card.examples ? (
                  <div className="space-y-1.5">
                    {card.examples.map((ex, eIdx) => (
                      <div key={eIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        {ex}
                      </div>
                    ))}
                  </div>
                ) : card.scope ? (
                  <div className="grid grid-cols-2 gap-1.5">
                    {card.scope.map((sc, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                        <span className="w-1 h-1 rounded-full bg-indigo-500" />
                        <span className="truncate">{sc}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              {/* Delivery timeline & details */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Timeline</span>
                    <div className="flex items-center gap-1.5 text-slate-700 text-xs font-extrabold">
                      <Clock size={14} className="text-purple-600" />
                      {card.delivery}
                    </div>
                    {card.deliveryTimeline && (
                      <div className="flex gap-2 mt-1.5 ml-5">
                        {card.deliveryTimeline.map((dt, dIdx) => (
                          <span key={dIdx} className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[9px] text-slate-500 font-semibold">{dt}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Delivery Team */}
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Delivery Team</span>
                  <div className="flex flex-wrap gap-1">
                    {card.team.map((member, mIdx) => (
                      <span key={mIdx} className="text-[10px] bg-slate-55 border border-slate-200/60 text-slate-600 px-2.5 py-0.5 rounded font-medium">
                        👤 {member}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Best For */}
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Best For</span>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{card.bestFor}</p>
                </div>

                {/* Post Launch support */}
                {card.postLaunch && (
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Post Launch Support</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {card.postLaunch.map((pl, pIdx) => (
                        <span key={pIdx} className="bg-emerald-50/50 border border-emerald-200 text-emerald-700 px-2 py-0.5 rounded text-[9px] font-bold">
                          ✓ {pl}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Pricing Section (Contact Us for a Quote) */}
            <div className="pt-8 border-t border-slate-100/60 mt-6">
              <div className="mb-4">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Investment</span>
                <div className="text-xl font-black text-slate-900 tracking-tight">{card.pricing}</div>
              </div>
              <Link
                to="/contact"
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs md:text-sm inline-flex items-center justify-center transition-all ${
                  card.popular 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-md shadow-purple-500/20' 
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-purple-400'
                }`}
              >
                Request Custom Estimate
                <ArrowRight size={15} className="ml-2" />
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// --- 3. Horizontal Journey Timeline ---
const JourneyTimeline = () => {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    { 
      title: "Discovery & technical audit", 
      desc: "Auditing database schemas, API capabilities, and custom objects across systems. Documenting legacy database writeback limitations and scoping initial automation thresholds.", 
      duration: "Week 1",
      systems: ["SAP ECC", "Oracle NetSuite", "PostgreSQL", "AWS RDS"],
      inputs: ["Database schemas", "API documentations", "Legacy audit logs"],
      outputs: ["Endpoint capability review", "API compatibility matrix"]
    },
    { 
      title: "Process blueprinting", 
      desc: "Analyzing human team operations step-by-step. Documenting form inputs, navigation loops, verification checks, and specific workflow edge-cases to outline the state machine.", 
      duration: "Week 2",
      systems: ["Salesforce CRM", "SAP Business One", "Shared Inbox Email"],
      inputs: ["Employee screen records", "Operational checklists", "Excel registers"],
      outputs: ["State-machine spec", "Compliance review blueprints"]
    },
    { 
      title: "AI & vector pipeline build", 
      desc: "Selecting foundational LLMs, configuring system prompts, constructing vector databases for document lookup (RAG), and designing historical memory caching layers.", 
      duration: "Weeks 3-5",
      systems: ["Claude 3.5 API", "Pinecone Vector DB", "pgvector", "LangChain"],
      inputs: ["Vendor contracts", "Product specifications", "Historical PO data"],
      outputs: ["Custom vector index", "Agent routing prompts", "Logic sandboxes"]
    },
    { 
      title: "ERP sync & API integration", 
      desc: "Developing secure REST / ODATA writeback APIs. Syncing data changes to intermediate staging buffers, and implementing strict validation schemas.", 
      duration: "Weeks 6-8",
      systems: ["SAP Gateway", "Microsoft Dynamics 365", "Custom SQL Backends"],
      inputs: ["Draft transaction payloads", "Verification schema checks"],
      outputs: ["Writeback REST routes", "Database staging trigger loops"]
    },
    { 
      title: "Sandbox QA fuzzing", 
      desc: "Simulating system failures, formatting errors, permission violations, and duplicate entries to test agent recovery logic and verify safety containment boundaries.", 
      duration: "Weeks 9-10",
      systems: ["Isolated QA Staging", "Cypress test suites", "Jest API Framework"],
      inputs: ["Malformed receipt numbers", "Empty fields", "Out-of-range dates"],
      outputs: ["Exception recovery logs", "Boundary test results", "Audit checklist"]
    },
    { 
      title: "Canary rollout production", 
      desc: "Staged deployment. The agent begins running in 'shadow mode' where actions are mirrored but require manual clicks before writing to the live ERP. Gradual volume increases follow.", 
      duration: "Week 11",
      systems: ["Live ERP Production Database", "Worker Approval Gateways"],
      inputs: ["Real-time production documents", "Active transactions"],
      outputs: ["Mirrored execution logs", "Staged writeback registers"]
    },
    { 
      title: "Hypercare & fine-tuning", 
      desc: "Continuous monitoring of prompt token costs, agent error flags, response times, and model accuracy levels. Fine-tuning prompt templates based on real production edge cases.", 
      duration: "Ongoing SLA",
      systems: ["Agentfloww Monitoring Console", "Datadog Telemetry Logs"],
      inputs: ["Execution performance logs", "User override indicators"],
      outputs: ["Weekly optimization reports", "Tuned prompt profiles"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Desktop Horizontal Timeline */}
      <div className="hidden lg:block relative px-4">
        {/* Timeline Connecting Path */}
        <div className="absolute top-[20px] left-14 right-14 h-[2px] bg-slate-100 -translate-y-1/2 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 origin-left"
            initial={{ width: 0 }}
            animate={{ width: `${(activeStage / (stages.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        <div className="relative z-10 flex justify-between">
          {stages.map((stage, idx) => (
            <div 
              key={idx}
              onMouseEnter={() => setActiveStage(idx)}
              onClick={() => setActiveStage(idx)}
              className="flex flex-col items-center cursor-pointer group w-32"
            >
              <motion.div 
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  activeStage >= idx 
                    ? 'bg-slate-900 border-slate-900 text-white shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-400 group-hover:border-purple-300'
                }`}
                animate={{ scale: activeStage === idx ? 1.15 : 1 }}
              >
                {idx + 1}
              </motion.div>
              <span className={`text-xs font-bold mt-3 transition-colors duration-200 text-center ${
                activeStage === idx ? 'text-slate-900 font-extrabold' : 'text-slate-500'
              }`}>
                {stage.title.split(" ")[0]}
              </span>
              <span className="text-[9px] text-slate-400 font-mono mt-1">{stage.duration}</span>
            </div>
          ))}
        </div>

        {/* Dynamic Dashboard Detail Card */}
        <motion.div 
          key={activeStage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-12 bg-white/95 backdrop-blur-md border border-slate-200/50 p-8 rounded-[2rem] shadow-sm text-left max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="md:col-span-2 space-y-4 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-2">
              <span className="bg-purple-500/10 text-purple-600 px-3.5 py-1 rounded-full text-[10px] font-semibold">
                Stage {activeStage + 1} ({stages[activeStage].duration})
              </span>
              <h4 className="text-lg font-black text-slate-900">{stages[activeStage].title}</h4>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm">
              {stages[activeStage].desc}
            </p>
          </div>

          {/* Premium tag pill visual panel */}
          <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 p-6 rounded-3xl space-y-5 text-xs shadow-sm">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block mb-2 tracking-wider">Systems Touched</span>
              <div className="flex flex-wrap gap-1.5">
                {stages[activeStage].systems.map((sys, sIdx) => (
                  <span key={sIdx} className="bg-purple-50 text-purple-700 border border-purple-100/60 px-3 py-1 rounded-full text-[11px] font-semibold transition-all hover:scale-[1.02]">{sys}</span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block mb-2 tracking-wider">Primary Inputs</span>
              <div className="flex flex-wrap gap-1.5">
                {stages[activeStage].inputs.map((inp, iIdx) => (
                  <span key={iIdx} className="bg-indigo-50 text-indigo-700 border border-indigo-100/60 px-3 py-1 rounded-full text-[11px] font-semibold transition-all hover:scale-[1.02]">{inp}</span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block mb-2 tracking-wider">Key Outputs</span>
              <div className="flex flex-wrap gap-1.5">
                {stages[activeStage].outputs.map((out, oIdx) => (
                  <span key={oIdx} className="bg-pink-50 text-pink-700 border border-pink-100/60 px-3 py-1 rounded-full text-[11px] font-semibold transition-all hover:scale-[1.02]">{out}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Vertical Timeline */}
      <div className="block lg:hidden space-y-6 px-4">
        {stages.map((stage, idx) => (
          <div 
            key={idx}
            className="flex gap-4 items-start bg-white/80 backdrop-blur-md border border-slate-200/50 p-5 rounded-2xl shadow-sm text-left"
          >
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-extrabold text-xs flex-shrink-0 mt-0.5 shadow-sm">
              {idx + 1}
            </div>
            <div>
              <span className="text-[9px] text-purple-600 font-mono font-bold block mb-0.5">{stage.duration}</span>
              <h4 className="font-extrabold text-slate-900 text-sm mb-2">{stage.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">{stage.desc}</p>
              
              <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/40 space-y-3.5 text-[10px] font-mono">
                <div>
                  <span className="text-slate-400 uppercase font-bold block mb-1">Systems:</span>
                  <div className="flex flex-wrap gap-1">
                    {stage.systems.map((sys, sIdx) => <span key={sIdx} className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded border border-purple-100">{sys}</span>)}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 uppercase font-bold block mb-1">Key Outputs:</span>
                  <div className="flex flex-wrap gap-1">
                    {stage.outputs.map((out, oIdx) => <span key={oIdx} className="bg-pink-50 text-pink-700 px-1.5 py-0.5 rounded border border-pink-100">{out}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 4. Bento Grid (What's Included) ---
const BentoGrid = () => {
  const items = [
    {
      title: "AI Development",
      desc: "Custom large language model pipelines, advanced agentic orchestration frameworks, domain-specific prompt design, and persistent RAG database memory.",
      icon: Cpu,
      badge: "Enterprise AI",
      span: "md:col-span-1"
    },
    {
      title: "Enterprise ERP Integrations",
      desc: "Deep API integrations with SAP, Oracle NetSuite, Dynamics 365, Odoo, and custom local SQL backends. We construct secure, transaction-safe writeback routines with automated validation checks.",
      icon: Database,
      badge: "Ecosystem Sync",
      span: "md:col-span-2"
    },
    {
      title: "Custom Workflows",
      desc: "Replacement of complex manual chains: processing invoices, reading vendor emails, checking goods receipt (GRN) logs, formatting data, and building automated Slack/Email approval loops.",
      icon: PlugsConnected,
      badge: "Process Flow",
      span: "md:col-span-2"
    },
    {
      title: "Security & Isolation",
      desc: "Bank-grade network architecture. Multi-tenant isolation, role-based authorization rules, and private network deployment gateways.",
      icon: ShieldCheck,
      badge: "Bank-grade Sec",
      span: "md:col-span-1"
    },
    {
      title: "Staff Onboarding",
      desc: "On-site and remote training workshops, direct workspace walkthroughs, and custom interactive system reference sheets.",
      icon: Users,
      badge: "User Adoption",
      span: "md:col-span-1"
    },
    {
      title: "Architecture Documentation",
      desc: "Detailed database connection diagrams, API endpoint specifications, validation rules, and comprehensive flow documents.",
      icon: FileText,
      badge: "Technical Spec",
      span: "md:col-span-1"
    },
    {
      title: "Strict QA Validation",
      desc: "Rigid testing procedures in safe sandbox staging instances. Stress validation, exception error simulation, and UAT verification.",
      icon: CheckCircle,
      badge: "Risk Mitigation",
      span: "md:col-span-1"
    },
    {
      title: "Zero-Downtime Deployment",
      desc: "Incremental production rollout strategy. Active monitoring systems verify writeback success rates before full cutover, eliminating workflow disruption risks.",
      icon: RocketLaunch,
      badge: "Scale Delivery",
      span: "md:col-span-2"
    },
    {
      title: "Post-Launch Support",
      desc: "Dedicated SLA-backed maintenance. Performance reviews, model fine-tuning, prompt updates, and quick error response coverage.",
      icon: Pulse,
      badge: "SLA Operations",
      span: "md:col-span-1"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 py-8">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            whileHover={{ y: -6 }}
            className={`bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left group min-h-[260px] ${item.span}`}
          >
            <div className="space-y-5">
              {/* Top Row with Badge and Glowing Icon Badge */}
              <div className="flex justify-between items-center">
                <span className="bg-slate-100/60 border border-slate-200/50 px-3 py-1 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500">
                  {item.badge}
                </span>
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-md scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-800 shadow-sm z-10">
                    <Icon size={20} className="text-slate-800 transition-colors group-hover:text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Title & Desc Text */}
              <div className="pt-1">
                <h4 className="text-xl font-extrabold text-slate-900 mb-2 transition-colors group-hover:text-purple-600">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>

            {/* Bottom Accent line (purple-magenta baseline) */}
            <div className="mt-8">
              <div className="w-full h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// --- 5. Interactive Delivery Model Comparison ---
const DeliveryModels = () => {
  const rows = [
    {
      factor: "Project Scope",
      fixed: "Predefined set of deliverables mapped out in initial contract specifications.",
      custom: "Adaptive development cycles focusing on an ongoing system backlog."
    },
    {
      factor: "Timeline Length",
      fixed: "Fixed duration (typically 4-12 weeks based on workflow size).",
      custom: "Ongoing roadmap rollout mapped across multi-sprint releases."
    },
    {
      factor: "Investment Structure",
      fixed: "Flat milestone payments mapped to set integration approvals.",
      custom: "Recurring allocation sprint budgets or long-term retainer configurations."
    },
    {
      factor: "Platform Integrations",
      fixed: "Up to 2 system connection pipelines (e.g. ERP + email).",
      custom: "Unlimited. Bridges cross-department databases & communication layers."
    },
    {
      factor: "Support SLA",
      fixed: "Standard business hours email & chat support.",
      custom: "24/7 Slack alerts, dedicated account team, and strict incident SLAs."
    },
    {
      factor: "Best Suited For",
      fixed: "Simple data sync tasks with explicit validation rules and formatting requirements.",
      custom: "Comprehensive ledger automations, custom NLP interfaces, and legacy software syncs."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-[2.5rem] shadow-xl p-6 md:p-8 space-y-4">
        {/* Header grid with standard 12-column layout */}
        <div className="grid grid-cols-12 gap-6 p-5 bg-slate-50 border border-slate-200/80 rounded-2xl items-center text-sm font-sans font-bold text-slate-500">
          <div className="col-span-3 text-slate-700 font-extrabold uppercase tracking-wider text-xs">Comparison Factor</div>
          <div className="col-span-4 text-purple-700 font-extrabold flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm shadow-purple-500/50 animate-pulse" />
            Fixed-Scope Scenarios
          </div>
          <div className="col-span-5 text-pink-700 font-extrabold flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-sm shadow-pink-500/50 animate-pulse" />
            Custom Enterprise Engagement
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-100">
          {rows.map((row, idx) => (
            <div 
              key={idx} 
              className="grid grid-cols-12 gap-6 py-6 items-start text-sm text-slate-800 hover:bg-slate-50/60 rounded-2xl px-4 transition-all duration-200 group"
            >
              <div className="col-span-3 font-bold text-slate-900 text-sm tracking-tight pt-0.5 pr-2">
                {row.factor}
              </div>
              <div className="col-span-4 leading-relaxed text-slate-650 font-medium pr-4 border-l border-slate-150 pl-4 group-hover:border-purple-300 transition-colors">
                {row.fixed}
              </div>
              <div className="col-span-5 leading-relaxed text-slate-650 font-medium pr-4 border-l border-slate-150 pl-4 group-hover:border-pink-300 transition-colors">
                {row.custom}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 6. Why Enterprise Scoping? (Factor Convergence) ---
const WhyEnterprisePricing = () => {
  const [hoveredFactor, setHoveredFactor] = useState(null);

  const factors = [
    { id: 1, name: "ERP Complexity", x: 140, y: 70, desc: "Legacy database structures, custom tables, on-prem constraints, and API protocols limit or speed integration." },
    { id: 2, name: "Number of Modules", x: 560, y: 70, desc: "Bridging multiple modules (e.g. Purchase Orders, Warehouse, Accounts Payable) increases integration complexity." },
    { id: 3, name: "Collaborating Agents", x: 50, y: 220, desc: "Setting up multi-agent networks where agents review and validate each other's work requires advanced flow testing." },
    { id: 4, name: "System Integrations", x: 650, y: 220, desc: "Connecting auxiliary communication systems like Slack, email clients, and customer CRMs alongside primary databases." },
    { id: 5, name: "Security & Isolation", x: 50, y: 380, desc: "Building strict data residency layers, local gateways, AD/SSO authorization rules, and isolated database vaults." },
    { id: 6, name: "Compliance Needs", x: 650, y: 380, desc: "Enforcing automated audit logs, industry-specific data filters, and rigid human-in-the-loop approvals." },
    { id: 7, name: "Workflow Exceptions", x: 140, y: 530, desc: "The number of complex edge cases and decision steps that the agent must autonomously handle instead of escalating." },
    { id: 8, name: "Hosting Setup", x: 560, y: 530, desc: "Deploying within secure private cloud containers (AWS/Azure/GCP VPCs) or directly on-premise." }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
      {/* Desktop Visual Convergence SVG */}
      <div className="hidden lg:block relative w-[700px] h-[600px] mx-auto">
        <div className="absolute left-[350px] top-[300px] -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none animate-pulse" />

        <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 700 600">
          <defs>
            <linearGradient id="purple-line-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#EC4899" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {factors.map((node) => {
            const isHovered = hoveredFactor === node.id;
            return (
              <g key={node.id}>
                <line 
                  x1={node.x} y1={node.y} 
                  x2={350} y2={300} 
                  stroke={isHovered ? "#EC4899" : "#E2E8F0"} 
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  strokeOpacity={isHovered ? 0.9 : 0.4}
                  className="transition-all duration-300"
                />
                <circle r="4" fill={isHovered ? "#EC4899" : "#8B5CF6"} filter="drop-shadow(0 0 4px rgba(236,72,153,0.5))">
                  <animateMotion 
                    dur={`${1.8 + node.id * 0.25}s`} 
                    repeatCount="indefinite" 
                    path={`M ${node.x},${node.y} L 350,300`} 
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Central Core (Purple logo indicators) */}
        <div className="absolute left-[350px] top-[300px] -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative flex items-center justify-center">
            <motion.div 
              className="absolute w-56 h-56 rounded-full border border-purple-500/20 border-dashed"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            />
            <motion.div 
              className="absolute w-44 h-44 rounded-full border border-pink-500/25"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            />
            <div className="bg-white/95 backdrop-blur-md border-2 border-purple-500 px-6.5 py-4 rounded-full shadow-md flex items-center justify-center whitespace-nowrap z-10">
              <span className="text-slate-900 font-extrabold text-xs uppercase tracking-widest flex items-center gap-1.5 font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping" />
                Every Business is Different
              </span>
            </div>
          </div>
        </div>

        {factors.map((node) => (
          <div
            key={node.id}
            onMouseEnter={() => setHoveredFactor(node.id)}
            onMouseLeave={() => setHoveredFactor(null)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer transition-all duration-300"
            style={{ left: `${node.x}px`, top: `${node.y}px` }}
          >
            <div className={`px-4.5 py-3 bg-white border rounded-2xl shadow-sm text-center whitespace-nowrap transition-all duration-300 ${
              hoveredFactor === node.id 
                ? 'border-purple-500 shadow-sm -translate-y-1' 
                : 'border-slate-200/70'
            }`}>
              <span className="text-xs font-bold text-slate-800">{node.name}</span>
            </div>
            
            <AnimatePresence>
              {hoveredFactor === node.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute top-12 left-1/2 -translate-x-1/2 w-52 bg-slate-900 text-white text-xs p-3.5 rounded-xl shadow-md text-center z-30"
                >
                  {node.desc}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Mobile Stack Layout */}
      <div className="block lg:hidden space-y-6">
        <div className="bg-purple-50/20 border border-purple-500/20 p-6 rounded-3xl text-center shadow-sm">
          <span className="text-purple-600 font-extrabold text-xs uppercase tracking-widest block mb-1">Scoping Principle</span>
          <h4 className="text-lg font-black text-slate-900">Every Business is Different</h4>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Unlike static SaaS platforms, implementation costs depend on these 8 dynamic complexity vectors:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {factors.map((node) => (
            <div key={node.id} className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
              <h5 className="font-extrabold text-slate-800 text-sm mb-1">{node.name}</h5>
              <p className="text-xs text-slate-500 leading-relaxed">{node.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 7. Timeline & Resource Estimator ---
const TimelineEstimator = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Single workflow automation",
      subtitle: "Focused deployment targeting a single repetitive transaction pipeline.",
      duration: "4–6 Weeks",
      durationVal: 25,
      teamSize: "2 Specialists",
      teamList: ["Solution Architect", "AI Engineer"],
      complexity: "Low–Medium",
      roi: "1–2 Months",
      useCase: "Automatically capturing line items from PDF vendor invoices, verifying details against GRN numbers, and staging drafts in SAP/NetSuite ERPs."
    },
    {
      title: "Departmental automation",
      subtitle: "Multi-agent workflows orchestrating whole process structures.",
      duration: "8–12 Weeks",
      durationVal: 75,
      teamSize: "4 Specialists",
      teamList: ["Project Manager", "Solution Architect", "AI Engineer", "QA Engineer"],
      complexity: "Medium–High",
      roi: "3–4 Months",
      useCase: "Connecting procurement processes on autopilot. Auto-drafting RFQs, auditing incoming bids, comparing historical prices, and generating buyer approval links."
    },
    {
      title: "Enterprise transformation",
      subtitle: "Cross-functional agent networks operating across core databases.",
      duration: "Custom roadmap",
      durationVal: 100,
      teamSize: "Dedicated squad",
      teamList: ["Product Manager", "Solution Architect", "AI Engineer", "DevOps Engineer", "ERP Expert", "QA Specialist"],
      complexity: "Bespoke",
      roi: "6–9 Months",
      useCase: "Unified multi-agent networks connecting inventory management databases with procurement and manufacturing control software for dynamic raw material allocation."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 text-center">
      {/* Premium Glass slider selector headers */}
      <div className="relative flex flex-col sm:flex-row justify-between items-center mb-8 bg-slate-100/80 border border-slate-200/50 p-2 rounded-2xl">
        {steps.map((st, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={`w-full text-center py-3 text-xs md:text-sm font-bold rounded-xl transition-all duration-300 relative z-10 ${
              activeStep === idx 
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/30' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {st.title.split(" ")[0] + " " + (st.title.split(" ")[1] || "")}
          </button>
        ))}
      </div>

      {/* Details Card - Premium Left-aligned structure */}
      <motion.div 
        key={activeStep}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white/90 backdrop-blur-md border border-slate-200/50 rounded-3xl p-8 shadow-sm grid grid-cols-1 md:grid-cols-5 gap-8 text-left"
      >
        <div className="md:col-span-3 space-y-6 flex flex-col justify-center">
          <div>
            <span className="bg-purple-500/10 text-purple-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">
              Scoping range
            </span>
            <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight">{steps[activeStep].title}</h4>
            <p className="text-xs md:text-sm text-slate-400 mt-2 leading-relaxed">{steps[activeStep].subtitle}</p>
          </div>
          
          <div className="pt-4 border-t border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-sans font-bold tracking-wider block mb-1">Example operational scope</span>
            <p className="text-xs md:text-sm text-slate-650 leading-relaxed font-sans font-medium">
              {steps[activeStep].useCase}
            </p>
          </div>
        </div>

        {/* Left aligned details metrics panel */}
        <div className="md:col-span-2 bg-slate-50 border border-slate-200/50 p-6 rounded-2xl space-y-4 text-xs font-sans">
          {/* Project Duration */}
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block mb-1">Project duration</span>
            <span className="font-extrabold text-slate-900 text-base md:text-lg block">{steps[activeStep].duration}</span>
            {/* milestone timeline inside card */}
            <div className="relative flex items-center justify-between w-full mt-3 pr-2">
              <div className="absolute left-1.5 right-4 top-1.5 h-[2px] bg-slate-200 z-0">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                  style={{ width: `${steps[activeStep].durationVal}%` }}
                />
              </div>
              {["Discovery", "Build", "Launch"].map((node, nIdx) => {
                const nodeActive = (activeStep === 0 && nIdx === 0) || (activeStep === 1 && nIdx <= 1) || (activeStep === 2);
                return (
                  <div key={nIdx} className="flex flex-col items-center relative z-10">
                    <div className={`w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center shadow-sm ${
                      nodeActive ? 'bg-purple-500 ring-2 ring-purple-500/10' : 'bg-slate-300'
                    }`} />
                    <span className="text-[8px] font-semibold text-slate-400 mt-1">{node}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Team */}
          <div className="pt-2 border-t border-slate-200/40">
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block mb-1">Delivery team</span>
            <span className="font-extrabold text-slate-900 block mb-1.5">{steps[activeStep].teamSize}</span>
            <div className="flex flex-wrap gap-1">
              {steps[activeStep].teamList.map((tag, tIdx) => (
                <span key={tIdx} className="text-[10px] bg-white border border-slate-200/50 text-slate-600 px-2 py-0.5 rounded font-medium">
                  👤 {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Complexity Indicator */}
          <div className="pt-2 border-t border-slate-200/40 grid grid-cols-2 gap-2">
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block mb-1">Complexity</span>
              <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200/60 px-2.5 py-0.5 rounded-md font-medium text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                {steps[activeStep].complexity}
              </div>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block mb-1">Expected ROI</span>
              <span className="font-extrabold text-purple-600 block pt-0.5">{steps[activeStep].roi}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- 8. Premium Accordion FAQ ---
const PricingFAQ = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "What is the typical engagement timeline?",
      answer: "Single workflow automation generally takes 3–4 weeks. A complete ERP platform implementation typically takes approximately 16 weeks, which includes process mapping, system integrations, custom prompt engineering, and sandbox safety QA fuzzing."
    },
    {
      question: "Do you support SAP Business One and SAP S/4HANA?",
      answer: "Yes. We natively support both SAP Business One (via the Service Layer API) and SAP S/4HANA, along with dynamic integrations for other legacy ERPs, CRMs, local SQL databases, and internal workflows."
    },
    {
      question: "What happens after Go Live?",
      answer: (
        <div className="space-y-3.5">
          <div>
            <span className="font-extrabold text-slate-900 block mb-1">Thirty days of Hypercare support including:</span>
            <ul className="list-disc pl-5 space-y-1 text-slate-500">
              <li>Bug fixes & query optimization</li>
              <li>User assistance & onboarding support</li>
              <li>Active writeback & performance monitoring</li>
            </ul>
          </div>
          <div className="border-t border-slate-100 pt-2">
            <span className="font-extrabold text-slate-900 block mb-1">Optional Annual AMC:</span>
            <ul className="list-disc pl-5 space-y-1 text-slate-500">
              <li>API maintenance & updates</li>
              <li>Continuous security updates & isolations</li>
              <li>Minor workflow enhancements & model fine-tuning</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      question: "How is pricing structured?",
      answer: (
        <div>
          <span className="font-extrabold text-slate-900 block mb-1">Pricing is customised based on:</span>
          <ul className="list-disc pl-5 space-y-1 text-slate-500 mb-3">
            <li>ERP environment details (SAP HANA, MSSQL, NetSuite)</li>
            <li>Required modules (Purchase Orders, Warehouses, Accounts Payable)</li>
            <li>Complexity of business workflows & exception conditions</li>
          </ul>
          <p className="text-slate-500">Each engagement is scoped individually. A discovery session provides a clear technical roadmap and flat-rate milestones.</p>
        </div>
      )
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openFaq === index;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className={`bg-white/80 backdrop-blur-md border rounded-2xl shadow-sm transition-all duration-300 overflow-hidden ${
              isOpen 
                ? 'border-purple-500 shadow-sm' 
                : 'border-slate-200/50 hover:border-purple-300'
            }`}
          >
            <div className="relative flex">
              <div className={`absolute top-0 bottom-0 left-0 w-1 transition-all duration-300 ${
                isOpen ? 'bg-gradient-to-b from-purple-500 to-pink-500' : 'bg-transparent'
              }`} />

              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer pl-7"
              >
                <h4 className="font-extrabold text-sm md:text-base text-slate-900 pr-4">{faq.question}</h4>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-500 transition-all ${
                  isOpen ? 'bg-slate-900 text-white border-slate-900' : ''
                }`}>
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>
            </div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-7 pb-6 pt-1 border-t border-slate-100 text-xs md:text-sm text-slate-500 leading-relaxed text-left">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

// --- 9. Final CTA Neural Canvas Background Component ---
const NeuralBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles = [];
    const particleCount = 75;

    // Boosted opacity purple / magenta logo colors
    const colors = ["rgba(139, 92, 246, 0.9)", "rgba(236, 72, 153, 0.9)", "rgba(167, 2, 204, 0.85)"];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 3.0 + 1.5,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        color: colors[i % colors.length]
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connection lines
      ctx.lineWidth = 0.9;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 125) {
            ctx.strokeStyle = `rgba(167, 2, 204, ${0.35 * (1 - dist / 125)})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    ctx.clearRect(0, 0, width, height);
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-95 z-0" />;
};

// --- Main Redesigned Pricing Component ---
const Pricing = () => {
  return (
    <>
      <Helmet>
        <title>Pricing & Scoping Roadmap - Agentfloww</title>
        <meta name="description" content="Explore custom enterprise AI implementation models, integration timelines, scoping principles, and FAQ for Agentfloww ERP automation solutions." />
      </Helmet>

      {/* Main Page Layout Wrapper */}
      <div className="min-h-screen bg-slate-50 relative overflow-hidden text-slate-800">
        {/* Subtle grid background overlay */}
        <div className="absolute inset-0 blueprint-grid-bg opacity-70 pointer-events-none z-0" />

        {/* Section 1: Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 z-10 overflow-hidden">
          <NeuralBackground />
          {/* Background Glows like Homepage */}
          <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-purple-500/5 rounded-full blur-[110px] pointer-events-none" />
          
          <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center bg-purple-500/10 border border-purple-500/20 rounded-full px-5 py-2">
                <Sparkle size={16} className="text-purple-600 mr-2 animate-pulse" />
                <span className="text-purple-600 text-xs font-mono font-bold uppercase tracking-wider">Enterprise Scoping & Consultation</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight">
                Engagement Options Built <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  Around Your ERP Environment
                </span>
              </h1>
              
              <p className="text-sm md:text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
                Every manufacturing operation runs its ERP differently. Pricing is scoped around your workflows, ERP modules and automation requirements rather than fixed subscription plans.
              </p>

              <div className="flex justify-center pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3.5 px-8 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md shadow-purple-500/20 hover:scale-[1.02]"
                >
                  Contact Us for a Quote
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </motion.div>

            {/* SVG implementation pipeline diagram */}
            <HeroImplementationFlow />
          </div>
        </section>

        {/* Section 2: Engagement Models */}
        <section className="relative py-16 md:py-24 z-10 border-t border-slate-200/30">
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[115px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="space-y-3 mb-12">
              <span className="text-purple-600 font-mono text-xs font-bold uppercase tracking-widest block">Operational Scale</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">Choose Your Engagement Level</h2>
              <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
                From targeted single task automation to comprehensive cross-functional ERP ecosystem rollouts.
              </p>
            </div>
            
            <EngagementModels />
          </div>
        </section>

        {/* Section 3: AI Implementation Journey */}
        <section className="relative py-16 md:py-24 z-10 border-t border-slate-200/30 bg-white/30">
          <div className="absolute top-1/3 left-1/3 w-[450px] h-[450px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="space-y-3 mb-12">
              <span className="text-purple-600 font-mono text-xs font-bold uppercase tracking-widest block">Implementation Lifecycle</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">Your AI Implementation Journey</h2>
              <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
                Understanding what you pay for: our rigorous process ensures database integrity and high SLA delivery.
              </p>
            </div>

            <JourneyTimeline />
          </div>
        </section>

        {/* Section 4: What's Included (Bento Grid) */}
        <section className="relative py-16 md:py-24 z-10 border-t border-slate-200/30">
          <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="space-y-3 mb-12">
              <span className="text-purple-600 font-mono text-xs font-bold uppercase tracking-widest block">Platform Features</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">What is Included in Every Project</h2>
              <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
                Complete engineering allocation. We deliver production-ready, security-hardened business layers.
              </p>
            </div>

            <BentoGrid />
          </div>
        </section>

        {/* Section 5: Delivery Models */}
        <section className="relative py-16 md:py-24 z-10 border-t border-slate-200/30 bg-white/30">
          <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[110px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="space-y-3 mb-12">
              <span className="text-purple-600 font-mono text-xs font-bold uppercase tracking-widest block">Pricing Alignment</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                Flexible <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Delivery Models</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
                We align our pricing structures directly with your internal budgeting goals and technical boundaries.
              </p>
            </div>

            <DeliveryModels />
          </div>
        </section>

        {/* Section 6: Why Enterprise Pricing? */}
        <section className="relative py-16 md:py-24 z-10 border-t border-slate-200/30">
          <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="space-y-3 mb-8">
              <span className="text-purple-600 font-mono text-xs font-bold uppercase tracking-widest block">Custom Scoping Variables</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">Why Enterprise Scoping?</h2>
              <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
                No two companies run the exact same workflow rules. These eight variables determine implementation complexity:
              </p>
            </div>

            <WhyEnterprisePricing />
          </div>
        </section>

        {/* Section 7: Timeline & Resource Estimator */}
        <section className="relative py-16 md:py-24 z-10 border-t border-slate-200/30 bg-white/30">
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[115px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="space-y-3 mb-8">
              <span className="text-purple-600 font-mono text-xs font-bold uppercase tracking-widest block">Interactive Scoper</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">Timeline & Resource Estimator</h2>
              <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
                Select your integration scope level to see typical parameters, staffing, and expected timeline lengths.
              </p>
            </div>

            <TimelineEstimator />
          </div>
        </section>

        {/* Section 8: FAQ */}
        <section className="relative py-16 md:py-24 z-10 border-t border-slate-200/30">
          <div className="absolute top-10 left-10 w-[450px] h-[450px] bg-purple-500/5 rounded-full blur-[110px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="space-y-3 mb-12">
              <span className="text-purple-600 font-mono text-xs font-bold uppercase tracking-widest block">Common Concerns</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">Frequently Asked Questions</h2>
              <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
                Clear answers regarding data governance, write-back authorizations, and post-deployment SLAs.
              </p>
            </div>

            <PricingFAQ />
          </div>
        </section>

        {/* Section 9: Final CTA Section */}
        <section className="relative py-24 md:py-32 z-10 border-t border-slate-200/20 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 flex items-center justify-center">
          <NeuralBackground />

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                Not Sure Which <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Engagement Fits?</span>
              </h2>
              <p className="text-sm md:text-base text-slate-505 max-w-2xl mx-auto leading-relaxed">
                Book a discovery session and we will recommend the right implementation approach based on your ERP environment and business goals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3.5 px-8 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-sm"
              >
                Book a Discovery Call
                <ArrowRight size={16} className="ml-2" />
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white border border-slate-200 hover:border-purple-400 text-slate-700 font-bold py-3.5 px-8 rounded-xl hover:bg-slate-50 transition-all duration-300"
              >
                <ChatCircleText size={16} className="mr-2 text-purple-600" />
                Talk to an AI Expert
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Pricing
