import { Link } from 'react-router-dom'
import { Facebook, Linkedin, Instagram, Twitter, Youtube } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const solutions = [
    { name: 'Compare AI Solutions', href: '/compare' },
    { name: 'Live Demo', href: '/live-demo' },
  ]

  const company = [
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact Us', href: '/contact' },
  ]

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook, bgColor: 'bg-blue-600' },
    { name: 'LinkedIn', href: '#', icon: Linkedin, bgColor: 'bg-blue-600' },
    { name: 'Instagram', href: '#', icon: Instagram, bgColor: 'bg-pink-500' },
    { name: 'Twitter', href: '#', icon: Twitter, bgColor: 'bg-black' },
    { name: 'YouTube', href: '#', icon: Youtube, bgColor: 'bg-red-600' },
  ]

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Company Logo */}
          <div className="sm:col-span-2 lg:col-span-2 text-center sm:text-left">
            <Link to="/" className="flex items-center justify-center sm:justify-start space-x-3 mb-4">
              <img 
                src="/images/logo/Agentflow Logo.png" 
                alt="Agentflow Logo" 
                className="h-10 md:h-12 w-auto"
              />
             
            </Link>
          </div>

          {/* Solutions */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Solutions
            </h3>
            <ul className="space-y-3">
              {solutions.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center lg:justify-end mt-8">
          <div className="flex space-x-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className={`${social.bgColor} w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity duration-200`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="border-t border-gray-800"></div>

      {/* Bottom Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-center text-center lg:text-left">
          <p className="text-gray-400 text-sm mb-4 lg:mb-0">
            ©{currentYear} Anvenssa AI. All Rights Reserved.
          </p>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6">
            <Link
              to="/privacy-policy"
              className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <div className="hidden sm:block w-px h-4 bg-gray-700"></div>
            <Link
              to="/refund-policy"
              className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              Refund and Cancellation Policy
            </Link>
            <div className="hidden sm:block w-px h-4 bg-gray-700"></div>
            <Link
              to="/terms-of-service"
              className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              Terms of Services
            </Link>
          </div>
        </div>
      </div>


    </footer>
  )
}

export default Footer 