import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Zap, Shield, Users, BarChart3, Menu, X, ChevronDown, Calendar, Clock } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  // Prevent auto-scroll on home page load
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

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built with modern technologies for optimal performance and speed.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Multiple user roles for seamless content management.'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Comprehensive analytics to track your content performance.'
    }
  ]

  const stats = [
   
  ]

  const navigation = [
    { 
      name: 'Compare', 
      href: '/compare',
      hasDropdown: false,
    },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
    { name: 'Live Demo', href: '/live-demo' },
  ]

  return (
    <div className="home-page">
      <Helmet>
        <title>Agentflow</title>
        <meta name="description" content="" />
      </Helmet>

      {/* Vertical Dotted Lines */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute left-1/4 top-0 bottom-0 w-px border-l-2 border-dotted opacity-30" style={{ borderColor: '#ccc' }}></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dotted opacity-30" style={{ borderColor: '#ccc' }}></div>
        <div className="absolute left-3/4 top-0 bottom-0 w-px border-l-2 border-dotted opacity-30" style={{ borderColor: '#ccc' }}></div>
      </div>

      {/* Hero Section with Integrated Navigation */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(45deg, var(--gradientColorZero) 0%, var(--gradientColorOne) 25%, var(--gradientColorTwo) 50%, var(--gradientColorThree) 75%, var(--gradientColorZero) 100%)', backgroundSize: '500% 300%', backgroundPosition: 'top left', animation: 'gradientFlow 20s ease infinite' }}>
        
        {/* Navigation Bar */}
        <div className="relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-start h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2 mr-12">
                <img 
                  src="/images/logo/Agentflow Logo.png" 
                  alt="Agentflow Logo" 
                  className="h-12 w-auto"
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                {navigation.map((item) => (
                  <div key={item.name} className="relative group">
                    {item.hasDropdown ? (
                      <button
                        className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
                        onMouseEnter={() => setOpenDropdown(item.name)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        <span>{item.name}</span>
                        <ChevronDown size={16} className="transition-transform duration-200 group-hover:rotate-180" />
                      </button>
                    ) : (
                      <Link
                        to={item.href}
                        className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    )}
                    
                    {/* Dropdown Menu */}
                    {item.hasDropdown && (
                      <div 
                        className={`absolute top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ${
                          openDropdown === item.name ? 'opacity-100 visible' : ''
                        }`}
                        style={{
                          left: '-50%',
                          transform: 'translateX(0%)',
                          width: item.name === 'Products' ? 'min(900px, calc(100vw - 2rem))' : 'min(400px, calc(100vw - 2rem))'
                        }}
                        onMouseEnter={() => setOpenDropdown(item.name)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >

                        
                        {item.name === 'Resources' && (
                          <div className="p-6">
                            <div className="space-y-4">
                              <Link to="/blog" className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <span className="text-white text-xs font-bold">B</span>
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-gray-900">Blogs</div>
                                  <div className="text-sm text-gray-500 mt-1">Latest insights and updates</div>
                                </div>
                              </Link>
                              
                              <Link to="/news" className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <span className="text-white text-xs font-bold">N</span>
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-gray-900">Newsroom</div>
                                  <div className="text-sm text-gray-500 mt-1">Company news and announcements</div>
                                </div>
                              </Link>
                              
                              <Link to="/knowledge-base" className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <span className="text-white text-xs font-bold">K</span>
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-gray-900">Knowledge Base</div>
                                  <div className="text-sm text-gray-500 mt-1">Help articles and guides</div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md transition-colors duration-200 text-white/90 hover:text-white hover:bg-white/10"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white/10 backdrop-blur-md">
              <div className="px-4 py-4 space-y-4">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                          className="flex items-center justify-between w-full text-white/90 hover:text-white text-base font-medium transition-colors duration-200"
                        >
                          <span>{item.name}</span>
                          <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                        </button>
                        {openDropdown === item.name && (
                          <div className="mt-2 ml-4 space-y-2">
                            {item.dropdownItems.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                to={dropdownItem.href}
                                onClick={() => {
                                  setIsMenuOpen(false)
                                  setOpenDropdown(null)
                                }}
                                className="block text-white/80 hover:text-white text-sm transition-colors duration-200 py-1"
                              >
                                {dropdownItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-white/90 hover:text-white text-base font-medium transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      <div
  className="absolute bottom-0 right-20 w-[180%] h-[380px] bg-white transform -rotate-12 origin-bottom-right"
  style={{
    transform: 'rotate(-12deg)',
    transformOrigin: 'bottom right',
    bottom: '0px',
    right: '-80px'
  }}
></div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-12 md:pb-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 md:gap-12">
            {/* Left Side - Text Content */}
            <div className="w-full lg:flex-1 text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6"
              >
                AI Agents Framework for Business Automation
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl text-white/90 mb-8 max-w-2xl lg:max-w-none"
              >
                Support your Business with AI agentic Automation
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
              >
                <Link
  to="https://client.anvenssa.com/account/login/?next=/"
  className="btn-primary text-lg px-8 py-3 flex items-center space-x-2 group"
>
  <span>See a Demo</span>
  <span className="transition-all duration-300">
    <span className="block group-hover:hidden">{'>'}</span>
    <span className="hidden group-hover:block">{'->'}</span>
  </span>
</Link>

                {/* <Link
                  to="/blog"
                  className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 text-lg px-8 py-3 rounded-lg border border-white/20 transition-all duration-300"
                >
                  View Blog
                </Link> */}
              </motion.div>
            </div>

            {/* Right Side - Business Automation Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full lg:flex-1 flex justify-center lg:justify-start relative"
>
  {/* Background image in red marked area - Hidden on mobile */}
  <div className="hidden lg:block absolute right-[-310px] top-[-50px] w-[750px] h-[580px] opacity-100 bg-white/50 backdrop-blur-sm rounded-lg">
  <img 
  src="/images/logo/Agentflow Logo.png" 
  alt="Agentflow Logo" 
  className="w-32 h-10 object-contain" 
  style={{ marginTop: '10px', marginLeft: '30px' }} 
/>
    <img 
      src="/images/Pictures/Agentflow screen.png" 
      alt="Dashboard Background" 
      className=" w-[500px] h-[500px] object-cover object-[32%] rounded-lg shadow-lg translate-x-20 translate-y-20"
      style={{ transform: 'translateY(calc(5rem - 55px)) translateX(10rem)' }}
     />
  </div>
  
  <div className="relative w-50 md:w-70 h-[450px] md:h-[530px] bg-white rounded-[2rem] p-2 shadow-2xl border border-gray-200 mx-auto lg:mx-0">
    {/* Phone frame */}
    <div className="w-full h-full bg-white rounded-[1.5rem] overflow-hidden relative border border-gray-100">
      {/* Screen content */}

                  <div className="w-full h-full p-4">
                    <img 
                      src="/images/Pictures/Agentflow Login.png" 
                      alt="Business Automation" 
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  
                  {/* Home indicator */}
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Everything you need to succeed
            </motion.h2>
          </div>

          {/* Logo Carousel */}
          <div className="overflow-hidden">
            {/* First Row - 9 logos */}
            <div className="flex animate-scroll-left mb-8">
              <div className="flex space-x-16 min-w-max">
                {[17, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <div key={num} className="flex-shrink-0">
                    <img 
                      src={`/images/logo/${num}.png`} 
                      alt={`Logo ${num}`}
                      className="h-16 w-auto object-contain transition-all duration-300"
                    />
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {[17, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <div key={`duplicate-${num}`} className="flex-shrink-0">
                    <img 
                      src={`/images/logo/${num}.png`} 
                      alt={`Logo ${num}`}
                      className="h-16 w-auto object-contain transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Second Row - 8 logos */}
            <div className="flex animate-scroll-right">
              <div className="flex space-x-16 min-w-max">
                {[10, 11, 12, 13, 14, 15, 16, 17].map((num) => (
                  <div key={num} className="flex-shrink-0">
                    <img 
                      src={`/images/logo/${num}.png`} 
                      alt={`Logo ${num}`}
                      className="h-16 w-auto object-contain transition-all duration-300"
                    />
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {[10, 11, 12, 13, 14, 15, 16, 17].map((num) => (
                  <div key={`duplicate-${num}`} className="flex-shrink-0">
                    <img 
                      src={`/images/logo/${num}.png`} 
                      alt={`Logo ${num}`}
                      className="h-16 w-auto object-contain transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Side - Text Content */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="inline-block text-[#6633FF] font-bold font size 14px  text-lg mb-8 -mt-2">
                  Modular solutions
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  AI Agent<br />
                   for Sales
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Discover how AI agents can <br />revolutionize your sales strategy by <br />enhancing productivity, automating tasks, and <br />increasing revenue.
                </p>
              </motion.div>
            </div>

            {/* Right Side - Static AI Sales Visualization */}
            <div className="flex-1 sticky top-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative -ml-[30px]"
              >
                <div className="p-8 relative overflow-hidden">
                  {/* Animated Background Elements */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-4 left-4 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="absolute top-8 right-8 w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-6 left-8 w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-8 right-4 w-3 h-3 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                  </div>

                  {/* Main Sales Automation Flow */}
                  <div className="relative z-10">
                    {/* Lead Generation Section */}
                    <motion.div 
                      className="flex items-center space-x-4 mb-6"
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                  </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Lead Generation</h3>
                        <p className="text-sm text-gray-600">AI-powered prospecting</p>
                  </div>
                      <motion.div 
                        className="flex-1 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                      />
                    </motion.div>

                    {/* Qualification Section */}
                    <motion.div 
                      className="flex items-center space-x-4 mb-6"
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                  </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Qualification</h3>
                        <p className="text-sm text-gray-600">Smart lead scoring</p>
                  </div>
                      <motion.div 
                        className="flex-1 h-0.5 bg-gradient-to-r from-green-500 to-teal-600"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        viewport={{ once: true }}
                      />
                    </motion.div>

                    {/* Engagement Section */}
                    <motion.div 
                      className="flex items-center space-x-4 mb-6"
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                  </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Engagement</h3>
                        <p className="text-sm text-gray-600">24/7 conversation</p>
                  </div>
                      <motion.div 
                        className="flex-1 h-0.5 bg-gradient-to-r from-purple-500 to-pink-600"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        viewport={{ once: true }}
                      />
                    </motion.div>

                    {/* Conversion Section */}
                    <motion.div 
                      className="flex items-center space-x-4"
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                  </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Conversion</h3>
                        <p className="text-sm text-gray-600">Revenue optimization</p>
                  </div>
                    </motion.div>

                    {/* Floating Data Points */}
                    <motion.div 
                      className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full"
                      animate={{ 
                        y: [0, -10, 0],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div 
                      className="absolute bottom-8 left-6 w-2 h-2 bg-green-400 rounded-full"
                      animate={{ 
                        y: [0, -8, 0],
                        opacity: [0.3, 0.8, 0.3]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    />
                    <motion.div 
                      className="absolute top-1/2 right-8 w-2 h-2 bg-purple-400 rounded-full"
                      animate={{ 
                        y: [0, -6, 0],
                        opacity: [0.4, 0.9, 0.4]
                      }}
                      transition={{ 
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                    />

                    {/* Success Metrics */}
                    <motion.div 
                      className="mt-6 grid grid-cols-3 gap-4"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">+45%</div>
                        <div className="text-xs text-gray-600">Lead Quality</div>
                  </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">+67%</div>
                        <div className="text-xs text-gray-600">Response Rate</div>
                </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">+89%</div>
                        <div className="text-xs text-gray-600">Conversion</div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Service Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Side - Text Content */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="inline-block text-[#6633FF] font-bold font size 14px  text-lg mb-8 -mt-2">
                  🏆 Customer Excellence
                  </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Improving Customer Service
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                This is key to building long-term relationships, delighting customers, and staying ahead of the competition. 
                </p>
              </motion.div>
                </div>

            {/* Right Side - Static Customer Service Visualization */}
            <div className="flex-1 sticky top-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative -mr-[30px]"
              >
                <div className="p-8 relative overflow-hidden">
                  {/* Central Hub */}
                  <div className="relative flex items-center justify-center mb-8">
                    <motion.div 
                      className="w-24 h-24 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center shadow-xl"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                      </svg>
                    </motion.div>
                    
                    {/* Orbiting Elements */}
                    <motion.div 
                      className="absolute w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
                      style={{ top: '-20px', left: '50%', transform: 'translateX(-50%)' }}
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 360]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </motion.div>

                    <motion.div 
                      className="absolute w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg"
                      style={{ bottom: '-20px', left: '50%', transform: 'translateX(-50%)' }}
                      animate={{ 
                        y: [0, 10, 0],
                        rotate: [0, -360]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </motion.div>

                    <motion.div 
                      className="absolute w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg"
                      style={{ top: '50%', right: '-20px', transform: 'translateY(-50%)' }}
                      animate={{ 
                        x: [0, 10, 0],
                        rotate: [0, 360]
                      }}
                      transition={{ 
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </motion.div>

                    <motion.div 
                      className="absolute w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg"
                      style={{ top: '50%', left: '-20px', transform: 'translateY(-50%)' }}
                      animate={{ 
                        x: [0, -10, 0],
                        rotate: [0, -360]
                      }}
                      transition={{ 
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Chat Bubbles */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <motion.div 
                      className="bg-white rounded-2xl p-4 shadow-lg border-l-4 border-teal-500"
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-500">Customer</span>
                </div>
                      <p className="text-sm text-gray-700">Need help with my order</p>
                    </motion.div>

                    <motion.div 
                      className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-4 shadow-lg"
                      initial={{ x: 50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-xs text-white/80">AI Assistant</span>
                  </div>
                      <p className="text-sm text-white">I'll help you right away!</p>
                    </motion.div>

                    <motion.div 
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-4 shadow-lg"
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-xs text-white/80">AI Assistant</span>
                </div>
                      <p className="text-sm text-white">Issue resolved in 2 minutes</p>
                    </motion.div>

                    <motion.div 
                      className="bg-white rounded-2xl p-4 shadow-lg border-l-4 border-emerald-500"
                      initial={{ x: 50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-500">Customer</span>
                      </div>
                      <p className="text-sm text-gray-700">Thank you! ⭐⭐⭐⭐⭐</p>
                    </motion.div>
                  </div>

                  {/* Performance Metrics */}
                  <motion.div 
                    className="grid grid-cols-3 gap-3"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-center bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-3 border border-teal-200">
                      <motion.div 
                        className="text-xl font-bold text-teal-600 mb-1"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                        viewport={{ once: true }}
                      >
                        24/7
                      </motion.div>
                      <div className="text-xs text-gray-600">Availability</div>
                    </div>
                    <div className="text-center bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-3 border border-indigo-200">
                      <motion.div 
                        className="text-xl font-bold text-indigo-600 mb-1"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.4 }}
                        viewport={{ once: true }}
                      >
                                                 &lt;2min
                      </motion.div>
                      <div className="text-xs text-gray-600">Response Time</div>
                    </div>
                    <div className="text-center bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-3 border border-emerald-200">
                      <motion.div 
                        className="text-xl font-bold text-emerald-600 mb-1"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.6 }}
                        viewport={{ once: true }}
                      >
                        98%
                      </motion.div>
                      <div className="text-xs text-gray-600">Satisfaction</div>
                    </div>
                  </motion.div>

                  {/* Floating Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <motion.line 
                      x1="50%" y1="50%" x2="50%" y2="20%" 
                      stroke="#14b8a6" strokeWidth="2" strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      viewport={{ once: true }}
                    />
                    <motion.line 
                      x1="50%" y1="50%" x2="50%" y2="80%" 
                      stroke="#10b981" strokeWidth="2" strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.7 }}
                      viewport={{ once: true }}
                    />
                    <motion.line 
                      x1="50%" y1="50%" x2="80%" y2="50%" 
                      stroke="#f43f5e" strokeWidth="2" strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.9 }}
                      viewport={{ once: true }}
                    />
                    <motion.line 
                      x1="50%" y1="50%" x2="20%" y2="50%" 
                      stroke="#f97316" strokeWidth="2" strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 1.1 }}
                      viewport={{ once: true }}
                    />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Conversational Intelligence Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Side - Text Content */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="inline-block text-[#6633FF] font-bold font size 14px  text-lg mb-8 -mt-2">
                  🤖 AI Communication
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Conversational Intelligence
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Conversational intelligence bridges human and AI communication, enabling smart, context-aware interactions for deeper connection and seamless collaboration.                </p>
                <Link
                  to="/conversational-intelligence"
                  className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-200 group shadow-lg"
                >
                  <span>Learn More</span>
                  <span className="ml-2">
                    <span className="block group-hover:hidden">{'>'}</span>
                    <span className="hidden group-hover:block">{'->'}</span>
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Right Side - Static Conversational Intelligence Visualization */}
            <div className="flex-1 sticky top-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative -ml-[30px]"
              >
                <div className="p-8 relative overflow-hidden">
                  {/* Neural Network Background */}
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 400 300">
                      <motion.circle cx="50" cy="50" r="3" fill="#8b5cf6" 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                      />
                      <motion.circle cx="150" cy="30" r="3" fill="#06b6d4" 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      />
                      <motion.circle cx="250" cy="50" r="3" fill="#10b981" 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      />
                      <motion.circle cx="350" cy="40" r="3" fill="#f59e0b" 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                      />
                      <motion.circle cx="80" cy="150" r="3" fill="#ef4444" 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      />
                      <motion.circle cx="180" cy="170" r="3" fill="#8b5cf6" 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
                      />
                      <motion.circle cx="280" cy="160" r="3" fill="#06b6d4" 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1.3 }}
                      />
                      <motion.circle cx="320" cy="150" r="3" fill="#10b981" 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1.8 }}
                      />
                      <motion.circle cx="120" cy="250" r="3" fill="#f59e0b" 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.circle cx="220" cy="270" r="3" fill="#ef4444" 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                      />
                      <motion.circle cx="320" cy="260" r="3" fill="#8b5cf6" 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                      />

                {/* Connection lines */}
                      <motion.line x1="50" y1="50" x2="80" y2="150" stroke="#8b5cf6" strokeWidth="1" opacity="0.3"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        viewport={{ once: true }}
                      />
                      <motion.line x1="150" y1="30" x2="180" y2="170" stroke="#06b6d4" strokeWidth="1" opacity="0.3"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.8 }}
                        viewport={{ once: true }}
                      />
                      <motion.line x1="250" y1="50" x2="280" y2="160" stroke="#10b981" strokeWidth="1" opacity="0.3"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 1.1 }}
                        viewport={{ once: true }}
                      />
                      <motion.line x1="80" y1="150" x2="120" y2="250" stroke="#ef4444" strokeWidth="1" opacity="0.3"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                        viewport={{ once: true }}
                      />
                      <motion.line x1="180" y1="170" x2="220" y2="270" stroke="#8b5cf6" strokeWidth="1" opacity="0.3"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.6 }}
                        viewport={{ once: true }}
                      />
                    </svg>
                  </div>

                  {/* Main Conversation Flow */}
                  <div className="relative z-10">
                    {/* Human Input */}
                    <motion.div 
                      className="flex items-center space-x-4 mb-6"
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Human Input</h3>
                        <p className="text-sm text-gray-600">Natural language processing</p>
                      </div>
                      <motion.div 
                        className="flex-1 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                      />
                    </motion.div>

                    {/* Sentiment Analysis */}
                    <motion.div 
                      className="flex items-center space-x-4 mb-6"
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Sentiment Analysis</h3>
                        <p className="text-sm text-gray-600">Emotion & context detection</p>
                      </div>
                      <motion.div 
                        className="flex-1 h-0.5 bg-gradient-to-r from-purple-500 to-pink-600"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        viewport={{ once: true }}
                      />
                    </motion.div>

                    {/* Machine Learning */}
                    <motion.div 
                      className="flex items-center space-x-4 mb-6"
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Machine Learning</h3>
                        <p className="text-sm text-gray-600">Pattern recognition</p>
                      </div>
                      <motion.div 
                        className="flex-1 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        viewport={{ once: true }}
                      />
                    </motion.div>

                    {/* AI Response */}
                    <motion.div 
                      className="flex items-center space-x-4"
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">AI Response</h3>
                        <p className="text-sm text-gray-600">Context-aware reply</p>
                      </div>
                    </motion.div>

                    {/* Conversation Bubbles */}
                    <div className="mt-8 space-y-4">
                      <motion.div 
                        className="flex justify-start"
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        viewport={{ once: true }}
                      >
                        <div className="bg-gray-100 rounded-2xl rounded-bl-md p-3 max-w-xs">
                          <p className="text-sm text-gray-700">How can I help you today?</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="flex justify-end"
                        initial={{ x: 30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        viewport={{ once: true }}
                      >
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl rounded-br-md p-3 max-w-xs">
                          <p className="text-sm text-white">I'm feeling frustrated with my order</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="flex justify-start"
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        viewport={{ once: true }}
                      >
                        <div className="bg-gray-100 rounded-2xl rounded-bl-md p-3 max-w-xs">
                          <p className="text-sm text-gray-700">I understand your frustration. Let me help resolve this quickly.</p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Intelligence Metrics */}
                    <motion.div 
                      className="mt-6 grid grid-cols-3 gap-3"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
                        <div className="text-xl font-bold text-blue-600 mb-1">99%</div>
                        <div className="text-xs text-gray-600">Accuracy</div>
                      </div>
                      <div className="text-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-200">
                        <div className="text-xl font-bold text-purple-600 mb-1">Real-time</div>
                        <div className="text-xs text-gray-600">Processing</div>
                      </div>
                      <div className="text-center bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-3 border border-cyan-200">
                        <div className="text-xl font-bold text-cyan-600 mb-1">Multi-lang</div>
                        <div className="text-xs text-gray-600">Support</div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Automation Agency Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Side - Text Content */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="inline-block text-[#6633FF] font-bold font size 14px  text-lg mb-8 -mt-2">
                  🚀 AI Automation Agency
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Powering Business Efficiency
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                Artificial Intelligence is transforming industries and creating new opportunities for entrepreneurs. To tap into this growing market, start your own AI Automation Agency.                </p>
              </motion.div>
            </div>

            {/* Right Side - Static AI Automation Agency Visualization */}
            <div className="flex-1 sticky top-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative -mr-[30px]"
              >
                <div className="p-12 relative overflow-visible min-h-[500px]">
                  {/* Central Automation Hub */}
                  <div className="relative flex items-center justify-center mb-12">
                    <motion.div 
                      className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl"
                      animate={{ 
                        rotate: 360
                      }}
                      transition={{ 
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </motion.div>
                    
                    {/* Orbiting Business Elements */}
                    <motion.div 
                      className="absolute w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg"
                      style={{ top: '-40px', left: '50%', transform: 'translateX(-50%)' }}
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </motion.div>

                    <motion.div 
                      className="absolute w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg"
                      style={{ bottom: '-40px', left: '50%', transform: 'translateX(-50%)' }}
                      animate={{ 
                        y: [0, 10, 0],
                        rotate: [0, -180, -360]
                      }}
                      transition={{ 
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </motion.div>

                    <motion.div 
                      className="absolute w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg"
                      style={{ top: '50%', right: '-40px', transform: 'translateY(-50%)' }}
                      animate={{ 
                        x: [0, 10, 0],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ 
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </motion.div>

                    <motion.div 
                      className="absolute w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg"
                      style={{ top: '50%', left: '-40px', transform: 'translateY(-50%)' }}
                      animate={{ 
                        x: [0, -10, 0],
                        rotate: [0, -180, -360]
                      }}
                      transition={{ 
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Workflow Automation Steps */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <motion.div 
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200"
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">Automate</span>
                      </div>
                      <p className="text-xs text-gray-600">Streamline repetitive tasks</p>
                    </motion.div>

                    <motion.div 
                      className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200"
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">Optimize</span>
                      </div>
                      <p className="text-xs text-gray-600">Improve efficiency & accuracy</p>
                    </motion.div>

                    <motion.div 
                      className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200"
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">Scale</span>
                      </div>
                      <p className="text-xs text-gray-600">Grow without limits</p>
                    </motion.div>

                    <motion.div 
                      className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200"
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">Accelerate</span>
                      </div>
                      <p className="text-xs text-gray-600">Speed up processes</p>
                    </motion.div>
                  </div>

                  {/* Business Transformation Timeline */}
                  <div className="space-y-3 mb-8">
                    <motion.div 
                      className="flex items-center space-x-3"
                      initial={{ x: -30, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="flex-1 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded"></div>
                      <span className="text-xs text-gray-600">Before AI</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center space-x-3"
                      initial={{ x: -30, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="flex-1 h-1 bg-gradient-to-r from-green-500 to-transparent rounded"></div>
                      <span className="text-xs text-gray-600">After AI</span>
                    </motion.div>
                  </div>

                  {/* Transformation Metrics */}
                  <motion.div 
                    className="grid grid-cols-3 gap-3"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
                      <div className="text-xl font-bold text-blue-600 mb-1">10x</div>
                      <div className="text-xs text-gray-600">Faster</div>
                    </div>
                    <div className="text-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                      <div className="text-xl font-bold text-green-600 mb-1">90%</div>
                      <div className="text-xs text-gray-600">Cost Cut</div>
                    </div>
                    <div className="text-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-200">
                      <div className="text-xl font-bold text-purple-600 mb-1">100%</div>
                      <div className="text-xs text-gray-600">Accuracy</div>
                    </div>
                  </motion.div>

                  {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <motion.line 
                      x1="50%" y1="50%" x2="50%" y2="25%" 
                      stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      viewport={{ once: true }}
                    />
                    <motion.line 
                      x1="50%" y1="50%" x2="50%" y2="75%" 
                      stroke="#10b981" strokeWidth="2" strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.7 }}
                      viewport={{ once: true }}
                    />
                    <motion.line 
                      x1="50%" y1="50%" x2="75%" y2="50%" 
                      stroke="#f97316" strokeWidth="2" strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.9 }}
                      viewport={{ once: true }}
                    />
                    <motion.line 
                      x1="50%" y1="50%" x2="25%" y2="50%" 
                      stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 1.1 }}
                      viewport={{ once: true }}
                    />
                </svg>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Scale Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            {/* Left Side - Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="inline-block text-blue-300 font-bold text-base md:text-lg mb-4 md:mb-8">
                  Global scale
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
                  The backbone for global commerce
                </h2>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-6 md:mb-8">
                  Agentflow makes AI automation as easy and programmable as moving data. Our teams are based in offices around the world and we process millions of interactions each year for ambitious businesses of all sizes.
                </p>
                
                {/* Statistics - Mobile Responsive */}
                <div className="grid grid-cols-2 md:flex md:items-center gap-4 md:gap-8 md:space-x-8">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white">500M+</div>
                    <div className="text-xs md:text-sm text-gray-400">Interactions</div>
                  </div>
                  <div className="hidden md:block w-px h-12 bg-gray-600"></div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white">99.999%</div>
                    <div className="text-xs md:text-sm text-gray-400">Uptime</div>
                  </div>
                  <div className="hidden md:block w-px h-12 bg-gray-600"></div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white">47+</div>
                    <div className="text-xs md:text-sm text-gray-400">Countries</div>
                  </div>
                  <div className="hidden md:block w-px h-12 bg-gray-600"></div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white">135+</div>
                    <div className="text-xs md:text-sm text-gray-400">Languages</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side - 3D Globe Visualization */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative"
              >
                <div className="relative w-full h-64 md:h-96 flex justify-center lg:justify-end">
                  {/* 3D Globe - Mobile Responsive */}
                  <motion.div 
                    className="relative w-64 h-64 md:w-[420px] md:h-[420px]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  >
                    {/* Globe Base */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-full shadow-2xl">
                      {/* Ocean Base Layer */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full"></div>
                      
                      {/* Ocean Depth Variations */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-transparent to-blue-800/50 rounded-full"></div>
                      <div className="absolute inset-0 bg-gradient-to-tl from-blue-800/40 via-transparent to-blue-400/20 rounded-full"></div>
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/25 via-transparent to-blue-700/35 rounded-full"></div>
                      
                      {/* Ocean Surface Highlights */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/15 via-transparent to-transparent rounded-full"></div>
                      <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-blue-300/10 to-transparent rounded-full"></div>
                      
                      {/* Atmospheric Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-300/8 to-transparent rounded-full"></div>
                      <div className="absolute inset-0 bg-gradient-to-tl from-transparent to-blue-600/15 rounded-full"></div>
                      
                      {/* Subtle Ocean Currents */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/5 to-transparent rounded-full"></div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/3 to-transparent rounded-full"></div>
                    </div>

                    {/* Realistic Earth with Continents */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 420 420">
                                                  {/* North America - Detailed Continent Shape */}
                            <motion.circle cx="126" cy="157" r="1.3" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                            />
                            <motion.circle cx="136" cy="147" r="1.3" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.1 }}
                            />
                            <motion.circle cx="146" cy="137" r="1.3" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.circle cx="156" cy="127" r="1.3" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
                            />
                            <motion.circle cx="166" cy="117" r="1.3" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}
                            />
                            <motion.circle cx="116" cy="167" r="1.3" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                            />
                            <motion.circle cx="131" cy="152" r="1.3" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
                            />
                            <motion.circle cx="141" cy="142" r="1.3" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.7 }}
                            />
                            <motion.circle cx="151" cy="132" r="1.3" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.8 }}
                            />
                            <motion.circle cx="161" cy="122" r="1.3" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.9 }}
                            />
                            <motion.circle cx="121" cy="162" r="1.3" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.0 }}
                            />
                            <motion.circle cx="134" cy="149" r="1.3" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.1 }}
                            />
                            <motion.circle cx="144" cy="139" r="1.3" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.2 }}
                            />
                            <motion.circle cx="154" cy="129" r="1.3" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.3 }}
                            />
                            <motion.circle cx="164" cy="119" r="1.3" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.4 }}
                            />
                            <motion.circle cx="124" cy="155" r="1.3" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                            />
                            <motion.circle cx="134" cy="145" r="1.3" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.6 }}
                            />
                            <motion.circle cx="144" cy="135" r="1.3" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.7 }}
                            />
                            <motion.circle cx="154" cy="125" r="1.3" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.8 }}
                            />
                            <motion.circle cx="164" cy="115" r="1.3" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.9 }}
                            />
                            <motion.circle cx="111" cy="172" r="1.3" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 2.0 }}
                            />
                            <motion.circle cx="171" cy="111" r="1.3" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 2.1 }}
                            />
                            
                            {/* Alaska Extension */}
                            <motion.circle cx="105" cy="140" r="1.1" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 2.2 }}
                            />
                            <motion.circle cx="95" cy="130" r="1.1" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 2.3 }}
                            />
                            <motion.circle cx="85" cy="120" r="1.1" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 2.4 }}
                            />
                            
                            {/* Central America */}
                            <motion.circle cx="140" cy="180" r="1.1" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 2.5 }}
                            />
                            <motion.circle cx="150" cy="190" r="1.1" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 2.6 }}
                            />
                            <motion.circle cx="160" cy="200" r="1.1" fill="#228B22" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 2.7 }}
                            />
                      
                                                  {/* South America - Realistic Continent Shape */}
                            <motion.circle cx="147" cy="210" r="1.2" fill="#228B22" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.circle cx="157" cy="220" r="1.2" fill="#228B22" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
                            />
                            <motion.circle cx="167" cy="230" r="1.2" fill="#228B22" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}
                            />
                            <motion.circle cx="177" cy="240" r="1.2" fill="#228B22" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                            />
                            <motion.circle cx="187" cy="250" r="1.2" fill="#228B22" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
                            />
                            <motion.circle cx="152" cy="215" r="1.2" fill="#228B22" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.7 }}
                            />
                            <motion.circle cx="162" cy="225" r="1.2" fill="#228B22" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.8 }}
                            />
                            <motion.circle cx="172" cy="235" r="1.2" fill="#228B22" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.9 }}
                            />
                            <motion.circle cx="182" cy="245" r="1.2" fill="#228B22" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.0 }}
                            />
                            <motion.circle cx="192" cy="255" r="1.2" fill="#228B22" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.1 }}
                            />
                            <motion.circle cx="142" cy="205" r="1.2" fill="#228B22" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.2 }}
                            />
                            <motion.circle cx="182" cy="255" r="1.2" fill="#228B22" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.3 }}
                            />
                            <motion.circle cx="197" cy="260" r="1.2" fill="#228B22" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.4 }}
                            />
                      
                                                  {/* Europe - Realistic Continent Shape */}
                            <motion.circle cx="231" cy="147" r="1.2" fill="#32CD32" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.1 }}
                            />
                            <motion.circle cx="241" cy="137" r="1.2" fill="#32CD32" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.circle cx="251" cy="127" r="1.2" fill="#32CD32" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
                            />
                            <motion.circle cx="261" cy="117" r="1.2" fill="#32CD32" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}
                            />
                            <motion.circle cx="236" cy="142" r="1.2" fill="#32CD32" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                            />
                            <motion.circle cx="246" cy="132" r="1.2" fill="#32CD32" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
                            />
                            <motion.circle cx="256" cy="122" r="1.2" fill="#32CD32" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.7 }}
                            />
                            <motion.circle cx="239" cy="139" r="1.2" fill="#32CD32" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.8 }}
                            />
                            <motion.circle cx="249" cy="129" r="1.2" fill="#32CD32" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.9 }}
                            />
                            <motion.circle cx="226" cy="152" r="1.2" fill="#32CD32" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.0 }}
                            />
                            <motion.circle cx="266" cy="112" r="1.2" fill="#32CD32" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.1 }}
                            />
                      
                                                  {/* Asia - Realistic Continent Shape */}
                            <motion.circle cx="273" cy="157" r="1.2" fill="#006400" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
                            />
                            <motion.circle cx="283" cy="147" r="1.2" fill="#006400" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}
                            />
                            <motion.circle cx="293" cy="137" r="1.2" fill="#006400" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                            />
                            <motion.circle cx="303" cy="127" r="1.2" fill="#006400" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
                            />
                            <motion.circle cx="313" cy="117" r="1.2" fill="#006400" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.7 }}
                            />
                            <motion.circle cx="278" cy="152" r="1.2" fill="#006400" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.8 }}
                            />
                            <motion.circle cx="288" cy="142" r="1.2" fill="#006400" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.9 }}
                            />
                            <motion.circle cx="298" cy="132" r="1.2" fill="#006400" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.0 }}
                            />
                            <motion.circle cx="308" cy="122" r="1.2" fill="#006400" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.1 }}
                            />
                            <motion.circle cx="281" cy="149" r="1.2" fill="#006400" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.2 }}
                            />
                            <motion.circle cx="291" cy="139" r="1.2" fill="#006400" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.3 }}
                            />
                            <motion.circle cx="301" cy="129" r="1.2" fill="#006400" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.4 }}
                            />
                            <motion.circle cx="323" cy="107" r="1.2" fill="#006400" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                            />
                            <motion.circle cx="333" cy="97" r="1.2" fill="#006400" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.6 }}
                            />
                            <motion.circle cx="268" cy="162" r="1.2" fill="#006400" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.7 }}
                            />
                      
                                                  {/* Africa - Realistic Continent Shape */}
                            <motion.circle cx="231" cy="187" r="1.2" fill="#8FBC8F" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}
                            />
                            <motion.circle cx="241" cy="197" r="1.2" fill="#8FBC8F" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                            />
                            <motion.circle cx="251" cy="207" r="1.2" fill="#8FBC8F" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
                            />
                            <motion.circle cx="261" cy="217" r="1.2" fill="#8FBC8F" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.7 }}
                            />
                            <motion.circle cx="236" cy="192" r="1.2" fill="#8FBC8F" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.8 }}
                            />
                            <motion.circle cx="246" cy="202" r="1.2" fill="#8FBC8F" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.9 }}
                            />
                            <motion.circle cx="256" cy="212" r="1.2" fill="#8FBC8F" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.0 }}
                            />
                            <motion.circle cx="239" cy="195" r="1.2" fill="#8FBC8F" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.1 }}
                            />
                            <motion.circle cx="249" cy="205" r="1.2" fill="#8FBC8F" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.2 }}
                            />
                            <motion.circle cx="226" cy="182" r="1.2" fill="#8FBC8F" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.3 }}
                            />
                            <motion.circle cx="266" cy="222" r="1.2" fill="#8FBC8F" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.4 }}
                            />
                            <motion.circle cx="271" cy="227" r="1.2" fill="#8FBC8F" 
                              animate={{ opacity: [0.5, 0.9, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                            />
                      
                                                  {/* Australia - Detailed Continent Shape */}
                            <motion.circle cx="315" cy="262" r="1.3" fill="#556B2F" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                            />
                            <motion.circle cx="325" cy="272" r="1.3" fill="#556B2F" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
                            />
                            <motion.circle cx="335" cy="282" r="1.3" fill="#556B2F" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.7 }}
                            />
                            <motion.circle cx="320" cy="267" r="1.3" fill="#556B2F" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.8 }}
                            />
                            <motion.circle cx="330" cy="277" r="1.3" fill="#556B2F" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.9 }}
                            />
                            <motion.circle cx="340" cy="287" r="1.3" fill="#556B2F" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.0 }}
                            />
                            <motion.circle cx="310" cy="257" r="1.3" fill="#556B2F" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.1 }}
                            />
                            
                            {/* New Zealand */}
                            <motion.circle cx="350" cy="300" r="0.8" fill="#556B2F" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.2 }}
                            />
                            <motion.circle cx="355" cy="305" r="0.8" fill="#556B2F" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.3 }}
                            />
                            
                            {/* Greenland */}
                            <motion.circle cx="180" cy="80" r="1.0" fill="#90EE90" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.4 }}
                            />
                            <motion.circle cx="190" cy="70" r="1.0" fill="#90EE90" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                            />
                            <motion.circle cx="200" cy="60" r="1.0" fill="#90EE90" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.6 }}
                            />
                            
                            {/* Iceland */}
                            <motion.circle cx="220" cy="100" r="0.6" fill="#90EE90" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.7 }}
                            />
                            
                            {/* Japan */}
                            <motion.circle cx="320" cy="150" r="0.7" fill="#006400" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.8 }}
                            />
                            <motion.circle cx="325" cy="145" r="0.7" fill="#006400" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1.9 }}
                            />
                            <motion.circle cx="330" cy="140" r="0.7" fill="#006400" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 2.0 }}
                            />
                            
                            {/* Madagascar */}
                            <motion.circle cx="280" cy="220" r="0.8" fill="#8FBC8F" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 2.1 }}
                            />
                            <motion.circle cx="285" cy="225" r="0.8" fill="#8FBC8F" 
                              animate={{ opacity: [0.6, 1.0, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 2.2 }}
                            />
                            
                            {/* Polar Regions - Arctic */}
                            <motion.circle cx="210" cy="50" r="0.9" fill="#F0F8FF" 
                              animate={{ opacity: [0.4, 0.8, 0.4] }}
                              transition={{ duration: 4, repeat: Infinity, delay: 2.3 }}
                            />
                            <motion.circle cx="200" cy="40" r="0.9" fill="#F0F8FF" 
                              animate={{ opacity: [0.4, 0.8, 0.4] }}
                              transition={{ duration: 4, repeat: Infinity, delay: 2.4 }}
                            />
                            <motion.circle cx="190" cy="30" r="0.9" fill="#F0F8FF" 
                              animate={{ opacity: [0.4, 0.8, 0.4] }}
                              transition={{ duration: 4, repeat: Infinity, delay: 2.5 }}
                            />
                            
                            {/* Polar Regions - Antarctica */}
                            <motion.circle cx="210" cy="380" r="0.9" fill="#F0F8FF" 
                              animate={{ opacity: [0.4, 0.8, 0.4] }}
                              transition={{ duration: 4, repeat: Infinity, delay: 2.6 }}
                            />
                            <motion.circle cx="200" cy="390" r="0.9" fill="#F0F8FF" 
                              animate={{ opacity: [0.4, 0.8, 0.4] }}
                              transition={{ duration: 4, repeat: Infinity, delay: 2.7 }}
                            />
                            <motion.circle cx="190" cy="400" r="0.9" fill="#F0F8FF" 
                              animate={{ opacity: [0.4, 0.8, 0.4] }}
                              transition={{ duration: 4, repeat: Infinity, delay: 2.8 }}
                            />
                      
                      {/* Additional scattered dots for digital grid effect */}
                      <motion.circle cx="200" cy="100" r="0.6" fill="#87ceeb" 
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 5, repeat: Infinity, delay: 0 }}
                      />
                      <motion.circle cx="180" cy="90" r="0.6" fill="#87ceeb" 
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                      />
                      <motion.circle cx="160" cy="80" r="0.6" fill="#87ceeb" 
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                      />
                      <motion.circle cx="340" cy="200" r="0.6" fill="#87ceeb" 
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
                      />
                      <motion.circle cx="320" cy="180" r="0.6" fill="#87ceeb" 
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 5, repeat: Infinity, delay: 2 }}
                      />
                      <motion.circle cx="300" cy="160" r="0.6" fill="#87ceeb" 
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 5, repeat: Infinity, delay: 2.5 }}
                      />
                                              </svg>
                  
                          {/* Atmospheric Haze Layer */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-200/5 via-transparent to-blue-300/8 rounded-full"></div>
                          <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-blue-200/3 to-transparent rounded-full"></div>
                  
                          {/* Subtle Cloud Layer */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/2 via-transparent to-white/1 rounded-full"></div>
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/1.5 to-transparent rounded-full"></div>
                  
                          {/* Animated Earth Connection Lines */}
                              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                {/* Orange Line from North America - Main Connection */}
                                <motion.path 
                                  d="M 125 145 Q 200 50 380 30" 
                                  stroke="#f97316" 
                                  strokeWidth="3" 
                                  fill="none"
                                  strokeLinecap="round"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: [0, 1, 0] }}
                                  transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                                />
                                
                                {/* Yellow Line from Europe */}
                                <motion.path 
                                  d="M 235 125 Q 280 70 370 50" 
                                  stroke="#fbbf24" 
                                  strokeWidth="2" 
                                  fill="none"
                                  strokeLinecap="round"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: [0, 1, 0] }}
                                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                                />
                                
                                {/* Pink Line from Africa */}
                                <motion.path 
                                  d="M 235 195 Q 270 150 320 100" 
                                  stroke="#ec4899" 
                                  strokeWidth="2" 
                                  fill="none"
                                  strokeLinecap="round"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: [0, 1, 0] }}
                                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                                />
                                
                                {/* Blue Line from Asia */}
                                <motion.path 
                                  d="M 285 125 Q 320 80 360 60" 
                                  stroke="#3b82f6" 
                                  strokeWidth="2" 
                                  fill="none"
                                  strokeLinecap="round"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: [0, 1, 0] }}
                                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                                />
                                
                                {/* Purple Line from South America */}
                                <motion.path 
                                  d="M 160 220 Q 200 180 250 150" 
                                  stroke="#a855f7" 
                                  strokeWidth="2" 
                                  fill="none"
                                  strokeLinecap="round"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: [0, 1, 0] }}
                                  transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                                />
                                
                                {/* Green Line from Australia */}
                                <motion.path 
                                  d="M 310 260 Q 340 220 360 180" 
                                  stroke="#10b981" 
                                  strokeWidth="1.5" 
                                  fill="none"
                                  strokeLinecap="round"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: [0, 1, 0] }}
                                  transition={{ duration: 3, repeat: Infinity, delay: 2.5 }}
                                />
                                
                                {/* Additional animated data flow lines */}
                                <motion.path 
                                  d="M 125 145 Q 180 80 300 40" 
                                  stroke="#f97316" 
                                  strokeWidth="1" 
                                  fill="none"
                                  strokeLinecap="round"
                                  opacity="0.6"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: [0, 1, 0] }}
                                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
                                />
                                
                                <motion.path 
                                  d="M 235 125 Q 260 90 320 70" 
                                  stroke="#fbbf24" 
                                  strokeWidth="1" 
                                  fill="none"
                                  strokeLinecap="round"
                                  opacity="0.6"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: [0, 1, 0] }}
                                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
                                />
                                
                                <motion.path 
                                  d="M 285 125 Q 300 100 340 80" 
                                  stroke="#3b82f6" 
                                  strokeWidth="1" 
                                  fill="none"
                                  strokeLinecap="round"
                                  opacity="0.6"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: [0, 1, 0] }}
                                  transition={{ duration: 2.5, repeat: Infinity, delay: 1.3 }}
                                />
                              </svg>

                    {/* Proper Earth Connection Points */}
                    {/* North America Point - Orange */}
                    <motion.div 
                      className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg border-2 border-orange-300">
                        <div className="w-5 h-5 bg-orange-700 rounded-full"></div>
                      </div>
                      {/* Pulse effect */}
                      <motion.div 
                        className="absolute inset-0 w-10 h-10 bg-orange-400 rounded-full opacity-30"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>

                    {/* Europe Point - Yellow */}
                    <motion.div 
                      className="absolute top-1/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-300">
                        <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
                      </div>
                      <motion.div 
                        className="absolute inset-0 w-8 h-8 bg-yellow-300 rounded-full opacity-30"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      />
                    </motion.div>

                    {/* Africa Point - Pink */}
                    <motion.div 
                      className="absolute bottom-1/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg border-2 border-pink-300">
                        <div className="w-4 h-4 bg-pink-600 rounded-full"></div>
                      </div>
                      <motion.div 
                        className="absolute inset-0 w-8 h-8 bg-pink-300 rounded-full opacity-30"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      />
                    </motion.div>

                    {/* Asia Point - Blue */}
                    <motion.div 
                      className="absolute top-1/3 right-1/6 transform -translate-x-1/2 -translate-y-1/2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 2 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg border-2 border-blue-300">
                        <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                      </div>
                      <motion.div 
                        className="absolute inset-0 w-8 h-8 bg-blue-300 rounded-full opacity-30"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                      />
                    </motion.div>

                    {/* South America Point - Purple */}
                    <motion.div 
                      className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 2.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg border border-purple-300">
                        <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      </div>
                    </motion.div>

                    {/* Australia Point - Green */}
                    <motion.div 
                      className="absolute bottom-1/6 right-1/6 transform -translate-x-1/2 -translate-y-1/2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 3 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg border border-green-300">
                        <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Support for any business type Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Support for any business type
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              From global AI companies to category-defining marketplaces, successful businesses across industries grow and scale with Agentflow.
            </p>
          </div>

          {/* Business Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AI Card */}
            <motion.div 
              className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="border-t-4 border-purple-500 rounded-t-xl -mt-8 mb-6"></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Agentflow supports businesses across the AI ecosystem - from usage-based billing for AI assistants to premium subscriptions for infrastructure providers.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center group">
                Learn more 
                <span className="ml-1">
                  <span className="block group-hover:hidden">{'>'}</span>
                  <span className="hidden group-hover:block">{'->'}</span>
                </span>
              </a>
              
              {/* Company Logos */}
              <div className="flex items-center space-x-6 mt-8 pt-6 border-t border-gray-100">
                <div className="text-sm font-semibold text-gray-500">OpenAI</div>
                <div className="text-sm font-semibold text-gray-500">CURSOR</div>
                <div className="text-sm font-semibold text-gray-500">ANTHROPIC</div>
              </div>
            </motion.div>

            {/* SaaS Card */}
            <motion.div 
              className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="border-t-4 border-purple-500 rounded-t-xl -mt-8 mb-6"></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">SaaS</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Quickly launch and grow recurring revenue with a unified platform for payments, subscriptions, invoicing, tax, accounting, and more.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center group">
                Learn more 
                <span className="ml-1">
                  <span className="block group-hover:hidden">{'>'}</span>
                  <span className="hidden group-hover:block">{'->'}</span>
                </span>
              </a>
              
              {/* Company Logos */}
              <div className="flex items-center space-x-6 mt-8 pt-6 border-t border-gray-100">
                <div className="text-sm font-semibold text-gray-500">slack</div>
                <div className="text-sm font-semibold text-gray-500">twilio</div>
                <div className="text-sm font-semibold text-gray-500">Linear</div>
              </div>
            </motion.div>

            {/* Marketplace Card */}
            <motion.div 
              className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="border-t-4 border-purple-500 rounded-t-xl -mt-8 mb-6"></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Marketplace</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Get everything you need to connect buyers and sellers, manage multiple providers, handle payouts, all in one place.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center group">
                Learn more 
                <span className="ml-1">
                  <span className="block group-hover:hidden">{'>'}</span>
                  <span className="hidden group-hover:block">{'->'}</span>
                </span>
              </a>
              
              {/* Company Logos */}
              <div className="flex items-center space-x-6 mt-8 pt-6 border-t border-gray-100">
                <div className="text-sm font-semibold text-gray-500">BLOOMNATION</div>
                <div className="text-sm font-semibold text-gray-500">Shopify</div>
                <div className="text-sm font-semibold text-gray-500">Etsy</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enterprise AI Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Header/Category */}
              <div className="inline-block text-purple-600 font-semibold text-sm uppercase tracking-wide mb-4">
                Enterprise Ready Generative AI
              </div>
              
              {/* Main Title */}
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Unlock the potential of LLMs for Powerful Business Automation
              </h2>
              
              {/* Description */}
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Supercharge your Customer service with secure LLM integration. Deploy multiple agents for aggregated task performance. Agents capability to solve complex issues at hand. Automate conversation design workflows and accelerate time-to-value of your AI Agents.
              </p>
              
              {/* Call-to-Action Button */}
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center space-x-2 mb-8 group">
                <span>Explore Agentflow for enterprises</span>
                <span>
                  <span className="block group-hover:hidden">{'>'}</span>
                  <span className="hidden group-hover:block">{'->'}</span>
                </span>
              </button>
              
              {/* Statistics Section */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">+10%</div>
                  <div className="text-sm text-gray-600">Uplift from Agentflow's AI Integration</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">+15%</div>
                  <div className="text-sm text-gray-600">Uplift from Multi-Agent Deployment</div>
                </div>
              </div>
              
              {/* Products Used */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Products used</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                    <span className="text-sm text-gray-600">AI Agents</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
                    <span className="text-sm text-gray-600">LLM Integration</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Media Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
                
                {/* Logo */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <img 
                        src="/images/logo/Agentflow Logo.png" 
                        alt="Agentflow Logo" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="font-bold text-lg">Agentflow AI</span>
                  </div>
                </div>
                
                {/* Main Content */}
                <div className="text-center relative z-10">
                  {/* Afro Network Image */}
                  <div className="mb-6">
                    <img 
                      src="/images/Pictures/Afro_network-removebg-preview1.png" 
                      alt="Afro Network AI" 
                      className="w-80 h-80 mx-auto object-contain"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">See how Agentflow increased AI efficiency by 25%</h3>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="font-semibold mb-1">Multi-Agent Model</div>
                      <div className="text-white/80">Fast Delivery</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="font-semibold mb-1">Advanced Reasoning</div>
                      <div className="text-white/80">Complex Logic</div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Call-to-Action Section */}
      <section className="py-44 bg-gray-50 relative overflow-hidden">
        {/* Decorative Background Shapes */}
        <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none">
  {/* Slanted background bar across the whole bottom */}
  <div className="absolute bottom-0 left-0 w-full h-20 bg-purple-500 transform -skew-y-3 origin-bottom-left z-10"></div>

  {/* Light blue highlight on top of the purple, aligned diagonally */}
  <div className="absolute bottom-0 left-0 w-full h-16 bg-cyan-300 transform -skew-y-3 origin-bottom-left z-20"></div>
</div>


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Left Column: Ready to get started */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
              className="text-center md:text-left"
          >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to get started?
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Create an account instantly to get started or contact us to design a custom package for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="https://client.anvenssa.com/account/login/?next=/"
                  className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200 group"
                >
                  Start now
                  <span className="ml-2">
                    <span className="block group-hover:hidden">{'>'}</span>
                    <span className="hidden group-hover:block">{'->'}</span>
                  </span>
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200 group"
                >
                  Contact sales
                  <span className="ml-2">
                    <span className="block group-hover:hidden">{'>'}</span>
                    <span className="hidden group-hover:block">{'->'}</span>
                  </span>
                </Link>
              </div>
            </motion.div>

            {/* Middle Column: Always know what you pay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Always know what you pay
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Integrated per-transaction pricing with no hidden fees.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200 group"
              >
                Pricing details
                <span className="ml-2">
                  <span className="block group-hover:hidden">{'>'}</span>
                  <span className="hidden group-hover:block">{'->'}</span>
                </span>
              </Link>
            </motion.div>

            {/* Right Column: Start your integration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center md:text-right"
            >
              <div className="flex justify-center md:justify-end mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Start your integration
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Get up and running with Agentflow in as little as 10 minutes.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200 group"
              >
                API reference
                <span className="ml-2">
                  <span className="block group-hover:hidden">{'>'}</span>
                  <span className="hidden group-hover:block">{'->'}</span>
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

              {/* Low- and No-Code Options Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block text-purple-600 font-semibold text-sm uppercase tracking-wide mb-4"
            >
              Launch with ease
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            >
              Low- and no-code options for getting started
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
              className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
                              If you'd like to use Agentflow for your business but don't have developers on staff, no problem. We have a few options depending on your needs.
          </motion.p>
          </div>

          {/* Three Column Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Use a pre-integrated platform */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
              className="group"
            >
                            <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-purple-500/20 group-hover:scale-105 group-hover:border-purple-200 border border-transparent h-full flex flex-col">
                {/* Visual Element */}
                <div className="bg-gray-100 rounded-lg h-48 mb-6 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center" 
                    alt="Platform Integration - Connected systems and APIs"
                    className="w-full h-full object-cover"
                  />
                </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Use a pre-integrated platform
                </h3>
                <p className="text-gray-600 leading-relaxed flex-1">
                  Explore our directory to find out-of-the-box solutions that connect with Agentflow, such as Squarespace and Lightspeed.
                </p>
              </div>
              </div>
            </motion.div>

                            {/* Column 2: Build with Agentflow-certified experts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="group"
            >
                            <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-purple-500/20 group-hover:scale-105 group-hover:border-purple-200 border border-transparent h-full flex flex-col">
                {/* Visual Element */}
                <div className="bg-gray-100 rounded-lg h-48 mb-6 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&crop=center" 
                    alt="Agentflow-certified experts and consulting partners"
                    className="w-full h-full object-cover"
                  />
                </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Build with Agentflow-certified experts
                </h3>
                <p className="text-gray-600 leading-relaxed flex-1">
                  Work with an Agentflow consulting partner that can integrate and deploy Agentflow solutions for you.
                </p>
              </div>
              </div>
            </motion.div>

            {/* Column 3: Try our no-code products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-purple-500/20 group-hover:scale-105 group-hover:border-purple-200 border border-transparent h-full flex flex-col">
                               {/* Visual Element */}
                 <div className="bg-gray-100 rounded-lg h-48 mb-6 overflow-hidden">
                   <img 
                     src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center" 
                     alt="No-code products and easy-to-use dashboard solutions"
                     className="w-full h-full object-cover"
                   />
                 </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Try our no-code products
                </h3>
                <p className="text-gray-600 leading-relaxed flex-1">
                  Set up usage-based billing, accept an in-person payment with your phone, or share a payment link directly from your Dashboard to start generating revenue in minutes - no code required.
                </p>
              </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Creative CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-white/90 text-sm font-medium">Ready to Transform Your Business?</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-white to-primary-100 bg-clip-text text-transparent">
              Elevate Your Support Experience
            </h2>
            <p className="text-xl text-primary-100 max-w-4xl mx-auto leading-relaxed">
              Explore a diverse range of AI-powered agents tailored for various workflows in our comprehensive Agents Marketplace. Discover innovative solutions designed to optimize your business processes and enhance productivity seamlessly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Enhanced Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/30 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-105 shadow-xl h-full flex flex-col">
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-center flex-1 flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    AI-Powered Solutions
                  </h3>
                  <p className="text-primary-100 mb-8 leading-relaxed flex-1">
                    Unlock the full potential of AI with our comprehensive suite of intelligent agents. From customer support to process automation, we've got you covered.
                  </p>
            <Link
              to="/contact"
                    className="group inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
                    <span>Take a tour</span>
                    <span className="ml-3">
                      <span className="block group-hover:hidden">{'>'}</span>
                      <span className="hidden group-hover:block">{'->'}</span>
                    </span>
            </Link>
                </div>
              </div>
          </motion.div>

            {/* Middle Column: Enhanced Experience Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/30 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-105 shadow-xl h-full flex flex-col">
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-center flex-1 flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Experience Agentflow at your own pace
                  </h3>
                  <p className="text-primary-100 mb-8 text-lg flex-1">
                    Contact Us
                  </p>
                  <Link
                    to="/contact"
                    className="group inline-flex items-center text-white hover:text-primary-100 font-semibold text-lg transition-all duration-300"
                  >
                    <span>Let's Talk</span>
                    <span className="ml-3">
                      <span className="block group-hover:hidden">{'>'}</span>
                      <span className="hidden group-hover:block">{'->'}</span>
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Enhanced Demo Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/30 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-105 shadow-xl h-full flex flex-col">
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-center flex-1 flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Give a live demo from a Agentflow expert
                  </h3>
                  <p className="text-primary-100 mb-8 text-lg flex-1">
                    Get a personalized demonstration of our AI-powered solutions tailored to your business needs.
                  </p>
                  <Link
                    to="/live-demo"
                    className="group inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <span>Book a demo</span>
                    <span className="ml-3">
                      <span className="block group-hover:hidden">{'>'}</span>
                      <span className="hidden group-hover:block">{'->'}</span>
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 