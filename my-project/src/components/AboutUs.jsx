// // import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Users, HeartPulse, ShieldCheck } from "lucide-react";

// const AboutUs = () => {
//   const [showMore, setShowMore] = useState(false);

//   return (
//     <div className="relative bg-white py-20 px-6 overflow-hidden">
//       {/* Floating Illustration Orbs */}
//       <div className="absolute inset-0 -z-10 pointer-events-none">
//         <motion.div
//           className="absolute w-40 h-40 bg-purple-200 rounded-full opacity-30 top-10 left-10"
//           animate={{ y: [0, -20, 0] }}
//           transition={{ duration: 6, repeat: Infinity }}
//         />
//         <motion.div
//           className="absolute w-28 h-28 bg-pink-200 rounded-full opacity-30 bottom-20 right-20"
//           animate={{ y: [0, 20, 0] }}
//           transition={{ duration: 5, repeat: Infinity }}
//         />
//       </div>

//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
//         {/* Left Side – Illustration */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="relative flex justify-center"
//         >
//           <div className="relative w-72 h-72">
//             <div className="absolute inset-0 bg-purple-100 rounded-full shadow-lg flex items-center justify-center">
//               <HeartPulse className="w-16 h-16 text-purple-600" />
//             </div>

//             <motion.div
//               className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-2xl shadow-md"
//               animate={{ y: [0, -10, 0] }}
//               transition={{ duration: 4, repeat: Infinity }}
//             >
//               <Users className="w-8 h-8 text-pink-500" />
//             </motion.div>
//             <motion.div
//               className="absolute -bottom-6 right-1/4 bg-white p-4 rounded-2xl shadow-md"
//               animate={{ y: [0, 10, 0] }}
//               transition={{ duration: 5, repeat: Infinity }}
//             >
//               <ShieldCheck className="w-8 h-8 text-green-500" />
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Right Side – Text and Functionality */}
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="flex flex-col justify-center text-center md:text-left"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//             About <span className="text-purple-600">Us</span>
//           </h2>
//           <p className="text-lg text-gray-600 mb-6 leading-relaxed">
//             We are a passionate team dedicated to transforming healthcare with AI.
//             Our mission is to provide instant, reliable, and personalized health
//             insights that empower individuals to take better care of themselves.
//           </p>
//           <p className="text-lg text-gray-600 leading-relaxed mb-4">
//             With a focus on innovation, privacy, and trust, we’re building the
//             future of health—one step at a time. Our platform bridges cutting-edge
//             technology and compassionate care to create a healthier world.
//           </p>

//           {showMore && (
//             <div className="space-y-4 text-gray-600 mb-4">
//               <p>
//                 Over the years, we’ve partnered with leading hospitals and research
//                 institutions, delivering AI-driven solutions that save lives and
//                 improve patient outcomes.
//               </p>
//               <p>
//                 Our team comprises data scientists, healthcare professionals, and
//                 designers who believe that healthcare should be accessible,
//                 efficient, and empowering for everyone.
//               </p>
//             </div>
//           )}

//           <button
//             onClick={() => setShowMore(!showMore)}
//             className="mt-4 px-5 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-300"
//           >
//             {showMore ? "Show Less" : "Read More"}
//           </button>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, HeartPulse, ShieldCheck } from "lucide-react";

const AboutUs = () => {
  const [showMore, setShowMore] = useState(false);

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
            <div className="absolute inset-0 bg-purple-100 rounded-full shadow-lg flex items-center justify-center">
              <HeartPulse className="w-16 h-16 text-purple-600" />
            </div>

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

        {/* Right Side – Text and Functionality */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-purple-600">Us</span>
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            We are a passionate team dedicated to transforming healthcare with AI.
            Our mission is to provide instant, reliable, and personalized health
            insights that empower individuals to take better care of themselves.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            With a focus on innovation, privacy, and trust, we’re building the
            future of health—one step at a time. Our platform bridges cutting-edge
            technology and compassionate care to create a healthier world.
          </p>

          {showMore && (
            <div className="space-y-4 text-gray-600 mb-4">
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                Over the years, we’ve partnered with leading hospitals and research
                institutions, delivering AI-driven solutions that save lives and
                improve patient outcomes.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                Our team comprises data scientists, healthcare professionals, and
                designers who believe that healthcare should be accessible,
                efficient, and empowering for everyone.
              </p>
            </div>
          )}

          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-4 px-5 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-300"
          >
            {showMore ? "Show Less" : "Read More"}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
