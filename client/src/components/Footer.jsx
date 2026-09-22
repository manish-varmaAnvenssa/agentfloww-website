import { Link } from 'react-router-dom'
import { FacebookLogo, LinkedinLogo, InstagramLogo, YoutubeLogo } from './Icons'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const solutions = [
    { name: 'Compare AI Solutions', href: '/compare' },
    { name: 'Measurable ROI', href: '/measurable-roi' },
    { name: 'AI Insights & Blogs', href: '/blogs' },
    { name: 'Live Demo', href: '/live-demo' },
  ]

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact Us', href: '/contact' },
  ]

  const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/agentflow15/', icon: FacebookLogo },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/agentflowwai/', icon: LinkedinLogo },
    { name: 'Instagram', href: 'https://www.instagram.com/agentfloww_?igsh=MWM1Y3hqbDV0ZXh2bQ==', icon: InstagramLogo },
    { name: 'YouTube', href: 'https://www.youtube.com/@AnvenssaAI', icon: YoutubeLogo },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-white relative overflow-hidden border-t border-white/5">
      {/* Decorative backdrop elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
          
          {/* Column 1: Company Logo & Description */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/images/logo/Agentflow white.svg" 
                alt="Agentflow Logo" 
                className="h-9 md:h-11 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Agentfloww is a next-generation AI solutions company founded in 2023. We transform manufacturing and enterprise operations through intelligent automation, AI agents, and smart digital systems, delivering scalable, future-ready outcomes.
            </p>
            {/* Stats row above social media logos */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 py-4 border-y border-white/10 w-full justify-center md:justify-start">
              <div className="text-center md:text-left">
                <span className="block text-xl font-bold text-white font-mono">2+</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold font-mono">Years Exp</span>
              </div>
              <div className="w-px h-8 bg-white/10 hidden sm:block self-center" />
              <div className="text-center md:text-left">
                <span className="block text-xl font-bold text-white font-mono">60+</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold font-mono">Projects</span>
              </div>
              <div className="w-px h-8 bg-white/10 hidden sm:block self-center" />
              <div className="text-center md:text-left">
                <span className="block text-xl font-bold text-white font-mono">30+</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold font-mono">Team</span>
              </div>
              <div className="w-px h-8 bg-white/10 hidden sm:block self-center" />
              <div className="text-center md:text-left">
                <span className="block text-xl font-bold text-white font-mono">9.5/10</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold font-mono">Satisfaction</span>
              </div>
            </div>
            {/* Social Media Icons */}
            <div className="flex space-x-3.5 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Empty spacer to center columns nicely on desktop */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Column 3: Solutions */}
          <div className="md:col-span-3 text-center md:text-left space-y-5">
            <h3 className="text-xs font-bold text-gray-200 uppercase tracking-widest">
              Solutions
            </h3>
            <ul className="space-y-3.5">
              {solutions.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="md:col-span-3 text-center md:text-left space-y-5">
            <h3 className="text-xs font-bold text-gray-200 uppercase tracking-widest">
              Company
            </h3>
            <ul className="space-y-3.5">
              {company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Trademark & Non-Affiliation Disclaimer */}
        <div className="border-t border-white/10 mt-12 pt-6">
          <p className="text-[11px] leading-relaxed text-gray-500 text-center md:text-left">
            <strong className="text-gray-400">Disclaimer:</strong> SAP®, Oracle®, Microsoft Dynamics®, NetSuite®, and Odoo® are registered trademarks or service marks of their respective owners. Agentfloww is an independent enterprise AI workflow software platform developed by Anvenssa AI and is not affiliated with, endorsed by, sponsored by, or associated with any of these trademark holders.
          </p>
        </div>

        {/* Separator Line */}
        <div className="border-t border-white/10 mt-6 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
          <p className="text-gray-400 text-xs font-medium">
            © {currentYear} Anvenssa AI. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              to="/privacy-policy"
              className="text-gray-400 hover:text-white text-xs font-medium transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <div className="hidden sm:block w-px h-3 bg-white/10"></div>
            <Link
              to="/refund-policy"
              className="text-gray-400 hover:text-white text-xs font-medium transition-colors duration-200"
            >
              Refund and Cancellation Policy
            </Link>
            <div className="hidden sm:block w-px h-3 bg-white/10"></div>
            <Link
              to="/terms-of-service"
              className="text-gray-400 hover:text-white text-xs font-medium transition-colors duration-200"
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