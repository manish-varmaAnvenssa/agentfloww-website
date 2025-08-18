import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowLeft, MessageCircle, Clock, Globe } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import api from '../utils/api'

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    console.log('=== CONTACT FORM SUBMISSION ===');
    console.log('Form data:', data);
    
    setIsSubmitting(true)
    try {
      // Combine firstName and lastName into name
      const formData = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        company: data.company,
        message: data.message
      }
      
      console.log('Sending form data to backend:', formData);
      console.log('Making API call to /contact...');
      
      const response = await api.post('/contact', formData)
      console.log('API response:', response);
      
      setIsSubmitted(true)
      reset()
      toast.success('Message sent successfully! We\'ll get back to you soon.')
    } catch (error) {
      console.error('=== CONTACT FORM ERROR ===');
      console.error('Error object:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      
      let message = 'Failed to send message';
      
      if (error.response?.status === 400) {
        // Validation error
        const validationErrors = error.response.data.errors;
        if (validationErrors && validationErrors.length > 0) {
          const firstError = validationErrors[0];
          message = `${firstError.path}: ${firstError.msg}`;
          console.log('Validation error details:', firstError);
        } else {
          message = error.response.data.message || 'Invalid form data';
        }
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      }
      
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'sales@anvenssa.com',
      href: 'mailto:sales@anvenssa.com',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+91 8956512955',
      href: 'tel:+918956512955',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Mon - Fri, 10:00-7:00',
      href: '#',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const officeLocations = [
    {
      icon: MapPin,
      title: 'India Office',
      address: '91Springboard Sky Loft, Creaticity Mall, Off, Airport Rd, opposite Golf Course, Shastrinagar, Yerawada, Pune, Maharashtra 411006',
      city: '',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: MapPin,
      title: 'Dubai U.A.E Office',
      address: '2805-36, Level 28 Marina Plaza, Dubai Marina',
      city: 'Dubai U.A.E.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: MapPin,
      title: 'UK Office',
      address: '53 Kenilworth Road, Ashford',
      city: 'TW15 3EN, United Kingdom',
      color: 'from-yellow-500 to-orange-500'
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
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Thank you for your message!
          </h1>
          <p className="text-gray-600 mb-8 max-w-md text-lg">
            We've received your message and will get back to you within 24 hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Send Another Message
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Contact Us - Anvenssa.AI</title>
        <meta name="description" content="Get in touch with the Anvenssa.AI team. We're here to help you build amazing AI-powered digital experiences." />
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
                <MessageCircle size={16} className="text-blue-600 mr-2" />
                <span className="text-blue-600 font-medium text-sm">Contact Anvenssa.AI</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Ready to transform your business with AI? Let's start a conversation about how we can help you achieve your goals.
              </p>
            </motion.div>

            {/* Contact Form and Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Send us a Message
                </h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Fields */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First"
                        {...register('firstName', { required: 'First name is required' })}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          errors.firstName ? 'border-red-500 ring-red-200' : ''
                        }`}
                      />
                      <input
                        type="text"
                        placeholder="Last"
                        {...register('lastName', { required: 'Last name is required' })}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          errors.lastName ? 'border-red-500 ring-red-200' : ''
                        }`}
                      />
                    </div>
                    {(errors.firstName || errors.lastName) && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.firstName?.message || errors.lastName?.message}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      {...register('email', { 
                        required: 'Email is required',
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

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 1234567890"
                      {...register('phone', { required: 'Phone number is required' })}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.phone ? 'border-red-500 ring-red-200' : ''
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Company Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Company <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your Company Name"
                      {...register('company', { required: 'Company name is required' })}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.company ? 'border-red-500 ring-red-200' : ''
                      }`}
                    />
                    {errors.company && (
                      <p className="mt-2 text-sm text-red-600">{errors.company.message}</p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      placeholder="Tell us about your project..."
                      rows={6}
                      {...register('message', { required: 'Message is required' })}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                        errors.message ? 'border-red-500 ring-red-200' : ''
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Send size={18} className="mr-2" />
                        Send Message
                      </span>
                    )}
                  </button>
                </form>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20"
              >
                {/* Office Locations */}
                <div className="mb-8">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 mr-4">
                      <MapPin size={24} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Our Global Offices</h3>
                  </div>
                  <div className="space-y-6">
                    {officeLocations.map((office, index) => (
                      <motion.div
                        key={office.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                        className="flex items-start space-x-4"
                      >
                        <div className="w-10 h-10 flex-shrink-0"></div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">{office.title}</h4>
                          <p className="text-gray-600">{office.address}</p>
                          <p className="text-gray-600">{office.city}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-8"></div>

                {/* Contact Info */}
                <div className="space-y-0">
                  {contactInfo.map((item, index) => (
                    <div key={item.title}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                        className="flex items-start space-x-4 py-6"
                      >
                        <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          <item.icon size={24} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600">{item.content}</p>
                        </div>
                      </motion.div>
                      {/* Add divider after each item except the last one */}
                      {index < contactInfo.length - 1 && (
                        <div className="border-t border-gray-200"></div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Contact 