import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Users, 
  Mail, 
  BarChart3,
  Eye,
  MessageSquare
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../contexts/AuthContext'
import api from '../utils/api'

const Admin = () => {
  const { user } = useAuth()

  const { data: stats, isLoading } = useQuery({
    queryKey: 'admin-dashboard',
    queryFn: () => api.get('/admin/dashboard'),
    refetchInterval: 30000 // Refetch every 30 seconds
  })

  const quickActions = [
    {
      title: 'View Contacts',
      description: 'Manage contact submissions',
      icon: Mail,
      href: '/admin/contact',
      color: 'bg-warning-500',
      roles: ['admin']
    },
    {
      title: 'Manage Users',
      description: 'User management',
      icon: Users,
      href: '/admin/users',
      color: 'bg-error-500',
      roles: ['admin']
    },
    {
      title: 'Demo Requests',
      description: 'Manage demo requests',
      icon: MessageSquare,
      href: '/admin/demo',
      color: 'bg-info-500',
      roles: ['admin']
    }
  ]

  const filteredActions = quickActions.filter(action => 
    action.roles.includes(user?.role)
  )

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Debug: Log the stats data to see the structure
  console.log('Admin stats data:', stats)

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Anvenssa</title>
        <meta name="description" content="Admin dashboard for managing content and users." />
      </Helmet>

      <div>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Welcome back, {user?.username}!
            </h1>
            <p className="text-lg text-gray-600">
              Here's what's happening with your website today.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {stats?.data && (
                <>
                  <Link to="/admin/users">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="card hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group h-24 flex items-center"
                    >
                      <div className="flex items-center w-full">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-300 flex-shrink-0">
                          <Users className="w-6 h-6 text-primary-600" />
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="text-sm font-medium text-gray-600">Total Users</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {stats.data.stats?.users || 0}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </Link>

                  <Link to="/admin/contact">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="card hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group h-24 flex items-center"
                    >
                      <div className="flex items-center w-full">
                        <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center group-hover:bg-warning-200 transition-colors duration-300 flex-shrink-0">
                          <Mail className="w-6 h-6 text-warning-600" />
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {stats.data.stats?.contacts || 0}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </Link>

                  <Link to="/admin/demo">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="card hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group h-24 flex items-center"
                    >
                      <div className="flex items-center w-full">
                        <div className="w-12 h-12 bg-info-100 rounded-lg flex items-center justify-center group-hover:bg-info-200 transition-colors duration-300 flex-shrink-0">
                          <MessageSquare className="w-6 h-6 text-info-600" />
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="text-sm font-medium text-gray-600">Demo Requests</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {stats.data.stats?.demos || 0}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-2xl font-bold text-gray-900 mb-6"
            >
              Quick Actions
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {filteredActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="h-36"
                >
                  <Link
                    to={action.href}
                    className="card hover:shadow-lg transition-shadow duration-300 block h-full flex items-center"
                  >
                    <div className="flex items-center w-full">
                      <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="ml-4 flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 leading-tight">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Admin 