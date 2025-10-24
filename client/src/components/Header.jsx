import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const location = useLocation()
  const { user, logout } = useAuth()

  // Ensure header stays at top on page load
  React.useEffect(() => {
    // Force scroll to top on page load
    window.scrollTo(0, 0)
    
    // Remove any hash that might cause scrolling
    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname + window.location.search)
    }
  }, [location.pathname])

  const navigation = [
    { 
      name: 'Compare', 
      href: '/compare',
      hasDropdown: false,
    },
    { name: 'About Us', href: '/about' },
    // { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
    { name: 'Live Demo', href: '/live-demo' },
  ]

  const isActive = (path) => location.pathname === path
  const isHomePage = location.pathname === '/'

  // Logo component with fallback
  const Logo = () => {
    const [imageError, setImageError] = useState(false)
    
    if (imageError) {
      // Fallback to simple text logo
      return (
        <div className="flex items-center">
          <div className="w-12 h-14 ">
            <span className="text-gray-900 font-bold text-xl">A</span>
          </div>
        </div>
      )
    }

    return (
      <div className="flex items-center">
        <img 
          src="/images/logo/Agentflow svg.svg" 
          alt="Agentflow Logo" 
          className="h-8 w-auto mt-1"
          onError={() => setImageError(true)}
        />
      </div>
    )
  }

  return (
    <header className="bg-white shadow-sm backdrop-blur-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
          </Link>

          {/* Desktop Navigation - Now on left side */}
          <nav className="hidden md:flex items-center space-x-8 ml-10">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.hasDropdown ? (
                  <button
                    className={`text-sm font-medium transition-colors duration-200 flex items-center space-x-1 ${
                      isActive(item.href)
                        ? 'text-gray-900 font-semibold'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <span>{item.name}</span>
                    <ChevronDown size={16} className="transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-gray-900 font-semibold'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
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
                      left: isHomePage ? '50%' : '-40px',
                      transform: isHomePage ? 'translateX(-50%)' : 'translateX(0%)',
                      width: item.name === 'Products' ? 'min(900px, calc(100vw - 2rem))' : 'min(400px, calc(100vw - 2rem))'
                    }}
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {item.name === 'Products' && (
                                            <div className="p-6 lg:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                          <Link to="/ai-sales-agent" className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-bold">AI</span>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">AI Agent for Sales</div>
                              <div className="text-sm text-gray-500 mt-1">Automated sales conversations</div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Lead Generation</span>
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">24/7 Support</span>
                              </div>
                            </div>
                          </Link>
                          
                          <Link to="/ai-social-media-manager" className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-bold">SM</span>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">AI Social Media Manager Agent</div>
                              <div className="text-sm text-gray-500 mt-1">Complete social media automation</div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Content Creation</span>
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Auto Scheduling</span>
                              </div>
                            </div>
                          </Link>
                          
                          <Link to="/ai-quote-generation-agent" className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-bold">QG</span>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">AI Quote Generation Agent</div>
                              <div className="text-sm text-gray-500 mt-1">Smart quote creation and automation</div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Auto Generation</span>
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">CRM Integration</span>
                              </div>
                            </div>
                          </Link>
                          
                          <Link to="/ai-invoice-generator-agent" className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-bold">IG</span>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">AI Invoice Generator Agent</div>
                              <div className="text-sm text-gray-500 mt-1">Professional invoice automation</div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Auto Billing</span>
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Tax Calculation</span>
                              </div>
                            </div>
                          </Link>
                          
                          <Link to="/improving-customer-experience" className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-bold">CX</span>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">Improving Customer Experience</div>
                              <div className="text-sm text-gray-500 mt-1">Enhanced customer interactions</div>
                            </div>
                          </Link>
                          
                          <Link to="/conversational-intelligence" className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-bold">CI</span>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">Conversational Intelligence</div>
                              <div className="text-sm text-gray-500 mt-1">Smart conversation analytics</div>
                            </div>
                          </Link>
                          
                          <Link to="#" className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-bold">PC</span>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">Personalize Chat Agent</div>
                              <div className="text-sm text-gray-500 mt-1">Customized chat experiences</div>
                            </div>
                          </Link>
                          
                          <Link to="#" className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-bold">AA</span>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">AI Automation Agency</div>
                              <div className="text-sm text-gray-500 mt-1">Complete automation solutions</div>
                            </div>
                          </Link>
                          
                          <Link to="#" className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-bold">AB</span>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">AI Agents for Business</div>
                              <div className="text-sm text-gray-500 mt-1">Enterprise AI solutions</div>
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

          {/* Desktop Actions - Only show for authenticated users */}
          {user && (
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={logout}
                className="text-sm font-medium transition-colors duration-200 text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md transition-colors duration-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-lg backdrop-blur-md"
          >
            <div className="px-4 py-4 space-y-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                        className={`flex items-center justify-between w-full text-base font-medium transition-colors duration-200 ${
                          isActive(item.href)
                            ? 'text-gray-900 font-semibold'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
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
                              className="block text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 py-1"
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
                      className={`block text-base font-medium transition-colors duration-200 ${
                        isActive(item.href)
                          ? 'text-gray-900 font-semibold'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile Actions - Only show for authenticated users */}
              {user && (
                <div className="pt-4 border-t border-gray-200 space-y-4">
                  <button
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                    className="block text-base font-medium transition-colors duration-200 text-gray-600 hover:text-gray-900"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header 