import React, { useState, useEffect } from 'react'
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
  User,
  Sparkles
} from 'lucide-react'
import axios from 'axios'

const BlogDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [blog, setBlog] = useState(null)
  const [relatedBlogs, setRelatedBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 pb-20 flex justify-center items-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
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
              className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow hover:bg-indigo-700 transition"
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

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24">
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

      {/* Header Breadcrumbs Navigation */}
      <div className="bg-white border-b border-gray-200 py-3.5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center space-x-2 text-xs text-gray-500 overflow-x-auto">
            <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/blogs" className="hover:text-indigo-600 transition-colors">Blogs</Link>
            <ChevronRight size={12} />
            <span className="text-gray-800 font-medium truncate max-w-[200px]">
              {blog.category?.name || 'General'}
            </span>
            <ChevronRight size={12} />
            <span className="text-indigo-600 font-semibold truncate max-w-[250px]">
              {blog.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Article Hero Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden p-6 sm:p-10 mb-12"
        >
          {/* Category Badge & Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <span
              className="px-4 py-1.5 text-xs font-bold text-white rounded-full shadow-sm"
              style={{ backgroundColor: blog.category?.color || '#6366F1' }}
            >
              {blog.category?.name || 'General'}
            </span>

            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span className="flex items-center space-x-1">
                <Calendar size={14} className="text-gray-400" />
                <span>
                  {new Date(blog.publish_date || blog.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock size={14} className="text-gray-400" />
                <span>{blog.read_time || 5} min read</span>
              </span>
              <span className="flex items-center space-x-1">
                <Eye size={14} className="text-gray-400" />
                <span>{blog.views} views</span>
              </span>
            </div>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            {blog.title}
          </h1>

          {/* Author info & Social Share Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-y border-gray-100 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow">
                {(blog.author_name || 'A')[0]}
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">{blog.author_name || 'AgentFlow Team'}</div>
                <div className="text-xs text-gray-500">Enterprise AI Insights</div>
              </div>
            </div>

            {/* Social Sharing Buttons */}
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-1 flex items-center">
                <Share2 size={13} className="mr-1" /> Share:
              </span>

              {/* Copy Link Button */}
              <button
                onClick={handleCopyLink}
                className="p-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 transition relative"
                title="Copy Link"
              >
                {copied ? <Check size={16} className="text-green-600" /> : <LinkIcon size={16} />}
                {copied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </button>

              {/* Twitter / X */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition"
                title="Share on Twitter"
              >
                <Twitter size={16} />
              </a>

              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition"
                title="Share on LinkedIn"
              >
                <Linkedin size={16} />
              </a>

              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition"
                title="Share on Facebook"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Large Featured Image */}
          <div className="rounded-2xl overflow-hidden mb-10 shadow-md bg-gray-100">
            <img
              src={blog.featured_image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80'}
              alt={blog.title}
              className="w-full h-auto max-h-[500px] object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80'
              }}
            />
          </div>

          {/* Excerpt Lead Paragraph */}
          {blog.excerpt && (
            <div className="p-6 rounded-2xl bg-indigo-50/50 border-l-4 border-indigo-600 text-lg font-medium text-gray-800 mb-8 leading-relaxed">
              {blog.excerpt}
            </div>
          )}

          {/* Main Article Body (Prose Styled HTML Renderer) */}
          <div 
            className="prose prose-lg max-w-none text-gray-800 leading-relaxed font-sans prose-headings:font-bold prose-headings:text-gray-900 prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-p:mb-6 prose-a:text-indigo-600 prose-a:underline hover:prose-a:text-indigo-800 prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-gray-50 prose-blockquote:p-4 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-pre:bg-slate-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-img:rounded-2xl prose-img:shadow-md border-t border-gray-100 pt-8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Article Tag Footer */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-gray-100 flex items-center flex-wrap gap-2">
              <span className="text-xs font-bold uppercase text-gray-400 tracking-wider mr-2">Tags:</span>
              {blog.tags.map(t => (
                <Link
                  key={t.id}
                  to={`/blogs?tag=${t.slug}`}
                  className="text-xs bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 text-gray-700 px-3 py-1 rounded-lg font-medium transition"
                >
                  #{t.name}
                </Link>
              ))}
            </div>
          )}
        </motion.div>

        {/* Related Articles Section */}
        {relatedBlogs.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Sparkles className="w-5 h-5 text-indigo-600 mr-2" />
                <span>Related Articles</span>
              </h2>
              <Link to="/blogs" className="text-sm font-semibold text-indigo-600 hover:underline">
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
                        style={{ backgroundColor: rel.category?.color || '#6366F1' }}
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
                      <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 text-base mb-2">
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
                      className="inline-flex items-center space-x-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
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
      </article>
    </div>
  )
}

export default BlogDetail
