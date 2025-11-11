import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const testimonials = [
  {
    name: "Anaya",
    role: "Software Engineer",
    feedback:
      "This platform helped me understand my health better with instant AI recommendations. Super intuitive and reliable!",
    avatar: "https://i.pravatar.cc/150?img=44",
  },
  {
    name: "Abhay",
    role: "Medical Student",
    feedback:
      "The personalized suggestions were spot-on. I love the smooth experience and clear guidance.",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    name: "Rahul Verma",
    role: "Computer Science Student",
    feedback:
      "The UI feels premium and the AI insights are impressive. Definitely a game-changer for health tech!",
    avatar: "https://i.pravatar.cc/150?img=14",
  },
  {
    name: "Aryan",
    role: "Product Manager",
    feedback:
      "The personalized suggestions were spot-on. I love the smooth experience and clear guidance.",
    avatar: "https://i.pravatar.cc/150?img=12",
  }
];

const Testimonials = () => {
  const { isDarkMode } = useTheme();

  return (
    <section
      className={`py-24 relative overflow-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800" : "bg-gray-50"
      }`}
    >
      {/* Decorative blurred shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className={`absolute top-20 left-12 w-48 h-48 rounded-full blur-3xl opacity-30 ${
            isDarkMode ? "bg-purple-700/30" : "bg-purple-100"
          }`}
        />
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          className={`absolute bottom-24 right-12 w-64 h-64 rounded-full blur-3xl opacity-30 ${
            isDarkMode ? "bg-pink-700/30" : "bg-pink-100"
          }`}
        />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2
          className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          What Our Users Say
        </h2>
        <p
          className={`text-lg mb-16 max-w-2xl mx-auto ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Hear from real people who've experienced the power of our AI-driven
          health insights.
        </p>

        {/* Smooth scrolling carousel */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-10"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
          >
            {[...testimonials, ...testimonials].map((testimonial, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.04, y: -4 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={`flex-shrink-0 w-80 rounded-2xl shadow-md hover:shadow-xl p-8 flex flex-col items-center text-center border ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 shadow-gray-900/30 hover:shadow-gray-900/50"
                    : "bg-white border-gray-100"
                }`}
              >
                <motion.img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className={`w-20 h-20 rounded-full mb-5 border-2 ${
                    isDarkMode ? "border-gray-500" : "border-gray-200"
                  }`}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3 + (idx % testimonials.length),
                    ease: "easeInOut",
                  }}
                />
                <p
                  className={`text-base italic mb-5 leading-relaxed ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  "{testimonial.feedback}"
                </p>
                <h4
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {testimonial.name}
                </h4>
                <span
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {testimonial.role}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
