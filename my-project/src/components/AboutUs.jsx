import React from "react";
import { motion } from "framer-motion";
import { Users, HeartPulse, ShieldCheck } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="relative bg-white py-20 px-6 overflow-hidden">
      {/* Floating Illustration Orbs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.div
          className="absolute w-40 h-40 bg-purple-200 rounded-full opacity-30 top-10 left-10"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-28 h-28 bg-pink-200 rounded-full opacity-30 bottom-20 right-20"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left Side – Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex justify-center"
        >
          <div className="relative w-72 h-72">
            {/* Core Circle */}
            <div className="absolute inset-0 bg-purple-100 rounded-full shadow-lg flex items-center justify-center">
              <HeartPulse className="w-16 h-16 text-purple-600" />
            </div>

            {/* Floating Icons */}
            <motion.div
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-2xl shadow-md"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Users className="w-8 h-8 text-pink-500" />
            </motion.div>
            <motion.div
              className="absolute -bottom-6 right-1/4 bg-white p-4 rounded-2xl shadow-md"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <ShieldCheck className="w-8 h-8 text-green-500" />
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side – Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-purple-600">Us</span>
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            We are a passionate team dedicated to transforming healthcare with AI.
            Our mission is to provide instant, reliable, and personalized health
            insights that empower individuals to take better care of themselves.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            With a focus on innovation, privacy, and trust, we’re building the
            future of health—one step at a time.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
