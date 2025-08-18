import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Zap, Shield, Users, BarChart3, Star, TrendingUp, Target, MessageCircle, Clock, Globe, Play, ArrowUpRight } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'

const AISalesAgent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [openFAQ, setOpenFAQ] = useState(null)

  // Prevent auto-scroll on page load
  useEffect(() => {
    // Prevent scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    
    // Ensure page starts at top without any scroll animation
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 0)
    
    // Additional fix for any remaining scroll issues
    const preventScroll = () => {
      if (window.scrollY > 0) {
        window.scrollTo(0, 0)
      }
    }
    
    // Check for scroll issues after a short delay
    setTimeout(preventScroll, 100)
    
    return () => {
      // Cleanup
    }
  }, [])

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <div className="Compare Page">
      <Helmet>
        <title>Compare - Agentflow vs Others | Agentflow</title>
        <meta name="description" content="Compare Agentflow with other AI solutions. See why Agentflow is the leading choice with GPT-powered chatbots, advanced analytics, and superior features." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16">
            {/* Left Side - Content */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center lg:justify-start space-x-2 mb-4 md:mb-6"
              >
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">VS</span>
                </div>
                <span className="text-green-600 font-semibold text-sm">Comparison</span>
                <span className="text-gray-400 text-xs">• See the difference</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight drop-shadow-sm"
              >
                Compare Agentflow vs Other AI Solutions
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-800 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 drop-shadow-sm font-medium"
              >
                See how Agentflow stands out from the competition with GPT-powered technology, advanced features, and superior performance. Make an informed decision for your business.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center bg-green-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-green-600 transition-colors duration-200 group shadow-lg text-base md:text-lg"
                >
                  <span>Get Started</span>
                  <span className="ml-2">
                    <span className="block group-hover:hidden">{'>'}</span>
                    <span className="hidden group-hover:block">{'->'}</span>
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Right Side - AI Sales Interface Demo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex-1 flex justify-center lg:justify-end mb-8 lg:mb-0"
            >
              <div className="relative">
                {/* Main AI Sales Interface */}
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 md:p-6 w-80 md:max-w-md">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">AI</span>
                      </div>
                      <span className="font-semibold text-gray-900">Agent</span>
                    </div>
                    <div className="text-xs text-gray-500">Live Demo</div>
                  </div>

                  {/* AI Chat Interface */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">AI</span>
                      </div>
                      <div className="bg-gray-100 rounded-2xl rounded-bl-md p-3 max-w-xs">
                        <p className="text-sm text-gray-700">Hi! I'm your AI assistant. How can I help you today?</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 justify-end">
                      <div className="bg-green-500 text-white rounded-2xl rounded-br-md p-3 max-w-xs">
                        <p className="text-sm">I need help with customer support</p>
                      </div>
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 text-xs">U</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">AI</span>
                      </div>
                      <div className="bg-gray-100 rounded-2xl rounded-bl-md p-3 max-w-xs">
                        <p className="text-sm text-gray-700">I can help you with customer inquiries, order tracking, and general support. What specific issue can I assist with?</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <button className="group bg-green-500 text-white text-sm font-medium py-2 px-4 rounded-full hover:bg-green-600 transition-colors duration-200 inline-flex items-center justify-center">
                      <span>Support</span>
                      <span className="ml-1">
                        <span className="block group-hover:hidden">{'>'}</span>
                        <span className="hidden group-hover:block">{'->'}</span>
                      </span>
                    </button>
                    <button className="group bg-gray-100 text-gray-700 text-sm font-medium py-2 px-4 rounded-full hover:bg-gray-200 transition-colors duration-200 inline-flex items-center justify-center">
                      <span>Chat</span>
                      <span className="ml-1">
                        <span className="block group-hover:hidden">{'>'}</span>
                        <span className="hidden group-hover:block">{'->'}</span>
                      </span>
                    </button>
                  </div>
                </div>

                {/* Floating Elements - Hidden on mobile for better layout */}
                <div className="hidden md:block absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="hidden md:block absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Inclined Background Gradient - Like Blog Page */}
        <div
          className="absolute bottom-6 left-0 w-full h-[250px] opacity-30 transform -skew-y-12 origin-top-left z-10"
          style={{ 
            background: 'linear-gradient(45deg, #ff6b6b 0%, #4ecdc4 15%, #45b7d1 30%, #96ceb4 45%, #feca57 60%, #ff9ff3 75%, #54a0ff 90%, #5f27cd 100%)', 
            backgroundSize: '500% 300%', 
            backgroundPosition: 'top left', 
            animation: 'gradientFlow 20s ease infinite' 
          }}
        ></div>
      </section>

      {/* Why Agentflow Section */}
      <section className="py-24 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-50 to-blue-50 px-4 py-2 rounded-full border border-green-100">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 font-semibold text-sm uppercase tracking-wide">
                    Why Agentflow?
                  </span>
                </div>
                
                <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Chatbots better than your best agents.
                </h2>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                  Confidently handle 90% of customer inquiries with the world's first GPT-powered bot for commerce. Grow your brand without adding to your support team.
                </p>
              </div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 rounded-3xl p-8 shadow-2xl border border-gray-100">
                  <img 
                    src="/images/Pictures/Compare 1.png" 
                    alt="Agentflow Comparison" 
                    className="w-full h-auto rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block text-green-600 font-semibold text-sm uppercase tracking-wide mb-4"
            >
              Comparison
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-8"
            >
              Agentflow vs Others
            </motion.h2>
          </div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-200">
              <div className="p-4 md:p-6 text-center">
                <h3 className="text-lg md:text-2xl font-bold text-gray-900">Features</h3>
              </div>
              <div className="p-4 md:p-6 text-center border-l border-r border-gray-200">
                <h3 className="text-lg md:text-2xl font-bold text-green-600">Agentflow</h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1">Recommended</p>
              </div>
              <div className="p-4 md:p-6 text-center">
                <h3 className="text-lg md:text-2xl font-bold text-gray-600">Others</h3>
                <p className="text-xs md:text-sm text-gray-500 mt-1">Basic</p>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-200">
              {/* GPT-Powered Chatbot */}
              <div className="grid grid-cols-3 hover:bg-gray-50 transition-colors duration-200">
                <div className="p-4 md:p-6 flex items-center">
                  <span className="text-sm md:text-lg font-semibold text-gray-900">GPT-Powered Chatbot</span>
                </div>
                <div className="p-4 md:p-6 flex items-center justify-center border-l border-r border-gray-200">
                  <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
                </div>
                <div className="p-4 md:p-6 flex items-center justify-center">
                  <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-gray-300 rounded-full"></div>
                </div>
              </div>

              {/* AI CRM and Analytics */}
              <div className="grid grid-cols-3 hover:bg-gray-50 transition-colors duration-200">
                <div className="p-4 md:p-6 flex items-center">
                  <span className="text-sm md:text-lg font-semibold text-gray-900">AI CRM and Analytics</span>
                </div>
                <div className="p-4 md:p-6 flex items-center justify-center border-l border-r border-gray-200">
                  <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
                </div>
                <div className="p-4 md:p-6 flex items-center justify-center">
                  <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-gray-300 rounded-full"></div>
                </div>
              </div>

              {/* Advanced Bot Flows */}
              <div className="grid grid-cols-3 hover:bg-gray-50 transition-colors duration-200">
                <div className="p-4 md:p-6 flex items-center">
                  <span className="text-sm md:text-lg font-semibold text-gray-900">Advanced Bot Flows</span>
                </div>
                <div className="p-4 md:p-6 flex items-center justify-center border-l border-r border-gray-200">
                  <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
                </div>
                <div className="p-4 md:p-6 flex items-center justify-center">
                  <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-gray-300 rounded-full"></div>
                </div>
              </div>

              {/* iPhone Pop Ups */}
              <div className="grid grid-cols-3 hover:bg-gray-50 transition-colors duration-200">
                <div className="p-4 md:p-6 flex items-center">
                  <span className="text-sm md:text-lg font-semibold text-gray-900">iPhone Pop Ups</span>
                </div>
                <div className="p-4 md:p-6 flex items-center justify-center border-l border-r border-gray-200">
                  <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
                </div>
                <div className="p-4 md:p-6 flex items-center justify-center">
                  <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-gray-300 rounded-full"></div>
                </div>
              </div>

              {/* Non-Spammy Campaigns */}
              <div className="grid grid-cols-3 hover:bg-gray-50 transition-colors duration-200">
                <div className="p-4 md:p-6 flex items-center">
                  <span className="text-sm md:text-lg font-semibold text-gray-900">Non-Spammy Campaigns</span>
                </div>
                <div className="p-4 md:p-6 flex items-center justify-center border-l border-r border-gray-200">
                  <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
                </div>
                <div className="p-4 md:p-6 flex items-center justify-center">
                  <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Table Footer */}
            <div className="grid grid-cols-3 bg-gradient-to-r from-green-50 to-blue-50 border-t border-gray-200">
              <div className="p-4 md:p-6 text-center">
                <span className="text-sm md:text-lg font-semibold text-gray-900">Verdict</span>
              </div>
              <div className="p-4 md:p-6 text-center border-l border-r border-gray-200">
                <div className="inline-flex items-center bg-green-100 text-green-800 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-semibold">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                  Winner
                </div>
              </div>
              <div className="p-4 md:p-6 text-center">
                <div className="inline-flex items-center bg-gray-100 text-gray-600 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-semibold">
                  <span className="w-3 h-3 md:w-4 md:h-4 mr-2">•</span>
                  Basic
                </div>
              </div>
            </div>
          </motion.div>


        </div>
      </section>



      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block text-green-600 font-semibold text-xs md:text-sm uppercase tracking-wide mb-3 md:mb-4"
            >
              Benefits
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-8"
            >
              Why Choose AI Agents?
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 border border-gray-100 h-full flex flex-col">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-green-600 transition-colors">
                  Increased Efficiency
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed flex-1">
                  AI agents handle high volumes of repetitive tasks like customer support, order processing, or data entry. This automation allows your human team to focus on more critical tasks, boosting overall productivity.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 border border-gray-100 h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                  Enhanced Engagement
                </h3>
                <p className="text-gray-600 leading-relaxed flex-1">
                  With AI's ability to understand and process customer behavior, agents can deliver personalized customer interactions. Whether through chatbots or email, AI agents ensure that customers receive relevant information at the right time.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 border border-gray-100 h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                  Data-Driven Insights
                </h3>
                <p className="text-gray-600 leading-relaxed flex-1">
                  AI agents provide valuable analytics that offer insights into customer preferences, behaviors, and trends. This data-driven approach helps teams refine their strategies and make informed decisions.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block text-green-600 font-semibold text-sm uppercase tracking-wide mb-4"
            >
              How It Works
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-8"
            >
              Simple 4-Step Integration Process
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: '1',
                title: 'Access Your Workflow',
                description: 'Identify tasks that could benefit from AI assistance'
              },
              {
                number: '2',
                title: 'Choose Your Agent',
                description: 'Select an AI solution that aligns with your goals'
              },
              {
                number: '3',
                title: 'Integrate Seamlessly',
                description: 'Connect with your existing CRM and sales tools'
              },
              {
                number: '4',
                title: 'Monitor & Optimize',
                description: 'Track performance and adjust for maximum impact'
              }
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 transition-all duration-300 group-hover:shadow-xl group-hover:scale-105 border border-green-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-2xl">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Connection Line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-1 bg-gradient-to-r from-green-500 to-blue-600 transform -translate-y-1/2"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

        {/* Applications Section with Full-Size Image */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-50 to-blue-50 px-6 py-3 rounded-full border border-green-100 mb-8"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 font-semibold text-sm uppercase tracking-wide">
                  Applications
                </span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight"
              >
                Versatile AI Solutions for Every Industry
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              >
                AI sales agents are not limited to a single industry or type of business. Their adaptability makes them suitable for various applications across different sectors.
              </motion.p>
              
              {/* Decorative Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex justify-center space-x-4 mt-12"
              >
                <div className="w-3 h-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                <div className="w-3 h-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 gap-16">
              {/* Full Size Image */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="relative">
                  {/* Background Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-blue-400/20 to-purple-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  
                  <div className="relative bg-gradient-to-br from-white via-green-50 to-blue-50 rounded-3xl p-8 shadow-2xl border border-gray-200 overflow-hidden group-hover:shadow-3xl transition-all duration-500">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-4 left-4 w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-4 right-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-bounce"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                    </div>
                    
                    <div className="flex justify-center items-center">
                      <img 
                        src="/images/Pictures/Ai sales 2.png" 
                        alt="AI Sales Applications" 
                        className="rounded-2xl shadow-lg object-cover group-hover:scale-105 transition-transform duration-500 relative z-10"
                        style={{ 
                          width: 'calc(100% - 120px)', 
                          height: 'calc(100% - 120px)',
                          maxWidth: 'calc(100% - 120px)',
                          maxHeight: 'calc(100% - 120px)'
                        }}
                      />
                    </div>
                  </div>

                  {/* Additional Floating Elements */}
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce hover:scale-110 transition-transform duration-300">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg animate-pulse hover:scale-110 transition-transform duration-300">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Horizontal Applications Cards */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105 border border-gray-100 overflow-hidden relative h-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="flex items-start space-x-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <Target className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors leading-tight">
                            Customer Support
                          </h3>
                          <p className="text-gray-600 leading-relaxed text-lg">
                            Automate the process of handling customer inquiries and providing instant responses with intelligent routing and prioritization.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105 border border-gray-100 overflow-hidden relative h-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="flex items-start space-x-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <MessageCircle className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors leading-tight">
                            Order Processing
                          </h3>
                          <p className="text-gray-600 leading-relaxed text-lg">
                            Handle order processing and tracking without human intervention, providing instant updates and solutions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105 border border-gray-100 overflow-hidden relative h-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="flex items-start space-x-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <TrendingUp className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors leading-tight">
                            Data Processing
                          </h3>
                          <p className="text-gray-600 leading-relaxed text-lg">
                            Process and analyze data efficiently using advanced AI algorithms and machine learning insights.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

      {/* Success Stories Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block text-green-600 font-semibold text-sm uppercase tracking-wide mb-4"
            >
              Success Stories
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-8"
            >
              Companies Thriving with AI Agents
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-10 border border-green-200 transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 h-full flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                    Increased Sales by 30%
                  </h3>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-green-600">30%</div>
                    <div className="text-sm text-gray-600">Efficiency Increase</div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg flex-1">
                  One of our clients saw a 30% increase in efficiency after implementing our AI agent. By automating customer support and data processing, their team was able to focus on high-value tasks, leading to improved productivity.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-10 border border-green-200 transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 h-full flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                    Improved Customer Retention
                  </h3>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-green-600">85%</div>
                    <div className="text-sm text-gray-600">Retention Rate</div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg flex-1">
                  Another client used our AI agent to improve customer support, leading to a significant boost in customer retention rates. The AI's ability to provide personalized support and solve common issues quickly resulted in happier customers.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Modern Accordion Design */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 rounded-full border border-purple-100 text-purple-700 text-sm font-medium mb-6">
              <MessageCircle className="w-4 h-4 mr-2" />
              FAQ
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about AI Sales Agents
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {[
              {
                question: 'How long does it take to set up?',
                answer: 'Get up and running in no time! Most businesses are set up in just a few days, with full deployment wrapped up in a week. Fast, efficient, and hassle-free!'
              },
              {
                question: 'Is 80% automation realistic?',
                answer: 'Most brands see 80% of their customer queries automated within the first month with Agentflow. Our top brands even hit over 90% automation!'
              },
              {
                question: 'Worried an AI agent will ruin your customer experience?',
                answer: 'Agentflow\'s AI agents are called human-level for a reason. They often provide better experiences than human agents. The proof? Our AI agents\' average CSAT is 10% higher than that of our human team.'
              },
              {
                question: 'What\'s Agentflow\'s USP?',
                answer: 'Agentflow\'s secret sauce? It\'s the perfect blend of human-level AI and skilled agents to respond faster, manage all channels, and scale your customer service – at a reasonable pricing.'
              },
              {
                question: 'How does Agentflow enhance customer experience?',
                answer: 'Agentflow up customer experience with smart AI for fun, personalized interactions. It\'s like having a chatty friend who solves problems fast and makes customers feel special, boosting satisfaction and loyalty.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-8 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300 group"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300 leading-relaxed">
                      {item.question}
                    </h3>
                  </div>
                  <div className="ml-6 flex items-center justify-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {openFAQ === index ? (
                        <span className="text-green-600 text-lg font-bold">−</span>
                      ) : (
                        <span className="text-green-600 text-lg font-bold">+</span>
                      )}
                    </div>
                  </div>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQ === index ? 'auto' : 0,
                    opacity: openFAQ === index ? 1 : 0
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-8 border-t border-gray-100 pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-green-500 via-blue-500 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-blue-500/20 to-purple-600/20"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full text-sm font-medium mb-8">
              <Zap className="w-4 h-4 mr-2 text-green-300" />
              Ready to Choose the Best?
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Choose 
              <span className="block" style={{ background: 'linear-gradient(to right, #86efac, #93c5fd, #c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Agentflow?
              </span>
            </h2>
            
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              After seeing the comparison, it's clear that Agentflow offers superior features and performance. Join thousands of businesses that have already chosen the better AI solution.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/contact"
                className="group inline-flex items-center bg-gradient-to-r from-green-400 to-blue-500 text-white px-12 py-6 rounded-full font-semibold hover:from-green-500 hover:to-blue-600 transition-all duration-300 shadow-2xl hover:shadow-green-400/25 transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                <span className="text-lg">Choose Agentflow</span>
                <ArrowUpRight className="w-5 h-5 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/70">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-sm font-medium">Free Consultation</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-300" />
                <span className="text-sm font-medium">Secure & Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-purple-300" />
                <span className="text-sm font-medium">Quick Setup</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AISalesAgent 