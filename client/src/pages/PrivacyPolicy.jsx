import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, Shield, Eye, Lock, Users, Settings, Mail, FileText, Calendar, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      subtitle: "What data we gather and how we collect it",
      content: [
        {
          subtitle: "1.1 Personal Information",
          text: "We may collect personal information that you provide voluntarily when you use the Website. This information may include your name, email address, postal address, telephone number, and any other information you choose to provide."
        },
        {
          subtitle: "1.2 Usage Information",
          text: "We may collect non-personal information about how you interact with the Website. This information may include your IP address, browser type, operating system, referring URLs, and other anonymous statistical data."
        }
      ]
    },
    {
      icon: Settings,
      title: "Use of Information",
      subtitle: "How we utilize your information",
      content: [
        {
          subtitle: "2.1 Personal Information",
          text: "We may use your personal information to communicate with you, provide customer support, process your requests or transactions, improve our services, and personalize your experience on the Website."
        },
        {
          subtitle: "2.2 Usage Information",
          text: "We may use usage information to analyze trends, administer the Website, track users' movements, and gather demographic information for aggregate use. This information helps us improve the Website and deliver a better user experience."
        }
      ]
    },
    {
      icon: Lock,
      title: "Cookies and Similar Technologies",
      subtitle: "Our use of tracking technologies",
      content: [
        {
          text: "The Website may use cookies and similar technologies to enhance your browsing experience. These technologies help us collect usage information and remember your preferences. You have the option to disable cookies through your web browser settings, but please note that doing so may affect certain features or functionality of the Website."
        }
      ]
    },
    {
      icon: Users,
      title: "Third-Party Disclosure",
      subtitle: "How we handle data sharing",
      content: [
        {
          text: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this Privacy Policy. We may share your information with trusted third-party service providers who assist us in operating the Website, conducting our business, or servicing you, as long as they agree to keep your information confidential."
        }
      ]
    },
    {
      icon: Shield,
      title: "Data Security",
      subtitle: "How we protect your information",
      content: [
        {
          text: "We implement reasonable security measures to protect the confidentiality and integrity of your personal information. However, please be aware that no security system is impenetrable, and we cannot guarantee the security of your information."
        }
      ]
    }
  ]

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Agentflow</title>
        <meta name="description" content="Learn about how Agentflow protects your privacy and handles your personal information." />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
            <Link
              to="/"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
            >
                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="font-medium">Back to Home</span>
            </Link>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Shield size={16} className="text-white" />
                </div>
                <span className="text-sm text-gray-500 font-medium">Privacy Policy</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-blue-50 text-blue-700 rounded-full px-4 py-2 mb-6">
              <FileText size={16} className="mr-2" />
              <span className="text-sm font-medium">Legal Document</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Privacy Policy
              </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              This Privacy Policy describes how Agentflow collects, uses, and protects your personal information.
            </p>
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gray-50 rounded-xl p-8 mb-12 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Our website (the "Website") is committed to protecting your privacy. This Privacy Policy outlines the types of personal information we collect, how we use and protect it, and your rights regarding your personal information. By accessing or using the Website, you agree to the terms of this Privacy Policy.
            </p>
          </motion.div>

          {/* Policy Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                      <section.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                      <p className="text-gray-600 mt-1">{section.subtitle}</p>
                    </div>
                  </div>
                </div>
                
                <div className="px-8 py-8 bg-white">
                  <div className="space-y-6">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="border-l-4 border-blue-100 pl-6">
                        {item.subtitle && (
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.subtitle}</h3>
                        )}
                        <p className="text-gray-700 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Additional Sections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Links to Third-Party Websites</h2>
                <p className="text-gray-600 mt-1">External website policies</p>
              </div>
              <div className="px-8 py-8 bg-white">
                <div className="border-l-4 border-blue-100 pl-6">
                  <p className="text-gray-700 leading-relaxed">
                    The Website may contain links to third-party websites. We are not responsible for the privacy practices or the content of such websites. We encourage you to review the privacy policies of those third-party websites before providing any personal information.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Your Rights</h2>
                <p className="text-gray-600 mt-1">Your data protection rights</p>
              </div>
              <div className="px-8 py-8 bg-white">
                <div className="border-l-4 border-blue-100 pl-6">
                  <p className="text-gray-700 leading-relaxed">
                    You have the right to access, update, or delete your personal information that we hold. To exercise these rights, please contact us using the information provided below.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Changes to the Privacy Policy</h2>
                <p className="text-gray-600 mt-1">Policy updates and modifications</p>
              </div>
              <div className="px-8 py-8 bg-white">
                <div className="border-l-4 border-blue-100 pl-6">
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right to modify or update this Privacy Policy from time to time. Any changes will be effective upon posting the updated Privacy Policy on the Website. Your continued use of the Website after any modifications to the Privacy Policy constitutes your acceptance of those changes.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-blue-50 border border-blue-200 rounded-xl p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
                  <p className="text-gray-600 mt-1">Get in touch with our privacy team</p>
                </div>
              </div>
              <div className="border-l-4 border-blue-200 pl-6">
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at{' '}
                  <a 
                    href="mailto:Sales@agentflow.com" 
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 underline"
                  >
                    Sales@agentflow.com
                  </a>
                </p>
              </div>
            </motion.div>
            </div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-16 pt-8 border-t border-gray-200 text-center"
          >
            <p className="text-sm text-gray-500">
              This Privacy Policy may be updated from time to time.
            </p>
          </motion.div>
        </main>
      </div>
    </>
  )
}

export default PrivacyPolicy 