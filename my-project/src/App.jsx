// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Navbar from './components/Navbar'
// import Hero from './components/Hero'
// import Features from './components/Features'
// import AboutUs from './components/AboutUs'
// import Testimonials from './components/Testimonials'
// import Footer from './components/Footer'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <Navbar />
//       <section id="home">
//         <Hero />
//       </section>
//       <section id="features">
//         <Features />
//       </section>
//       <section id="about">
//         <AboutUs />
//       </section>
//       <section id="testimonials">
//         <Testimonials />
//       </section>
//       <section id="contact">
//         <Footer />
//       </section>
//     </>
//   )
// }

// export default App
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import AboutUs from "./components/AboutUs";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Second from "./Pages/Second";
import { useTheme } from "./contexts/ThemeContext";

function App() {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-green-50'
    }`}>
      <Navbar />
      <Routes>
        {/* Home Page with Sections */}
        <Route
          path="/"
          element={
            <>
              <section id="home">
                <Hero />
              </section>
              <section id="features">
                <Features />
              </section>
              <section id="about">
                <AboutUs />
              </section>
              <section id="testimonials">
                <Testimonials />
              </section>
              <section id="contact">
                <Footer />
              </section>
            </>
          }
        />
        {/* Second Page */}
        <Route path="/second" element={<Second />} />
      </Routes>
    </div>
  );
}

export default App;
