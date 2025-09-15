import React from "react";
import { ArrowRight, Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const Button = ({ children, size, className = "", ...props }) => {
    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    };
    
    return (
      <button
        className={`group inline-flex items-center justify-center rounded-full font-medium transition-all 
                   bg-gradient-to-r from-purple-200 to-blue-300 hover:from-purple-400 hover:to-blue-400 
                   text-black shadow-lg hover:shadow-xl ${sizeClasses[size] || sizeClasses.md} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };

  return (
    <nav className="relative z-20 w-full mt-2">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`flex h-16 items-center justify-between rounded-2xl backdrop-blur-md border shadow-lg px-6 ${
          isDarkMode 
            ? 'bg-gray-900/30 border-gray-700/30 shadow-gray-900/20' 
            : 'bg-blue-50/30 border-blue-200/30 shadow-blue-100/20'
        }`}>
          {/* Logo on Left */}
          <div className="flex items-center">
            <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
              HealthMindAI
            </span>
          </div>

          {/* Centered Navigation Pills */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className={`flex items-center space-x-1 rounded-full backdrop-blur-sm border p-1 shadow-inner ${
              isDarkMode 
                ? 'bg-gray-800/20 border-gray-600/40' 
                : 'bg-white/20 border-blue-200/40'
            }`}>
              <button
                onClick={() => scrollToSection('home')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isDarkMode 
                    ? 'text-gray-300 hover:bg-gray-700/40 hover:text-white' 
                    : 'text-slate-700 hover:bg-blue-100/40 hover:text-slate-800'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isDarkMode 
                    ? 'text-gray-300 hover:bg-gray-700/40 hover:text-white' 
                    : 'text-slate-700 hover:bg-blue-100/40 hover:text-slate-800'
                }`}
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isDarkMode 
                    ? 'text-gray-300 hover:bg-gray-700/40 hover:text-white' 
                    : 'text-slate-700 hover:bg-blue-100/40 hover:text-slate-800'
                }`}
              >
                Agents
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isDarkMode 
                    ? 'text-gray-300 hover:bg-gray-700/40 hover:text-white' 
                    : 'text-slate-700 hover:bg-blue-100/40 hover:text-slate-800'
                }`}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isDarkMode 
                    ? 'text-gray-300 hover:bg-gray-700/40 hover:text-white' 
                    : 'text-slate-700 hover:bg-blue-100/40 hover:text-slate-800'
                }`}
              >
                Contact
              </button>
            </div>
          </div>

          {/* CTA Button and Theme Toggle on Right */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-400' 
                  : 'bg-gray-700/20 hover:bg-gray-700/30 text-gray-700'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            {/* Get Started Button */}
            <Button size="sm">
              <span className="group-hover:hidden">Get Started</span>
              <span className="hidden group-hover:inline">Coming Soon</span> <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
