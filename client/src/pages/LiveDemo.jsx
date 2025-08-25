import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { ArrowLeft, Play, Users, Building, Mail, Send, CheckCircle } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { submitDemo } from '../utils/api'

const LiveDemo = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    console.log('Form data being submitted:', data)
    setIsSubmitting(true)
    try {
      console.log('Submitting demo to database...')
      const result = await submitDemo(data)
      console.log('Database response:', result)
      
      if (result.success) {
        setIsSubmitted(true)
        reset()
        toast.success('Demo request submitted successfully! We\'ll get back to you soon.')
      } else {
        toast.error(result.error || 'Failed to submit demo request')
      }
    } catch (error) {
      console.error('Demo submission error:', error)
      toast.error('Failed to submit demo request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const benefits = [
    {
      icon: Users,
      title: "Startups and growing companies",
      description: "are automating their workflows with our AI agents.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Building,
      title: "Backed by emerging industry support",
      description: "we're building our presence in the AI space.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Mail,
      title: "Anvenssa AI offers flexible, customizable AI solutions",
      description: "tailored for businesses on the rise.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Play,
      title: "Our focus is on making AI accessible and effective",
      description: "for businesses at every stage of growth.",
      color: "from-orange-500 to-red-500"
    }
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center relative z-10 bg-white/70 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Demo Request Submitted!
          </h1>
          <p className="text-gray-600 mb-8 max-w-md text-lg">
            Thank you for your interest! We'll contact you soon to schedule your personalized demo.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Request Another Demo
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Live Demo - Anvenssa.AI</title>
        <meta name="description" content="Schedule a personalized demo of Anvenssa.AI's AI-powered solutions. See how our agents can transform your business workflows." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
            >
              <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Home
            </Link>
          </div>
        </div>

        {/* Main Content Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50 mb-6">
                <Play size={16} className="text-blue-600 mr-2" />
                <span className="text-blue-600 font-medium text-sm">Live Demo</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Schedule a Live Demo
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Experience the power of Anvenssa AI firsthand! Schedule a personalized demo to see how our AI agents can transform your business workflows and boost productivity.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Benefits Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Anvenssa AI?</h2>
                  <div className="space-y-6">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={benefit.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                        className="flex items-start space-x-4"
                      >
                        <div className={`w-12 h-12 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                          <benefit.icon size={24} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                          <p className="text-gray-600">{benefit.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-6 border border-blue-200/50">
                  <p className="text-gray-700 text-center">
                    Not quite ready to schedule a call? Reach out to our team at{' '}
                    <a href="mailto:sales@anvenssa.com" className="text-blue-600 hover:text-blue-700 font-semibold">
                      sales@anvenssa.com
                    </a>{' '}
                    with any questions!
                  </p>
                </div>
              </motion.div>

              {/* Demo Request Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">SEE A DEMO</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Full Name Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      {...register('name', { required: 'Full name is required' })}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.name ? 'border-red-500 ring-red-200' : ''
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Work Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your@company.com"
                      {...register('email', { 
                        required: 'Work email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.email ? 'border-red-500 ring-red-200' : ''
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Company Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Company <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your company name"
                      {...register('company', { required: 'Company name is required' })}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.company ? 'border-red-500 ring-red-200' : ''
                      }`}
                    />
                    {errors.company && (
                      <p className="mt-2 text-sm text-red-600">{errors.company.message}</p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Your phone number"
                      {...register('phone', { required: 'Phone number is required' })}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.phone ? 'border-red-500 ring-red-200' : ''
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Industry Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Industry <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Technology, Healthcare, Finance"
                      {...register('industry', { required: 'Industry is required' })}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.industry ? 'border-red-500 ring-red-200' : ''
                      }`}
                    />
                    {errors.industry && (
                      <p className="mt-2 text-sm text-red-600">{errors.industry.message}</p>
                    )}
                  </div>

                  {/* Use Case Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Use Case <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      placeholder="Tell us about your business needs and what you'd like to see in the demo..."
                      rows={4}
                      {...register('use_case', { required: 'Use case description is required' })}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                        errors.use_case ? 'border-red-500 ring-red-200' : ''
                      }`}
                    />
                    {errors.use_case && (
                      <p className="mt-2 text-sm text-red-600">{errors.use_case.message}</p>
                    )}
                  </div>

                  {/* Preferred Date Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      {...register('preferred_date')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  {/* Preferred Time Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Preferred Time
                    </label>
                    <select
                      {...register('preferred_time')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select preferred time</option>
                      <option value="9:00 AM">9:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                      <option value="5:00 PM">5:00 PM</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Send size={18} className="mr-2" />
                        Submit Demo Request
                      </span>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default LiveDemo 