import React, { useState, useEffect, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { 
  Calendar, 
  Clock, 
  Eye, 
  Share2, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Link as LinkIcon, 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Check, 
  ChevronRight, 
  ChevronDown, 
  User, 
  Sparkles, 
  List, 
  MessageSquare, 
  CheckCircle,
  Phone
} from 'lucide-react'
import { YoutubeLogo, InstagramLogo } from '../components/Icons'
import axios from 'axios'

const BlogDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [blog, setBlog] = useState(null)
  const [relatedBlogs, setRelatedBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)
  const [activeHeadingId, setActiveHeadingId] = useState('key-takeaways')
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false)

  // eBook lead-capture modal state
  const [showEbookModal, setShowEbookModal] = useState(false)
  const [ebookForm, setEbookForm] = useState({ name: '', email: '' })
  const [ebookSubmitting, setEbookSubmitting] = useState(false)
  const [ebookSuccess, setEbookSuccess] = useState(false)
  const [ebookError, setEbookError] = useState('')

  useEffect(() => {
    const fetchBlogDetail = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await axios.get(`/api/blogs/${slug}`)
        setBlog(res.data)

        // Fetch related articles
        const relatedRes = await axios.get(`/api/blogs/${slug}/related`)
        setRelatedBlogs(relatedRes.data || [])
      } catch (err) {
        console.error('Error fetching blog detail:', err)
        setError('Blog post not found or has been removed.')
      } finally {
        setLoading(false)
      }
    }

    fetchBlogDetail()
    window.scrollTo(0, 0)
  }, [slug])

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://agentfloww.com/blogs/${slug}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  // Automatically parse headings and inject unique IDs into article HTML
  const { processedContent, headings } = useMemo(() => {
    if (!blog?.content) return { processedContent: '', headings: [] }
    
    if (typeof window !== 'undefined' && typeof DOMParser !== 'undefined') {
      try {
        const parser = new DOMParser()
        const doc = parser.parseFromString(blog.content, 'text/html')
        const headingEls = doc.querySelectorAll('h2, h3, h4')
        const items = []
        const usedIds = new Map()

        headingEls.forEach((el, index) => {
          const text = el.textContent?.trim() || ''
          if (!text) return

          // Generate a clean slug
          let baseSlug = el.id || text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-')
            .trim() || `section-${index + 1}`

          let uniqueId = baseSlug
          let counter = 1
          while (usedIds.has(uniqueId)) {
            uniqueId = `${baseSlug}-${counter}`
            counter++
          }
          usedIds.set(uniqueId, true)

          // Inject ID and offset styles to account for fixed navbar
          el.id = uniqueId
          el.style.scrollMarginTop = '100px'
          el.classList.add('scroll-mt-28')

          items.push({
            id: uniqueId,
            text,
            level: parseInt(el.tagName.replace('H', ''), 10)
          })
        })

        return {
          processedContent: doc.body.innerHTML,
          headings: items
        }
      } catch (e) {
        console.error('Error parsing headings from blog content:', e)
        return { processedContent: blog.content, headings: [] }
      }
    }

    return { processedContent: blog.content, headings: [] }
  }, [blog?.content])

  // Derive structured Key Takeaways from article metadata or content
  const keyTakeaways = useMemo(() => {
    if (blog?.key_takeaways) {
      if (Array.isArray(blog.key_takeaways)) return blog.key_takeaways
      try {
        const parsed = JSON.parse(blog.key_takeaways)
        if (Array.isArray(parsed)) return parsed
      } catch (e) {
        return blog.key_takeaways.split('\n').filter(Boolean).map(line => ({
          lead: '',
          text: line.replace(/^[-*•]\s*/, '')
        }))
      }
    }

    // Fallback: auto-synthesize from excerpt + headings
    const items = []
    if (blog?.excerpt) {
      items.push({ lead: 'Core Insight:', text: blog.excerpt })
    }
    if (headings && headings.length > 0) {
      const firstH2 = headings.find(h => h.level === 2) || headings[0]
      if (firstH2) {
        items.push({
          lead: `${firstH2.text}:`,
          text: 'Modern enterprise operations deploy autonomous agentic orchestrators capable of real-time reasoning, tool invocation, and human-in-the-loop oversight.'
        })
      }
    }
    items.push({
      lead: 'Measurable Impact:',
      text: 'Eliminates repetitive manual back-office overhead by up to 80%, speeds cycle times, and interfaces directly with SAP, Oracle, and legacy ERP data lakes.'
    })
    return items
  }, [blog, headings])

  // eBook lead capture submit
  const handleEbookSubmit = async (e) => {
    e.preventDefault()
    setEbookError('')
    if (!ebookForm.name.trim() || !ebookForm.email.trim()) {
      setEbookError('Please fill in both your name and email.')
      return
    }
    setEbookSubmitting(true)
    try {
      await axios.post('/api/blogs/ebook-download', {
        name: ebookForm.name.trim(),
        email: ebookForm.email.trim(),
        blog_id: blog?.id,
        ebook_title: blog?.ebook_title || 'Enterprise AI eBook'
      })
      setEbookSuccess(true)
      // Trigger download
      if (blog?.ebook_file) {
        const link = document.createElement('a')
        link.href = blog.ebook_file
        link.setAttribute('download', blog.ebook_title || 'ebook')
        link.setAttribute('target', '_blank')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (err) {
      setEbookError(err?.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setEbookSubmitting(false)
    }
  }

  // Smooth scroll to target heading
  const scrollToHeading = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveHeadingId(id)
      if (window.history?.pushState) {
        window.history.pushState(null, '', `#${id}`)
      }
    }
  }

  // Active heading scroll spy (including Key Takeaways)
  useEffect(() => {
    const allSections = ['key-takeaways']
    headings.forEach(h => allSections.push(h.id))

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160
      let currentId = allSections[0]

      for (let i = 0; i < allSections.length; i++) {
        const el = document.getElementById(allSections[i])
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY
          if (top <= scrollPosition) {
            currentId = allSections[i]
          } else {
            break
          }
        }
      }

      if (currentId) {
        setActiveHeadingId(currentId)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [headings])

  // Scroll to anchor on load if URL has hash
  useEffect(() => {
    if (window.location.hash) {
      const hashId = window.location.hash.substring(1)
      if (hashId === 'key-takeaways' || headings.some(h => h.id === hashId)) {
        const timer = setTimeout(() => {
          scrollToHeading(hashId)
        }, 300)
        return () => clearTimeout(timer)
      }
    }
  }, [headings])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 pb-20 flex justify-center items-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading article...</p>
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 pb-20">
        <div className="max-w-xl mx-auto text-center px-4">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Post Not Found</h2>
            <p className="text-gray-600 mb-6">{error || 'The requested article does not exist.'}</p>
            <Link
              to="/blogs"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow hover:bg-blue-700 transition"
            >
              <ArrowLeft size={16} />
              <span>Back to All Blogs</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Article JSON-LD Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.seo_title || blog.title,
    "description": blog.seo_description || blog.excerpt,
    "image": [blog.featured_image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80'],
    "datePublished": blog.publish_date || blog.created_at,
    "dateModified": blog.updated_at || blog.created_at,
    "author": {
      "@type": "Person",
      "name": blog.author_name || "AgentFlow Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AgentFlow",
      "logo": {
        "@type": "ImageObject",
        "url": "https://agentfloww.com/images/logo/Agentflow%20svg.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    }
  }

  // Left-side Reduced Schedule a Demo Card Component (Compact: Name & Email only)
  const ReducedDemoCtaCard = () => {
    const [formData, setFormData] = useState({ name: '', email: '' })
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [submitError, setSubmitError] = useState('')

    const handleSubmit = async (e) => {
      e.preventDefault()
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (!emailRegex.test(formData.email.trim())) {
        setSubmitError('Please enter a valid work email (e.g. name@company.com)')
        return
      }

      setSubmitting(true)
      setSubmitError('')

      try {
        await axios.post('/api/demo', {
          name: formData.name.trim(),
          email: formData.email.trim(),
          industry: 'Left Sidebar Lead',
          use_case: `Demo requested via left sidebar on blog: "${blog?.title || 'Blog'}"`
        })
        setSubmitted(true)
      } catch (err) {
        console.error('Failed to submit demo request:', err)
        setSubmitError(err.response?.data?.message || 'Failed to submit. Please try again.')
      } finally {
        setSubmitting(false)
      }
    }

    return (
      <div className="mt-8 pt-6 border-t border-gray-200/80">
        <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Book Live Demo</h4>
          </div>
          <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
            Custom walkthrough of autonomous AI agents on your ERP.
          </p>

          {submitted ? (
            <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-center">
              <CheckCircle size={16} className="text-green-600 mx-auto mb-1" />
              <div className="text-xs font-bold text-green-900">Request Sent!</div>
              <div className="text-[10px] text-green-700 mt-0.5">We'll connect within 24h.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2.5">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Name*"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  placeholder="Work Email*"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {submitError && (
                <p className="text-[10px] text-red-600 font-medium bg-red-50 p-1.5 rounded border border-red-100">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition disabled:opacity-60 shadow-xs flex items-center justify-center space-x-1"
              >
                <span>{submitting ? 'Booking...' : 'Book Demo →'}</span>
              </button>
            </form>
          )}

          {/* Quick contact direct links */}
          <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-gray-500">
            <a href="tel:+918956512955" className="hover:text-blue-600 flex items-center space-x-1">
              <Phone size={10} />
              <span>Call Us</span>
            </a>
            <Link to="/live-demo" className="text-blue-600 font-semibold hover:underline">
              Self-Guided Demo
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Check if this blog has an eBook configured in the admin panel
  const hasEbook = Boolean(
    (blog?.ebook_file && blog.ebook_file.trim() !== '') ||
    (blog?.ebook_title && blog.ebook_title.trim() !== '')
  )

  // Right-side & Mobile Featured eBook Resource Card Component
  const EbookResourceCard = () => {
    if (!hasEbook) return null

    const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
    const [selectedCountry, setSelectedCountry] = useState('+91')
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [submitError, setSubmitError] = useState('')

    // Blog-specific eBook info configured in the admin panel
    const ebookTitle = blog?.ebook_title || 'Free Executive Playbook'
    const ebookDesc = blog?.ebook_description || 'Download the comprehensive playbook & implementation blueprint.'
    const ebookCover = blog?.ebook_cover || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'

    const handlePhoneChange = (e) => {
      // Keep only numbers and max 10 digits
      const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10)
      setFormData(prev => ({ ...prev, phone: cleaned }))
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      setSubmitError('')

      // Strict Name Check
      if (!formData.name.trim() || formData.name.trim().length < 2) {
        setSubmitError('Please enter your full name.')
        return
      }

      // Strict Email Validation (proper username + @ + domain + TLD)
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (!emailRegex.test(formData.email.trim())) {
        setSubmitError('Please enter a valid work email (e.g. name@company.com).')
        return
      }

      // Strict Phone Check (Must be exactly 10 digits)
      if (formData.phone.length !== 10) {
        setSubmitError('Phone number must be exactly 10 digits.')
        return
      }

      setSubmitting(true)
      try {
        const fullPhone = `${selectedCountry} ${formData.phone}`
        await axios.post('/api/blogs/ebook-download', {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: fullPhone,
          blog_id: blog?.id || null,
          ebook_title: ebookTitle
        })
        setSubmitted(true)

        // If file exists, trigger automatic download / opening
        if (blog?.ebook_file) {
          const downloadUrl = blog.ebook_file.startsWith('http') 
            ? blog.ebook_file 
            : `${window.location.origin}${blog.ebook_file.startsWith('/') ? '' : '/'}${blog.ebook_file}`
          
          const link = document.createElement('a')
          link.href = downloadUrl
          link.setAttribute('download', `${slugify(ebookTitle)}.pdf`)
          link.setAttribute('target', '_blank')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      } catch (err) {
        console.error('eBook download error:', err)
        setSubmitError(err.response?.data?.message || 'Failed to process request. Please try again.')
      } finally {
        setSubmitting(false)
      }
    }

    return (
      <div className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Cover Image & Header Badge */}
        <div className="relative h-44 w-full bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 overflow-hidden">
          <img
            src={ebookCover}
            alt={ebookTitle}
            className="w-full h-full object-cover opacity-60 mix-blend-overlay scale-105 hover:scale-100 transition-transform duration-700"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
          
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/95 text-blue-900 shadow-sm backdrop-blur-xs">
              <BookOpen size={11} className="text-blue-600" />
              <span>Free Executive Playbook</span>
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="text-sm font-bold leading-tight drop-shadow-xs line-clamp-2">
              {ebookTitle}
            </h3>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          {ebookDesc && (
            <div className="mb-4 p-3.5 bg-gradient-to-r from-blue-50/80 to-indigo-50/40 border-l-[3px] border-blue-600 rounded-r-xl">
              <p className="text-[13px] font-semibold text-slate-900 leading-snug break-words whitespace-pre-line tracking-tight">
                {ebookDesc}
              </p>
            </div>
          )}

          {submitted ? (
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-center">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-2">
                <CheckCircle size={18} />
              </div>
              <h4 className="text-xs font-bold text-green-900">Your Free Copy Is Ready!</h4>
              <p className="text-[11px] text-green-700 mt-1 leading-relaxed">
                Thank you! We've prepared your download.
              </p>
              {blog?.ebook_file && (
                <a
                  href={blog.ebook_file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:underline"
                >
                  <span>Click here to open PDF</span>
                  <ArrowRight size={12} />
                </a>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Full Name*</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name*"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Work Email*</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  Phone Number* <span className="text-gray-400 font-normal">(10 digits)</span>
                </label>
                <div className="flex">
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="px-2 text-xs text-gray-700 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl font-medium focus:outline-none"
                  >
                    <option value="+91">IN +91</option>
                    <option value="+971">UAE +971</option>
                    <option value="+1">US +1</option>
                    <option value="+44">UK +44</option>
                  </select>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className="w-full px-3 py-2 text-xs rounded-r-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              {submitError && (
                <p className="text-[11px] text-red-600 font-medium bg-red-50 p-2 rounded-lg border border-red-100 leading-tight">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl text-xs transition duration-150 shadow-sm hover:shadow-blue-500/20 disabled:opacity-60 flex items-center justify-center space-x-1.5"
              >
                <BookOpen size={13} />
                <span>{submitting ? 'Generating PDF...' : 'Download Free eBook'}</span>
              </button>
            </form>
          )}

          <p className="text-center text-[10px] text-gray-400 mt-2.5">
            Instant PDF delivery • No spam guarantee
          </p>
        </div>
      </div>
    )
  }

  // Left-side Minimal Table of Contents Component (Procol Style)
  const TableOfContents = () => (
    <div>
      <nav className="space-y-3 text-[13px]">
        {/* Key Takeaways item */}
        <button
          type="button"
          onClick={() => scrollToHeading('key-takeaways')}
          className={`w-full text-left transition-colors flex items-start space-x-2 leading-relaxed ${
            activeHeadingId === 'key-takeaways'
              ? 'text-blue-600 font-semibold'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {activeHeadingId === 'key-takeaways' ? (
            <span className="text-blue-600 text-xs mt-0.5 font-bold">▪</span>
          ) : (
            <span className="text-transparent text-xs mt-0.5">▪</span>
          )}
          <span>Key Takeaways</span>
        </button>

        {headings.map((item) => {
          const isActive = activeHeadingId === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToHeading(item.id)}
              className={`w-full text-left transition-colors block leading-relaxed ${
                item.level === 3 ? 'pl-4 text-xs' : 'text-[13px]'
              } ${
                isActive
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {item.text}
            </button>
          )
        })}
      </nav>

      {/* Social Media Share Icons below TOC */}
      <div className="mt-8 pt-6 border-t border-gray-200/80 flex items-center space-x-3 text-gray-500">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(currentUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg hover:text-gray-900 hover:bg-gray-100 transition"
          title="Share on X"
        >
          <Twitter size={15} />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg hover:text-blue-600 hover:bg-gray-100 transition"
          title="Share on LinkedIn"
        >
          <Linkedin size={15} />
        </a>
        <a
          href="https://www.youtube.com/@AnvenssaAI"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg hover:text-red-600 hover:bg-gray-100 transition"
          title="YouTube"
        >
          <YoutubeLogo size={16} />
        </a>
        <a
          href="https://www.instagram.com/agentfloww_"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg hover:text-pink-600 hover:bg-gray-100 transition"
          title="Instagram"
        >
          <InstagramLogo size={16} />
        </a>
      </div>

      {/* Reduced CTA in left sidebar below social icons (Name & Email only) */}
      <ReducedDemoCtaCard />
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic SEO Tags */}
      <Helmet>
        <title>{blog.seo_title || blog.title} | AgentFlow Blog</title>
        <meta name="description" content={blog.seo_description || blog.excerpt} />
        {blog.seo_keywords && <meta name="keywords" content={blog.seo_keywords} />}
        <link rel="canonical" href={blog.canonical_url || currentUrl} />

        {/* Open Graph Metadata */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blog.seo_title || blog.title} />
        <meta property="og:description" content={blog.seo_description || blog.excerpt} />
        <meta property="og:image" content={blog.og_image || blog.featured_image} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="AgentFlow" />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.seo_title || blog.title} />
        <meta name="twitter:description" content={blog.seo_description || blog.excerpt} />
        <meta name="twitter:image" content={blog.og_image || blog.featured_image} />

        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      {/* TOP HERO / BANNER SECTION (Procol Style: Soft Blue Gradient + 2-Column Banner) */}
      <section className="bg-gradient-to-b from-[#eaf3fc] via-[#f3f8fd] to-white border-b border-gray-100/80 pt-6 pb-10 sm:pt-10 sm:pb-12">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-6 overflow-x-auto">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/blogs" className="hover:text-blue-600 transition-colors">Blogs</Link>
            <ChevronRight size={12} />
            <span className="text-gray-800 font-medium truncate max-w-[200px]">
              {blog.category?.name || 'General'}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            {/* Left: Article Title & Author Info */}
            <div className="lg:col-span-7">
              <h1 className="text-2xl sm:text-3xl lg:text-[36px] xl:text-[40px] font-procol-heading font-normal text-[#111827] [word-spacing:0.06em] leading-[1.18] mb-5">
                {blog.title}
              </h1>

              {/* Blog Excerpt / Subtitle Description (Matches Procol Style) */}
              {blog.excerpt && (
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal mb-6 sm:mb-8 max-w-2xl">
                  {blog.excerpt}
                </p>
              )}

              {/* Author Info & Date Metadata */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-base font-bold shadow-sm shrink-0">
                  {blog.author_avatar ? (
                    <img src={blog.author_avatar} alt={blog.author_name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{(blog.author_name || 'A')[0]}</span>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs">
                  <div>
                    <div className="text-sm font-bold text-gray-900">{blog.author_name || 'Agentflow Team'}</div>
                    <div className="text-gray-500">{blog.author_role || 'Enterprise AI Specialist'}</div>
                  </div>
                  <div className="hidden sm:block w-px h-8 bg-gray-300" />
                  <div className="mt-1 sm:mt-0">
                    <div className="text-gray-600 font-medium">
                      Last update: {new Date(blog.updated_at || blog.publish_date || blog.created_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="text-gray-400">{blog.read_time || 8} minutes read</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Featured Banner Image (Compact & Proportional matching Procol Reference) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200/80 bg-slate-900 group aspect-video w-full max-w-[460px] xl:max-w-[490px] relative">
                <img
                  src={blog.featured_image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80'}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN 3-COLUMN CONTENT SECTION (Wider Layout with Key Takeaways) */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col lg:flex-row items-start gap-8 xl:gap-12">

          {/* COLUMN 1 (LEFT): Minimal Table of Contents - Desktop Sticky */}
          <aside className="hidden lg:block w-56 xl:w-64 shrink-0 lg:sticky lg:top-24 lg:self-start max-h-[calc(100vh-7rem)] overflow-y-auto">
            <TableOfContents />
          </aside>

          {/* COLUMN 2 (CENTER): Wider Blog Content Body */}
          <article className="w-full flex-1 min-w-0 max-w-4xl mx-auto">
            {/* Mobile Table of Contents Accordion */}
            {headings.length > 0 && (
              <div className="lg:hidden mb-8 border border-blue-100 rounded-2xl bg-blue-50/40 p-4">
                <button
                  type="button"
                  onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
                  className="w-full flex items-center justify-between text-left text-sm font-bold text-gray-900"
                  aria-expanded={isMobileTocOpen}
                >
                  <span className="flex items-center space-x-2">
                    <List size={16} className="text-blue-600" />
                    <span>Table of Contents ({headings.length + 1})</span>
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-200 ${
                      isMobileTocOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isMobileTocOpen && (
                  <nav className="mt-3 pt-3 border-t border-blue-100 space-y-1.5 max-h-64 overflow-y-auto">
                    <button
                      type="button"
                      onClick={() => {
                        scrollToHeading('key-takeaways')
                        setIsMobileTocOpen(false)
                      }}
                      className="w-full text-left block py-1.5 px-2.5 rounded-lg text-xs font-semibold text-blue-600 hover:bg-blue-100/50"
                    >
                      ▪ Key Takeaways
                    </button>
                    {headings.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          scrollToHeading(item.id)
                          setIsMobileTocOpen(false)
                        }}
                        className={`w-full text-left block py-1.5 px-2.5 rounded-lg text-xs transition-colors ${
                          item.level === 3 ? 'pl-5 text-gray-600' : 'font-medium text-gray-800'
                        } ${
                          activeHeadingId === item.id
                            ? 'bg-white text-blue-600 font-bold shadow-xs'
                            : 'hover:bg-white/60'
                        }`}
                      >
                        {item.text}
                      </button>
                    ))}
                  </nav>
                )}
              </div>
            )}

            {/* Main Article Body — Key Takeaways injected AFTER the first paragraph */}
            {(() => {
              const proseClass = "prose prose-lg max-w-none text-gray-800 leading-relaxed font-sans prose-headings:font-bold prose-headings:text-gray-900 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-p:mb-6 prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-gray-50 prose-blockquote:p-4 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-pre:bg-slate-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-img:rounded-2xl prose-img:shadow-md"
              const splitIndex = processedContent.indexOf('</p>')
              const firstPara = splitIndex !== -1 ? processedContent.slice(0, splitIndex + 4) : ''
              const restContent = splitIndex !== -1 ? processedContent.slice(splitIndex + 4) : processedContent
              const KeyTakeawaysBlock = (
                <div
                  id="key-takeaways"
                  className="bg-gradient-to-br from-[#d9ebfb] via-[#eaf4fd] to-[#f4f9fe] border border-[#c5def6] rounded-2xl p-6 sm:p-8 my-8 shadow-sm scroll-mt-28"
                >
                  <h2 className="text-2xl font-bold text-[#0f172a] mb-5 tracking-tight">Key Takeaways</h2>
                  <div className="space-y-4">
                    {keyTakeaways.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="mt-1 shrink-0 text-blue-600">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2a1 1 0 0 1 1 1v6.586l4.657-4.657a1 1 0 1 1 1.414 1.414L14.414 11H21a1 1 0 1 1 0 2h-6.586l4.657 4.657a1 1 0 0 1-1.414 1.414L13 14.414V21a1 1 0 1 1-2 0v-6.586l-4.657 4.657a1 1 0 0 1-1.414-1.414L9.586 13H3a1 1 0 1 1 0-2h6.586L4.929 6.343a1 1 0 0 1 1.414-1.414L11 9.586V3a1 1 0 0 1 1-1z" />
                          </svg>
                        </div>
                        <div className="text-[14px] sm:text-[15px] text-gray-800 leading-relaxed">
                          {item.lead && (
                            <strong className="font-semibold text-gray-900 mr-1">{item.lead}</strong>
                          )}
                          <span>{item.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
              if (splitIndex !== -1) {
                return (
                  <>
                    <div className={proseClass} dangerouslySetInnerHTML={{ __html: firstPara }} />
                    {KeyTakeawaysBlock}
                    <div className={proseClass} dangerouslySetInnerHTML={{ __html: restContent }} />
                  </>
                )
              }
              return (
                <>
                  {KeyTakeawaysBlock}
                  <div className={proseClass} dangerouslySetInnerHTML={{ __html: processedContent }} />
                </>
              )
            })()}


            {/* Inline Banner Promo CTA (Procol Style in-content banner) */}
            <div className="my-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[11px] uppercase font-bold tracking-wider text-blue-200">Agentfloww AI</div>
                  <div className="text-base sm:text-lg font-bold text-white">Your next big automation leap starts here.</div>
                  <p className="text-xs text-blue-100 mt-0.5">Discover how leading enterprises automate ERP & operations with Agentfloww.</p>
                </div>
              </div>
              <Link
                to="/live-demo"
                className="shrink-0 px-5 py-2.5 bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs rounded-xl shadow transition"
              >
                Get a Live Demo
              </Link>
            </div>

            {/* Article Tag Footer */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-12 pt-6 border-t border-gray-100 flex items-center flex-wrap gap-2">
                <span className="text-xs font-bold uppercase text-gray-400 tracking-wider mr-2">Tags:</span>
                {blog.tags.map(t => (
                  <Link
                    key={t.id}
                    to={`/blogs?tag=${t.slug}`}
                    className="text-xs bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-700 px-3 py-1 rounded-lg font-medium transition"
                  >
                    #{t.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile eBook Lead Magnet Card (Stacked below article on mobile - only when added in admin panel) */}
            {hasEbook && (
              <div className="lg:hidden mt-10">
                <EbookResourceCard />
              </div>
            )}
          </article>

          {/* COLUMN 3 (RIGHT): Executive eBook Resource Card - Desktop Sticky (only when added in admin panel) */}
          {hasEbook && (
            <aside className="hidden lg:block w-72 xl:w-80 shrink-0 lg:sticky lg:top-24 lg:self-start">
              <EbookResourceCard />
            </aside>
          )}
        </div>

        {/* Related Articles Section (Full Width below 3-column layout) */}
        {relatedBlogs.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-200/80">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
                <span>Related Articles</span>
              </h2>
              <Link to="/blogs" className="text-sm font-semibold text-blue-600 hover:underline">
                View All Blogs &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.slice(0, 3).map((rel) => (
                <article
                  key={rel.id}
                  className="group bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="h-40 w-full overflow-hidden bg-gray-100 relative">
                      <img
                        src={rel.featured_image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80'}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span
                        className="absolute top-3 left-3 px-2.5 py-0.5 text-[11px] font-bold text-white rounded-full"
                        style={{ backgroundColor: rel.category?.color || '#3b82f6' }}
                      >
                        {rel.category?.name || 'General'}
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="text-xs text-gray-400 mb-2">
                        {new Date(rel.publish_date || rel.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })} · {rel.read_time || 5} min read
                      </div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-base mb-2">
                        <Link to={`/blogs/${rel.slug}`}>
                          {rel.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                        {rel.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Link
                      to={`/blogs/${rel.slug}`}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-800"
                    >
                      <span>Read More</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* eBook Lead Capture Modal */}
      {showEbookModal && (
        <div
          className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowEbookModal(false) }}
        >
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
            {/* Modal header gradient */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 px-8 py-7 text-white relative">
              <button
                onClick={() => setShowEbookModal(false)}
                className="absolute top-4 right-4 text-white/70 hover:text-white text-xl leading-none"
              >✕</button>
              <div className="flex items-center space-x-2 mb-2">
                <BookOpen size={20} className="text-indigo-200" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-200">Free Download</span>
              </div>
              <h3 className="text-xl font-bold">{blog?.ebook_title || 'Enterprise AI eBook'}</h3>
              <p className="text-sm text-indigo-100 mt-1">{blog?.ebook_description || 'Get instant access — 100% free.'}</p>
            </div>

            <div className="px-8 py-7">
              {ebookSuccess ? (
                <div className="text-center py-4">
                  <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-500" size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Your download is ready!</h4>
                  <p className="text-sm text-gray-600 mb-5">Thank you! If the download didn't start, click below.</p>
                  {blog?.ebook_file && (
                    <a
                      href={blog.ebook_file}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl text-sm shadow hover:shadow-indigo-300/40 transition"
                    >
                      <BookOpen size={16} />
                      <span>Download Now</span>
                    </a>
                  )}
                </div>
              ) : (
                <form onSubmit={handleEbookSubmit} className="space-y-4">
                  <p className="text-sm text-gray-600">Enter your details to get free access to the eBook instantly.</p>
                  {ebookError && (
                    <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">{ebookError}</div>
                  )}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={ebookForm.name}
                      onChange={e => setEbookForm(p => ({ ...p, name: e.target.value }))}
                      placeholder="e.g. Aditya Sharma"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={ebookForm.email}
                      onChange={e => setEbookForm(p => ({ ...p, email: e.target.value }))}
                      placeholder="you@company.com"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={ebookSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl text-sm transition-all duration-200 shadow hover:shadow-indigo-300/40 disabled:opacity-60 flex items-center justify-center space-x-2"
                  >
                    <BookOpen size={15} />
                    <span>{ebookSubmitting ? 'Processing...' : 'Get Free Access & Download'}</span>
                  </button>
                  <p className="text-[10px] text-gray-400 text-center">We respect your privacy. No spam, ever.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogDetail
