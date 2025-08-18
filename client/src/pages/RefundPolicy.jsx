import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, Shield, CreditCard, Clock, CheckCircle, AlertCircle, FileText, Calendar, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'

const RefundPolicy = () => {
  const sections = [
    {
      icon: CreditCard,
      title: "Refund Process",
      subtitle: "How refunds are processed and credited",
      content: [
        {
          text: "Refund will be credited to the same mode of payment within 10 working days."
        }
      ]
    },
    {
      icon: Clock,
      title: "Processing Time",
      subtitle: "Timeline for refund processing",
      content: [
        {
          text: "All refunds are processed within 10 working days from the date of cancellation or refund request approval."
        }
      ]
    },
    {
      icon: CheckCircle,
      title: "Eligibility",
      subtitle: "When refunds are available",
      content: [
        {
          text: "Refunds are available for eligible purchases based on our terms of service and the specific circumstances of your request."
        }
      ]
    }
  ]

  return (
    <>
      <Helmet>
        <title>Refund and Cancellation Policy - Agentflow</title>
        <meta name="description" content="Learn about Agentflow's refund and cancellation policies, processing times, and eligibility criteria." />
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
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <CreditCard size={16} className="text-white" />
                </div>
                <span className="text-sm text-gray-500 font-medium">Refund Policy</span>
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
            <div className="inline-flex items-center bg-green-50 text-green-700 rounded-full px-4 py-2 mb-6">
              <FileText size={16} className="mr-2" />
              <span className="text-sm font-medium">Policy Document</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Refund and Cancellation Policy
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Clear guidelines on refunds, cancellations, and processing times for Agentflow services.
            </p>
          </motion.div>

          {/* Main Policy Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-green-50 rounded-xl p-8 mb-12 border border-green-200"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                <RotateCcw size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Refund Policy</h2>
                <p className="text-gray-600 mt-1">Our commitment to fair refund processing</p>
              </div>
            </div>
            <div className="border-l-4 border-green-200 pl-6">
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
                Refund will be credited to the same mode of payment within 10 working days.
              </p>
            </div>
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
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-4">
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
                      <div key={itemIndex} className="border-l-4 border-green-100 pl-6">
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

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Important Notes</h2>
                <p className="text-gray-600 mt-1">Additional information about refunds</p>
              </div>
              <div className="px-8 py-8 bg-white">
                <div className="space-y-4">
                  <div className="border-l-4 border-green-100 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Working Days</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Working days exclude weekends and public holidays. Refunds are processed during business hours.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-100 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Method</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Refunds are processed to the original payment method used for the transaction.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-green-50 border border-green-200 rounded-xl p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                  <AlertCircle size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Need Help?</h2>
                  <p className="text-gray-600 mt-1">Contact our support team</p>
                </div>
              </div>
              <div className="border-l-4 border-green-200 pl-6">
                <p className="text-gray-700 leading-relaxed">
                  If you have questions about refunds or need to request a refund, please contact us at{' '}
                  <a 
                    href="mailto:Sales@agentflow.com" 
                    className="text-green-600 hover:text-green-700 font-semibold transition-colors duration-200 underline"
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
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-16 pt-8 border-t border-gray-200 text-center"
          >
            <p className="text-sm text-gray-500">
              This Refund and Cancellation Policy may be updated from time to time.
            </p>
          </motion.div>
        </main>
      </div>
    </>
  )
}

export default RefundPolicy 