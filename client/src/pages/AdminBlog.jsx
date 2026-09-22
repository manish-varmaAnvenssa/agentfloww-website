import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Eye, 
  Copy, 
  Check, 
  X, 
  Globe, 
  Sparkles, 
  Image as ImageIcon, 
  Tag as TagIcon, 
  FolderPlus, 
  Clock, 
  Calendar, 
  CheckCircle, 
  AlertCircle,
  MoreVertical,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Send,
  Save,
  Layers,
  ArrowUpRight
} from 'lucide-react'
import axios from '../utils/api'
import RichTextEditor from '../components/RichTextEditor'
import ImageUpload from '../components/ImageUpload'

const AdminBlog = () => {
  const [activeTab, setActiveTab] = useState('dashboard') // 'dashboard' | 'editor' | 'categories' | 'tags'
  
  // Data State
  const [blogs, setBlogs] = useState([])
  const [categories, setCategories] = useState([])
  const [tagsList, setTagsList] = useState([])
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null) // { type: 'success'|'error', text: '' }

  // Dashboard Table Controls
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedBlogIds, setSelectedBlogIds] = useState([])

  // Editor State
  const [editingBlogId, setEditingBlogId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    category_id: '',
    author_name: 'AgentFlow AI',
    status: 'published',
    publish_date: new Date().toISOString().slice(0, 16),
    read_time: 5,
    is_featured: false,
    tags: [], // Array of tag names or IDs
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    canonical_url: '',
    og_image: ''
  })
  const [showSeoSettings, setShowSeoSettings] = useState(false)
  const [tagInput, setTagInput] = useState('')

  // Category Modal State
  const [catModalOpen, setCatModalOpen] = useState(false)
  const [catForm, setCatForm] = useState({ id: null, name: '', slug: '', description: '', color: '#6366F1' })

  // Tag Modal State
  const [tagForm, setTagForm] = useState({ id: null, name: '', slug: '' })

  // Fetch Dashboard Blogs & Metadata
  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      const [blogsRes, catRes, tagRes] = await Promise.all([
        axios.get(`/api/blogs/admin/all?page=${currentPage}&limit=10&status=${statusFilter}&category=${categoryFilter}&search=${encodeURIComponent(searchQuery)}`),
        axios.get('/api/categories'),
        axios.get('/api/tags')
      ])

      console.log('API Response - Blogs:', blogsRes.data);
      console.log('API Response - Categories:', catRes.data);
      console.log('API Response - Tags:', tagRes.data);

      setBlogs(Array.isArray(blogsRes.data?.blogs) ? blogsRes.data.blogs : [])
      setTotalPages(blogsRes.data?.totalPages || 1)
      setCategories(Array.isArray(catRes.data) ? catRes.data : [])
      setTagsList(Array.isArray(tagRes.data) ? tagRes.data : [])
    } catch (err) {
      console.error('Failed to load admin blog data:', err)
      showMessage('error', 'Failed to load blog records')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [currentPage, statusFilter, categoryFilter, searchQuery])

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 4000)
  }

  // Auto-generate slug from title
  const handleTitleChange = (e) => {
    const titleVal = e.target.value
    const slugVal = titleVal
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')

    setFormData(prev => ({
      ...prev,
      title: titleVal,
      slug: prev.slug && editingBlogId ? prev.slug : slugVal,
      seo_title: prev.seo_title || titleVal
    }))
  }

  // Edit post button
  const handleEditBlog = (blog) => {
    setEditingBlogId(blog.id)
    setFormData({
      title: blog.title || '',
      slug: blog.slug || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      featured_image: blog.featured_image || '',
      category_id: blog.category_id || (blog.category?.id) || '',
      author_name: blog.author_name || 'AgentFlow AI',
      status: blog.status || 'published',
      publish_date: blog.publish_date ? new Date(blog.publish_date).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
      read_time: blog.read_time || 5,
      is_featured: Boolean(blog.is_featured),
      tags: Array.isArray(blog.tags) ? blog.tags.map(t => typeof t === 'object' && t !== null ? (t.name || '') : String(t)) : [],
      seo_title: blog.seo_title || '',
      seo_description: blog.seo_description || '',
      seo_keywords: blog.seo_keywords || '',
      canonical_url: blog.canonical_url || '',
      og_image: blog.og_image || ''
    })
    setActiveTab('editor')
  }

  // Reset Form for New Post
  const handleNewBlog = () => {
    setEditingBlogId(null)
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featured_image: '',
      category_id: categories[0]?.id || '',
      author_name: 'AgentFlow AI',
      status: 'published',
      publish_date: new Date().toISOString().slice(0, 16),
      read_time: 5,
      is_featured: false,
      tags: [],
      seo_title: '',
      seo_description: '',
      seo_keywords: '',
      canonical_url: '',
      og_image: ''
    })
    setActiveTab('editor')
  }

  // Delete Blog
  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return
    try {
      await axios.delete(`/api/blogs/${id}`)
      showMessage('success', 'Blog post deleted successfully')
      fetchDashboardData()
    } catch (err) {
      console.error(err)
      showMessage('error', 'Failed to delete blog post')
    }
  }

  // Toggle Blog Status
  const handleToggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'published' ? 'draft' : 'published'
    try {
      await axios.patch(`/api/blogs/${id}/status`, { status: nextStatus })
      showMessage('success', `Post status changed to ${nextStatus}`)
      fetchDashboardData()
    } catch (err) {
      console.error(err)
      showMessage('error', 'Failed to update status')
    }
  }

  // Duplicate Blog
  const handleDuplicateBlog = async (id) => {
    try {
      await axios.post(`/api/blogs/${id}/duplicate`)
      showMessage('success', 'Post duplicated as a new draft')
      fetchDashboardData()
    } catch (err) {
      console.error(err)
      showMessage('error', 'Failed to duplicate post')
    }
  }

  // Save Blog (Create or Update)
  const handleSaveBlog = async (e) => {
    e?.preventDefault()
    if (!formData.title.trim() || !formData.content.trim()) {
      showMessage('error', 'Please provide a title and content for the blog post.')
      return
    }

    setSaving(true)
    try {
      const payload = {
        ...formData,
        category_id: formData.category_id ? parseInt(formData.category_id, 10) : null
      }

      if (editingBlogId) {
        await axios.put(`/api/blogs/${editingBlogId}`, payload)
        showMessage('success', 'Blog post updated successfully!')
      } else {
        await axios.post('/api/blogs', payload)
        showMessage('success', 'New blog post published successfully!')
      }

      fetchDashboardData()
      setActiveTab('dashboard')
    } catch (err) {
      console.error('Save blog error:', err)
      showMessage('error', 'Failed to save blog post.')
    } finally {
      setSaving(false)
    }
  }

  // Add Tag Pill in Editor
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagName) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tagName)
    }))
  }

  // Bulk Actions
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedBlogIds(blogs.map(b => b.id))
    } else {
      setSelectedBlogIds([])
    }
  }

  const handleSelectOne = (id) => {
    setSelectedBlogIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleBulkAction = async (action) => {
    if (selectedBlogIds.length === 0) return
    if (!window.confirm(`Are you sure you want to ${action} ${selectedBlogIds.length} selected post(s)?`)) return

    try {
      await axios.post('/api/blogs/bulk-action', { action, ids: selectedBlogIds })
      showMessage('success', `Bulk ${action} completed successfully`)
      setSelectedBlogIds([])
      fetchDashboardData()
    } catch (err) {
      console.error(err)
      showMessage('error', `Failed to execute bulk ${action}`)
    }
  }

  // Category Save / Delete
  const handleSaveCategory = async (e) => {
    e.preventDefault()
    if (!catForm.name.trim()) return

    try {
      if (catForm.id) {
        await axios.put(`/api/categories/${catForm.id}`, catForm)
        showMessage('success', 'Category updated')
      } else {
        await axios.post('/api/categories', catForm)
        showMessage('success', 'Category created')
      }
      setCatModalOpen(false)
      setCatForm({ id: null, name: '', slug: '', description: '', color: '#6366F1' })
      fetchDashboardData()
    } catch (err) {
      console.error(err)
      showMessage('error', 'Failed to save category')
    }
  }

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Delete this category?')) return
    try {
      await axios.delete(`/api/categories/${id}`)
      showMessage('success', 'Category deleted')
      fetchDashboardData()
    } catch (err) {
      console.error(err)
      showMessage('error', 'Failed to delete category')
    }
  }

  // Tag Save / Delete
  const handleSaveTag = async (e) => {
    e.preventDefault()
    if (!tagForm.name.trim()) return

    try {
      if (tagForm.id) {
        await axios.put(`/api/tags/${tagForm.id}`, tagForm)
      } else {
        await axios.post('/api/tags', tagForm)
      }
      setTagForm({ id: null, name: '', slug: '' })
      showMessage('success', 'Tag saved successfully')
      fetchDashboardData()
    } catch (err) {
      console.error(err)
      showMessage('error', 'Failed to save tag')
    }
  }

  const handleDeleteTag = async (id) => {
    if (!window.confirm('Delete tag?')) return
    try {
      await axios.delete(`/api/tags/${id}`)
      showMessage('success', 'Tag deleted')
      fetchDashboardData()
    } catch (err) {
      console.error(err)
      showMessage('error', 'Failed to delete tag')
    }
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Notification Alert */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-20 right-8 z-50 px-5 py-3 rounded-xl shadow-xl border flex items-center space-x-3 text-sm font-semibold ${
              message.type === 'success' 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            <span>{message.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <FileText className="text-indigo-600" size={26} />
            <span>Blog Management Module</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create, edit, schedule, and optimize enterprise AI articles with full SEO controls.
          </p>
        </div>

        <button
          onClick={handleNewBlog}
          className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-indigo-500/20 active:scale-95 transition-all"
        >
          <Plus size={16} />
          <span>Create New Blog Post</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center space-x-2 ${
            activeTab === 'dashboard'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <FileText size={15} />
          <span>Blog Dashboard ({blogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('editor')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center space-x-2 ${
            activeTab === 'editor'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Edit3 size={15} />
          <span>{editingBlogId ? 'Edit Post' : 'Write / Add Post'}</span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center space-x-2 ${
            activeTab === 'categories'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Layers size={15} />
          <span>Categories ({categories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('tags')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center space-x-2 ${
            activeTab === 'tags'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <TagIcon size={15} />
          <span>Tags ({tagsList.length})</span>
        </button>
      </div>

      {/* TAB 1: DASHBOARD TABLE */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Controls & Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                placeholder="Search blog posts..."
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Status & Category Filters */}
            <div className="flex items-center space-x-3">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value)
                  setCurrentPage(1)
                }}
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value)
                  setCurrentPage(1)
                }}
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700"
              >
                <option value="all">All Categories</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Bulk Action Bar if selection exists */}
          {selectedBlogIds.length > 0 && (
            <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-xl flex items-center justify-between text-xs text-indigo-900 font-bold">
              <span>{selectedBlogIds.length} blog post(s) selected</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleBulkAction('publish')}
                  className="px-3 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  Bulk Publish
                </button>
                <button
                  onClick={() => handleBulkAction('unpublish')}
                  className="px-3 py-1 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  Bulk Unpublish (Draft)
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Bulk Delete
                </button>
              </div>
            </div>
          )}

          {/* Blogs Management Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <th className="py-3.5 px-4 w-10">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={blogs.length > 0 && selectedBlogIds.length === blogs.length}
                        className="rounded border-gray-300 text-indigo-600"
                      />
                    </th>
                    <th className="py-3.5 px-4">Post details</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Author</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Publish Date</th>
                    <th className="py-3.5 px-4">Views</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs">
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="py-8 text-center text-gray-500 font-medium">
                        Loading blog records...
                      </td>
                    </tr>
                  ) : blogs.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="py-8 text-center text-gray-500 font-medium">
                        No blog posts match your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    blogs.map((blog) => (
                      <tr key={blog.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <input
                            type="checkbox"
                            checked={selectedBlogIds.includes(blog.id)}
                            onChange={() => handleSelectOne(blog.id)}
                            className="rounded border-gray-300 text-indigo-600"
                          />
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={blog.featured_image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=200&q=80'}
                              alt={blog.title}
                              className="w-12 h-10 object-cover rounded-lg bg-gray-100 flex-shrink-0"
                            />
                            <div>
                              <div className="font-bold text-gray-900 line-clamp-1 hover:text-indigo-600">
                                {blog.title}
                              </div>
                              <div className="text-[11px] font-mono text-gray-400 truncate max-w-[240px]">
                                /blogs/{blog.slug}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className="px-2.5 py-1 text-[10px] font-bold text-white rounded-full"
                            style={{ backgroundColor: blog.category?.color || '#6366F1' }}
                          >
                            {blog.category?.name || 'General'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-gray-700 whitespace-nowrap">
                          {blog.author_name || 'AgentFlow AI'}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-full ${
                            blog.status === 'published'
                              ? 'bg-emerald-100 text-emerald-800'
                              : blog.status === 'scheduled'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {blog.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-500 whitespace-nowrap">
                          {new Date(blog.publish_date || blog.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-gray-700">
                          {blog.views || 0}
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end space-x-1">
                            {/* View / Open Post */}
                            <a
                              href={`/blogs/${blog.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 text-gray-500 hover:text-indigo-600 rounded hover:bg-gray-100"
                              title="View Article Page"
                            >
                              <ArrowUpRight size={15} />
                            </a>

                            {/* Edit Post */}
                            <button
                              onClick={() => handleEditBlog(blog)}
                              className="p-1.5 text-gray-500 hover:text-blue-600 rounded hover:bg-gray-100"
                              title="Edit Article"
                            >
                              <Edit3 size={15} />
                            </button>

                            {/* Toggle Publish / Draft */}
                            <button
                              onClick={() => handleToggleStatus(blog.id, blog.status)}
                              className={`p-1.5 rounded hover:bg-gray-100 ${blog.status === 'published' ? 'text-emerald-600' : 'text-amber-600'}`}
                              title={blog.status === 'published' ? 'Unpublish to Draft' : 'Publish Article'}
                            >
                              <CheckCircle size={15} />
                            </button>

                            {/* Duplicate Post */}
                            <button
                              onClick={() => handleDuplicateBlog(blog.id)}
                              className="p-1.5 text-gray-500 hover:text-purple-600 rounded hover:bg-gray-100"
                              title="Duplicate Post"
                            >
                              <Copy size={15} />
                            </button>

                            {/* Delete Post */}
                            <button
                              onClick={() => handleDeleteBlog(blog.id)}
                              className="p-1.5 text-gray-500 hover:text-red-600 rounded hover:bg-gray-100"
                              title="Delete Post"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600">
                <span>Page {currentPage} of {totalPages}</span>
                <div className="flex space-x-1">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded border bg-white hover:bg-gray-100 disabled:opacity-40"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded border bg-white hover:bg-gray-100 disabled:opacity-40"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: FULL RICH TEXT BLOG EDITOR */}
      {activeTab === 'editor' && (
        <form onSubmit={handleSaveBlog} className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-lg font-bold text-gray-900">
                {editingBlogId ? 'Editing Blog Post' : 'Create & Publish Blog Post'}
              </h2>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, status: 'draft' }))
                    handleSaveBlog()
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-200 transition"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs rounded-xl shadow hover:shadow-indigo-500/20 active:scale-95 transition"
                >
                  <Send size={14} />
                  <span>{saving ? 'Saving...' : editingBlogId ? 'Update Post' : 'Publish Post'}</span>
                </button>
              </div>
            </div>

            {/* Title & Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Blog Post Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="e.g. Building Autonomous AI Agents for Enterprise Workflows"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  URL Slug (Clean Permalink)
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="building-autonomous-ai-agents"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Category & Author & Read Time */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Category *
                </label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Category</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Author Name
                </label>
                <input
                  type="text"
                  value={formData.author_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
                  placeholder="AgentFlow AI"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Read Time (Minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.read_time}
                  onChange={(e) => setFormData(prev => ({ ...prev, read_time: parseInt(e.target.value, 10) || 5 }))}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Featured Cover Image upload & preview */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Featured Cover Image
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left side: Upload area & URL text input */}
                <div className="space-y-3">
                  <div 
                    onClick={() => document.getElementById('cover-image-file').click()}
                    className="border-2 border-dashed border-gray-200 hover:border-indigo-500 hover:bg-indigo-50/5 rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 group relative"
                  >
                    <input 
                      type="file"
                      id="cover-image-file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        
                        const uploadData = new FormData();
                        uploadData.append('image', file);
                        
                        try {
                          setSaving(true);
                          const uploadUrl = '/api/blogs/upload';
                          const token = localStorage.getItem('token');
                          const res = await axios.post(uploadUrl, uploadData, {
                            headers: { 
                              'Content-Type': 'multipart/form-data',
                              ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                            }
                          });
                          if (res.data.success || res.data.url) {
                            const url = res.data.url;
                            setFormData(prev => ({ 
                              ...prev, 
                              featured_image: url,
                              og_image: prev.og_image || url
                            }));
                            showMessage('success', 'Cover image uploaded successfully!');
                          } else {
                            showMessage('error', res.data.error || 'Failed to upload cover image');
                          }
                        } catch (err) {
                          console.error(err);
                          showMessage('error', err.response?.data?.message || 'Failed to upload cover image');
                        } finally {
                          setSaving(false);
                        }
                      }}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="w-10 h-10 bg-gray-50 group-hover:bg-indigo-50 rounded-xl flex items-center justify-center transition-colors">
                        <ImageIcon className="text-gray-400 group-hover:text-indigo-600" size={20} />
                      </div>
                      <p className="text-xs font-bold text-gray-700">Click to upload image file</p>
                      <p className="text-[10px] text-gray-400">PNG, JPG, WEBP, GIF up to 5MB</p>
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={formData.featured_image}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value, og_image: prev.og_image || e.target.value }))}
                      placeholder="Or paste remote image URL (https://images.unsplash.com/...)"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Right side: Live preview panel */}
                <div className="border border-gray-250 bg-gray-50 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden group">
                  {formData.featured_image ? (
                    <>
                      <img 
                        src={formData.featured_image} 
                        alt="Featured Preview" 
                        className="w-full h-full max-h-[160px] object-cover rounded-xl border border-gray-200" 
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, featured_image: '', og_image: prev.og_image === prev.featured_image ? '' : prev.og_image }))}
                        className="absolute top-6 right-6 p-1.5 bg-red-600 hover:bg-red-750 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md"
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <div className="text-center space-y-1">
                      <ImageIcon className="text-gray-300 mx-auto" size={32} />
                      <p className="text-[11px] font-bold text-gray-400">No cover image selected</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Short Excerpt */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Short Excerpt / Summary (2-3 lines)
              </label>
              <textarea
                rows="2"
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value, seo_description: prev.seo_description || e.target.value }))}
                placeholder="Brief summary displayed on homepage cards and search listings..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Tags Input */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Tags (Reusable keywords)
              </label>
              <div className="flex items-center space-x-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="Type tag name and press Enter..."
                  className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold rounded-xl"
                >
                  Add Tag
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center space-x-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium border border-indigo-100">
                    <span>#{tag}</span>
                    <button type="button" onClick={() => handleRemoveTag(tag)} className="text-indigo-400 hover:text-indigo-900">
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Main Rich Text Content Editor */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Article Content Editor *
              </label>
              <RichTextEditor
                value={formData.content}
                onChange={(contentHtml) => setFormData(prev => ({ ...prev, content: contentHtml }))}
                placeholder="Write your blog post with formatted headings, images, code snippets, quotes, and lists..."
              />
            </div>

            {/* Publishing Settings & Featured Toggle */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Publication Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Publish Date / Time
                </label>
                <input
                  type="datetime-local"
                  value={formData.publish_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, publish_date: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono"
                />
              </div>

              <div className="flex items-center space-x-3 pt-6">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                  className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor="is_featured" className="text-xs font-bold text-gray-900 cursor-pointer">
                  Feature on Homepage ("Latest Insights" cards)
                </label>
              </div>
            </div>

            {/* Collapsible SEO & Meta Tags Panel */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              <button
                type="button"
                onClick={() => setShowSeoSettings(!showSeoSettings)}
                className="w-full px-6 py-4 bg-gray-50 flex items-center justify-between text-xs font-bold text-gray-800 hover:bg-gray-100 transition"
              >
                <span className="flex items-center space-x-2">
                  <Globe size={16} className="text-indigo-600" />
                  <span>Search Engine Optimization (SEO) & Open Graph Settings</span>
                </span>
                <span>{showSeoSettings ? '▲ Hide' : '▼ Expand'}</span>
              </button>

              {showSeoSettings && (
                <div className="p-6 space-y-4 bg-white border-t border-gray-200">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Meta SEO Title</label>
                    <input
                      type="text"
                      value={formData.seo_title}
                      onChange={(e) => setFormData(prev => ({ ...prev, seo_title: e.target.value }))}
                      placeholder="Title tag shown in Google search results"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Meta SEO Description</label>
                    <textarea
                      rows="2"
                      value={formData.seo_description}
                      onChange={(e) => setFormData(prev => ({ ...prev, seo_description: e.target.value }))}
                      placeholder="Meta description for search engine snippets (150-160 chars)"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Meta Keywords</label>
                    <input
                      type="text"
                      value={formData.seo_keywords}
                      onChange={(e) => setFormData(prev => ({ ...prev, seo_keywords: e.target.value }))}
                      placeholder="AI agents, enterprise automation, ERP AI"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      )}

      {/* TAB 3: CATEGORY MANAGER */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Manage Blog Categories</h2>
            <button
              onClick={() => {
                setCatForm({ id: null, name: '', slug: '', description: '', color: '#6366F1' })
                setCatModalOpen(true)
              }}
              className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow flex items-center space-x-1"
            >
              <Plus size={15} />
              <span>Add Category</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded-full" style={{ backgroundColor: cat.color || '#6366F1' }} />
                    <span className="font-bold text-gray-900 text-base">{cat.name}</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-bold">
                    {cat.post_count || 0} posts
                  </span>
                </div>
                <div className="text-xs font-mono text-gray-400">Slug: {cat.slug}</div>
                <p className="text-xs text-gray-600 line-clamp-2">{cat.description || 'No description provided.'}</p>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-end space-x-2">
                  <button
                    onClick={() => {
                      setCatForm({ ...cat })
                      setCatModalOpen(true)
                    }}
                    className="p-1.5 text-gray-500 hover:text-indigo-600 rounded hover:bg-gray-100"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="p-1.5 text-gray-500 hover:text-red-600 rounded hover:bg-gray-100"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add/Edit Category Modal */}
          {catModalOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {catForm.id ? 'Edit Category' : 'Create New Category'}
                </h3>
                <form onSubmit={handleSaveCategory} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Category Name *</label>
                    <input
                      type="text"
                      required
                      value={catForm.name}
                      onChange={(e) => setCatForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Color Palette Badge</label>
                    <input
                      type="color"
                      value={catForm.color}
                      onChange={(e) => setCatForm(prev => ({ ...prev, color: e.target.value }))}
                      className="w-full h-10 p-1 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                    <textarea
                      rows="2"
                      value={catForm.description}
                      onChange={(e) => setCatForm(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                    />
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl"
                    >
                      Save Category
                    </button>
                    <button
                      type="button"
                      onClick={() => setCatModalOpen(false)}
                      className="flex-1 py-2 bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: TAG MANAGER */}
      {activeTab === 'tags' && (
        <div className="space-y-6">
          {/* Add Tag Form */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Manage Reusable Tags</h2>
            <form onSubmit={handleSaveTag} className="flex items-center space-x-3 max-w-lg">
              <input
                type="text"
                required
                value={tagForm.name}
                onChange={(e) => setTagForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter new tag name..."
                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow"
              >
                Add Tag
              </button>
            </form>
          </div>

          {/* Tags Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {tagsList.map(tag => (
              <div key={tag.id} className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="font-bold text-gray-900 text-xs">#{tag.name}</span>
                  <div className="text-[10px] text-gray-400">{tag.post_count || 0} posts</div>
                </div>
                <button
                  onClick={() => handleDeleteTag(tag.id)}
                  className="text-gray-400 hover:text-red-600 p-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminBlog
