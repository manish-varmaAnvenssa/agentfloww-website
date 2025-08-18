import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image, Upload, Settings, Trash2 } from 'lucide-react';

const ImageBlock = ({ content, onUpdate, onDelete, isSelected, onSelect }) => {
  const [imageUrl, setImageUrl] = useState(content?.url || '');
  const [imageAlt, setImageAlt] = useState(content?.alt || '');
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      
      // Create a temporary URL for preview
      const tempUrl = URL.createObjectURL(file);
      setImageUrl(tempUrl);
      onUpdate({ url: tempUrl, alt: file.name });
      
      // Simulate upload delay
      setTimeout(() => {
        setIsUploading(false);
      }, 1000);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        setIsUploading(true);
        const tempUrl = URL.createObjectURL(file);
        setImageUrl(tempUrl);
        onUpdate({ url: tempUrl, alt: file.name });
        setTimeout(() => {
          setIsUploading(false);
        }, 1000);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative group ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onSelect}
    >
      {/* Block Header */}
      <div className="absolute -top-8 left-0 bg-green-500 text-white px-2 py-1 rounded-t text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        Image Block
      </div>

      {/* Toolbar */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-12 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex items-center space-x-1 z-10"
        >
          <button
            onClick={() => document.getElementById('image-upload').click()}
            className="p-1 hover:bg-gray-100 rounded"
            title="Upload Image"
          >
            <Upload size={14} />
          </button>
          <button
            onClick={() => setImageAlt(prompt('Enter alt text:', imageAlt))}
            className="p-1 hover:bg-gray-100 rounded"
            title="Edit Alt Text"
          >
            <Settings size={14} />
          </button>
          <button
            onClick={onDelete}
            className="p-1 hover:bg-red-100 text-red-600 rounded"
            title="Delete Block"
          >
            <Trash2 size={14} />
          </button>
        </motion.div>
      )}

      {/* Image Content */}
      <div 
        className="bg-white border border-gray-200 rounded-lg p-4 min-h-[200px]"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {imageUrl ? (
          <div className="relative">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-auto max-h-[400px] object-cover rounded-lg"
            />
            {imageAlt && (
              <p className="text-sm text-gray-500 mt-2 italic">{imageAlt}</p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[200px] border-2 border-dashed border-gray-300 rounded-lg">
            {isUploading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                <p className="text-sm text-gray-500">Uploading...</p>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500 mb-2">
                  Drop an image here or click to upload
                </p>
                <button
                  onClick={() => document.getElementById('image-upload').click()}
                  className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                >
                  Choose Image
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </motion.div>
  );
};

export default ImageBlock; 