import React, { useState } from 'react';
import { Upload, Sparkles, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

function Second() {
  const { isDarkMode } = useTheme();
  const [inputText, setInputText] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log('Files dropped:', e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log('Files selected:', e.target.files);
    }
  };

  const handleGenerate = () => console.log('Generating with AI...');
  const handleExportPDF = () => console.log('Exporting to PDF...');

  return (
    <div className={`min-h-screen p-6 pt-20 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-green-50'
    }`}>
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Hey, I am your Health Assistant
          </h1>
          <h2 className={`text-lg md:text-xl ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Upload files or describe your symptoms for instant insights
          </h2>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          className={`backdrop-blur-md rounded-2xl shadow-xl p-8 mb-6 border hover:shadow-2xl transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/70 border-gray-700' 
              : 'bg-white/70 border-gray-100'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
              dragActive
                ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/30'
                : `${
                    isDarkMode 
                      ? 'border-gray-600 hover:border-blue-400 hover:bg-gray-700/50' 
                      : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                  }`
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-blue-500 mb-3" />
              <p className={`text-lg font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-700'
              }`}>
                Drop your files here or click to browse
              </p>
              <p className={`text-sm mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Supports PDF, DOC, TXT, and image files
              </p>
            </div>
          </div>

          <div className="mt-6">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Or describe your symptoms or concerns here..."
              className={`w-full h-32 p-4 border rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-700/50 text-white placeholder-gray-400' 
                  : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={handleGenerate}
            className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <Sparkles className="h-5 w-5" />
            Generate with AI
          </button>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-4 px-8 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <FileText className="h-5 w-5" />
            Export to PDF
          </button>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className={`backdrop-blur-sm rounded-xl p-8 border shadow-lg ${
            isDarkMode 
              ? 'bg-gray-800/60 border-gray-700' 
              : 'bg-white/60 border-gray-100'
          }`}>
            <h3 className={`text-lg font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              How it works
            </h3>
            <div className={`grid md:grid-cols-3 gap-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {[
                { num: 1, color: 'blue', text: 'Upload documents or describe symptoms' },
                { num: 2, color: 'purple', text: 'AI analyzes and provides insights' },
                { num: 3, color: 'green', text: 'Export results as PDF' },
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center"
                >
                  <div className={`w-10 h-10 bg-${step.color}-100 dark:bg-${step.color}-900/30 rounded-full flex items-center justify-center mb-3 shadow-inner`}>
                    <span className={`text-${step.color}-600 dark:text-${step.color}-400 font-bold`}>{step.num}</span>
                  </div>
                  <p className="text-sm">{step.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Second;
