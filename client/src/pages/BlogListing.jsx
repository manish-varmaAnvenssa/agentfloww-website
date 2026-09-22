import React, { useState, useEffect, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Tag,
  Layers,
  BookOpen,
  X,
  Flame
} from 'lucide-react'
import axios from 'axios'

const BlogListing = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  
  const [blogs, setBlogs] = useState([])
  const [categories, setCategories] = useState([])
  
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const [totalBlogs, setTotalBlogs] = useState(0)

  // Filters & State
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm)
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest')
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1', 10))
  const [isInfiniteScroll, setIsInfiniteScroll] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm)
      setCurrentPage(1)
    }, 350)
    return () => clearTimeout(handler)
  }, [searchTerm])

  // Load initial Categories
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const catRes = await axios.get('/api/categories')
        setCategories(catRes.data || [])
      } catch (err) {
        console.error('Failed to load blog categories:', err)
      }
    }
    fetchMetadata()
  }, [])

  // Sync state with URL params
  useEffect(() => {
    const params = {}
    if (debouncedSearch) params.search = debouncedSearch
    if (selectedCategory && selectedCategory !== 'all') params.category = selectedCategory
    if (sortBy && sortBy !== 'newest') params.sort = sortBy
    if (currentPage > 1) params.page = currentPage.toString()

    setSearchParams(params, { replace: true })
  }, [debouncedSearch, selectedCategory, sortBy, currentPage, setSearchParams])

  // Fetch blogs API call
  const fetchBlogs = useCallback(async (page = 1, append = false) => {
    if (append) {
      setLoadingMore(true)
    } else {
      setLoading(true)
    }

    try {
      let url = `/api/blogs?page=${page}&limit=9&sort=${sortBy}`
      if (debouncedSearch) url += `&search=${encodeURIComponent(debouncedSearch)}`
      if (selectedCategory && selectedCategory !== 'all') url += `&category=${encodeURIComponent(selectedCategory)}`

      const res = await axios.get(url)
      const newBlogs = res.data.blogs || []
      const pagesCount = res.data.totalPages || 1
      const totalCount = res.data.total || 0

      if (append) {
        setBlogs(prev => [...prev, ...newBlogs])
      } else {
        setBlogs(newBlogs)
      }

      setTotalPages(pagesCount)
      setTotalBlogs(totalCount)
      setHasMore(page < pagesCount)
    } catch (err) {
      console.error('Error loading blogs:', err)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [debouncedSearch, selectedCategory, sortBy])

  // Effect to trigger fetch on filter changes
  useEffect(() => {
    if (!isInfiniteScroll || currentPage === 1) {
      fetchBlogs(currentPage, false)
    } else {
      fetchBlogs(currentPage, true)
    }
  }, [fetchBlogs, currentPage, isInfiniteScroll])

  const handleCategoryChange = (catSlug) => {
    setSelectedCategory(catSlug)
    setCurrentPage(1)
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
    setCurrentPage(1)
  }

  const handleLoadMore = () => {
    if (currentPage < totalPages && !loadingMore) {
      setIsInfiniteScroll(true)
      setCurrentPage(prev => prev + 1)
    }
  }

  const clearFilters = () => {
    setSearchTerm('')
    setDebouncedSearch('')
    setSelectedCategory('all')
    setSortBy('newest')
    setCurrentPage(1)
    setIsInfiniteScroll(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-24">
      <Helmet>
        <title>AI Insights & Knowledge Hub | AgentFlow Blogs</title>
        <meta name="description" content="Explore practical AI guides, automation strategies, enterprise ERP integration insights, and industry case studies from AgentFlow." />
        <meta name="keywords" content="AI blog, enterprise automation articles, ERP AI guides, machine learning insights, AgentFlow resources" />
      </Helmet>

      {/* Premium Hero Section matching Company Design System */}
      <section 
        className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50/30 to-slate-50 pt-16 pb-20 md:pt-24 md:pb-28 border-b border-slate-200/60"
      >
        {/* Soft Ambient Glow Halos */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-200/40 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-200/30 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Category / Knowledge Hub Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 shadow-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              AgentFlow Knowledge Hub & Insights
            </span>
          </motion.div>

          {/* Hero Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-tight"
          >
            AI Insights & <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Enterprise Resources</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-10"
          >
            Discover practical guides, technical benchmarks, automation strategies, and real-world case studies for scaling autonomous enterprise operations.
          </motion.p>

          {/* High Contrast Floating Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative flex items-center bg-white rounded-2xl p-2 shadow-xl shadow-indigo-100/80 border border-indigo-150 hover:border-indigo-300 transition-all duration-300">
              <div className="pl-4 pr-2 text-indigo-600 flex items-center">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles by title, ERP module, or keywords..."
                className="w-full py-3 bg-transparent text-slate-900 placeholder-slate-400 font-medium text-sm sm:text-base focus:outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition mr-2"
                >
                  <X size={14} />
                </button>
              )}
              <button
                onClick={() => fetchBlogs(1, false)}
                className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-indigo-500/25 active:scale-95 transition-all flex items-center space-x-1.5 flex-shrink-0"
              >
                <span>Search</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Search spacer */}
            <div className="mt-2 text-xs text-slate-400">
              Type keywords and press search to filter articles
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Filter & Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Controls Bar: Category Pills, Tags, Sort */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 mb-10 space-y-6">
          {/* Top row: Categories & Sorting */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-3 clean-scrollbar">
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center mr-2">
                <Layers size={14} className="mr-1" /> Category:
              </span>
              <button
                onClick={() => handleCategoryChange('all')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Articles
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                    selectedCategory === cat.slug
                      ? 'text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  style={{
                    backgroundColor: selectedCategory === cat.slug ? (cat.color || '#6366F1') : undefined
                  }}
                >
                  <span>{cat.name}</span>
                  {cat.post_count !== undefined && (
                    <span className="text-[10px] opacity-80 px-1.5 py-0.2 rounded-full bg-black/10">
                      {cat.post_count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center justify-between lg:justify-end space-x-3 border-t lg:border-t-0 border-slate-100 pt-4 lg:pt-0">
              <span className="text-xs font-bold text-slate-500 flex items-center">
                <SlidersHorizontal size={14} className="mr-1 text-indigo-600" /> Sort By:
              </span>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="most_viewed">Most Viewed</option>
                <option value="recently_updated">Recently Updated</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(debouncedSearch || selectedCategory !== 'all') && (
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-slate-700">Active filters:</span>
                {debouncedSearch && <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded font-mono font-semibold">"{debouncedSearch}"</span>}
                {selectedCategory !== 'all' && <span className="bg-purple-50 border border-purple-100 text-purple-700 px-2.5 py-0.5 rounded font-mono font-semibold">Category: {selectedCategory}</span>}
              </div>
              <button
                onClick={clearFilters}
                className="text-indigo-600 hover:underline font-bold"
              >
                Reset All
              </button>
            </div>
          )}
        </div>

        {/* Results Counter Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-slate-900 flex items-center">
            <BookOpen size={20} className="mr-2 text-indigo-600" />
            <span>All Published Articles</span>
            <span className="ml-3 text-xs bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full font-bold">
              {totalBlogs} {totalBlogs === 1 ? 'article' : 'articles'}
            </span>
          </h2>
        </div>

        {/* Blog Cards Grid (Desktop 3 cols, Tablet 2 cols, Mobile 1 col) */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 animate-pulse">
                <div className="w-full h-52 bg-slate-200 rounded-2xl mb-4" />
                <div className="h-4 bg-slate-200 rounded w-1/3 mb-3" />
                <div className="h-6 bg-slate-200 rounded w-4/5 mb-3" />
                <div className="h-4 bg-slate-200 rounded w-full mb-2" />
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-6" />
                <div className="h-10 bg-slate-200 rounded w-full" />
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-xl mx-auto my-12 shadow-sm">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">No Articles Found</h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              We couldn't find any articles matching your query or filter selection. Try searching with different keywords.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow hover:bg-indigo-700 transition"
            >
              Clear Search & Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, idx) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (idx % 9) * 0.05 }}
                className="group bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Image Box */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
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
                      className="px-3 py-1 text-xs font-bold text-white rounded-full shadow-md backdrop-blur-sm"
                      style={{ backgroundColor: blog.category?.color || '#6366F1' }}
                    >
                      {blog.category?.name || 'General'}
                    </span>
                  </div>

                  {blog.is_featured === 1 && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider bg-amber-400 text-slate-900 rounded-full shadow-md">
                        ★ Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Box */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Meta line */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                      <span className="flex items-center space-x-1">
                        <Calendar size={13} className="text-slate-400" />
                        <span>
                          {new Date(blog.publish_date || blog.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock size={13} className="text-slate-400" />
                        <span>{blog.read_time || 5} min read</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2 mb-3">
                      <Link to={`/blogs/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                      {blog.excerpt}
                    </p>

                    {/* Spacing spacer */}
                    <div className="mb-4" />
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        {(blog.author_name || 'A')[0]}
                      </div>
                      <span className="text-xs font-medium text-slate-700 truncate max-w-[120px]">
                        {blog.author_name || 'AgentFlow Team'}
                      </span>
                    </div>

                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="inline-flex items-center space-x-1 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors duration-200 group/link"
                    >
                      <span>Read Article</span>
                      <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Load More Button for Infinite Scroll */}
        {hasMore && !loading && (
          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-white border border-slate-300 text-slate-800 font-bold rounded-xl shadow-sm hover:bg-slate-50 active:scale-95 transition-all text-sm"
            >
              {loadingMore ? (
                <>
                  <RefreshCw className="animate-spin w-4 h-4 text-indigo-600" />
                  <span>Loading More Articles...</span>
                </>
              ) : (
                <>
                  <span>Load More Articles</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center space-x-2">
            <button
              onClick={() => {
                setIsInfiniteScroll(false)
                setCurrentPage(prev => Math.max(1, prev - 1))
              }}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Previous Page"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => {
                  setIsInfiniteScroll(false)
                  setCurrentPage(pageNum)
                }}
                className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                  currentPage === pageNum
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => {
                setIsInfiniteScroll(false)
                setCurrentPage(prev => Math.min(totalPages, prev + 1))
              }}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Next Page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default BlogListing
