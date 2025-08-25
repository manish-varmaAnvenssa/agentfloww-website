import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, CheckCircle, Star, Info, ArrowRight, Zap, Shield, Users, BarChart3, Plus, Minus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Pricing = () => {
  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const plans = [
    {
      name: "Basic",
      price: "Free",
      buttonText: "Free Trial",
      popular: false,
      features: {
        "Replies per month": "1000",
        "Number of users": "∞",
        "AI Chats": "2",
        "Number of members": "1",
        "Support type": "Standard",
        "Languages": "95+",
        "AI Corrections": "∞",
        "AI Training": "✓",
        "Custom chat instructions": "✓",
        "Sales tracker": "✓",
        "Order status": "✓",
        "Proactive sales AI": "✓",
        "Embed anywhere": "✓",
        "Email forwarding": "✓"
      }
    },
    {
      name: "Standard",
      price: "₹ 3750/month",
      buttonText: "Free Trial",
      popular: true,
      features: {
        "Replies per month": "2000",
        "Number of users": "5",
        "AI Chats": "5",
        "Number of members": "∞",
        "Support type": "Priority",
        "Languages": "95+",
        "AI Corrections": "∞",
        "AI Training": "✓",
        "Custom chat instructions": "✓",
        "Sales tracker": "✓",
        "Order status": "✓",
        "Proactive sales AI": "✓",
        "Embed anywhere": "✓",
        "Email forwarding": "✓"
      }
    },
    {
      name: "Professional",
      price: "₹ 6500/month",
      buttonText: "Free Trial",
      popular: false,
      features: {
        "Replies per month": "4000",
        "Number of users": "50",
        "AI Chats": "20",
        "Number of members": "∞",
        "Support type": "Priority",
        "Languages": "95+",
        "AI Corrections": "∞",
        "AI Training": "✓",
        "Custom chat instructions": "✓",
        "Sales tracker": "✓",
        "Order status": "✓",
        "Proactive sales AI": "✓",
        "Embed anywhere": "✓",
        "Email forwarding": "✓"
      }
    }
  ]

  const faqs = [
    {
      question: "How long does it take to set up Agentflow?",
      answer: "It takes just a few minutes to set up Agentflow. No technical skills are required!"
    },
    {
      question: "How does it work?",
      answer: "Agentflow uses AI to engage visitors on your website, answer their questions, recommend products, and boost sales by guiding them through their shopping journey."
    },
    {
      question: "Does it work on any site?",
      answer: "Yes, Agentflow can be integrated with any website. This will be manually added to other platforms."
    },
    {
      question: "What languages does it speak?",
      answer: "Agentflow supports over 95 languages, making it perfect for businesses with a global audience."
    },
    {
      question: "Can you integrate with CRM and support platforms?",
      answer: "Yes, Agentflow can integrate with any CRM. It can also be integrate with any support platforms where you can connect a support inbox."
    }
  ]

  return (
    <>
      <Helmet>
        <title>Pricing - Agentflow</title>
        <meta name="description" content="Explore Agentflow pricing plans designed for businesses of all sizes. Start your free trial today!" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
            >
              <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Home
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
                <Star size={20} className="text-blue-500 mr-2" />
                <span className="text-gray-700 font-medium">Pricing Plans</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                Plans designed for
                <span className="block text-gradient">businesses of all sizes</span>
              </h1>
              <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
                Explore the key features that drive our partners growth, day after day.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  Start Free Trial
                  <ArrowRight size={20} className="ml-2" />
                </Link>
                <Link
                  to="/live-demo"
                  className="inline-flex items-center bg-white hover:bg-gray-50 text-blue-600 font-bold py-4 px-8 rounded-2xl border-2 border-blue-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  Book Demo
                  <ArrowRight size={20} className="ml-2" />
                </Link>
              </div>
            </motion.div>

            {/* Pricing Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20"
            >
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  className="relative group"
                >
                  <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:transform group-hover:scale-105 border border-white/20 h-full flex flex-col">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                      <div className="text-4xl font-bold text-gray-900 mb-2">{plan.price}</div>
                      <Link
                        to="/live-demo"
                        className={`w-full py-3 px-6 rounded-2xl font-semibold transition-all duration-300 inline-flex items-center justify-center ${
                          plan.name === "Basic" 
                            ? "bg-gray-100 text-gray-700 hover:bg-gray-200" 
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        {plan.buttonText}
                      </Link>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      {Object.entries(plan.features).map(([feature, value], featureIndex) => (
                        <div key={featureIndex} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-gray-700 text-sm">{feature}</span>
                            <Info size={14} className="text-gray-400 ml-1" />
                          </div>
                          <div className="text-gray-900 font-semibold text-sm">
                            {value === "✓" ? (
                              <CheckCircle size={16} className="text-green-500" />
                            ) : (
                              value
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enterprise Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise plans</h3>
                <p className="text-gray-600 mb-6">Need more resources? Don't worry, contact sales.</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  Contact Us
                  <ArrowRight size={20} className="ml-2" />
                </Link>
            </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative py-32 bg-white/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Frequently asked questions
              </h2>
            </motion.div>

            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => toggleFaq(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900 pr-4 hover:text-blue-600 transition-colors duration-200">{faq.question}</h3>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex-shrink-0"
                    >
                      <Plus 
                        size={24} 
                        className="text-gray-500 hover:text-blue-600 transition-colors duration-200" 
                      />
                    </motion.div>
                        </div>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: openFaq === index ? "auto" : 0,
                      opacity: openFaq === index ? 1 : 0
                    }}
                    transition={{ 
                      duration: 0.4, 
                      ease: "easeInOut",
                      opacity: { duration: 0.3 }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: openFaq === index ? 1 : 0,
                          y: openFaq === index ? 0 : 10
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="text-gray-600 leading-relaxed"
                      >
                        {faq.answer}
                      </motion.p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20"></div>
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full opacity-30">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/5"></div>
            </div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
                Try Agentflow
                <span className="block">For Free</span>
              </h2>
              <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                Start your free trial today and experience the power of AI-driven customer engagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center bg-white text-blue-600 font-bold py-5 px-10 rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
                >
                  Start Free Trial
                  <ArrowRight size={20} className="ml-2" />
                </Link>
                <Link
                  to="/live-demo"
                  className="inline-flex items-center bg-transparent text-white font-bold py-5 px-10 rounded-2xl border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
                >
                  Book Demo
                  <ArrowRight size={20} className="ml-2" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Pricing
