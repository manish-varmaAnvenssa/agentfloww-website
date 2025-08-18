import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Type, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Quote, List, Link } from 'lucide-react';

const TextBlock = ({ content, onUpdate, onDelete, isSelected, onSelect }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(content || '');
  const [showToolbar, setShowToolbar] = useState(false);

  const handleTextChange = (e) => {
    setText(e.target.value);
    onUpdate({ content: e.target.value });
  };

  const applyFormat = (format) => {
    const textarea = document.getElementById('text-block-textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);
    
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `__${selectedText}__`;
        break;
      case 'quote':
        formattedText = `> ${selectedText}`;
        break;
      case 'list':
        formattedText = `- ${selectedText}`;
        break;
      default:
        formattedText = selectedText;
    }
    
    const newText = text.substring(0, start) + formattedText + text.substring(end);
    setText(newText);
    onUpdate({ content: newText });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative group ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onSelect}
    >
      {/* Block Header */}
      <div className="absolute -top-8 left-0 bg-blue-500 text-white px-2 py-1 rounded-t text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        Text Block
      </div>

      {/* Toolbar */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-12 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex items-center space-x-1 z-10"
        >
          <button
            onClick={() => applyFormat('bold')}
            className="p-1 hover:bg-gray-100 rounded"
            title="Bold"
          >
            <Bold size={14} />
          </button>
          <button
            onClick={() => applyFormat('italic')}
            className="p-1 hover:bg-gray-100 rounded"
            title="Italic"
          >
            <Italic size={14} />
          </button>
          <button
            onClick={() => applyFormat('underline')}
            className="p-1 hover:bg-gray-100 rounded"
            title="Underline"
          >
            <Underline size={14} />
          </button>
          <div className="w-px h-4 bg-gray-300 mx-1"></div>
          <button
            onClick={() => applyFormat('quote')}
            className="p-1 hover:bg-gray-100 rounded"
            title="Quote"
          >
            <Quote size={14} />
          </button>
          <button
            onClick={() => applyFormat('list')}
            className="p-1 hover:bg-gray-100 rounded"
            title="List"
          >
            <List size={14} />
          </button>
          <div className="w-px h-4 bg-gray-300 mx-1"></div>
          <button
            onClick={onDelete}
            className="p-1 hover:bg-red-100 text-red-600 rounded"
            title="Delete Block"
          >
            ×
          </button>
        </motion.div>
      )}

      {/* Text Content */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 min-h-[100px]">
        {isEditing ? (
          <textarea
            id="text-block-textarea"
            value={text}
            onChange={handleTextChange}
            onBlur={() => setIsEditing(false)}
            className="w-full h-full min-h-[80px] border-none outline-none resize-none text-gray-800"
            placeholder="Enter your text here..."
            autoFocus
          />
        ) : (
          <div
            className="w-full h-full min-h-[80px] text-gray-800 cursor-text"
            onClick={() => setIsEditing(true)}
            dangerouslySetInnerHTML={{
              __html: text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/__(.*?)__/g, '<u>$1</u>')
                .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-600">$1</blockquote>')
                .replace(/^- (.*$)/gm, '<li>$1</li>')
                .replace(/\n/g, '<br>')
            }}
          />
        )}
      </div>

      {/* Add Content Button */}
      {text === '' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-gray-600 flex items-center space-x-2"
          >
            <Type size={20} />
            <span>Click to add text</span>
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default TextBlock; 