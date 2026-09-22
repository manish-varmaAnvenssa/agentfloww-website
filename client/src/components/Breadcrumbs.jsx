import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { House, CaretRight } from './Icons'

const Breadcrumbs = () => {
  const location = useLocation()
  
  // Don't show breadcrumbs on homepage
  if (location.pathname === '/') return null

  // Split paths and remove empty strings
  const pathnames = location.pathname.split('/').filter((x) => x)

  // Map of routes to user-friendly names
  const routeNames = {
    about: 'About Us',
    pricing: 'Pricing',
    contact: 'Contact Us',
    compare: 'Compare Solutions',
    blogs: 'Blogs',
    'live-demo': 'Live Demo',
    'measurable-roi': 'Measurable ROI',
    'built-erp-native': 'Built ERP-Native',
    'privacy-policy': 'Privacy Policy',
    'refund-policy': 'Refund Policy',
    'terms-of-service': 'Terms of Service',
  }

  const formatName = (path) => {
    if (routeNames[path]) return routeNames[path]
    // Fallback formatting: capitalize words, replace hyphens
    return path
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
  }

  return (
    <div className="bg-slate-50/70 border-b border-gray-150 py-3 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-2 text-xs font-semibold text-gray-500 font-sans">
          <Link
            to="/"
            className="flex items-center hover:text-indigo-650 transition-colors duration-200"
          >
            <House size={14} className="mr-1.5" />
            <span>Home</span>
          </Link>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`
            const isLast = index === pathnames.length - 1

            return (
              <React.Fragment key={to}>
                <CaretRight size={12} className="text-gray-400 mx-1 flex-shrink-0" />
                {isLast ? (
                  <span className="text-gray-900 font-extrabold truncate">{formatName(value)}</span>
                ) : (
                  <Link
                    to={to}
                    className="hover:text-indigo-650 transition-colors duration-200 truncate"
                  >
                    {formatName(value)}
                  </Link>
                )}
              </React.Fragment>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default Breadcrumbs
