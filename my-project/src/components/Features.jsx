
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import {
  HeartPulse,
  Stethoscope,
  Pill,
  Activity,
  ShieldCheck,
  Brain,
  Bot,
} from "lucide-react";

const features = [
  {
    title: "AI Health Insights",
    desc: "Instant recommendations powered by AI to help you stay healthy and safe.",
    icon: HeartPulse,
    colSpan: "md:col-span-2",
  },
  {
    title: "Symptom Analysis",
    desc: "Upload symptoms and get quick, accurate AI-driven assessments.",
    icon: Stethoscope,
    colSpan: "md:col-span-1",
  },
  {
    title: "Medicine Suggestions",
    desc: "Personalized medicine recommendations tailored for you.",
    icon: Pill,
    colSpan: "md:col-span-1",
  },
  {
    title: "Smart Fitness Tracking",
    desc: "Comprehensive activity monitoring with step counting, calorie tracking, workout analysis, and personalized fitness goals. Get AI-powered insights to optimize your exercise routines and achieve your health targets faster.",
    icon: Activity,
    colSpan: "md:col-span-2",
  },
  {
    title: "Privacy First",
    desc: "Your data stays safe and encrypted with advanced protection.",
    icon: ShieldCheck,
    colSpan: "md:col-span-1",
  },
  {
    title: "Mental Health Support",
    desc: "AI-powered stress management and mindfulness recommendations.",
    icon: Brain,
    colSpan: "md:col-span-1",
  },
  {
    title: "24/7 Virtual Health Assistant",
    desc: "Always available to answer your health queries anytime, anywhere.",
    icon: Bot,
    colSpan: "md:col-span-1",
  },
];

const Features = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 relative">
      {/* Section Heading */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          <span className={isDarkMode ? "text-white" : "text-gray-900"}>
            Explore{" "}
          </span>
          <span className={isDarkMode ? "text-blue-400" : "text-gray-900"}>
            Our Features
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className={`text-lg max-w-2xl mx-auto ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Smart AI-powered features designed to keep you healthy, safe, and
          informed.
        </motion.p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.12,
                duration: 0.6,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.03, rotate: 0.5 }}
              className={`group relative p-6 rounded-2xl shadow-lg backdrop-blur-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between ${
                feature.colSpan
              } ${
                isDarkMode
                  ? "bg-gray-800/70 border border-blue-400/30 hover:border-blue-400/50"
                  : "bg-white/70 border hover:shadow-2xl"
              }`}
            >
              {/* Animated Glow Background */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition duration-700 ${
                isDarkMode
                  ? "bg-gradient-to-tr from-blue-400/20 to-transparent"
                  : "bg-gradient-to-tr from-purple-100/50 to-transparent"
              }`}></div>

              {/* Header with Icon and Title */}
              <div className="relative flex items-center gap-4 mb-4">
                <div className={`flex items-center justify-center w-14 h-14 rounded-xl group-hover:scale-110 transition-transform duration-500 ${
                  isDarkMode
                    ? "bg-gradient-to-tr from-blue-500/20 to-blue-400/10"
                    : "bg-gradient-to-tr from-purple-500/10 to-purple-100/30"
                }`}>
                  <Icon className={`w-7 h-7 ${
                    isDarkMode ? "text-blue-400" : "text-purple-600"
                  }`} />
                </div>
                <h3 className={`text-xl font-semibold relative z-10 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  {feature.title}
                </h3>
              </div>

              {/* Description */}
              <p className={`relative z-10 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}>{feature.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;

