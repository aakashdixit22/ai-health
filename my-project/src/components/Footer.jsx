import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Heart, Shield, Users, Mail, Phone, MapPin } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Footer = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <footer className={`border-t transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700 text-gray-300' 
        : 'bg-gradient-to-br from-gray-50 via-white to-blue-50 border-gray-200 text-gray-700'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Brand Section - Enhanced */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-xl ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                  : 'bg-gradient-to-r from-blue-400 to-purple-500'
              }`}>
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>HealthMindAI</h3>
            </div>
            <p className={`leading-relaxed text-base mb-8 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Empowering your health journey with intelligent AI-driven insights, personalized recommendations, and comprehensive wellness support.
            </p>
            
            {/* Key Features & Contact Combined */}
            <div className="space-y-6">
              {/* Key Features */}
              <div>
                <h5 className={`text-sm font-semibold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Why Choose Us</h5>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Shield className={`h-4 w-4 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      HIPAA Compliant & Secure
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className={`h-4 w-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Trusted by 10,000+ Users
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Navigation */}
              <div>
                <h5 className={`text-sm font-semibold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Quick Navigation</h5>
                <div className="flex flex-wrap gap-4">
                  {[
                    { text: "About Us", href: "#about" },
                    { text: "Features", href: "#features" },
                    { text: "How it Works", href: "#features" },
                    { text: "Testimonials", href: "#testimonials" }
                  ].map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(item.href.substring(1));
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          // If not on home page, navigate to home first
                          window.location.href = `/${item.href}`;
                        }
                      }}
                      className={`text-sm transition-colors hover:text-purple-500 cursor-pointer ${
                        isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600'
                      }`}
                    >
                      {item.text}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Newsletter Section */}
          <div>
            <h4 className={`text-lg font-semibold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Get In Touch
            </h4>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Mail className={`h-4 w-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  support@healthmindai.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className={`h-4 w-4 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className={`h-4 w-4 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`} />
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  San Francisco, CA
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h5 className={`text-sm font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Subscribe for Health Tips</h5>
              <p className={`mb-4 text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Get the latest health insights and wellness tips delivered to your inbox
              </p>
              <form className="flex flex-col gap-3">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`px-4 py-2.5 rounded-l-lg flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 border ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  <button
                    type="submit"
                    className={`px-6 py-2.5 rounded-r-lg text-white text-sm font-medium transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                        : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
                    } hover:shadow-lg transform hover:scale-105`}
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} pt-8`}></div>

        {/* Bottom Bar - Restructured */}
        <div className="flex flex-col items-center gap-6">
          {/* Social Icons - Horizontal Layout */}
          <div className="flex items-center gap-6">
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Connect with us:
            </span>
            <div className="flex items-center gap-3">
              {[
                { Icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-500" },
                { Icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-500" },
                { Icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-500" },
                { Icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-600" }
              ].map(({ Icon, href, label, color }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  className={`p-3 rounded-full transition-all duration-200 transform hover:scale-110 hover:-translate-y-1 ${
                    isDarkMode 
                      ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700' 
                      : 'bg-gray-100 text-gray-500 hover:bg-white border border-gray-200 hover:shadow-lg'
                  } ${color}`}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright & Love Message */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-center">
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              © {new Date().getFullYear()} HealthMindAI. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Made with
              </span>
              <Heart className={`h-4 w-4 ${isDarkMode ? 'text-red-400' : 'text-red-500'} animate-pulse`} />
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                for better health worldwide
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
