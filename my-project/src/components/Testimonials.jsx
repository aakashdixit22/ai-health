// // import React from "react";
// import { motion } from "framer-motion";

// const testimonials = [
//   {
//     name: "Aakash Dixit",
//     role: "Software Engineer",
//     feedback:
//       "This platform helped me understand my health better with instant AI recommendations. Super intuitive and reliable!",
//     avatar: "https://i.pravatar.cc/150?img=32",
//   },
//   {
//     name: "Priya Sharma",
//     role: "Product Manager",
//     feedback:
//       "The personalized suggestions were spot-on. I love the smooth experience and clear guidance.",
//     avatar: "https://i.pravatar.cc/150?img=47",
//   },
//   {
//     name: "Rahul Verma",
//     role: "Data Scientist",
//     feedback:
//       "The UI feels premium and the AI insights are impressive. Definitely a game-changer for health tech!",
//     avatar: "https://i.pravatar.cc/150?img=15",
//   },
// ];

// const Testimonials = () => {
//   return (
//     <section className="py-20 bg-gray-50 relative overflow-hidden">
//       {/* Background bubbles */}
//       <div className="absolute inset-0 pointer-events-none">
//         <motion.div
//           animate={{ y: [0, 20, 0] }}
//           transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
//           className="absolute top-20 left-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-40"
//         />
//         <motion.div
//           animate={{ y: [0, -20, 0] }}
//           transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
//           className="absolute bottom-20 right-10 w-56 h-56 bg-pink-100 rounded-full blur-3xl opacity-40"
//         />
//       </div>

//       <div className="max-w-6xl mx-auto text-center relative z-10">
//         <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
//           What Our Users Say
//         </h2>
//         <p className="text-lg text-gray-600 mb-16">
//           Real feedback from people who experienced the power of AI health recommendations.
//         </p>

//         {/* Moving carousel container */}
//         <div className="overflow-hidden">
//           <motion.div
//             className="flex gap-8"
//             animate={{ x: ["0%", "-100%"] }}
//             transition={{
//               repeat: Infinity,
//               duration: 20,
//               ease: "linear",
//             }}
//           >
//             {[...testimonials, ...testimonials].map((testimonial, index) => (
//               <motion.div
//                 key={index}
//                 whileHover={{ scale: 1.05, rotate: -1 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//                 className="bg-white shadow-lg rounded-2xl p-6 flex-shrink-0 w-80 text-center cursor-pointer"
//               >
//                 <motion.img
//                   src={testimonial.avatar}
//                   alt={testimonial.name}
//                   className="w-20 h-20 rounded-full mx-auto mb-4"
//                   animate={{ y: [0, -6, 0] }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 3 + (index % testimonials.length),
//                     ease: "easeInOut",
//                   }}
//                 />
//                 <p className="text-gray-700 italic mb-4">
//                   "{testimonial.feedback}"
//                 </p>
//                 <h4 className="text-lg font-semibold text-gray-900">
//                   {testimonial.name}
//                 </h4>
//                 <span className="text-sm text-gray-500">{testimonial.role}</span>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonials;
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Anay",
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
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative blurred shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute top-20 left-12 w-48 h-48 bg-purple-100 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          className="absolute bottom-24 right-12 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-30"
        />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight mb-4">
          What Our Users Say
        </h2>
        <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
          Hear from real people who’ve experienced the power of our AI-driven health insights.
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
                className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-md hover:shadow-xl p-8 flex flex-col items-center text-center border border-gray-100"
              >
                <motion.img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mb-5 border-2 border-gray-200"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3 + (idx % testimonials.length),
                    ease: "easeInOut",
                  }}
                />
                <p className="text-gray-700 text-base italic mb-5 leading-relaxed">
                  “{testimonial.feedback}”
                </p>
                <h4 className="text-lg font-semibold text-gray-900">
                  {testimonial.name}
                </h4>
                <span className="text-sm text-gray-500">{testimonial.role}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
