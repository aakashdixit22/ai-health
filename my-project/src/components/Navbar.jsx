import React from "react";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const Button = ({ children, size, className = "", ...props }) => {
    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    };
    
    return (
      <button
        className={`group inline-flex items-center justify-center rounded-full font-medium transition-all 
                   bg-gradient-to-r from-purple-200 to-blue-300 hover:from-purple-400 hover:to-blue-400 
                   text-black shadow-lg hover:shadow-xl ${sizeClasses[size] || sizeClasses.md} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };

  return (
    <nav className="relative z-20 w-full">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-6 items-center justify-between">
          {/* Logo on Left */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-black">HealthMindAI</span>
          </div>

          {/* Centered Navigation Pills */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-1 rounded-full bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-blue-500/10 backdrop-blur-xl border border-purple-500/20 p-1">
              <button
                onClick={() => scrollToSection('home')}
                className="rounded-full px-4 py-2 text-sm font-medium text-black transition-all hover:bg-purple-500/20 hover:text-black"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="rounded-full px-4 py-2 text-sm font-medium text-black transition-all hover:bg-purple-500/20 hover:text-black"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="rounded-full px-4 py-2 text-sm font-medium text-black transition-all hover:bg-purple-500/20 hover:text-black"
              >
                Agents
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="rounded-full px-4 py-2 text-sm font-medium text-black transition-all hover:bg-purple-500/20 hover:text-black"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="rounded-full px-4 py-2 text-sm font-medium text-black transition-all hover:bg-purple-500/20 hover:text-black"
              >
                Contact
              </button>
            </div>
          </div>

          {/* CTA Button on Right */}
          <div className="flex items-center space-x-2">
            <Button size="sm">
              <span className="group-hover:hidden">Get Started</span>
              <span className="hidden group-hover:inline">Coming Soon</span> <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
