import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowLeft, MessageCircle, Clock, Globe } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { submitContact, sendOtp, verifyOtp } from '../utils/api'
import { validatePhoneNumber, validateEmail, preventNonPhoneChars, validatePhoneDigits, countryCodes } from '../utils/validation'

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  // OTP States
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isOtpSending, setIsOtpSending] = useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
  const [verifiedEmail, setVerifiedEmail] = useState('')

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleSendOtp = async (email) => {
    const isEmailValid = validateEmail(email);
    if (isEmailValid !== true) {
      toast.error(isEmailValid || 'Please enter a valid email address');
      return;
    }

    setIsOtpSending(true);
    try {
      const result = await sendOtp(email);
      if (result.success) {
        setIsOtpSent(true);
        setCooldown(60);
        toast.success('Verification code sent to your email!');
        if (result.mockOtp) {
          console.log(`[Local Dev] Verification Code: ${result.mockOtp}`);
          toast(`[Local Dev] Code is: ${result.mockOtp}`, { icon: '🔑', duration: 8000 });
        }
      } else {
        toast.error(result.error || 'Failed to send verification code');
      }
    } catch (error) {
      toast.error('Failed to send verification code. Please try again.');
    } finally {
      setIsOtpSending(false);
    }
  }

  const handleVerifyOtp = async (email, otpCode) => {
    if (!otpCode || otpCode.length < 6) {
      toast.error('Please enter a 6-digit verification code');
      return;
    }

    setIsVerifyingOtp(true);
    try {
      const result = await verifyOtp(email, otpCode);
      if (result.success) {
        setIsEmailVerified(true);
        setVerifiedEmail(email);
        toast.success('Email verified successfully!');
      } else {
        toast.error(result.error || 'Invalid or expired verification code');
      }
    } catch (error) {
      toast.error('Failed to verify verification code. Please try again.');
    } finally {
      setIsVerifyingOtp(false);
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    if (!isEmailVerified || data.email !== verifiedEmail) {
      toast.error('Please verify your email address first.');
      return;
    }
    
    console.log('=== CONTACT FORM SUBMISSION ===');
    console.log('Form data:', data);
    
    setIsSubmitting(true)
    try {
      // Combine firstName and lastName into name
      const formData = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: `${data.countryCode} ${data.phoneDigits}`,
        company: data.company,
        subject: `Contact from ${data.firstName} ${data.lastName}`,
        message: data.message
      }
      
      console.log('Sending form data to database:', formData);
      console.log('Submitting contact to database...');
      
      const result = await submitContact(formData)
      console.log('Database response:', result);
      
      if (result.success) {
        setIsSubmitted(true)
        reset()
        setIsEmailVerified(false)
        setIsOtpSent(false)
        setVerifiedEmail('')
        toast.success('Message sent successfully! We\'ll get back to you soon.')
      } else {
        toast.error(result.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('=== CONTACT FORM ERROR ===');
      console.error('Error object:', error);
      console.error('Error message:', error.message);
      
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'aditya@agentfloww.com',
      href: 'mailto:aditya@agentfloww.com',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: 'India: +91 8956512955 | UAE: +971 58 525 4420',
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
      title: 'US Office',
      address: '3722 Valley Vista Fork,',
      city: 'Bonita, CA 91902, USA',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: MapPin,
      title: 'India Office',
      address: 'Awfis Binarius, Deepak Nitrate Road, Shastrinagar, Yerawada, Pune, Maharashtra 411006',
      city: '',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: MapPin,
      title: 'Dubai U.A.E Office',
      address: '2805-36, Level 28 Marina Plaza, Dubai Marina',
      city: 'Dubai U.A.E.',
      color: 'from-indigo-500 to-purple-500'
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
        <title>Contact Us - Agentfloww</title>
        <meta name="description" content="Get in touch with the Agentfloww team. We're here to help you build amazing AI-powered digital experiences." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
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
                <span className="text-blue-600 font-medium text-sm">Contact Agentfloww</span>
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

                  {/* Email Field with OTP */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          id="email-input"
                          type="email"
                          placeholder="your@email.com"
                          disabled={isEmailVerified}
                          {...register('email', { 
                            required: 'Email is required',
                            validate: validateEmail
                          })}
                          className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            isEmailVerified ? 'bg-gray-50 border-green-300 text-gray-500' : ''
                          } ${errors.email ? 'border-red-500 ring-red-200' : ''}`}
                        />
                      </div>
                      {!isEmailVerified && (
                        <button
                          type="button"
                          disabled={isOtpSending || cooldown > 0}
                          onClick={() => {
                            const emailVal = document.getElementById('email-input')?.value;
                            handleSendOtp(emailVal);
                          }}
                          className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 whitespace-nowrap shadow ${
                            cooldown > 0 
                              ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          {isOtpSending ? 'Sending...' : cooldown > 0 ? `Resend (${cooldown}s)` : 'Send Code'}
                        </button>
                      )}
                    </div>
                    {isEmailVerified && (
                      <p className="mt-2 text-sm text-green-600 flex items-center gap-1.5 font-semibold">
                        <CheckCircle size={16} /> Email verified successfully
                      </p>
                    )}
                    {errors.email && !isEmailVerified && (
                      <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                    )}

                    {/* OTP Code Input */}
                    {isOtpSent && !isEmailVerified && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl"
                      >
                        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                          Enter 6-Digit Code
                        </label>
                        <div className="flex gap-2">
                          <input
                            id="otp-input"
                            type="text"
                            maxLength={6}
                            placeholder="123456"
                            {...register('otp_code')}
                            className="w-1/3 px-4 py-2.5 border border-gray-300 rounded-xl text-center font-mono text-lg tracking-widest focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          />
                          <button
                            type="button"
                            disabled={isVerifyingOtp}
                            onClick={() => {
                              const emailVal = document.getElementById('email-input')?.value;
                              const codeVal = document.getElementById('otp-input')?.value;
                              handleVerifyOtp(emailVal, codeVal);
                            }}
                            className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-sm transition-all shadow"
                          >
                            {isVerifyingOtp ? 'Verifying...' : 'Verify Code'}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        {...register('countryCode')}
                        className="w-1/3 px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                      >
                        {countryCodes.map(c => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.code} ({c.name})
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        placeholder="Phone Number (e.g. 9876543210)"
                        {...register('phoneDigits', { 
                          required: 'Phone number digits are required',
                          validate: (val, formValues) => validatePhoneDigits(val, formValues.countryCode)
                        })}
                        onKeyPress={preventNonPhoneChars}
                        className={`flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          errors.phoneDigits ? 'border-red-500 ring-red-200' : ''
                        }`}
                      />
                    </div>
                    {errors.phoneDigits && (
                      <p className="mt-2 text-sm text-red-600">{errors.phoneDigits.message}</p>
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
                    disabled={isSubmitting || !isEmailVerified}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
                  {!isEmailVerified && (
                    <p className="text-center text-xs text-slate-500 mt-3 font-semibold">
                      Please verify your email address to enable form submission.
                    </p>
                  )}
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
                          {item.title === 'Call Us' ? (
                            <div className="flex flex-col space-y-1 text-gray-600 text-sm sm:text-base">
                              <a href="tel:+918956512955" className="hover:text-blue-600 transition-colors font-medium">
                                India: +91 8956512955
                              </a>
                              <a href="tel:+971585254420" className="hover:text-blue-600 transition-colors font-medium">
                                UAE: +971 58 525 4420
                              </a>
                            </div>
                          ) : item.href && item.href !== '#' ? (
                            <a href={item.href} className="text-gray-600 hover:text-blue-600 transition-colors text-sm sm:text-base font-medium">
                              {item.content}
                            </a>
                          ) : (
                            <p className="text-gray-600 text-sm sm:text-base">{item.content}</p>
                          )}
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