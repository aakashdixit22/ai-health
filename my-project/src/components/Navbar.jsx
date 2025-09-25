import React, { useState } from "react";
import { ArrowRight, Sun, Moon, Menu, X, LogIn, UserPlus } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu after clicking a link
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
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
            <button
              onClick={() => scrollToSection('home')}
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

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className={`hidden md:flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all ${
                  isDarkMode
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                <span>Logout</span>
              </button>
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

              {/* Mobile Auth Buttons */}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className={`block w-full text-left rounded-lg px-4 py-3 text-base font-medium transition-all ${
                    isDarkMode
                      ? 'text-red-300 hover:bg-red-700/40 hover:text-red-100'
                      : 'text-red-600 hover:bg-red-100/40 hover:text-red-800'
                  }`}
                >
                  Logout
                </button>
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
                    Login
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className={`block w-full text-left rounded-lg px-4 py-3 text-base font-medium transition-all ${
                      isDarkMode
                        ? 'text-green-300 hover:bg-green-700/40 hover:text-green-100'
                        : 'text-green-600 hover:bg-green-100/40 hover:text-green-800'
                    }`}
                  >
                    Sign Up
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
