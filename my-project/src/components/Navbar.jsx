import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, Sun, Moon, Menu, X, LogIn, UserPlus, User, LogOut, MessageCircle, Heart } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  const handleNavigation = (sectionId) => {
    // If we're on the home page, scroll to section
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to home page with hash
      navigate(`/#${sectionId}`);
    }
    // Close mobile menu after clicking a link
    setIsMobileMenuOpen(false);
  };

  // Handle home page scrolling after navigation with hash
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const sectionId = location.hash.substring(1); // Remove the #
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Small delay to ensure page is loaded
    }
  }, [location]);

  const scrollToSection = (sectionId) => {
    handleNavigation(sectionId);
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const handleChatNavigation = () => {
    navigate('/second');
    setIsProfileDropdownOpen(false);
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
            <div className={`p-2 rounded-full mr-3 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                : 'bg-gradient-to-r from-blue-400 to-purple-500'
            }`}>
              <Heart className="h-6 w-6 text-white" />
            </div>
            <button
              onClick={() => {
                if (location.pathname === '/') {
                  scrollToSection('home');
                } else {
                  navigate('/');
                }
              }}
              className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}
            >
              HealthMindAI
            </button>
          </div>

          {/* Centered Navigation Pills - Desktop */}
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

          {/* Right Side - Auth Buttons and Theme Toggle */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm hover:shadow-md"
              aria-label="Toggle theme"
            >
              <div className="relative w-5 h-5">
                <Sun className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                  isDarkMode
                    ? 'opacity-100 rotate-0 scale-100 text-yellow-400'
                    : 'opacity-0 rotate-90 scale-75 text-yellow-600'
                }`} />
                <Moon className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                  isDarkMode
                    ? 'opacity-0 -rotate-90 scale-75 text-gray-400'
                    : 'opacity-100 rotate-0 scale-100 text-gray-600'
                }`} />
              </div>
            </button>

            {/* Auth Buttons / Profile */}
            {isAuthenticated ? (
              <div className="hidden md:block relative" ref={profileDropdownRef}>
                {/* Profile Button */}
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-full font-medium transition-all ${
                    isDarkMode
                      ? 'bg-gray-700/50 hover:bg-gray-600/50 text-white border border-gray-600'
                      : 'bg-white/50 hover:bg-gray-50/80 text-gray-900 border border-gray-200'
                  } shadow-lg hover:shadow-xl`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                      : 'bg-gradient-to-r from-blue-400 to-purple-500'
                  }`}>
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">
                      {user?.name || 'User'}
                    </span>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      {user?.email || 'user@example.com'}
                    </span>
                  </div>
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-64 rounded-xl shadow-xl border backdrop-blur-md ${
                    isDarkMode
                      ? 'bg-gray-800/90 border-gray-700/50'
                      : 'bg-white/90 border-gray-200/50'
                  } py-2 z-50`}>
                    {/* User Info Header */}
                    <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isDarkMode 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                            : 'bg-gradient-to-r from-blue-400 to-purple-500'
                        }`}>
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {user?.name || 'User'}
                          </p>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                            {user?.email || 'user@example.com'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <button
                        onClick={handleChatNavigation}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all ${
                          isDarkMode
                            ? 'hover:bg-gray-700/50 text-gray-200'
                            : 'hover:bg-gray-100/50 text-gray-700'
                        }`}
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span className="font-medium">AI Chat</span>
                      </button>
                      
                      <button
                        onClick={handleLogout}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all ${
                          isDarkMode
                            ? 'hover:bg-red-700/20 text-red-300 hover:text-red-200'
                            : 'hover:bg-red-50/50 text-red-600 hover:text-red-700'
                        }`}
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <button
                  onClick={() => navigate('/login')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all ${
                    isDarkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all ${
                    isDarkMode
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden mt-2 rounded-2xl backdrop-blur-md border shadow-lg p-4 ${
            isDarkMode
              ? 'bg-gray-900/30 border-gray-700/30'
              : 'bg-blue-50/30 border-blue-200/30'
          }`}>
            <div className="space-y-2">
              <button
                onClick={() => scrollToSection('home')}
                className={`block w-full text-left rounded-lg px-4 py-3 text-base font-medium transition-all ${
                  isDarkMode
                    ? 'text-gray-300 hover:bg-gray-700/40 hover:text-white'
                    : 'text-slate-700 hover:bg-blue-100/40 hover:text-slate-800'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className={`block w-full text-left rounded-lg px-4 py-3 text-base font-medium transition-all ${
                  isDarkMode
                    ? 'text-gray-300 hover:bg-gray-700/40 hover:text-white'
                    : 'text-slate-700 hover:bg-blue-100/40 hover:text-slate-800'
                }`}
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`block w-full text-left rounded-lg px-4 py-3 text-base font-medium transition-all ${
                  isDarkMode
                    ? 'text-gray-300 hover:bg-gray-700/40 hover:text-white'
                    : 'text-slate-700 hover:bg-blue-100/40 hover:text-slate-800'
                }`}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`block w-full text-left rounded-lg px-4 py-3 text-base font-medium transition-all ${
                  isDarkMode
                    ? 'text-gray-300 hover:bg-gray-700/40 hover:text-white'
                    : 'text-slate-700 hover:bg-blue-100/40 hover:text-slate-800'
                }`}
              >
                Contact
              </button>

              {/* Mobile Auth/Profile Section */}
              {isAuthenticated ? (
                <>
                  {/* User Info in Mobile */}
                  <div className={`px-4 py-3 rounded-lg ${
                    isDarkMode ? 'bg-gray-700/30' : 'bg-gray-100/30'
                  } mb-2`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                          : 'bg-gradient-to-r from-blue-400 to-purple-500'
                      }`}>
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {user?.name || 'User'}
                        </p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                          {user?.email || 'user@example.com'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleChatNavigation}
                    className={`block w-full text-left rounded-lg px-4 py-3 text-base font-medium transition-all ${
                      isDarkMode
                        ? 'text-blue-300 hover:bg-blue-700/40 hover:text-blue-100'
                        : 'text-blue-600 hover:bg-blue-100/40 hover:text-blue-800'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="h-4 w-4" />
                      <span>AI Chat</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className={`block w-full text-left rounded-lg px-4 py-3 text-base font-medium transition-all ${
                      isDarkMode
                        ? 'text-red-300 hover:bg-red-700/40 hover:text-red-100'
                        : 'text-red-600 hover:bg-red-100/40 hover:text-red-800'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </div>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className={`block w-full text-left rounded-lg px-4 py-3 text-base font-medium transition-all ${
                      isDarkMode
                        ? 'text-blue-300 hover:bg-blue-700/40 hover:text-blue-100'
                        : 'text-blue-600 hover:bg-blue-100/40 hover:text-blue-800'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <LogIn className="h-4 w-4" />
                      <span>Login</span>
                    </div>
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className={`block w-full text-left rounded-lg px-4 py-3 text-base font-medium transition-all ${
                      isDarkMode
                        ? 'text-green-300 hover:bg-green-700/40 hover:text-green-100'
                        : 'text-green-600 hover:bg-green-100/40 hover:text-green-800'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <UserPlus className="h-4 w-4" />
                      <span>Sign Up</span>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
