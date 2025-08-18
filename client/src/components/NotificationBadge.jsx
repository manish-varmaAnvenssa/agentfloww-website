import React from 'react'
import { motion } from 'framer-motion'

const NotificationBadge = ({ count, className = '' }) => {
  if (!count || count === 0) return null

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center font-medium ${className}`}
    >
      {count > 99 ? '99+' : count}
    </motion.div>
  )
}

export default NotificationBadge 