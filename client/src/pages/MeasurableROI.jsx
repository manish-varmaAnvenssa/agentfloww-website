import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { TrendUp, Percent, Calendar, ThumbsUp, ArrowRight } from '../components/Icons'

const Counter = ({ target, duration = 1500, suffix = "" }) => {
  const [count, setCount] = useState(0)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0
        const end = parseFloat(target)
        if (isNaN(end) || end === 0) {
          setCount(target)
          return
        }
        const totalSteps = 30
        const stepTime = duration / totalSteps
        const increment = end / totalSteps
        const timer = setInterval(() => {
          start += increment
          if (start >= end) {
            setCount(end)
            clearInterval(timer)
          } else {
            setCount(end % 1 === 0 ? Math.floor(start) : +start.toFixed(1))
          }
        }, stepTime)
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

const roiMetrics = [
  { metric: 'Time to process a Purchase Order', before: '45 min', after: '< 5 min', formula: '(Before − After) × Volume × Labour Cost', impact: 'Direct cost reduction' },
  { metric: 'Invoice error rate', before: '8–12%', after: '< 1%', formula: 'Error Rate × Avg Invoice Value × Monthly Volume', impact: 'Revenue recovery' },
  { metric: 'ERP report generation', before: '4+ hours/week', after: 'Real-time', formula: 'Hours Saved × FTE Cost × 52 weeks', impact: 'Labour reallocation' },
  { metric: 'Procurement cycle time', before: '5–10 days', after: '1–2 days', formula: 'Days Saved × Opportunity Cost per Day', impact: 'Cash flow improvement' },
  { metric: 'Inventory variance', before: '5–15%', after: '< 2%', formula: 'Variance % × Inventory Value', impact: 'Working capital optimization' },
  { metric: 'Goods Receipt processing', before: 'Manual, next-day', after: 'Same-day auto', formula: 'Delay Cost × Daily GR Volume', impact: 'Supply chain velocity' },
  { metric: 'RFQ response time', before: '3–5 days', after: '< 1 day', formula: 'Days Saved × Win-Rate Uplift × Deal Value', impact: 'Revenue acceleration' },
  { metric: 'Compliance audit prep', before: '2–3 weeks', after: '< 1 day', formula: 'Audit Prep Cost + Penalty Risk Reduction', impact: 'Risk mitigation' },
]

const MeasurableROI = () => {
  return (
    <div className="page-bg pt-20">
      <Helmet>
        <title>Measurable ROI | Agentfloww Manufacturing Automation</title>
        <meta name="description" content="See exactly how Agentfloww measures ROI for ERP and manufacturing automation, featuring 8 key metrics with before/after benchmarks and calculation formulas." />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/90 font-semibold text-xs uppercase tracking-wide">ROI Framework</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Measurable ROI</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Every Agentfloww deployment is benchmarked against clear KPIs. Here's exactly how we measure and prove value, before and after.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ROI Summary Cards & Chart */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: 4 Metrics Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { value: '20–30%', label: 'Productivity Increase', icon: TrendUp },
                { value: '< 1%', label: 'Invoice Error Rate', icon: Percent },
                { value: '16 weeks', label: 'Typical Deployment', icon: Calendar },
                { value: '9.5/10', label: 'Customer Satisfaction', icon: ThumbsUp },
              ].map((card, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }} whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col items-center">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <card.icon size={28} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {card.value === '20–30%' && <span>20–<Counter target="30" suffix="%" /></span>}
                    {card.value === '< 1%' && <span>&lt; <Counter target="1" suffix="%" /></span>}
                    {card.value === '16 weeks' && <span><Counter target="16" suffix=" weeks" /></span>}
                    {card.value === '9.5/10' && <span><Counter target="9.5" suffix="/10" /></span>}
                  </div>
                  <div className="text-sm text-gray-600 text-center">{card.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Right: Interactive ROI Growth Chart */}
            <div className="lg:col-span-5">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.8 }} 
                viewport={{ once: true }} 
                className="bg-white/60 backdrop-blur-sm border border-gray-150 rounded-2xl p-6 shadow-xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
                <div className="relative z-10 flex items-center justify-between pb-4 border-b border-gray-150 mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                    <span className="text-[10px] text-gray-700 font-bold uppercase tracking-wider">Projected Savings Multiplier</span>
                  </div>
                  <span className="text-[9px] font-mono text-purple-650 font-semibold">Cumulative Savings</span>
                </div>

                {/* Graph bars container */}
                <div className="h-48 flex items-end justify-around px-4 relative">
                  {/* Grid lines background */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 py-2">
                    <div className="w-full h-px bg-gray-200 border-dashed"></div>
                    <div className="w-full h-px bg-gray-200 border-dashed"></div>
                    <div className="w-full h-px bg-gray-200 border-dashed"></div>
                  </div>

                  {[
                    { label: 'Year 1', targetH: '35%', val: '$150K', color: 'from-purple-500 to-indigo-600' },
                    { label: 'Year 2', targetH: '65%', val: '$380K', color: 'from-purple-600 to-pink-500' },
                    { label: 'Year 3', targetH: '95%', val: '$720K', color: 'from-pink-500 to-rose-500' }
                  ].map((bar, idx) => (
                    <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end z-10 relative group">
                      
                      {/* Interactive hover tooltip showing ROI calculation formula */}
                      <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-gray-900 text-[10px] font-bold py-1 px-2.5 rounded shadow-lg pointer-events-none z-20 whitespace-nowrap border border-gray-100">
                        {idx === 0 ? 'Direct Procurement Reclaim' : idx === 1 ? 'Error Minimization Benefit' : 'Scale Optimization Multiplier'}
                      </div>

                      {/* Growing bar */}
                      <motion.div 
                        initial={{ height: 0 }}
                        whileInView={{ height: bar.targetH }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.15 }}
                        viewport={{ once: true }}
                        className={`w-12 bg-gradient-to-t ${bar.color} rounded-t-lg relative flex items-center justify-center`}
                      >
                        <span className="text-white font-bold text-[10px] select-none">{bar.val}</span>
                      </motion.div>
                      <span className="text-[10px] text-gray-550 font-bold mt-2">{bar.label}</span>
                    </div>
                  ))}
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ROI Metrics Table */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">ROI Measurement Framework</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Eight key operational metrics with before/after benchmarks and transparent calculation formulas.</p>
          </motion.div>

          {/* Desktop Table */}
          <div className="hidden lg:block">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="grid grid-cols-5 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
                <div className="p-4 font-bold text-sm">Metric</div>
                <div className="p-4 font-bold text-sm text-center">Before</div>
                <div className="p-4 font-bold text-sm text-center">After</div>
                <div className="p-4 font-bold text-sm">Formula</div>
                <div className="p-4 font-bold text-sm">Impact</div>
              </div>
              {roiMetrics.map((row, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: i * 0.05 }} viewport={{ once: true }}
                  className={`grid grid-cols-5 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50/50 transition-colors duration-200 border-b border-gray-100`}>
                  <div className="p-4 text-sm font-medium text-gray-900">{row.metric}</div>
                  <div className="p-4 text-sm text-center"><span className="inline-block bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-semibold">{row.before}</span></div>
                  <div className="p-4 text-sm text-center"><span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">{row.after}</span></div>
                  <div className="p-4 text-xs text-gray-600 font-mono">{row.formula}</div>
                  <div className="p-4 text-sm text-gray-600">{row.impact}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {roiMetrics.map((row, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.05 }} viewport={{ once: true }}
                className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3">{row.metric}</h3>
                <div className="flex gap-4 mb-3">
                  <div className="flex-1"><div className="text-xs text-gray-500 mb-1">Before</div><span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-semibold">{row.before}</span></div>
                  <div className="flex-1"><div className="text-xs text-gray-500 mb-1">After</div><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">{row.after}</span></div>
                </div>
                <div className="text-xs text-gray-600 font-mono mb-2">{row.formula}</div>
                <div className="text-xs text-gray-500">{row.impact}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to See Your ROI?</h2>
            <p className="text-xl text-white/80 mb-8">Schedule a free discovery session and we'll map these metrics to your specific operations.</p>
            <Link to="/contact" className="btn-primary text-lg px-8 py-3 inline-flex items-center space-x-2 group">
              <span>Schedule Discovery Session</span>
              <span className="transition-all duration-300">
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default MeasurableROI
