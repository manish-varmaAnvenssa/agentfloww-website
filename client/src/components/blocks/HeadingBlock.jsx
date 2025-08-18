import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heading1, Heading2, Heading3, Type, Trash2 } from 'lucide-react';

const HeadingBlock = ({ content, onUpdate, onDelete, isSelected, onSelect }) => {
  const [text, setText] = useState(content?.text || '');
  const [level, setLevel] = useState(content?.level || 2);
  const [isEditing, setIsEditing] = useState(false);

  const handleTextChange = (e) => {
    setText(e.target.value);
    onUpdate({ text: e.target.value, level });
  };

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
    onUpdate({ text, level: newLevel });
  };

  const getHeadingStyle = () => {
    switch (level) {
      case 1:
        return 'text-4xl font-bold text-gray-900';
      case 2:
        return 'text-3xl font-semibold text-gray-800';
      case 3:
        return 'text-2xl font-medium text-gray-700';
      default:
        return 'text-2xl font-medium text-gray-700';
    }
  };

  const getHeadingIcon = () => {
    switch (level) {
      case 1:
        return <Heading1 size={16} />;
      case 2:
        return <Heading2 size={16} />;
      case 3:
        return <Heading3 size={16} />;
      default:
        return <Heading2 size={16} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative group ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onSelect}
    >
      {/* Block Header */}
      <div className="absolute -top-8 left-0 bg-purple-500 text-white px-2 py-1 rounded-t text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        Heading Block
      </div>

      {/* Toolbar */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-12 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex items-center space-x-1 z-10"
        >
          <button
            onClick={() => handleLevelChange(1)}
            className={`p-1 rounded ${level === 1 ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            title="Heading 1"
          >
            <Heading1 size={14} />
          </button>
          <button
            onClick={() => handleLevelChange(2)}
            className={`p-1 rounded ${level === 2 ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            title="Heading 2"
          >
            <Heading2 size={14} />
          </button>
          <button
            onClick={() => handleLevelChange(3)}
            className={`p-1 rounded ${level === 3 ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            title="Heading 3"
          >
            <Heading3 size={14} />
          </button>
          <div className="w-px h-4 bg-gray-300 mx-1"></div>
          <button
            onClick={onDelete}
            className="p-1 hover:bg-red-100 text-red-600 rounded"
            title="Delete Block"
          >
            <Trash2 size={14} />
          </button>
        </motion.div>
      )}

      {/* Heading Content */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 min-h-[60px]">
        {isEditing ? (
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            onBlur={() => setIsEditing(false)}
            className={`w-full border-none outline-none bg-transparent ${getHeadingStyle()}`}
            placeholder={`Enter ${level === 1 ? 'main' : level === 2 ? 'section' : 'subsection'} heading...`}
            autoFocus
          />
        ) : (
          <div
            className={`w-full cursor-text ${getHeadingStyle()}`}
            onClick={() => setIsEditing(true)}
          >
            {text || `Heading ${level}`}
          </div>
        )}
      </div>

      {/* Add Content Button */}
      {text === '' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-gray-600 flex items-center space-x-2"
          >
            {getHeadingIcon()}
            <span>Click to add heading</span>
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default HeadingBlock; 