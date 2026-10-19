import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X, ChevronDown } from './Icons'
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
      name: 'Products', 
      href: '/products',
      hasDropdown: true,
      dropdownItems: [
        { name: 'AI Agent Platform', href: '/products/ai-agent-platform' },
        { name: 'SAP AI Agent', href: '/products/sap-ai-agent' },
        { name: 'AI ERP Automation for Manufacturing', href: '/products/ai-erp-automation-for-manufacturing' },
        { name: 'Manufacturing AI Software', href: '/products/manufacturing-ai-software' },
        { name: 'Browser AI Agent', href: '/products/browser-ai-agent' },
        { name: 'Autonomous AI Agents', href: '/products/autonomous-ai-agents' },
        { name: 'RPA AI Agent', href: '/products/rpa-ai-agent' }
      ]
    },
    { name: 'About Us', href: '/about' },
    { name: 'Blogs', href: '/blogs' },
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
          className="h-12 md:h-14 w-auto mt-1"
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
                      <div className="p-6 lg:p-8 flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-3">
                            {item.dropdownItems.map((dropdownItem) => (
                              <Link 
                                key={dropdownItem.name}
                                to={dropdownItem.href} 
                                className="flex items-start p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                              >
                                <div className="font-bold text-gray-900 text-base">{dropdownItem.name}</div>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-6 pt-6 border-t border-gray-100">
                            <Link 
                              to="/products" 
                              className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                            >
                              View all products 
                              <span aria-hidden="true">&rarr;</span>
                            </Link>
                          </div>
                        </div>
                        {/* Right-side promo card */}
                        <div className="w-full md:w-64 bg-slate-50 rounded-xl p-6 border border-slate-100 flex flex-col justify-between">
                          <div>
                            <h3 className="font-bold text-gray-900 mb-2">Book a Discovery Session</h3>
                            <p className="text-sm text-gray-600 mb-4">
                              Map the right automation approach for your workflows during a discovery session.
                            </p>
                          </div>
                          <Link 
                            to="/contact?product=discovery-session"
                            className="bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors text-center"
                          >
                            Book Session
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
            {isMenuOpen ? <X size={24} /> : <List size={24} />}
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