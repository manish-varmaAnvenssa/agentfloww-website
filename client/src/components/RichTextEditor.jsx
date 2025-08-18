import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Image, Link, List, Type, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const RichTextEditor = ({ value, onChange, placeholder = "Start writing your blog post..." }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const quillRef = useRef(null);

  // Custom toolbar with WordPress-like options
  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }], // H1, H2, H3
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link', 'image', 'blockquote', 'code-block'],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
      ],
      handlers: {
        image: () => setShowImageModal(true)
      }
    }
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'align',
    'link', 'image', 'blockquote', 'code-block',
    'color', 'background'
  ];

  const insertImage = () => {
    if (imageUrl) {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      quill.insertEmbed(range.index, 'image', imageUrl);
      setImageUrl('');
      setShowImageModal(false);
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      quill.insertText(range.index, url, 'link', url);
    }
  };

  return (
    <div className="space-y-4">
      {/* Custom Toolbar */}
      <div className="bg-white border border-gray-200 rounded-lg p-2 flex flex-wrap gap-1">
        {/* Headings */}
        <div className="flex items-center space-x-1 border-r border-gray-200 pr-2">
          <Type size={16} className="text-gray-500" />
          <select 
            className="text-sm border-none bg-transparent focus:outline-none"
            onChange={(e) => {
              const quill = quillRef.current.getEditor();
              const value = e.target.value;
              if (value === 'normal') {
                quill.format('header', false);
              } else {
                quill.format('header', parseInt(value));
              }
            }}
          >
            <option value="normal">Paragraph</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
          </select>
        </div>

        {/* Text Formatting */}
        <div className="flex items-center space-x-1 border-r border-gray-200 pr-2">
          <button
            onClick={() => {
              const quill = quillRef.current.getEditor();
              quill.format('bold', !quill.getFormat().bold);
            }}
            className="p-1 hover:bg-gray-100 rounded"
            title="Bold"
          >
            <Bold size={16} />
          </button>
          <button
            onClick={() => {
              const quill = quillRef.current.getEditor();
              quill.format('italic', !quill.getFormat().italic);
            }}
            className="p-1 hover:bg-gray-100 rounded"
            title="Italic"
          >
            <Italic size={16} />
          </button>
          <button
            onClick={() => {
              const quill = quillRef.current.getEditor();
              quill.format('underline', !quill.getFormat().underline);
            }}
            className="p-1 hover:bg-gray-100 rounded"
            title="Underline"
          >
            <Underline size={16} />
          </button>
        </div>

        {/* Lists */}
        <div className="flex items-center space-x-1 border-r border-gray-200 pr-2">
          <button
            onClick={() => {
              const quill = quillRef.current.getEditor();
              quill.format('list', 'ordered');
            }}
            className="p-1 hover:bg-gray-100 rounded"
            title="Numbered List"
          >
            <List size={16} />
          </button>
          <button
            onClick={() => {
              const quill = quillRef.current.getEditor();
              quill.format('list', 'bullet');
            }}
            className="p-1 hover:bg-gray-100 rounded"
            title="Bullet List"
          >
            <div className="w-4 h-4 flex flex-col justify-center items-center">
              <div className="w-1 h-1 bg-current rounded-full"></div>
            </div>
          </button>
        </div>

        {/* Alignment */}
        <div className="flex items-center space-x-1 border-r border-gray-200 pr-2">
          <button
            onClick={() => {
              const quill = quillRef.current.getEditor();
              quill.format('align', 'left');
            }}
            className="p-1 hover:bg-gray-100 rounded"
            title="Align Left"
          >
            <AlignLeft size={16} />
          </button>
          <button
            onClick={() => {
              const quill = quillRef.current.getEditor();
              quill.format('align', 'center');
            }}
            className="p-1 hover:bg-gray-100 rounded"
            title="Align Center"
          >
            <AlignCenter size={16} />
          </button>
          <button
            onClick={() => {
              const quill = quillRef.current.getEditor();
              quill.format('align', 'right');
            }}
            className="p-1 hover:bg-gray-100 rounded"
            title="Align Right"
          >
            <AlignRight size={16} />
          </button>
        </div>

        {/* Links and Images */}
        <div className="flex items-center space-x-1 border-r border-gray-200 pr-2">
          <button
            onClick={insertLink}
            className="p-1 hover:bg-gray-100 rounded"
            title="Insert Link"
          >
            <Link size={16} />
          </button>
          <button
            onClick={() => setShowImageModal(true)}
            className="p-1 hover:bg-gray-100 rounded"
            title="Insert Image"
          >
            <Image size={16} />
          </button>
        </div>

        {/* Blockquote */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => {
              const quill = quillRef.current.getEditor();
              quill.format('blockquote', !quill.getFormat().blockquote);
            }}
            className="p-1 hover:bg-gray-100 rounded"
            title="Blockquote"
          >
            <Quote size={16} />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          style={{ height: '400px' }}
        />
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowImageModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-medium mb-4">Insert Image</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={insertImage}
                  className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700"
                >
                  Insert
                </button>
                <button
                  onClick={() => setShowImageModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
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