import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, ArrowRight, Star, Users, Award, BookOpen, Globe, Mail, Linkedin, Twitter, ChevronRight, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Agentflow</title>
        <meta name="description" content="Learn about Aditya, Global CX Champion and founder of Agentflow. Expert in Customer Experience Programs and IT Consulting." />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 group text-sm sm:text-base"
            >
              <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Home
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              {/* Left Side - Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6 sm:space-y-8 order-1"
              >
                <div className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium">
                  <Star size={14} className="mr-2" />
                  Global CX Champion
                </div>
                
                <div className="mb-16 sm:mb-20 lg:mb-32">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8 sm:mb-12">
                    Meet the Visionary Behind
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-2 sm:mt-3 mb-6 sm:mb-8">
                      Customer Experience AI Agents
                    </span>
                  </h1>
                </div>
                
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mt-6 sm:mt-8 mb-6 sm:mb-8">
                  Built CX program for many Fortune firms from Strategy to Implementation. Nowadays training many startup founders and CEOs in building new Customer Acquisition strategies in emerging world.
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600">1000+</div>
                    <div className="text-xs sm:text-sm text-gray-600">Companies Helped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-600">$7B+</div>
                    <div className="text-xs sm:text-sm text-gray-600">Sales Generated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-indigo-600">15</div>
                    <div className="text-xs sm:text-sm text-gray-600">Books Published</div>
                  </div>
                </div>
              </motion.div>

              {/* Right Side - Profile Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative order-2 flex justify-center lg:justify-end"
              >
                <div className="relative z-10">
                  <img
                    src="/images/Pictures/Aditya sir.png"
                    alt="Aditya - Global CX Champion"
                    className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:w-[450px] h-auto lg:h-[550px] object-cover rounded-2xl shadow-2xl object-top lg:ml-[90px]"
                    style={{ 
                      imageRendering: 'high-quality'
                    }}
                  />
                </div>
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Professional Journey
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                From Fortune 500 consulting to building successful software products, discover the path that shaped a Global CX Champion.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              {/* CX & Consulting */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 h-full border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 self-center sm:self-start">
                      <Users size={28} className="text-white sm:w-8 sm:h-8" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">CX & Consulting</h3>
                      <p className="text-blue-600 font-medium text-sm sm:text-base">Customer Experience Programs</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
                    <p>Built CX program for many Fortune firms from Strategy to Implementation. Nowadays training many startup founders and CEOs in building new Customer Acquisition strategies in emerging world.</p>
                    <p>Helped more than 1000 mid size as well as Fortune 30 companies innovate through Customer Experience Programs!</p>
                    <p>Built large consulting business for companies like SIEBEL, Oracle, PwC and Nitai Partners. Sold more than $7b of Consulting and Software License sales in my career.</p>
                  </div>
                </div>
              </motion.div>

              {/* IT & Software Development */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 sm:p-8 h-full border border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 self-center sm:self-start">
                      <Award size={28} className="text-white sm:w-8 sm:h-8" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">IT & Software</h3>
                      <p className="text-green-600 font-medium text-sm sm:text-base">Product Development & Leadership</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
                    <p>Led large and medium sized companies in IT Consulting and Software Product development industry. Conceptualized, Designed and launched many successful software products.</p>
                    <p>Built large sales and delivery teams from start. CEO for large and medium sized IT consulting firms.</p>
                    <p>Currently helping companies globally to build up operations and international sales teams.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Author Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-blue-600/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              {/* Left Side - Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6 sm:space-y-8 order-2 lg:order-1"
              >
                <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border border-white/20">
                  <BookOpen size={14} className="mr-2" />
                  Sattology Creator
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Indian American Author with an independent centrist, and Vedic viewpoint
                </h2>
                
                <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-200 leading-relaxed">
                  <p>Widely acclaimed author of 15 books on Sattology. An Avid Golfer! Creator of the word 'Sattology' as a true antonym of Mythology.</p>
                  <p>Training and mentoring executives and teams in Strategic Mindset, Customer Acquisition Strategies, Customer Management Strategies and Teamwork.</p>
                </div>
              </motion.div>

              {/* Right Side - Visual Elements */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative order-1 lg:order-2"
              >
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
                      <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">15</div>
                      <div className="text-white/80 text-sm sm:text-base">Books Published</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
                      <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">1000+</div>
                      <div className="text-white/80 text-sm sm:text-base">Companies Helped</div>
                    </div>
                  </div>
                  <div className="space-y-4 sm:space-y-6 pt-8 sm:pt-12">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
                      <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2">$7B+</div>
                      <div className="text-white/80 text-sm sm:text-base">Sales Generated</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
                      <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2">95+</div>
                      <div className="text-white/80 text-sm sm:text-base">Languages</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 sm:space-y-8"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                Ready to Transform
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Your Business?
                </span>
              </h2>
              
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                Let's discuss how we can help you build exceptional customer experiences and drive growth through innovative AI solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
                <Link
                  to="/live-demo"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-sm sm:text-base"
                >
                  Get in Touch
                  <ArrowRight size={18} className="ml-2" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
                >
                  Contact Us
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default About
