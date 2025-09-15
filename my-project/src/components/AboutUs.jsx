import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, HeartPulse, ShieldCheck } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const AboutUs = () => {
  const { isDarkMode } = useTheme();
  const [showMore, setShowMore] = useState(false);

  return (
    <div
      className={`relative py-20 px-6 overflow-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* Floating Illustration Orbs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.div
          className={`absolute w-40 h-40 rounded-full opacity-30 top-10 left-10 ${
            isDarkMode ? "bg-purple-700/30" : "bg-purple-200"
          }`}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className={`absolute w-28 h-28 rounded-full opacity-30 bottom-20 right-20 ${
            isDarkMode ? "bg-pink-700/30" : "bg-pink-200"
          }`}
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex justify-center"
        >
          <div className="relative w-72 h-72">
            <div
              className={`absolute inset-0 rounded-full shadow-lg flex items-center justify-center ${
                isDarkMode
                  ? "bg-purple-900/30 shadow-purple-900/20"
                  : "bg-purple-100"
              }`}
            >
              <HeartPulse className="w-16 h-16 text-purple-600" />
            </div>

            <motion.div
              className={`absolute -top-6 left-1/2 transform -translate-x-1/2 p-4 rounded-2xl shadow-md ${
                isDarkMode ? "bg-gray-800 shadow-gray-900/30" : "bg-white"
              }`}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Users className="w-8 h-8 text-pink-500" />
            </motion.div>
            <motion.div
              className={`absolute -bottom-6 right-1/4 p-4 rounded-2xl shadow-md ${
                isDarkMode ? "bg-gray-800 shadow-gray-900/30" : "bg-white"
              }`}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <ShieldCheck className="w-8 h-8 text-green-500" />
            </motion.div>
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center text-center md:text-left"
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            About <span className="text-purple-600">Us</span>
          </h2>
          <p
            className={`text-lg mb-6 leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            We are a passionate team dedicated to transforming healthcare with
            AI. Our mission is to provide instant, reliable, and personalized
            health insights that empower individuals to take better care of
            themselves.
          </p>
          <p
            className={`text-lg leading-relaxed mb-4 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            With a focus on innovation, privacy, and trust, we're building the
            future of health—one step at a time. Our platform bridges
            cutting-edge technology and compassionate care to create a healthier
            world.
          </p>

          {showMore && (
            <div className="space-y-4 mb-4">
              <p
                className={`text-lg leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Over the years, we've partnered with leading hospitals and
                research institutions, delivering AI-driven solutions that save
                lives and improve patient outcomes.
              </p>
              <p
                className={`text-lg leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Our team comprises data scientists, healthcare professionals,
                and designers who believe healthcare should be accessible,
                efficient, and empowering for everyone.
              </p>
            </div>
          )}

          <button
            onClick={() => setShowMore(!showMore)}
            className={`mt-4 px-5 py-2 rounded-xl transition-colors duration-300 ${
              isDarkMode
                ? "bg-purple-700 text-white hover:bg-purple-600"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            {showMore ? "Show Less" : "Read More"}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
