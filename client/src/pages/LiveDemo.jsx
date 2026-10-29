import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { submitDemo, sendOtp, verifyOtp } from '../utils/api'
import { validatePhoneNumber, validateEmail, preventNonPhoneChars, validatePhoneDigits, countryCodes } from '../utils/validation'
import {
  ArrowRight, CheckCircle, Clock, Play, Shield, Cpu, Factory,
  ChartBar, ShoppingCart, Coins, Warehouse, Package, FileText,
  Gear, RocketLaunch, Users, Globe, Star, Check,
  ChartLineUp, ShieldCheck, Receipt, ClipboardText
} from '../components/Icons'

/* ─── Brand palette (matches Agentfloww logo) ─── */
const B = {
  primary:   '#6366f1',   // indigo-500
  primary600: '#4f46e5',  // indigo-600
  primary700: '#4338ca',  // indigo-700
  soft:      '#eef2ff',   // indigo-50
  border:    '#c7d2fe',   // indigo-200
  text:      '#4f46e5',   // indigo-600
}

/* ═══════════════════════════════════════════
   COUNTER — count-up on scroll
   ═══════════════════════════════════════════ */
const Counter = ({ target, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const tv = parseFloat(target)
        const isFloat = target.toString().includes('.')
        let start = null
        const animate = (ts) => {
          if (!start) start = ts
          const p = Math.min((ts - start) / 2000, 1)
          setCount(isFloat ? (p * tv).toFixed(1) : Math.floor(p * tv))
          if (p < 1) requestAnimationFrame(animate)
          else setCount(target)
        }
        requestAnimationFrame(animate)
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])
  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

/* ═══════════════════════════════════════════
   SECTION WRAPPER — scroll reveal
   ═══════════════════════════════════════════ */
const Section = ({ children, className = '', id = '' }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.section ref={ref} id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

/* ═══════════════════════════════════════════
   1. ARCHITECTURE VISUALIZATION
   Pure SVG — no absolute-positioned HTML cards
   so nothing can overlap or overflow.
   ═══════════════════════════════════════════ */
const ArchitectureViz = () => {
  /* Node positions in a 400×380 viewBox */
  const nodes = [
    { id: 'erp',    label: 'ERP Core',        x: 220, y: 48,  w: 110, icon: '⬡' },
    { id: 'ai',     label: 'AI Orchestrator', x: 220, y: 148, w: 130, icon: '◈' },
    { id: 'proc',   label: 'Procurement',     x: 62,  y: 252, w: 105, icon: '⊕' },
    { id: 'fin',    label: 'Finance',         x: 165, y: 252, w: 90,  icon: '$' },
    { id: 'log',    label: 'Logistics',       x: 275, y: 252, w: 90,  icon: '▷' },
    { id: 'mfg',    label: 'Manufacturing',   x: 378, y: 252, w: 110, icon: '⚙' },
    { id: 'doc',    label: 'Documents',       x: 115, y: 342, w: 95,  icon: '≡' },
    { id: 'anl',    label: 'Analytics',       x: 325, y: 342, w: 95,  icon: '▲' },
  ]

  const edges = [
    ['erp','ai'],
    ['ai','proc'], ['ai','fin'], ['ai','log'], ['ai','mfg'],
    ['proc','doc'], ['fin','doc'], ['log','anl'], ['mfg','anl'],
  ]

  /* Build particle paths from edges */
  const particles = edges.map(([a, b], i) => {
    const from = nodes.find(n => n.id === a)
    const to   = nodes.find(n => n.id === b)
    return {
      path: `M${from.x},${from.y} L${to.x},${to.y}`,
      dur: `${1.8 + i * 0.25}s`,
      rev: `M${to.x},${to.y} L${from.x},${from.y}`,
    }
  })

  return (
    <motion.div
      className="w-full max-w-[500px] mx-auto"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.15 }}
    >
      <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl border border-indigo-100/60 shadow-xl shadow-indigo-100/20 p-4 overflow-hidden">
        {/* subtle dot-grid */}
        <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none rounded-3xl" />

        <svg viewBox="0 0 440 390" className="w-full h-auto" style={{ minHeight: 340 }}>
          <defs>
            <linearGradient id="ldc-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={B.primary} stopOpacity="0.6" />
              <stop offset="100%" stopColor={B.primary} stopOpacity="0.1" />
            </linearGradient>
            <filter id="ldc-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="ldc-card-shadow">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor={B.primary} floodOpacity="0.12"/>
            </filter>
          </defs>

          {/* ── Connection lines ── */}
          {edges.map(([a, b], i) => {
            const from = nodes.find(n => n.id === a)
            const to   = nodes.find(n => n.id === b)
            return (
              <line key={i}
                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke="url(#ldc-grad)" strokeWidth="1.5"
                strokeDasharray="5 4"
              />
            )
          })}

          {/* ── Flowing particles (forward) ── */}
          {particles.map((p, i) => (
            <circle key={`pf-${i}`} r="3.5" fill={B.primary} filter="url(#ldc-glow)" opacity="0.9">
              <animateMotion dur={p.dur} repeatCount="indefinite" path={p.path}/>
            </circle>
          ))}
          {/* ── Return particles ── */}
          {particles.slice(0,4).map((p, i) => (
            <circle key={`pr-${i}`} r="2.5" fill="#a5b4fc" filter="url(#ldc-glow)" opacity="0.6">
              <animateMotion dur={`${parseFloat(p.dur)+1.1}s`} repeatCount="indefinite" path={p.rev}/>
            </circle>
          ))}

          {/* ── Node cards ── */}
          {nodes.map((node, i) => {
            const isTop  = node.id === 'erp' || node.id === 'ai'
            const w = node.w
            const h = 36

            return (
              <motion.g
                key={node.id}
                whileHover={{ scale: 1.05 }}
                style={{ cursor: 'default', transformBox: 'fill-box', transformOrigin: 'center' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, -4, 0] }}
                transition={{
                  opacity: { delay: i * 0.12, duration: 0.4 },
                  y: { delay: i * 0.12, duration: 3 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }
                }}
              >
                {/* card bg */}
                <rect x={node.x - w/2} y={node.y - h/2} width={w} height={h} rx="10" ry="10"
                  fill="white" filter="url(#ldc-card-shadow)"
                  stroke={B.border} strokeWidth="1"
                />
                {/* icon bubble */}
                <rect x={node.x - w/2 + 5} y={node.y - h/2 + 5} width="26" height="26" rx="7" ry="7"
                  fill={B.soft}
                />
                <text x={node.x - w/2 + 18} y={node.y - h/2 + 22.5} textAnchor="middle" fontSize="13"
                  fill={B.primary} fontWeight="700">
                  {node.icon}
                </text>
                {/* label */}
                <text x={node.x - w/2 + 38} y={node.y + 4.5} fontSize={isTop ? '9.5' : '8.5'}
                  fill="#1e293b" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
                  {node.label}
                </text>
              </motion.g>
            )
          })}
        </svg>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════
   2. DEMO TIMELINE
   ═══════════════════════════════════════════ */
const timelineSteps = [
  { num: '01', title: 'Understand Your Workflow',  desc: 'We learn your current processes, pain points, and automation goals.' },
  { num: '02', title: 'Map Business Processes',    desc: 'Identify high-impact areas for AI agent deployment across your ERP.' },
  { num: '03', title: 'Live AI Demonstration',     desc: 'See AI agents in action on real manufacturing & procurement scenarios.' },
  { num: '04', title: 'Q&A Session',               desc: 'Deep dive into technical questions, security, and ERP compatibility.' },
  { num: '05', title: 'Implementation Roadmap',    desc: 'Receive a clear, phased plan tailored to your organization.' },
]

const DemoTimeline = () => (
  <div className="flex flex-col lg:flex-row gap-3">
    {timelineSteps.map((step, i) => (
      <motion.div key={step.num} className="flex-1 group relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1 }}
      >
        <div className="bg-white/70 backdrop-blur-xl border border-gray-100 rounded-2xl p-5 lg:p-6 h-full transition-all duration-300
          group-hover:shadow-lg group-hover:shadow-indigo-100/40 group-hover:border-indigo-200/70 group-hover:scale-[1.03]">
          <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-lg mb-3"
            style={{ color: B.text, background: B.soft, border: `1px solid ${B.border}` }}>
            Step {step.num}
          </span>
          <h3 className="text-sm font-bold text-gray-900 mb-1.5">{step.title}</h3>
          <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
        </div>
        {/* connector */}
        {i < timelineSteps.length - 1 && (
          <div className="hidden lg:block absolute top-1/2 right-0 w-3 h-px -translate-y-1/2 z-10"
            style={{ background: `linear-gradient(to right, ${B.border}, transparent)` }} />
        )}
      </motion.div>
    ))}
  </div>
)

/* ═══════════════════════════════════════════
   3. BENTO GRID — Why Book
   ═══════════════════════════════════════════ */
const bentoCards = [
  { title: '60+ Projects Delivered',   desc: 'Across manufacturing, automotive, logistics, and government sectors.', icon: RocketLaunch },
  { title: 'ERP Native Integrations',  desc: 'Deep integration via SAP Service Layer — not bolt-on middleware.',      icon: Cpu },
  { title: 'Manufacturing Expertise',  desc: 'Real-world experience on factory floors, casting lines, and supply chains.', icon: Factory },
  { title: 'Fast Time to Value',       desc: 'Agile delivery with measurable ROI from the first deployment sprint.',  icon: ChartLineUp },
  { title: 'Custom AI Agents',         desc: 'Purpose-built agents tailored to your unique ERP workflows.',           icon: Gear },
  { title: 'Enterprise Security',      desc: 'Bank-grade isolation, role-based access, and full audit trail compliance.', icon: ShieldCheck },
]

const BentoGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {bentoCards.map((card, i) => {
      const Icon = card.icon
      return (
        <motion.div key={card.title}
          className="bg-white/70 backdrop-blur-xl border border-gray-100 rounded-3xl p-6 transition-all duration-300 group"
          style={{ '--hover-border': B.border }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ y: -4, boxShadow: `0 12px 40px ${B.primary}12`, borderColor: B.border }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 group-hover:scale-110"
            style={{ background: B.soft, border: `1px solid ${B.border}` }}>
            <Icon size={20} style={{ color: B.text }} />
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-1.5">{card.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
        </motion.div>
      )
    })}
  </div>
)

/* ═══════════════════════════════════════════
   4. INTERACTIVE SHOWCASE
   ═══════════════════════════════════════════ */
const showcaseItems = [
  {
    title: 'Invoice Processing',
    icon: Receipt,
    desc: 'Extract, match, and write back invoice data to your ERP automatically, eliminating manual entry.',
    problem: 'Manual invoice matching causes delays, errors, and missed discounts across hundreds of vendor transactions.',
    solution: 'AI agents auto-extract invoice data, match with POs and GRNs, flag discrepancies, and post to ERP in seconds.',
    outcome: '90% reduction in processing time, near-zero errors, and early-payment discount capture.'
  },
  {
    title: 'Purchase Order Automation',
    icon: ClipboardText,
    desc: 'Generate compliant PO records via natural-language inputs and sync them across vendor systems.',
    problem: 'PO creation requires repetitive manual entry across multiple ERP screens with frequent data inconsistencies.',
    solution: 'Natural-language PO generation that auto-populates vendor details, pricing, and approval workflows.',
    outcome: '75% faster PO cycle time with full audit trail and automated compliance checks.'
  },
  {
    title: 'Vendor Management',
    icon: Users,
    desc: 'Track and analyze real-time vendor performance, compliance logs, and quality metrics.',
    problem: 'Vendor evaluation is reactive, with scattered data making performance tracking nearly impossible.',
    solution: 'AI continuously monitors delivery, quality, and pricing to generate real-time vendor scorecards.',
    outcome: 'Proactive vendor optimization, 30% improvement in supply chain reliability.'
  },
  {
    title: 'Quality Control',
    icon: Shield,
    desc: 'Automate shop-floor QA checks, log defects, and stream live compliance updates to your ERP.',
    problem: 'Quality inspections rely on subjective judgment and paper-based checklists that miss defects.',
    solution: 'AI-powered inspection workflows with automated defect detection and ERP quality record creation.',
    outcome: '60% fewer quality escapes, full digital traceability from shop floor to shipment.'
  },
  {
    title: 'Approval Workflows',
    icon: CheckCircle,
    desc: 'Intelligently route and escalate purchase approvals based on custom rules and budget thresholds.',
    problem: 'Multi-level approvals create bottlenecks, with requests stuck in email chains for days.',
    solution: 'Intelligent routing engine that escalates, reminds, and auto-approves within configured thresholds.',
    outcome: 'Approval cycle time reduced from days to hours, with zero unauthorized bypasses.'
  },
  {
    title: 'Logistics Automation',
    icon: Warehouse,
    desc: 'Coordinate warehouse stock dispatch schedules, load planning, and shipment updates.',
    problem: 'Dispatch planning, warehouse allocation, and shipment tracking are fragmented across systems.',
    solution: 'Unified AI agent that orchestrates warehouse ops, generates dispatch plans, and tracks shipments in ERP.',
    outcome: '40% improvement in on-time delivery with real-time visibility across the supply chain.'
  }
]

const DemoShowcase = () => {
  const [active, setActive] = useState(null)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
      {showcaseItems.map((item, i) => {
        const Icon = item.icon
        const on = active === i
        return (
          <motion.div key={item.title}
            className="cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            onClick={() => setActive(on ? null : i)}
          >
            <motion.div
              className="bg-white/70 backdrop-blur-xl border rounded-3xl p-6 transition-all duration-300"
              style={on ? { borderColor: B.border, boxShadow: `0 8px 32px ${B.primary}18`, background: 'rgba(255,255,255,0.95)' } : { borderColor: '#f1f5f9' }}
              whileHover={!on ? { y: -3 } : {}}
              layout
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={on ? { background: B.soft, border: `1px solid ${B.border}` } : { background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <Icon size={20} style={on ? { color: B.text } : { color: '#94a3b8' }} />
                </div>
                <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
              </div>
              
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">{item.desc}</p>
              
              <AnimatePresence mode="wait">
                {on ? (
                  <motion.div key="exp"
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
                    className="space-y-2.5 overflow-hidden"
                  >
                    {[
                      { label: 'Business Problem', text: item.problem, color: '#ef4444', bg: '#fef2f2', bc: '#fecaca' },
                      { label: 'AI Solution',       text: item.solution, color: B.text,    bg: B.soft,    bc: B.border },
                      { label: 'Business Outcome',  text: item.outcome,  color: '#0ea5e9', bg: '#f0f9ff',  bc: '#bae6fd' },
                    ].map(block => (
                      <div key={block.label} className="rounded-xl p-3" style={{ background: block.bg, border: `1px solid ${block.bc}` }}>
                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: block.color }}>{block.label}</span>
                        <p className="text-xs text-gray-700 leading-relaxed mt-1">{block.text}</p>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.p key="col" className="text-xs font-semibold hover:underline"
                    style={{ color: B.text }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Click to explore →
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ═══════════════════════════════════════════
   5. FLOATING LABEL INPUT
   ═══════════════════════════════════════════ */
const FloatingInput = ({ label, type = 'text', register, name, validation, error, placeholder, onKeyPress }) => {
  return (
    <div className="relative">
      <input type={type}
        {...register(name, validation)}
        onKeyPress={onKeyPress}
        placeholder=" "
        className={`peer w-full px-4 pt-6 pb-2.5 bg-white border rounded-2xl text-sm text-gray-900 outline-none transition-all duration-200 ${
          error ? 'border-red-300 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'}`}
      />
      <label className={`absolute left-4 pointer-events-none transition-all duration-200 
        top-1.5 text-[10px] font-bold text-slate-500
        peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal
        peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-indigo-600
        ${error ? 'text-red-500 peer-focus:text-red-500' : ''}`}
      >
        {label}
      </label>
      {error && <p className="mt-1.5 text-xs text-red-500">{error.message}</p>}
    </div>
  )
}

const CustomSelect = ({ label, register, name, validation, error, options, defaultValue = "" }) => {
  return (
    <div className="relative">
      <label className="absolute left-4 top-1.5 text-[10px] font-bold pointer-events-none" style={{ color: B.text }}>
        {label}
      </label>
      <select 
        {...register(name, validation)} 
        className={`w-full px-4 pt-6 pb-2.5 bg-white border border-gray-200 rounded-2xl text-sm text-gray-900 outline-none transition-all duration-200 appearance-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 ${
          error ? 'border-red-300 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
        }`}
      >
        <option value="">{defaultValue}</option>
        {options.map(v => <option key={v} value={v}>{v}</option>)}
      </select>
      <div className="absolute right-4 top-[calc(50%+4px)] -translate-y-1/2 pointer-events-none text-gray-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error.message}</p>}
    </div>
  )
}

/* ═══════════════════════════════════════════
   6. FAQ CARD
   ═══════════════════════════════════════════ */
const faqItems = [
  { q: 'How long does a typical demo session last?',         a: 'Demo sessions are 30–45 minutes. We tailor the content to your specific industry and use case, ensuring you see the most relevant AI agent demonstrations for your business.' },
  { q: 'Do I need to prepare anything before the demo?',     a: 'No preparation is necessary. However, having a brief understanding of your current ERP setup and key pain points will help us customize the demo to your needs.' },
  { q: 'Which ERP systems does Agentfloww integrate with?',  a: 'We integrate natively with SAP S/4HANA, SAP Business One, Oracle, Microsoft Dynamics 365, NetSuite, Odoo, and Epicor. Our architecture is designed for seamless ERP connectivity.' },
  { q: 'Is the demo a generic presentation or tailored to my business?', a: 'Every demo is personalized. Before the session, we review your industry and use case to demonstrate scenarios directly relevant to your operations and ERP environment.' },
  { q: 'What happens after the demo?',                       a: 'You\'ll receive a detailed implementation roadmap, architecture recommendations, automation opportunity analysis, and a project estimate — all within 48 hours of the session.' },
  { q: 'Is there any cost or commitment for the demo?',      a: 'The demo is completely free with no obligation. It\'s designed as a consultative session to explore how AI can transform your specific workflows.' },
]

const FAQCard = ({ item, isOpen, onClick }) => (
  <motion.div
    className="bg-white/70 backdrop-blur-xl border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
    style={isOpen ? { borderColor: B.border, boxShadow: `0 4px 20px ${B.primary}10` } : { borderColor: '#f1f5f9' }}
    onClick={onClick}
    layout
  >
    <div className="flex items-center justify-between p-5">
      <h3 className="text-sm font-semibold text-gray-900 pr-4">{item.q}</h3>
      <motion.div animate={{ rotate: isOpen ? 45 : 0 }}
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-lg leading-none font-light"
        style={{ background: B.soft, border: `1px solid ${B.border}`, color: B.text }}>
        +
      </motion.div>
    </div>
    <AnimatePresence>
      {isOpen && (
        <motion.p className="px-5 pb-5 text-sm text-gray-500 leading-relaxed"
          initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
          {item.a}
        </motion.p>
      )}
    </AnimatePresence>
  </motion.div>
)

/* ═══════════════════════════════════════════
   7. CTA NETWORK CANVAS
   ═══════════════════════════════════════════ */
const NetworkCanvas = () => {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let frameId
    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      const w = canvas.offsetWidth; const h = canvas.offsetHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const nodes = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.offsetWidth, y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, r: 2 + Math.random() * 2
    }))

    const draw = () => {
      const w = canvas.offsetWidth; const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
      })
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x; const dy = nodes[i].y - nodes[j].y
          const d = Math.sqrt(dx*dx + dy*dy)
          if (d < 110) {
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(99,102,241,${0.15 * (1 - d/110)})`
            ctx.lineWidth = 0.8; ctx.stroke()
          }
        }
      }
      nodes.forEach(n => {
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI*2)
        ctx.fillStyle = 'rgba(99,102,241,0.22)'; ctx.fill()
      })
      frameId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(frameId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display: 'block' }} />
}

/* ═══════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════ */
const LiveDemo = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [openFAQ, setOpenFAQ] = useState(null)

  // OTP States
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isOtpSending, setIsOtpSending] = useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
  const [verifiedEmail, setVerifiedEmail] = useState('')

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleSendOtp = async (email) => {
    const isEmailValid = validateEmail(email);
    if (isEmailValid !== true) {
      toast.error(isEmailValid || 'Please enter a valid email address');
      return;
    }

    setIsOtpSending(true);
    try {
      const result = await sendOtp(email);
      if (result.success) {
        setIsOtpSent(true);
        setCooldown(60);
        toast.success('Verification code sent to your email!');
        if (result.mockOtp) {
          console.log(`[Local Dev] Verification Code: ${result.mockOtp}`);
          toast(`[Local Dev] Code is: ${result.mockOtp}`, { icon: '🔑', duration: 8000 });
        }
      } else {
        toast.error(result.error || 'Failed to send verification code');
      }
    } catch (error) {
      toast.error('Failed to send verification code. Please try again.');
    } finally {
      setIsOtpSending(false);
    }
  }

  const handleVerifyOtp = async (email, otpCode) => {
    if (!otpCode || otpCode.length < 6) {
      toast.error('Please enter a 6-digit verification code');
      return;
    }

    setIsVerifyingOtp(true);
    try {
      const result = await verifyOtp(email, otpCode);
      if (result.success) {
        setIsEmailVerified(true);
        setVerifiedEmail(email);
        toast.success('Email verified successfully!');
      } else {
        toast.error(result.error || 'Invalid or expired verification code');
      }
    } catch (error) {
      toast.error('Failed to verify verification code. Please try again.');
    } finally {
      setIsVerifyingOtp(false);
    }
  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    if (!isEmailVerified || data.email !== verifiedEmail) {
      toast.error('Please verify your email address first.');
      return;
    }

    setIsSubmitting(true)
    try {
      const formData = {
        ...data,
        phone: `${data.countryCode} ${data.phoneDigits}`
      }
      const result = await submitDemo(formData)
      if (result.success) {
        setIsSubmitted(true); reset()
        setIsEmailVerified(false)
        setIsOtpSent(false)
        setVerifiedEmail('')
        toast.success("Demo request submitted! We'll be in touch soon.")
      } else {
        toast.error(result.error || 'Failed to submit demo request')
      }
    } catch { toast.error('Failed to submit demo request. Please try again.') }
    finally { setIsSubmitting(false) }
  }

  const scrollToBooking = () => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })

  /* ── Confirmation screen ── */
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid-bg opacity-20" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full blur-[120px] pointer-events-none" style={{ background: `${B.primary}18` }} />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center relative z-10 bg-white/80 backdrop-blur-xl rounded-3xl p-14 shadow-xl max-w-lg mx-4"
          style={{ border: `1px solid ${B.border}` }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: B.soft, border: `1px solid ${B.border}` }}>
            <Check size={28} style={{ color: B.text }} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Demo Request Submitted!</h1>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            Our team will contact you within 24 hours to confirm your personalized demo session.
          </p>
          <button onClick={() => setIsSubmitted(false)}
            className="text-white px-7 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 hover:shadow-lg"
            style={{ background: `linear-gradient(135deg, ${B.primary}, ${B.primary700})` }}>
            Request Another Demo
          </button>
        </motion.div>
      </div>
    )
  }

  /* ── Select / textarea shared style ── */
  const selectCls = `w-full px-4 pt-6 pb-2.5 bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl text-sm text-gray-900 outline-none transition-all duration-200 appearance-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100`

  return (
    <>
      <Helmet>
        <title>Live Demo — Agentfloww | AI-Powered ERP Automation</title>
        <meta name="description" content="Book a personalized live demonstration and discover how Agentfloww's AI agents can automate your ERP, procurement, finance, logistics, and manufacturing workflows." />
      </Helmet>

      <div className="bg-white overflow-hidden">

        {/* ══════════════ HERO ══════════════ */}
        <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
          <div className="absolute inset-0 blueprint-grid-bg opacity-30 pointer-events-none" />
          <div className="absolute -top-20 right-0 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none" style={{ background: `${B.primary}0e` }} />
          <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none" style={{ background: `${B.primary}08` }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left — text */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <div className="inline-flex items-center px-3.5 py-1.5 rounded-full mb-6"
                  style={{ background: B.soft, border: `1px solid ${B.border}` }}>
                  <Play size={13} className="mr-2" style={{ color: B.text }} />
                  <span className="font-semibold text-xs tracking-wide uppercase" style={{ color: B.text }}>Live Demo</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-gray-950 leading-[1.1] tracking-tight mb-5">
                  Experience Agentfloww{' '}
                  <span style={{ color: B.primary }}>in Action</span>
                </h1>

                <p className="text-gray-500 text-base lg:text-lg leading-relaxed max-w-xl mb-8">
                  Book a personalized live demonstration and discover how AI agents can automate your ERP, procurement, finance, logistics, and manufacturing workflows.
                </p>

                <div className="flex flex-wrap gap-3">
                  <motion.button onClick={scrollToBooking}
                    className="text-white px-7 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 hover:shadow-xl inline-flex items-center gap-2"
                    style={{ background: `linear-gradient(135deg, ${B.primary}, ${B.primary700})` }}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    Schedule Live Demo <ArrowRight size={16} />
                  </motion.button>
                  <Link to="/contact"
                    className="border border-gray-200 hover:border-gray-300 text-gray-700 px-7 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 hover:bg-gray-50 inline-flex items-center gap-2">
                    Talk to a Consultant
                  </Link>
                </div>
              </motion.div>

              {/* Right — visualization */}
              <ArchitectureViz />
            </div>
          </div>
        </section>

        {/* ══════════════ TIMELINE ══════════════ */}
        <Section className="py-20 lg:py-24 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase block mb-3" style={{ color: B.text }}>The Process</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">What Happens During the Demo</h2>
              <p className="text-gray-500 max-w-xl mx-auto">A structured, consultative session designed around your workflows.</p>
            </div>
            <DemoTimeline />
            <div className="text-center mt-8">
              <span className="inline-flex items-center gap-2 bg-white border border-gray-100 rounded-full px-5 py-2.5 text-xs font-semibold text-gray-600 shadow-sm">
                <Clock size={14} style={{ color: B.text }} />
                Estimated Duration: 30–45 Minutes
              </span>
            </div>
          </div>
        </Section>

        {/* ══════════════ BENTO GRID ══════════════ */}
        <Section className="py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase block mb-3" style={{ color: B.text }}>Why Agentfloww</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Why Book a Demo</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Enterprise-grade AI automation backed by real-world manufacturing expertise.</p>
            </div>
            <BentoGrid />
          </div>
        </Section>

        {/* ══════════════ SHOWCASE ══════════════ */}
        <Section className="py-20 lg:py-24 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase block mb-3" style={{ color: B.text }}>AI Use Cases</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Interactive Demo Showcase</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Click each card to see the full problem → solution → outcome flow.</p>
            </div>
            <DemoShowcase />
          </div>
        </Section>

        {/* ══════════════ BOOKING ══════════════ */}
        <Section className="py-20 lg:py-28" id="booking">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

              {/* Left — info */}
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase block mb-4" style={{ color: B.text }}>Book a Session</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  Book Your <span style={{ color: B.primary }}>Live Demo</span>
                </h2>
                <p className="text-gray-500 leading-relaxed mb-8 max-w-md">
                  Schedule a personalized session with our AI consultants. Here's what you'll receive:
                </p>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { icon: Clock,       label: '30–45 Minute Session' },
                    { icon: Play,        label: 'Live AI Walkthrough' },
                    { icon: Cpu,         label: 'ERP Consultation' },
                    { icon: ChartLineUp, label: 'Implementation Estimate' },
                  ].map(info => {
                    const Icon = info.icon
                    return (
                      <div key={info.label} className="bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl p-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: B.soft, border: `1px solid ${B.border}` }}>
                          <Icon size={16} style={{ color: B.text }} />
                        </div>
                        <span className="text-xs font-semibold text-gray-700">{info.label}</span>
                      </div>
                    )
                  })}
                </div>

                <div className="rounded-2xl p-4" style={{ background: `${B.primary}08`, border: `1px solid ${B.border}` }}>
                  <p className="text-xs text-gray-600">
                    Not ready to schedule? Reach out at{' '}
                    <a href="mailto:aditya@agentfloww.com" className="font-semibold hover:underline" style={{ color: B.text }}>
                      aditya@agentfloww.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Right — form */}
              <motion.div
                className="bg-white/60 backdrop-blur-xl border border-gray-100 rounded-3xl p-7 sm:p-8 shadow-xl"
                style={{ boxShadow: `0 20px 60px ${B.primary}10` }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FloatingInput label="Full Name"      name="name"    register={register} validation={{ required: 'Full name is required' }}                                    error={errors.name}  placeholder="John Doe" />
                    
                    {/* Business Email with OTP */}
                    <div>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <input
                            id="demo-email-input"
                            type="email"
                            placeholder=" "
                            disabled={isEmailVerified}
                            {...register('email', { 
                              required: 'Email is required',
                              validate: validateEmail
                            })}
                            className={`peer w-full px-4 pt-6 pb-2.5 bg-white border rounded-2xl text-sm text-gray-900 outline-none transition-all duration-200 ${
                              isEmailVerified ? 'bg-gray-50 border-green-300 text-gray-500' : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                            } ${errors.email ? 'border-red-300 focus:ring-2 focus:ring-red-100' : ''}`}
                          />
                          <label className={`absolute left-4 pointer-events-none transition-all duration-200 
                            top-1.5 text-[10px] font-bold text-slate-500
                            peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal
                            peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-indigo-600
                            ${errors.email ? 'text-red-500 peer-focus:text-red-500' : ''}`}
                          >
                            Business Email
                          </label>
                        </div>
                        {!isEmailVerified && (
                          <button
                            type="button"
                            disabled={isOtpSending || cooldown > 0}
                            onClick={() => {
                              const emailVal = document.getElementById('demo-email-input')?.value;
                              handleSendOtp(emailVal);
                            }}
                            className={`px-4 py-3 rounded-2xl font-semibold text-xs transition-all duration-200 whitespace-nowrap shadow ${
                              cooldown > 0 
                                ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                                : 'text-white'
                            }`}
                            style={cooldown > 0 ? {} : { background: `linear-gradient(135deg, ${B.primary}, ${B.primary700})` }}
                          >
                            {isOtpSending ? 'Sending...' : cooldown > 0 ? `Resend (${cooldown}s)` : 'Send Code'}
                          </button>
                        )}
                      </div>
                      {isEmailVerified && (
                        <p className="mt-1 text-[11px] text-green-600 flex items-center gap-1 font-semibold">
                          ✓ Email verified successfully
                        </p>
                      )}
                      {errors.email && !isEmailVerified && (
                        <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* OTP Verification Block */}
                  {isOtpSent && !isEmailVerified && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-2xl border"
                      style={{ background: `${B.primary}04`, borderColor: B.border }}
                    >
                      <label className="block text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: B.text }}>
                        Enter 6-Digit Code
                      </label>
                      <div className="flex gap-2">
                        <input
                          id="demo-otp-input"
                          type="text"
                          maxLength={6}
                          placeholder="123456"
                          {...register('otp_code')}
                          className="w-1/3 px-4 py-2 border border-gray-200 rounded-xl text-center font-mono text-base tracking-widest focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                        />
                        <button
                          type="button"
                          disabled={isVerifyingOtp}
                          onClick={() => {
                            const emailVal = document.getElementById('demo-email-input')?.value;
                            const codeVal = document.getElementById('demo-otp-input')?.value;
                            handleVerifyOtp(emailVal, codeVal);
                          }}
                          className="px-5 py-2 text-white rounded-xl font-semibold text-xs transition-all shadow"
                          style={{ background: `linear-gradient(135deg, ${B.primary}, ${B.primary700})` }}
                        >
                          {isVerifyingOtp ? 'Verifying...' : 'Verify Code'}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <FloatingInput label="Company"        name="company" register={register} validation={{ required: 'Company is required' }}                                      error={errors.company}  placeholder="Acme Corp" />
                    
                    {/* Country Code + Phone input */}
                    <div>
                      <div className="flex gap-2">
                        <div className="w-1/3 relative">
                          <label className="absolute left-3 top-1 text-[8px] font-bold text-slate-400 pointer-events-none uppercase">Code</label>
                          <select
                            {...register('countryCode')}
                            className="w-full px-2 pt-5 pb-2.5 bg-white border border-gray-200 rounded-2xl text-xs text-gray-900 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 appearance-none font-semibold"
                          >
                            {countryCodes.map(c => (
                              <option key={c.code} value={c.code}>
                                {c.flag} {c.code} ({c.name})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex-1 relative">
                          <input
                            type="tel"
                            placeholder=" "
                            {...register('phoneDigits', { 
                              required: 'Phone digits required',
                              validate: (val, formValues) => validatePhoneDigits(val, formValues.countryCode)
                            })}
                            onKeyPress={preventNonPhoneChars}
                            className={`peer w-full px-4 pt-6 pb-2.5 bg-white border rounded-2xl text-sm text-gray-900 outline-none transition-all duration-200 ${
                              errors.phoneDigits ? 'border-red-300 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                            }`}
                          />
                          <label className={`absolute left-4 pointer-events-none transition-all duration-200 
                            top-1.5 text-[10px] font-bold text-slate-500
                            peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal
                            peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-indigo-600
                            ${errors.phoneDigits ? 'text-red-500 peer-focus:text-red-500' : ''}`}
                          >
                            Phone Number
                          </label>
                        </div>
                      </div>
                      {errors.phoneDigits && (
                        <p className="mt-1 text-xs text-red-500">{errors.phoneDigits.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Industry */}
                  <CustomSelect 
                    label="Industry" 
                    name="industry" 
                    register={register} 
                    validation={{ required: 'Industry is required' }} 
                    error={errors.industry} 
                    options={['Discrete Manufacturing','Process Manufacturing','Automotive & Industrial Equipment','Logistics & Supply Chain','Government & Public Sector','Other']} 
                    defaultValue="Select your industry" 
                  />

                  {/* Use Case */}
                  <CustomSelect 
                    label="Use Case" 
                    name="use_case" 
                    register={register} 
                    validation={{ required: 'Use case is required' }} 
                    error={errors.use_case} 
                    options={['ERP Order Automation','Procurement & Invoicing','Quality Control','Predictive Analytics','Custom ERP Development','Other']} 
                    defaultValue="Select primary use case" 
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="absolute left-4 top-1.5 text-[10px] font-bold pointer-events-none" style={{ color: B.text }}>Preferred Date</label>
                      <input 
                        type="date" 
                        {...register('preferred_date', {
                          required: 'Preferred date is required',
                          validate: (val) => {
                            if (!val) return 'Preferred date is required';
                            const selectedDate = new Date(val);
                            selectedDate.setHours(0,0,0,0);
                            const today = new Date();
                            today.setHours(0,0,0,0);
                            if (selectedDate < today) {
                              return 'Date cannot be in the past';
                            }
                            return true;
                          }
                        })} 
                        className={`w-full px-4 pt-6 pb-2.5 bg-white border rounded-2xl text-sm text-gray-900 outline-none transition-all duration-200 ${
                          errors.preferred_date ? 'border-red-300 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                        }`} 
                      />
                      {errors.preferred_date && <p className="mt-1.5 text-xs text-red-500">{errors.preferred_date.message}</p>}
                    </div>
                    <CustomSelect 
                      label="Preferred Time" 
                      name="preferred_time" 
                      register={register} 
                      error={errors.preferred_time} 
                      options={['9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM']} 
                      defaultValue="Select time" 
                    />
                  </div>

                  <div className="relative">
                    <label className="absolute left-4 top-1.5 text-[10px] font-bold pointer-events-none" style={{ color: B.text }}>Message (Optional)</label>
                    <textarea {...register('message')} rows={3}
                      placeholder="Tell us about your specific needs..."
                      className="w-full px-4 pt-6 pb-2.5 bg-white border border-gray-200 rounded-2xl text-sm text-gray-900 outline-none transition-all duration-200 resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
                  </div>

                  <motion.button type="submit" disabled={isSubmitting || !isEmailVerified}
                    className="w-full text-white py-4 rounded-2xl text-sm font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: `linear-gradient(135deg, ${B.primary}, ${B.primary700})` }}
                    whileHover={isEmailVerified ? { scale: 1.01, boxShadow: `0 8px 30px ${B.primary}40` } : {}}
                    whileTap={isEmailVerified ? { scale: 0.99 } : {}}>
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Submit Demo Request <ArrowRight size={16} />
                      </span>
                    )}
                  </motion.button>
                  {!isEmailVerified && (
                    <p className="text-center text-xs text-slate-500 mt-2 font-semibold">
                      Please verify your email address to enable booking.
                    </p>
                  )}
                </form>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* ══════════════ TRUST STRIP ══════════════ */}
        <Section className="py-16 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4 lg:gap-5">
              {[
                { value: '60', suffix: '+', label: 'Projects Delivered', icon: RocketLaunch },
                { value: '3',  suffix: '',  label: 'Countries',          icon: Globe },
                { value: '9.5',suffix: '/10',label: 'Customer Satisfaction',icon: Star },
                { value: null, text: '✓',   label: 'Enterprise Ready',   icon: Shield },
                { value: null, text: '✓',   label: 'SAP Compatible',     icon: Cpu },
              ].map((stat, i) => {
                const Icon = stat.icon
                return (
                  <motion.div key={stat.label}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl px-6 py-5 flex items-center gap-4 min-w-[180px]"
                    style={{ border: `1px solid ${B.border}20` }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -2, boxShadow: `0 8px 25px ${B.primary}12` }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: B.soft, border: `1px solid ${B.border}` }}>
                      <Icon size={18} style={{ color: B.text }} />
                    </div>
                    <div>
                      <div className="text-xl font-extrabold text-gray-900">
                        {stat.value ? <Counter target={stat.value} suffix={stat.suffix} />
                          : <span style={{ color: B.primary }}>{stat.text}</span>}
                      </div>
                      <div className="text-[11px] font-semibold text-gray-500 tracking-wide">{stat.label}</div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </Section>

        {/* ══════════════ DELIVERABLES ══════════════ */}
        <Section className="py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase block mb-3" style={{ color: B.text }}>Deliverables</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">What You'll Leave With</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Every demo session concludes with actionable insights you can take to your leadership.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { title: 'Implementation Roadmap',      icon: ClipboardText, desc: 'Phased rollout plan tailored to your ERP environment.' },
                { title: 'Automation Opportunities',    icon: Gear,          desc: 'Prioritized list of processes ready for AI agent deployment.' },
                { title: 'Architecture Recommendations',icon: Cpu,           desc: 'Technical blueprint for integrating agents with your stack.' },
                { title: 'Project Estimate',            icon: ChartLineUp,   desc: 'Transparent timeline and investment breakdown.' },
                { title: 'ROI Discussion',              icon: Coins,         desc: 'Expected cost savings and efficiency gains analysis.' },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div key={item.title}
                    className="bg-white/70 backdrop-blur-xl border border-gray-100 rounded-3xl p-5 text-center group transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -4, boxShadow: `0 12px 40px ${B.primary}10`, borderColor: B.border }}
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                      style={{ background: B.soft, border: `1px solid ${B.border}` }}>
                      <Icon size={20} style={{ color: B.text }} />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1.5">{item.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </Section>

        {/* ══════════════ FAQ ══════════════ */}
        <Section className="py-20 lg:py-24 bg-gray-50/50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase block mb-3" style={{ color: B.text }}>FAQ</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <FAQCard key={i} item={item} isOpen={openFAQ === i} onClick={() => setOpenFAQ(openFAQ === i ? null : i)} />
              ))}
            </div>
          </div>
        </Section>

        {/* ══════════════ FINAL CTA ══════════════ */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <NetworkCanvas />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.75), rgba(255,255,255,0.45), rgba(255,255,255,0.75))' }} />
          <div className="absolute inset-0 blueprint-grid-bg opacity-15 pointer-events-none" />

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 leading-tight mb-5">
                Ready to See AI Transform{' '}
                <span style={{ color: B.primary }}>Your Business?</span>
              </h2>
              <p className="text-gray-500 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                Let's explore how Agentfloww can automate your ERP environment with a solution tailored specifically to your organization.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.button onClick={scrollToBooking}
                  className="text-white px-8 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 inline-flex items-center gap-2"
                  style={{ background: `linear-gradient(135deg, ${B.primary}, ${B.primary700})` }}
                  whileHover={{ scale: 1.03, boxShadow: `0 12px 40px ${B.primary}40` }}
                  whileTap={{ scale: 0.98 }}>
                  Schedule Live Demo <ArrowRight size={16} />
                </motion.button>
                <Link to="/contact"
                  className="border border-gray-200 hover:border-gray-300 text-gray-700 px-8 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 hover:bg-white/80 inline-flex items-center gap-2">
                  Talk to an AI Consultant
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  )
}

export default LiveDemo