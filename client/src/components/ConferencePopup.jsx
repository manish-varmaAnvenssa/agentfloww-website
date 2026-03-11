import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, Phone, Globe, X } from 'lucide-react'

const ConferencePopup = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleCallClick = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`
  }

  const handleWebsiteClick = () => {
    window.open('https://www.agentfloww.com', '_blank')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-50"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 max-w-sm relative overflow-hidden">
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5 animate-gradient-xy"></div>
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200 z-10"
            >
              <X size={14} className="text-gray-600" />
            </button>

            {/* Floating Elements */}
            <motion.div 
              className="absolute top-4 right-12 w-2 h-2 bg-blue-500 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-8 left-4 w-1.5 h-1.5 bg-purple-500 rounded-full"
              animate={{ 
                y: [0, -8, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-4">
                <motion.div 
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-1 rounded-full border border-blue-100 mb-3"
                  animate={{ 
                    scale: isHovered ? 1.05 : 1
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-blue-700 font-semibold text-xs uppercase tracking-wide">
                    🚀 Live Event
                  </span>
                </motion.div>
                
                <h2 className="text-lg font-bold text-gray-900 leading-tight mb-2">
                  AI Business Conference 2025
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  The future of Enterprise AI begins here! Join leaders and innovators.
                </p>
              </div>

              {/* Event Details */}
              <div className="space-y-3 mb-4">
                <motion.div 
                  className="flex items-center space-x-3 p-2 bg-blue-50/50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <Calendar size={16} className="text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">November 11, 2025</div>
                    <div className="text-xs text-gray-600">Mark your calendar</div>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center space-x-3 p-2 bg-purple-50/50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <Clock size={16} className="text-purple-600 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">5:00 PM – 9:30 PM</div>
                    <div className="text-xs text-gray-600">Gulf Standard Time (UTC+4)</div>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start space-x-3 p-2 bg-green-50/50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <MapPin size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Grand Excelsior Hotel Deira</div>
                    <div className="text-xs text-gray-600">Al Muteena Street, Deira, Dubai, UAE</div>
                  </div>
                </motion.div>
              </div>

              {/* Contact Information */}
              <div className="space-y-2 mb-4">
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Register Now:</p>
                
                <motion.button 
                  onClick={() => handleCallClick('+971585254420')}
                  className="flex items-center space-x-3 w-full p-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all duration-200 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone size={16} className="text-white" />
                  <span className="text-white font-medium">+971 58 525 4420</span>
                </motion.button>

                <motion.button 
                  onClick={() => handleCallClick('+971559144211')}
                  className="flex items-center space-x-3 w-full p-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-lg transition-all duration-200 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone size={16} className="text-white" />
                  <span className="text-white font-medium">+971 55 914 4211</span>
                </motion.button>

                <motion.button 
                  onClick={handleWebsiteClick}
                  className="flex items-center justify-center space-x-3 w-full p-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 rounded-lg transition-all duration-200 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Globe size={16} className="text-white" />
                  <span className="text-white font-medium">www.agentfloww.com</span>
                </motion.button>
              </div>

              {/* Call to Action */}
              <motion.div 
                className="bg-gradient-to-r from-orange-50 to-red-50 p-3 rounded-lg border border-orange-200"
                animate={{ 
                  boxShadow: isHovered 
                    ? "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                    : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-xs font-semibold text-center text-orange-800 leading-relaxed">
                  🌟 Don't miss this opportunity to shape the future of intelligent business automation!
                </p>
              </motion.div>
            </div>

            {/* Animated Border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 opacity-20 blur-sm animate-pulse"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ConferencePopup