import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import AboutUs from "./components/AboutUs";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Second from "./Pages/Second";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import { useTheme } from "./contexts/ThemeContext";

function App() {
  const { isDarkMode } = useTheme();
  const location = useLocation();

  // Check if current path is an auth page
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
        : 'bg-gradient-to-br from-blue-50 via-white to-green-50'
    }`}>
      {/* Only show navbar on non-auth pages */}
      {!isAuthPage && <Navbar />}

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
        {/* Auth Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Second Page */}
        <Route path="/second" element={<Second />} />
      </Routes>
    </div>
  );
}

export default App;
