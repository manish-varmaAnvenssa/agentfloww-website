import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Gear, Factory, Robot, ChartBar, Broadcast, PlugsConnected, ShieldCheck, FileText, Check, Users, User, ArrowRight } from '../components/Icons'

// Premium SVGs for supported ERP Systems
const SAPLogo = () => (
  <svg viewBox="0 0 120 60" className="h-10 w-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 10H110V40C110 45.5228 105.523 50 100 50H20C14.4772 50 10 45.5228 10 40V10Z" fill="url(#sap-grad)" />
    <path d="M10 10L110 20V10H10Z" fill="#005A9C" opacity="0.2" />
    <text x="60" y="38" fill="white" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="24" textAnchor="middle" letterSpacing="1">SAP</text>
    <defs>
      <linearGradient id="sap-grad" x1="10" y1="10" x2="110" y2="50" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#008FD3" />
        <stop offset="100%" stopColor="#005A9C" />
      </linearGradient>
    </defs>
  </svg>
)

const OracleLogo = () => (
  <svg viewBox="0 0 160 40" className="h-8 w-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="80" y="28" fill="#F80000" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="26" textAnchor="middle" letterSpacing="2">ORACLE</text>
  </svg>
)

const DynamicsLogo = () => (
  <svg viewBox="0 0 200 50" className="h-10 w-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(10, 5)">
      <path d="M0 5L15 30L30 5H0Z" fill="#D83B01" />
      <path d="M30 5L15 30L30 35V5Z" fill="#B32B00" />
      <path d="M15 30L0 5V35L15 30Z" fill="#F7630C" />
    </g>
    <text x="120" y="28" fill="#323130" fontFamily="Segoe UI, Arial, sans-serif" fontWeight="600" fontSize="16" textAnchor="middle">Dynamics 365</text>
  </svg>
)

const NetSuiteLogo = () => (
  <svg viewBox="0 0 180 50" className="h-10 w-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(5, 5)">
      <circle cx="15" cy="20" r="12" fill="#104F55" />
      <circle cx="23" cy="20" r="9" fill="#32746D" />
      <circle cx="29" cy="20" r="6" fill="#9EC1A3" />
    </g>
    <text x="110" y="28" fill="#104F55" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18" textAnchor="middle" letterSpacing="0.5">NETSUITE</text>
  </svg>
)

const OdooLogo = () => (
  <svg viewBox="0 0 120 40" className="h-8 w-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="40" rx="20" fill="#7C5BBA" />
    <text x="60" y="26" fill="white" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18" textAnchor="middle" letterSpacing="1">odoo</text>
  </svg>
)

const EpicorLogo = () => (
  <svg viewBox="0 0 140 40" className="h-8 w-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="70" y="27" fill="#005B94" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="24" textAnchor="middle" fontStyle="italic">EPICOR</text>
  </svg>
)

const erpSystemsList = [
  { name: 'SAP S/4HANA & Business One', logo: SAPLogo, desc: 'Full lifecycle sync for procurement, bills of materials (BOM), production orders, and direct Service Layer REST API integration.' },
  { name: 'Oracle ERP Cloud & NetSuite', logo: OracleLogo, desc: 'Real-time financial reconciliation, automated quote-to-cash workflows, multi-subsidiary inventory routing, and SuiteTalk integrations.' },
  { name: 'Microsoft Dynamics 365', logo: DynamicsLogo, desc: 'Seamless connection to Supply Chain Management and Business Central via OData/REST endpoints for warehouse auto-updates.' },
  { name: 'Odoo Enterprise', logo: OdooLogo, desc: 'Rapid workflow scheduling, inventory adjustments, and direct relational database hooks for high-frequency operations.' },
  { name: 'Epicor ERP', logo: EpicorLogo, desc: 'Manufacturing-focused MES auto-sync, jobs scheduling updates, and automated quality metrics push.' },
  { name: 'Oracle NetSuite', logo: NetSuiteLogo, desc: 'SuiteQL analytics and automated vendor invoices writeback directly connected into NetSuite general ledgers.' }
]

const techStack = [
  { name: 'ERP Service Layer API', desc: 'Direct integration with ERP databases via official REST/OData APIs, avoiding middleware latency', icon: PlugsConnected },
  { name: 'ERP Process Automation', desc: 'Low-code automation workflows for complex ERP processes and validation pipelines', icon: Gear },
  { name: 'Enterprise ERP Integration', desc: 'Enterprise-grade ERP integration adapters for large-scale multi-plant manufacturing', icon: Factory },
  { name: 'AI Agent Framework', desc: 'Custom AI agents with natural language understanding for ERP queries and writebacks', icon: Robot },
  { name: 'RPA Log Intelligence', desc: '24/7 automated error detection, root-cause analysis, and severity-based alerting', icon: ChartBar },
  { name: 'IoT Data Pipeline', desc: 'Real-time sensor data integration for predictive maintenance and quality control', icon: Broadcast },
]

const deliveryTeam = [
  { role: 'Technical Architect', count: 1, desc: 'ERP integration design & system architecture', icon: User },
  { role: 'Frontend Developer', count: 1, desc: 'Dashboard UI & user experience', icon: User },
  { role: 'Backend Developer', count: 1, desc: 'API integration & business logic', icon: User },
  { role: 'AI/ML Engineer', count: 1, desc: 'Agent training & predictive models', icon: User },
  { role: 'QA Engineer', count: 1, desc: 'Testing, validation & UAT support', icon: User },
  { role: 'Project Manager', count: 1, desc: 'Sprint planning, demos & stakeholder communication', icon: Users },
]

const deliveryPhases = [
  { phase: 'Discovery & Planning', weeks: '1–2', desc: 'Requirements gathering, ERP environment assessment, architecture design' },
  { phase: 'Core Development', weeks: '3–8', desc: 'ERP API integration, AI agent development, workflow automation' },
  { phase: 'Integration & Testing', weeks: '9–12', desc: 'End-to-end testing, UAT, data migration, performance tuning' },
  { phase: 'Deployment & Go-Live', weeks: '13–14', desc: 'Production deployment, user training, go-live support' },
  { phase: 'Hypercare Support', weeks: '15–18', desc: '30-day post-launch support, bug fixes, optimization' },
]

const BuiltERPNative = () => {
  const [activeStep, setActiveStep] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 5)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="page-bg pt-20">
      <Helmet>
        <title>Built ERP-Native | Agentfloww Technical Architecture</title>
        <meta name="description" content="Agentfloww is built ERP-native, featuring direct Service Layer integration, ERP Process Automation, Enterprise connectivity, and AI agents purpose-built for manufacturing ERP systems." />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl"></div>
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs><pattern id="tech-grid" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M 5 0 L 0 0 0 5" fill="none" stroke="white" strokeWidth="0.2"/></pattern></defs>
              <rect width="100" height="100" fill="url(#tech-grid)" />
            </svg>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 mb-6">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-white/90 font-semibold text-xs uppercase tracking-wide">Technical Architecture</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Built ERP-Native</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Not bolt-on middleware. Not a generic wrapper. Agentfloww integrates directly with SAP, Oracle, Microsoft Dynamics, NetSuite, and Odoo, purpose-built for manufacturing ERP.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Supported ERP Ecosystem Section */}
      <section className="py-20 bg-gray-50 border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wide mb-4">Integrations</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Supported ERP Ecosystem</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our autonomous AI agents feature native connectors for all major enterprise resource planning platforms.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {erpSystemsList.map((erp, idx) => {
              const LogoComponent = erp.logo
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="h-16 flex items-center justify-start mb-6">
                      <LogoComponent />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{erp.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{erp.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wide mb-4">Architecture</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Native ERP System Integration</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              All Agentfloww modules communicate with ERP platforms (including SAP, Oracle, Dynamics, NetSuite, and Odoo) through native REST APIs and Service Layers. No ODBC hacks, no screen scraping, no fragile middleware.
            </p>
          </motion.div>

          {/* Architecture Diagram (visual representation) */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-150 shadow-xl mb-16 relative overflow-hidden">
            
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

            <div className="relative z-10">
              <h3 className="text-gray-900 text-lg font-bold text-center mb-10">ERP-Native Request & Writeback Flow</h3>
              
              {/* Horizontal Layout for MD and up, Stack for Mobile */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 relative">
                
                {[
                  { title: '1. User Trigger', desc: 'Query or IoT signal logs event', icon: User, color: 'from-blue-500 to-cyan-500' },
                  { title: '2. AI Agent Core', desc: 'Parses command & parameters', icon: Robot, color: 'from-purple-500 to-indigo-500' },
                  { title: '3. ERP API Integration', desc: 'Secure OAuth REST post', icon: PlugsConnected, color: 'from-pink-500 to-rose-500' },
                  { title: '4. ERP Business Logic', desc: 'BOM validation & schema check', icon: Gear, color: 'from-amber-500 to-orange-500' },
                  { title: '5. Database Write', desc: 'Transactional record committed', icon: Factory, color: 'from-emerald-500 to-green-500' }
                ].map((step, idx) => {
                  const isActive = activeStep === idx;
                  const IconComponent = step.icon;
                  return (
                    <div key={idx} className="flex flex-col items-center flex-1 w-full relative z-10">
                      
                      {/* Connector Line (drawn between items, on md screens) */}
                      {idx > 0 && (
                        <div className="hidden md:block absolute right-[60%] top-6 w-full h-[2px] bg-gray-100 pointer-events-none">
                          <div className={`h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-1000 ${activeStep >= idx ? 'w-full opacity-80' : 'w-0 opacity-0'}`}></div>
                        </div>
                      )}

                      {/* Node circle */}
                      <motion.div 
                        animate={{ 
                          scale: isActive ? 1.15 : 1,
                          borderColor: isActive ? '#a855f7' : 'rgba(0,0,0,0.08)'
                        }}
                        className={`w-12 h-12 rounded-full border ${isActive ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'} flex items-center justify-center cursor-pointer transition-all duration-300 relative`}
                        style={{
                          boxShadow: isActive ? '0 0 20px rgba(168, 85, 247, 0.2)' : 'none'
                        }}
                      >
                        <div className={`absolute inset-1.5 rounded-full bg-gradient-to-br ${step.color} opacity-20 ${isActive ? 'animate-ping' : ''}`}></div>
                        <IconComponent size={20} className={isActive ? 'text-white' : 'text-gray-500'} />
                      </motion.div>

                      {/* Node Info */}
                      <div className="text-center mt-4 max-w-[150px]">
                        <h4 className={`text-xs font-bold transition-colors duration-300 ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>{step.title}</h4>
                        <p className="text-[10px] text-gray-500 mt-1 leading-snug">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}

              </div>

              {/* Status Indicator text block */}
              <div className="mt-12 bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center justify-between text-left">
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                  <span className="text-xs font-mono text-gray-700">
                    {[
                      'COMMAND RECEIVED: "Log 450MT Steel plate for DE-8910"',
                      'PARSING INTENT: Type=CreatePurchaseOrder, SKU=STEEL-PLATE-A, Qty=450',
                      'DISPATCHING WEBHOOK: POST /api/v1/PurchaseOrders via ERP API...',
                      'VALIDATING SCHEMA: Checking material stock, vendor compliance & ledger entries...',
                      'TRANSACTION COMPLETED: committed in ERP memory database successfully.'
                    ][activeStep]}
                  </span>
                </div>
                <span className="text-[9px] bg-gray-100 text-gray-600 border border-gray-250 px-2 py-0.5 rounded font-mono uppercase">Live Pipe</span>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Technology Stack</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Six core technology pillars that power Agentfloww's ERP-native automation platform.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }} whileHover={{ scale: 1.03, y: -5 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="text-blue-600 mb-4 flex justify-start"><tech.icon size={28} /></div>
                  <h3 className="font-bold text-gray-900 mb-2">{tech.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{tech.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Delivery Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Agile delivery in 16 weeks with weekly demos, UAT reviews, and a dedicated cross-functional team.</p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500"></div>
            <div className="space-y-12">
              {deliveryPhases.map((phase, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }}
                  className={`relative flex items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}>
                  <div className="flex-1 hidden md:block"></div>
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg z-10">
                    <span className="text-white font-bold text-xs">{i + 1}</span>
                  </div>
                  <div className="flex-1 ml-12 md:ml-0 md:px-8">
                    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-gray-900">{phase.phase}</h3>
                        <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Weeks {phase.weeks}</span>
                      </div>
                      <p className="text-sm text-gray-600">{phase.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Your Dedicated Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Every Agentfloww project is staffed with a cross-functional team of 6 specialists.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliveryTeam.map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }} whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <member.icon size={20} />
                  </div>
                  <h3 className="font-bold text-gray-900">{member.role}</h3>
                </div>
                <p className="text-sm text-gray-600">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hypercare & AMC */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="text-green-600 mb-4"><ShieldCheck size={32} /></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">30-Day Hypercare Support</h3>
              <p className="text-gray-600 mb-6">Post-deployment, our team provides 30 days of dedicated support, including bug fixes, performance tuning, and user assistance at no extra cost.</p>
              <ul className="space-y-2">
                {['Priority bug resolution', 'Performance monitoring', 'User training support', 'Configuration adjustments'].map((item, i) => (
                  <li key={i} className="flex items-center space-x-2 text-sm text-gray-700">
                    <Check size={16} className="text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="text-blue-600 mb-4"><FileText size={32} /></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Annual Maintenance Contract</h3>
              <p className="text-gray-600 mb-6">Optional AMC for ongoing support, updates, and continuous improvement, ensuring your ERP automation stays current and optimized.</p>
              <ul className="space-y-2">
                {['Monthly health checks', 'Feature updates & patches', 'Priority support SLA', 'Quarterly optimization reviews'].map((item, i) => (
                  <li key={i} className="flex items-center space-x-2 text-sm text-gray-700">
                    <Check size={16} className="text-blue-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-indigo-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Go ERP-Native?</h2>
            <p className="text-xl text-white/80 mb-8">Talk to our technical team about how Agentfloww integrates directly with your ERP environment.</p>
            <Link to="/contact" className="btn-primary text-lg px-8 py-3 inline-flex items-center space-x-2 group">
              <span>Schedule Technical Discussion</span>
              <span className="transition-all duration-300"><span className="block group-hover:hidden">{'>'}</span><span className="hidden group-hover:block">{'->'}</span></span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default BuiltERPNative
