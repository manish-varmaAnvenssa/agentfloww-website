import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Type, 
  Image, 
  Heading1, 
  Video, 
  List, 
  Quote, 
  Code,
  Eye,
  Settings,
  Save,
  ArrowLeft
} from 'lucide-react';
import TextBlock from './blocks/TextBlock';
import ImageBlock from './blocks/ImageBlock';
import HeadingBlock from './blocks/HeadingBlock';

const ElementorBuilder = ({ onSave, onBack, initialContent = [] }) => {
  const [blocks, setBlocks] = useState(initialContent);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [showBlockLibrary, setShowBlockLibrary] = useState(false);
  const [viewMode, setViewMode] = useState('edit'); // edit, preview

  const blockTypes = [
    { id: 'text', name: 'Text', icon: Type, color: 'bg-blue-500' },
    { id: 'heading', name: 'Heading', icon: Heading1, color: 'bg-purple-500' },
    { id: 'image', name: 'Image', icon: Image, color: 'bg-green-500' },
    { id: 'video', name: 'Video', icon: Video, color: 'bg-red-500' },
    { id: 'list', name: 'List', icon: List, color: 'bg-yellow-500' },
    { id: 'quote', name: 'Quote', icon: Quote, color: 'bg-indigo-500' },
    { id: 'code', name: 'Code', icon: Code, color: 'bg-gray-500' },
  ];

  const addBlock = (type) => {
    const newBlock = {
      id: Date.now().toString(),
      type,
      content: type === 'heading' ? { text: '', level: 2 } : '',
      position: blocks.length
    };
    setBlocks([...blocks, newBlock]);
    setSelectedBlock(newBlock.id);
    setShowBlockLibrary(false);
  };

  const updateBlock = (blockId, content) => {
    setBlocks(blocks.map(block => 
      block.id === blockId ? { ...block, content } : block
    ));
  };

  const deleteBlock = (blockId) => {
    setBlocks(blocks.filter(block => block.id !== blockId));
    setSelectedBlock(null);
  };

  const moveBlock = (fromIndex, toIndex) => {
    const newBlocks = [...blocks];
    const [movedBlock] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, movedBlock);
    setBlocks(newBlocks);
  };

  const renderBlock = (block) => {
    const props = {
      content: block.content,
      onUpdate: (content) => updateBlock(block.id, content),
      onDelete: () => deleteBlock(block.id),
      isSelected: selectedBlock === block.id,
      onSelect: () => setSelectedBlock(block.id)
    };

    switch (block.type) {
      case 'text':
        return <TextBlock {...props} />;
      case 'heading':
        return <HeadingBlock {...props} />;
      case 'image':
        return <ImageBlock {...props} />;
      default:
        return <TextBlock {...props} />;
    }
  };

  const handleSave = () => {
    onSave(blocks);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              Elementor-Style Page Builder
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode(viewMode === 'edit' ? 'preview' : 'edit')}
              className={`p-2 rounded-lg ${
                viewMode === 'preview' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
              title={viewMode === 'edit' ? 'Preview' : 'Edit'}
            >
              <Eye size={20} />
            </button>
            <button
              onClick={handleSave}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Save size={16} />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 p-4">
          <div className="space-y-4">
            {/* Block Library */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Block Library</h3>
              <div className="grid grid-cols-2 gap-2">
                {blockTypes.map((blockType) => {
                  const Icon = blockType.icon;
                  return (
                    <button
                      key={blockType.id}
                      onClick={() => addBlock(blockType.id)}
                      className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-center"
                    >
                      <div className={`w-8 h-8 ${blockType.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                        <Icon size={16} className="text-white" />
                      </div>
                      <span className="text-xs text-gray-700">{blockType.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Block Settings */}
            {selectedBlock && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Block Settings</h3>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600">
                    Block ID: {selectedBlock}
                  </p>
                  <button
                    onClick={() => deleteBlock(selectedBlock)}
                    className="mt-2 text-xs text-red-600 hover:text-red-700"
                  >
                    Delete Block
                  </button>
                </div>
              </div>
            )}

            {/* Page Settings */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Page Settings</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Layout</label>
                  <select className="w-full text-xs border border-gray-200 rounded px-2 py-1">
                    <option>Full Width</option>
                    <option>Contained</option>
                    <option>Boxed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Background</label>
                  <input
                    type="color"
                    className="w-full h-8 border border-gray-200 rounded"
                    defaultValue="#ffffff"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Add Block Button */}
            {blocks.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Start Building Your Page
                </h3>
                <p className="text-gray-600 mb-6">
                  Add blocks from the library to create your content
                </p>
                <button
                  onClick={() => setShowBlockLibrary(true)}
                  className="btn-primary"
                >
                  Add Your First Block
                </button>
              </motion.div>
            )}

            {/* Blocks */}
            <AnimatePresence>
              {blocks.map((block, index) => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-6"
                >
                  {renderBlock(block)}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Add More Blocks */}
            {blocks.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <button
                  onClick={() => setShowBlockLibrary(true)}
                  className="inline-flex items-center space-x-2 text-gray-500 hover:text-gray-700 border-2 border-dashed border-gray-300 rounded-lg px-6 py-4 hover:border-gray-400 transition-colors"
                >
                  <Plus size={20} />
                  <span>Add Block</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Block Library Modal */}
      {showBlockLibrary && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowBlockLibrary(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add Block</h3>
            <div className="grid grid-cols-2 gap-3">
              {blockTypes.map((blockType) => {
                const Icon = blockType.icon;
                return (
                  <button
                    key={blockType.id}
                    onClick={() => addBlock(blockType.id)}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-center"
                  >
                    <div className={`w-10 h-10 ${blockType.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <span className="text-sm text-gray-700">{blockType.name}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ElementorBuilder; 