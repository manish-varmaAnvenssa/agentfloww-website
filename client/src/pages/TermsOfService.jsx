import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, Shield, FileText, Calendar, CheckCircle, AlertTriangle, Scale, Users, CreditCard, Package, Gavel } from 'lucide-react'
import { Link } from 'react-router-dom'

const TermsOfService = () => {
  const sections = [
    {
      icon: Users,
      title: "Definitions and Terminology",
      subtitle: "Understanding the terms used in this agreement",
      content: [
        {
          text: "The following terminology applies to these Terms and Conditions, Privacy Statement, and Disclaimer Notice, and any or all Agreements: \"Client,\" \"You,\" and \"Your\" refers to you, the person accessing this website and accepting the Company's terms and conditions. \"Company,\" \"AgentFlow,\" \"Ourselves,\" \"We,\" and \"Us,\" refers to agentflow, which operates the website agentflow.in . \"Party,\" \"Parties,\" or \"Us,\" refers to both the Client and ourselves, or either the Client or ourselves. All terms refer to the offer, acceptance, and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner, whether by formal meetings of a fixed duration, or any other means, for the express purpose of meeting the Client's needs in respect of the provision of the Company's stated services/products, in accordance with and subject to prevailing Indian Law. Any use of the above terminology or other words in the singular, plural, capitalization, and/or he/she or they, are taken as interchangeable and therefore as referring to the same."
        }
      ]
    },
    {
      icon: AlertTriangle,
      title: "Disclaimer",
      subtitle: "Exclusions and limitations of liability",
      content: [
        {
          text: "The information on this website is provided on an \"as is\" basis. To the fullest extent permitted by law, this Company excludes all representations and warranties relating to this website and its contents or which is or may be provided by any affiliates or any other third party, including in relation to any inaccuracies or omissions in this website and/or the Company's literature; and excludes all liability for damages arising out of or in connection with your use of this website. This includes, without limitation, direct loss, loss of business or profits (whether or not the loss of such profits was foreseeable, arose in the normal course of things, or you have advised this Company of the possibility of such potential loss), damage caused to your computer, computer software, systems and programs, and the data thereon, or any other direct or indirect, consequential, and incidental damages."
        },
        {
          text: "The above exclusions and limitations apply only to the extent permitted by law. None of your statutory rights as a consumer are affected."
        }
      ]
    },
    {
      icon: Package,
      title: "Scope of Services",
      subtitle: "Services provided by Agentflow",
      content: [
        {
          subtitle: "1. Shipment Handling",
          text: "Agentflow or Agentflow's Logistics Partner shall pick up shipments from client locations as communicated during shipment booking. Tracking numbers and logistics partners will be assigned by an automated process. Clients must print and prominently display the shipping label on the shipment box. The Client must hand over the shipment to the Logistic Partner mentioned on the shipping label. Proper tamper-proof packing of shipments must be ensured by the Client to prevent damage during transit."
        },
        {
          subtitle: "2. Cash on Delivery (COD)",
          text: "For shipments booked under COD, Agentflow's logistics partner shall collect cash from the consignee and remit it to Agentflow. Agentflow will then reimburse the amount to the Client. (Details are provided in the COD section.)"
        },
        {
          subtitle: "3. Indemnity and Compliance",
          text: "Clients shall indemnify agentflow against duties, taxes, Octroi, cess, clearance charges, and other levies on shipments. Such charges levied by government authorities will be claimed from the Client against challans or receipts. The Client is solely responsible for complying with all statutory requirements (State and Central Laws/Statutes) related to shipment booking, sale, and transportation. Agentflow acts as a service provider and does not assume roles such as Seller, Retailer, Stockist, or Distributor. Activities performed by agentflow are based solely on the Client's instructions."
        },
        {
          subtitle: "4. Online Tracking Solutions",
          text: "Agentflow and its logistics partners provide web-based tracking solutions for all shipments."
        },
        {
          subtitle: "5. Air Waybill (AWB)",
          text: "The AWB shall identify the Client as the Consignor/Shipper, not the original shipper or Agentflow's customer. Agentflow's liability, if any, extends only to the Client."
        },
        {
          subtitle: "6. Prohibited and Restricted Items",
          text: "Clients must ensure no prohibited or restricted items are handed over for shipment. Prohibited items include hazardous substances, live creatures, obscene materials, and any items in violation of applicable laws."
        }
      ]
    },
    {
      icon: Shield,
      title: "Client Obligations",
      subtitle: "Responsibilities of the client",
      content: [
        {
          subtitle: "1. Packing and Handover",
          text: "Ensure proper, tamper-proof, and damage-proof packing of products. Be ready with packed orders during courier pickup. Use only the automated system for generating pickups. Ensure invoices are properly inserted and pasted on the package."
        },
        {
          subtitle: "2. Registered Locations",
          text: "Pickups will only be made from registered locations."
        },
        {
          subtitle: "3. Security and Indemnity",
          text: "Maintain security procedures for all shipments. Indemnify agentflow or its logistics partners in case of any security breaches by the Client or its associates."
        },
        {
          subtitle: "4. Reverse Pickup",
          text: "Reverse pickups are the Client's responsibility and are chargeable as mentioned in the proposal."
        },
        {
          subtitle: "5. Compliance",
          text: "Clients must not hand over banned, illegal, or restricted items. Inform agentflow within 5 days of any billing disputes."
        }
      ]
    },
    {
      icon: CreditCard,
      title: "Terms of Payment",
      subtitle: "Payment methods and security",
      content: [
        {
          subtitle: "1. Security",
          text: "Clients must safeguard credentials such as passwords and financial information. Inform agentflow immediately in case of theft or loss."
        },
        {
          subtitle: "2. Payment Methods",
          text: "Payments can be made via cheques, credit cards, debit cards, UPI, and net banking through ParcelGuru's payment gateway. Legal action may be initiated in cases of fraudulent or non-payment."
        },
        {
          subtitle: "3. Fees and Penalties",
          text: "Fees will be communicated during account creation or changes and can be reviewed in the Client's account. Penalties may be imposed for issues such as late payments, excessive tickets, or incorrect data."
        },
        {
          subtitle: "4. Return to Origin (RTO)",
          text: "RTO fees equal forward shipping charges, effectively doubling the cost for RTO shipments."
        },
        {
          subtitle: "5. Cash on Delivery (COD)",
          text: "COD services are chargeable. Successfully delivered COD orders incur Shipping Fee + COD Fee, while returned COD orders incur double the shipping fee. Remittances are done on a T+7 basis unless enrolled in an Early COD Remittance program. COD remittance may be temporarily held for accounts at risk of becoming negative."
        }
      ]
    },
    {
      icon: Gavel,
      title: "Prohibited Articles",
      subtitle: "Items that cannot be shipped",
      content: [
        {
          text: "Prohibited items include obscene materials, hazardous substances, live creatures, firearms, dangerous goods, and certain restricted items like jewelry and foodstuff."
        }
      ]
    }
  ]

  return (
    <>
      <Helmet>
        <title>Terms of Services - Agentflow</title>
        <meta name="description" content="Read Agentflow's terms of service, including definitions, scope of services, client obligations, payment terms, and prohibited articles." />
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
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Scale size={16} className="text-white" />
                </div>
                <span className="text-sm text-gray-500 font-medium">Terms of Service</span>
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
            <div className="inline-flex items-center bg-purple-50 text-purple-700 rounded-full px-4 py-2 mb-6">
              <FileText size={16} className="mr-2" />
              <span className="text-sm font-medium">Legal Agreement</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Terms of Services
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Comprehensive terms and conditions governing the use of Agentflow services.
            </p>
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-purple-50 rounded-xl p-8 mb-12 border border-purple-200"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              In using this website, you are deemed to have read and agreed to the following terms and conditions:
            </p>
          </motion.div>

          {/* Terms Sections */}
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
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
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
                      <div key={itemIndex} className="border-l-4 border-purple-100 pl-6">
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

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-purple-50 border border-purple-200 rounded-xl p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <AlertTriangle size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Questions?</h2>
                  <p className="text-gray-600 mt-1">Contact our legal team</p>
                </div>
              </div>
              <div className="border-l-4 border-purple-200 pl-6">
                <p className="text-gray-700 leading-relaxed">
                  If you have questions about these terms of service, please contact us at{' '}
                  <a 
                    href="mailto:Sales@agentflow.com" 
                    className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200 underline"
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
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-16 pt-8 border-t border-gray-200 text-center"
          >
            <p className="text-sm text-gray-500">
              These Terms of Service may be updated from time to time.
            </p>
          </motion.div>
        </main>
      </div>
    </>
  )
}

export default TermsOfService 