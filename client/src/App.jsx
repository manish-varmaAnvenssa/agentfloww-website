import { Routes, Route } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import AdminLayout from './components/AdminLayout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Login from './pages/Login'
import AdminLogin from './pages/AdminLogin'
import Admin from './pages/Admin'
import AdminContact from './pages/AdminContact'
import AdminUsers from './pages/AdminUsers'
import Compare from './pages/Compare'
import About from './pages/About'
import Pricing from './pages/Pricing'
import LiveDemo from './pages/LiveDemo'
import AdminDemo from './pages/AdminDemo'
import PrivacyPolicy from './pages/PrivacyPolicy'
import RefundPolicy from './pages/RefundPolicy'
import TermsOfService from './pages/TermsOfService'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  
  return (
    <HashRouter>
      <AuthProvider>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="compare" element={<Compare />} />
              <Route path="about" element={<About />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="live-demo" element={<LiveDemo />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="refund-policy" element={<RefundPolicy />} />
              <Route path="terms-of-service" element={<TermsOfService />} />
            </Route>

            {/* Admin Login Route */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes with AdminLayout */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Admin />} />
              <Route path="contact" element={<AdminContact />} />
              <Route path="demo" element={<AdminDemo />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </AuthProvider>
    </HashRouter>
  )
}

export default App 