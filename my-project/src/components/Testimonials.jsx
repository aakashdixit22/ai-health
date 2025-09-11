import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Aakash Dixit",
    role: "Software Engineer",
    feedback:
      "This platform helped me understand my health better with instant AI recommendations. Super intuitive and reliable!",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Priya Sharma",
    role: "Product Manager",
    feedback:
      "The personalized suggestions were spot-on. I love the smooth experience and clear guidance.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Rahul Verma",
    role: "Data Scientist",
    feedback:
      "The UI feels premium and the AI insights are impressive. Definitely a game-changer for health tech!",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background subtle effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-40"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-56 h-56 bg-pink-100 rounded-full blur-3xl opacity-40"
        />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          What Our Users Say
        </h2>
        <p className="text-lg text-gray-600 mb-16">
          Real feedback from people who experienced the power of AI health recommendations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, rotate: -1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer"
            >
              <motion.img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mb-4"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3 + index,
                  ease: "easeInOut",
                }}
              />
              <p className="text-gray-700 italic mb-4">"{testimonial.feedback}"</p>
              <h4 className="text-lg font-semibold text-gray-900">
                {testimonial.name}
              </h4>
              <span className="text-sm text-gray-500">{testimonial.role}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
