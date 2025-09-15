import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Footer = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <footer className={`border-t transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 border-gray-700 text-gray-300' 
        : 'bg-white border-gray-200 text-gray-700'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className={`text-2xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>AI Health</h3>
          <p className={`leading-relaxed ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            AI-driven health insights, symptom analysis, and wellness support —
            designed to keep you safe, healthy, and informed.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h4 className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Company</h4>
          <ul className="space-y-3">
            {["About Us", "Features", "Testimonials", "Contact"].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:text-purple-600 transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources Links */}
        <div>
          <h4 className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Resources</h4>
          <ul className="space-y-3">
            {["FAQ", "Support", "Blog", "Privacy Policy"].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:text-purple-600 transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Stay Updated
          </h4>
          <p className={`mb-4 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Subscribe to get the latest updates and health tips.
          </p>
          <form className="flex items-center">
            <input
              type="email"
              placeholder="Your email"
              className={`px-4 py-2 rounded-l-lg w-full focus:outline-none border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
            <button
              type="submit"
              className={`px-4 py-2 rounded-r-lg text-white transition-colors ${
                isDarkMode 
                  ? 'bg-purple-700 hover:bg-purple-600' 
                  : 'bg-purple-600 hover:bg-purple-500'
              }`}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            © {new Date().getFullYear()} AI Health. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-5 mt-4 md:mt-0">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className={`transition-colors hover:text-purple-600 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
