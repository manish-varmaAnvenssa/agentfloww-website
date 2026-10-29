import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Calendar, User, BookOpen, Sparkles } from 'lucide-react'
import axios from 'axios'

const HomeBlogSection = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const response = await axios.get('/api/blogs/featured')
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setBlogs(response.data)
        } else {
          // Fallback to fetch normal published blogs
          const resAll = await axios.get('/api/blogs?limit=3&sort=newest')
          setBlogs(resAll.data?.blogs || [])
        }
      } catch (err) {
        console.error('Failed to fetch latest blogs for homepage:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchLatestBlogs()
  }, [])

  if (!loading && blogs.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-4"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
              Knowledge Hub & Insights
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight"
          >
            Latest <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AI Insights</span> & Articles
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-gray-600 leading-relaxed"
          >
            Discover practical AI guides, automation strategies, product updates, and industry insights.
          </motion.p>
        </div>

        {/* Blog Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-xl mb-4" />
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-6" />
                <div className="h-8 bg-gray-200 rounded w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.slice(0, 3).map((blog, idx) => (
              <motion.article
                key={blog.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Image Container with Zoom */}
                <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                  <img
                    src={blog.featured_image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80'}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80'
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span 
                      className="px-3 py-1 text-xs font-semibold text-white rounded-full shadow-md backdrop-blur-sm"
                      style={{ backgroundColor: blog.category?.color || '#6366F1' }}
                    >
                      {blog.category?.name || 'Technology'}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Metadata line */}
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                      <span className="flex items-center space-x-1">
                        <Calendar size={13} className="text-gray-400" />
                        <span>
                          {new Date(blog.publish_date || blog.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock size={13} className="text-gray-400" />
                        <span>{blog.read_time || 5} min read</span>
                      </span>
                    </div>

                    {/* Blog Title */}
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2 mb-3">
                      <Link to={`/blogs/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-600 line-clamp-3 mb-6 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>

                  {/* Footer Author & CTA */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        {(blog.author_name || 'A')[0]}
                      </div>
                      <span className="text-xs font-medium text-gray-700 truncate max-w-[120px]">
                        {blog.author_name || 'AgentFlow Team'}
                      </span>
                    </div>

                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="inline-flex items-center space-x-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-200 group/link"
                    >
                      <span>Read More</span>
                      <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* View All Blogs CTA Button */}
        <div className="mt-16 text-center">
          <Link
            to="/blogs"
            className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <BookOpen size={18} />
            <span>View All Blogs</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HomeBlogSection
