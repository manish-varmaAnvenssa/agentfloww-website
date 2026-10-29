import React, { useState, useRef, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Image, Link, List, Type, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Quote, X } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from '../utils/api';

const RichTextEditor = ({ value, onChange, placeholder = "Start writing your blog post..." }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const quillRef = useRef(null);

  // Disable ReactQuill's own toolbar – we use our custom one
  const modules = {
    toolbar: false,
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'align',
    'link', 'image', 'blockquote', 'code-block',
    'color', 'background'
  ];

  const getEditor = useCallback(() => {
    return quillRef.current?.getEditor();
  }, []);

  const applyFormat = useCallback((format, value) => {
    const quill = getEditor();
    if (!quill) return;
    quill.focus();
    const range = quill.getSelection(true);
    quill.format(format, value);
  }, [getEditor]);

  const toggleFormat = useCallback((format) => {
    const quill = getEditor();
    if (!quill) return;
    quill.focus();
    const range = quill.getSelection(true) || { index: 0, length: 0 };
    const currentFormat = quill.getFormat(range.index, range.length);
    quill.format(format, !currentFormat[format]);
  }, [getEditor]);

  const insertImage = () => {
    if (imageUrl) {
      const quill = getEditor();
      if (!quill) return;
      quill.focus();
      const range = quill.getSelection(true) || { index: quill.getLength(), length: 0 };
      quill.insertEmbed(range.index, 'image', imageUrl);
      setImageUrl('');
      setShowImageModal(false);
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      const quill = getEditor();
      if (!quill) return;
      quill.focus();
      const range = quill.getSelection(true) || { index: 0, length: 0 };
      if (range.length > 0) {
        quill.format('link', url);
      } else {
        quill.insertText(range.index, url, 'link', url);
      }
    }
  };

  const ToolbarBtn = ({ onClick, title, children, active }) => (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault(); // prevent losing editor focus
        onClick();
      }}
      title={title}
      className={`p-1.5 rounded transition-colors ${active ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100 text-gray-700'}`}
    >
      {children}
    </button>
  );

  return (
    <div className="space-y-0">
      {/* Custom Toolbar */}
      <div className="bg-white border border-gray-200 rounded-t-lg px-2 py-1.5 flex flex-wrap gap-0.5 items-center">
        {/* Headings dropdown */}
        <div className="flex items-center pr-2 mr-1 border-r border-gray-200">
          <Type size={14} className="text-gray-400 mr-1" />
          <select
            className="text-xs border-none bg-transparent focus:outline-none cursor-pointer text-gray-700"
            defaultValue="normal"
            onChange={(e) => {
              const quill = getEditor();
              if (!quill) return;
              quill.focus();
              const v = e.target.value;
              quill.format('header', v === 'normal' ? false : parseInt(v));
            }}
          >
            <option value="normal">Paragraph</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
          </select>
        </div>

        {/* Text Formatting */}
        <div className="flex items-center gap-0.5 pr-2 mr-1 border-r border-gray-200">
          <ToolbarBtn onClick={() => toggleFormat('bold')} title="Bold"><Bold size={14} /></ToolbarBtn>
          <ToolbarBtn onClick={() => toggleFormat('italic')} title="Italic"><Italic size={14} /></ToolbarBtn>
          <ToolbarBtn onClick={() => toggleFormat('underline')} title="Underline"><Underline size={14} /></ToolbarBtn>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-0.5 pr-2 mr-1 border-r border-gray-200">
          <ToolbarBtn onClick={() => applyFormat('list', 'ordered')} title="Ordered List"><List size={14} /></ToolbarBtn>
          <ToolbarBtn onClick={() => applyFormat('list', 'bullet')} title="Bullet List">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="5" cy="6" r="2" fill="currentColor" stroke="none"/>
              <line x1="10" y1="6" x2="20" y2="6"/>
              <circle cx="5" cy="12" r="2" fill="currentColor" stroke="none"/>
              <line x1="10" y1="12" x2="20" y2="12"/>
              <circle cx="5" cy="18" r="2" fill="currentColor" stroke="none"/>
              <line x1="10" y1="18" x2="20" y2="18"/>
            </svg>
          </ToolbarBtn>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-0.5 pr-2 mr-1 border-r border-gray-200">
          <ToolbarBtn onClick={() => applyFormat('align', '')} title="Align Left"><AlignLeft size={14} /></ToolbarBtn>
          <ToolbarBtn onClick={() => applyFormat('align', 'center')} title="Align Center"><AlignCenter size={14} /></ToolbarBtn>
          <ToolbarBtn onClick={() => applyFormat('align', 'right')} title="Align Right"><AlignRight size={14} /></ToolbarBtn>
        </div>

        {/* Links and Images */}
        <div className="flex items-center gap-0.5 pr-2 mr-1 border-r border-gray-200">
          <ToolbarBtn onClick={insertLink} title="Insert Link"><Link size={14} /></ToolbarBtn>
          <ToolbarBtn onClick={() => setShowImageModal(true)} title="Insert Image"><Image size={14} /></ToolbarBtn>
        </div>

        {/* Blockquote */}
        <div className="flex items-center gap-0.5">
          <ToolbarBtn onClick={() => toggleFormat('blockquote')} title="Blockquote"><Quote size={14} /></ToolbarBtn>
        </div>
      </div>

      {/* Quill Editor (no built-in toolbar) */}
      <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg overflow-hidden">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          style={{ height: '380px', fontSize: '15px' }}
        />
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          onClick={() => {
            if (!uploading) {
              setImageUrl('');
              setShowImageModal(false);
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-sm border border-gray-100 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-bold text-gray-900 mb-4">Insert Image</h3>
            <div className="space-y-4 text-xs font-semibold text-gray-700">

              {/* File Upload */}
              <div>
                <label className="block text-gray-700 mb-2">Upload from computer</label>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploading}
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const uploadData = new FormData();
                    uploadData.append('image', file);
                    try {
                      setUploading(true);
                      const uploadUrl = '/api/blogs/upload';
                      const token = localStorage.getItem('token');
                      const res = await axios.post(uploadUrl, uploadData, {
                        headers: { 
                          'Content-Type': 'multipart/form-data',
                          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                        }
                      });
                      if (res.data.success || res.data.url) {
                        setImageUrl(res.data.url);
                      } else {
                        alert(res.data.error || 'Failed to upload image file');
                      }
                    } catch (err) {
                      console.error(err);
                      alert(err.response?.data?.message || 'Failed to upload image file');
                    } finally {
                      setUploading(false);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                />
                {uploading && <p className="text-[10px] text-indigo-600 mt-1 animate-pulse">Uploading...</p>}
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-3 text-gray-400 text-[9px] uppercase font-bold tracking-wider">Or</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* URL Input */}
              <div>
                <label className="block text-gray-700 mb-2">Paste Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {imageUrl && (
                <div className="border border-gray-200 rounded-lg overflow-hidden h-24 bg-gray-50 flex items-center justify-center p-2 relative">
                  <img src={imageUrl} alt="Preview" className="h-full object-contain rounded" />
                  <button
                    type="button"
                    onClick={() => setImageUrl('')}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <X size={10} />
                  </button>
                </div>
              )}

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={insertImage}
                  disabled={uploading || !imageUrl}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl disabled:opacity-50 transition-colors"
                >
                  Insert Image
                </button>
                <button
                  type="button"
                  onClick={() => { setImageUrl(''); setShowImageModal(false); }}
                  disabled={uploading}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 px-4 rounded-xl transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default RichTextEditor;