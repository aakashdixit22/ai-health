// import React from "react";
// import { motion } from "framer-motion";
// import { HeartPulse, Stethoscope, Pill, Activity, ShieldCheck, Brain } from "lucide-react";

// const features = [
//   {
//     title: "AI Health Insights",
//     desc: "Instant recommendations powered by AI to help you stay healthy and safe.",
//     icon: HeartPulse,
//     colSpan: "md:col-span-2",
//   },
//   {
//     title: "Symptom Analysis",
//     desc: "Upload symptoms and get quick, accurate AI-driven assessments.",
//     icon: Stethoscope,
//     colSpan: "md:col-span-1",
//   },
//   {
//     title: "Medicine Suggestions",
//     desc: "Personalized medicine recommendations tailored for you.",
//     icon: Pill,
//     colSpan: "md:col-span-1",
//   },
//   {
//     title: "Fitness Tracking",
//     desc: "Track your daily activities and get personalized fitness tips.",
//     icon: Activity,
//     colSpan: "md:col-span-2",
//   },
//   {
//     title: "Privacy First",
//     desc: "Your data stays safe and encrypted with advanced protection.",
//     icon: ShieldCheck,
//     colSpan: "md:col-span-1",
//   },
//   {
//     title: "Mental Health Support",
//     desc: "AI-powered stress management and mindfulness recommendations.",
//     icon: Brain,
//     colSpan: "md:col-span-1",
//   },
// ];

// const Features = () => {
//   return (
//     <div className="max-w-7xl mx-auto px-6 py-20">
//       {/* Section Heading */}
//       <div className="text-center mb-16">
//         <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//           Explore Our Features
//         </h2>
//         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//           Smart AI-powered features designed to keep you healthy, safe, and informed.
//         </p>
//       </div>

//       {/* Bento Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {features.map((feature, index) => {
//           const Icon = feature.icon;
//           return (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
//               whileHover={{ scale: 1.03, rotate: 1 }}
//               className={`p-6 rounded-2xl shadow-lg bg-white border hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${feature.colSpan}`}
//             >
//               <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 mb-4">
//                 <Icon className="w-6 h-6 text-purple-600" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 {feature.title}
//               </h3>
//               <p className="text-gray-600">{feature.desc}</p>
//             </motion.div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Features;

import React from "react";
import { motion } from "framer-motion";
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
    title: "Fitness Tracking",
    desc: "Track your daily activities and get personalized fitness tips.",
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
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 relative">
      {/* Section Heading */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Explore Our Features
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
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
              className={`group relative p-6 rounded-2xl shadow-lg bg-white/70 backdrop-blur-sm border hover:shadow-2xl transition-all duration-500 flex flex-col justify-between ${feature.colSpan}`}
            >
              {/* Animated Glow Background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-purple-100/50 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition duration-700"></div>

              {/* Icon */}
              <div className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-tr from-purple-500/10 to-purple-100/30 mb-4 group-hover:scale-110 transition-transform duration-500">
                <Icon className="w-7 h-7 text-purple-600" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2 relative z-10">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 relative z-10">{feature.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;
