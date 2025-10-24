import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../contexts/AuthContext'
import { useLocation, Navigate, useNavigate } from 'react-router-dom'
import { validateEmail } from '../utils/validation'

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login, user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // If user is already logged in, redirect to admin dashboard
  if (user) {
    return <Navigate to="/admin" replace />
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      console.log('Attempting login with:', data.email)
      const result = await login(data.email, data.password)
      console.log('Login result:', result)
      if (result.success) {
        // Redirect to the intended page or admin dashboard
        const from = location.state?.from?.pathname || '/admin'
        console.log('Redirecting to:', from)
        navigate(from)
      }
    } catch (error) {
      console.error('Login error:', error)
      // Error handling is done in the auth context
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Admin Login - Anvenssa</title>
        <meta name="description" content="Admin login for Anvenssa website management." />
      </Helmet>

      <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="text-white" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Access
            </h2>
            <p className="text-gray-600">
              Sign in to manage your website content
            </p>
          </div>

          {/* Form */}
          <div className="card">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    {...register('email', { 
                      required: 'Email is required',
                      validate: validateEmail
                    })}
                    className={`w-full px-12 py-3 border border-gray-300 rounded-lg text-base transition-all duration-300 bg-white ${errors.email ? 'border-red-500' : 'focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}`}
                    placeholder="Enter your email"
                  />
                  <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-error-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                    className={`w-full px-12 py-3 border border-gray-300 rounded-lg text-base transition-all duration-300 bg-white ${errors.password ? 'border-red-500' : 'focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}`}
                    placeholder="Enter your password"
                  />
                  <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-error-600">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center space-x-2 py-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Access Admin Panel</span>
                )}
              </button>
            </form>

            {/* Admin Access Notice */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Admin access only. Contact your system administrator for credentials.
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              By signing in, you agree to our{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700">
                Privacy Policy
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default AdminLogin 