import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Health</h3>
          <p className="text-gray-500 leading-relaxed">
            AI-driven health insights, symptom analysis, and wellness support —
            designed to keep you safe, healthy, and informed.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Company</h4>
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
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Resources</h4>
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
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Stay Updated
          </h4>
          <p className="text-gray-500 mb-4">
            Subscribe to get the latest updates and health tips.
          </p>
          <form className="flex items-center">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-l-lg w-full focus:outline-none border border-gray-300"
            />
            <button
              type="submit"
              className="bg-purple-600 px-4 py-2 rounded-r-lg text-white hover:bg-purple-500 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} AI Health. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-5 mt-4 md:mt-0">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-gray-500 hover:text-purple-600 transition-colors"
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
