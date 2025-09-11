import React, { useState, useEffect } from "react";

const AIHealthHero = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(files);
    setIsAnalyzing(true);
    setAnalysisComplete(false);

    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 2000);
  };

  // Healthcare icons as SVG components
  const HeartbeatIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  );

  const StethoscopeIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6v0a6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.2.3"/>
      <path d="M8 15v1a6 6 0 006 6v0a6 6 0 006-6v-4"/>
      <circle cx="20" cy="10" r="2"/>
    </svg>
  );

  const PillIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
      <path d="m8.5 8.5 7 7"/>
    </svg>
  );

  const ShieldIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );

  const FloatingHealthIcon = ({ Icon, size, color, top, left, delay, rotationDelay }) => (
    <div
      className={`absolute ${color} opacity-15 transition-all duration-1000 ease-out`}
      style={{
        width: size,
        height: size,
        top,
        left,
        animation: `float 8s ease-in-out infinite, rotate360 20s linear infinite`,
        animationDelay: `${delay}, ${rotationDelay}`,
        transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
      }}
    >
      <Icon className="w-full h-full" />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Enhanced Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(5deg);
          }
          66% {
            transform: translateY(-10px) rotate(-3deg);
          }
        }
        @keyframes pulse-medical {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.6;
          }
        }
        @keyframes rotate360 {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes slideInUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -468px 0;
          }
          100% {
            background-position: 468px 0;
          }
        }
        .shimmer {
          animation: shimmer 2s infinite;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 468px 100%;
        }
      `}</style>

      {/* Healthcare Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingHealthIcon 
          Icon={HeartbeatIcon} 
          size="60px" 
          color="text-red-500" 
          top="15%" 
          left="10%" 
          delay="0s" 
          rotationDelay="0s" 
        />
        <FloatingHealthIcon 
          Icon={StethoscopeIcon} 
          size="80px" 
          color="text-blue-600" 
          top="25%" 
          left="85%" 
          delay="2s" 
          rotationDelay="5s" 
        />
        <FloatingHealthIcon 
          Icon={PillIcon} 
          size="50px" 
          color="text-green-600" 
          top="70%" 
          left="15%" 
          delay="4s" 
          rotationDelay="10s" 
        />
        <FloatingHealthIcon 
          Icon={ShieldIcon} 
          size="70px" 
          color="text-purple-600" 
          top="65%" 
          left="80%" 
          delay="1s" 
          rotationDelay="7s" 
        />
        <FloatingHealthIcon 
          Icon={HeartbeatIcon} 
          size="40px" 
          color="text-pink-500" 
          top="45%" 
          left="90%" 
          delay="3s" 
          rotationDelay="12s" 
        />

        {/* Medical Cross Pattern */}
        <div className="absolute top-20 left-20">
          <div className="w-8 h-8 relative">
            <div className="absolute w-2 h-8 bg-red-400 opacity-20 left-3"></div>
            <div className="absolute h-2 w-8 bg-red-400 opacity-20 top-3"></div>
          </div>
        </div>
        <div className="absolute bottom-32 right-32">
          <div className="w-6 h-6 relative">
            <div className="absolute w-1.5 h-6 bg-blue-400 opacity-20 left-2.5"></div>
            <div className="absolute h-1.5 w-6 bg-blue-400 opacity-20 top-2.5"></div>
          </div>
        </div>

        {/* DNA Helix Illustration */}
        <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2">
          <div className="relative w-16 h-24">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-indigo-400 rounded-full opacity-30"
                style={{
                  top: `${i * 20}%`,
                  left: `${Math.sin(i * 0.8) * 20 + 30}px`,
                  animation: `pulse-medical 2s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Professional Header Badge */}
      <div className="mb-8 relative z-10">
        <div className="flex items-center justify-center">
          <div className="bg-white border border-slate-200 shadow-sm px-6 py-3 rounded-full hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-slate-700 font-medium text-sm">AI-Powered Healthcare Platform</span>
              <div className="w-5 h-5 text-slate-400">
                <ShieldIcon className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="text-center max-w-5xl mx-auto mb-16 relative z-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-8 text-slate-800">
          <span className="inline-block" style={{ animation: "slideInUp 0.8s ease-out" }}>
            Advanced AI-Driven 
          </span>
          <br />
          <span 
            className="text-blue-600 inline-block relative"
            style={{ animation: "slideInUp 0.8s ease-out 0.2s both" }}
          >
            Health Analysis
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-blue-600 opacity-20 rounded-full"></div>
          </span>
        </h1>

        <p 
          className="text-slate-600 text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-light"
          style={{ animation: "slideInUp 0.8s ease-out 0.4s both" }}
        >
          Upload your medical documents and receive comprehensive AI-powered health insights, 
          safety recommendations, and personalized treatment suggestions with medical-grade precision.
        </p>

        {/* Enhanced CTA Section */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          style={{ animation: "slideInUp 0.8s ease-out 0.6s both" }}
        >
          <button
            className="group bg-slate-900 text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 relative overflow-hidden"
            onClick={() => document.getElementById("file-upload").click()}
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>Start Analysis</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 shimmer"></div>
          </button>
          
          
        </div>

        {/* Hidden File Input */}
        <input
          id="file-upload"
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          className="hidden"
          onChange={handleFileUpload}
        />

        {/* Enhanced Analysis Status */}
        {isAnalyzing && (
          <div className="flex items-center justify-center space-x-3 text-blue-600 font-medium">
            <div className="w-5 h-5">
              <HeartbeatIcon className="w-full h-full animate-pulse" />
            </div>
            <span className="animate-pulse">Analyzing your medical data...</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
        {analysisComplete && (
          <div className="bg-green-50 border border-green-200 rounded-full px-6 py-3 inline-flex items-center space-x-2 text-green-700 font-medium">
            <div className="w-5 h-5">
              <ShieldIcon className="w-full h-full" />
            </div>
            <span>✅ Analysis Complete - Health insights ready!</span>
          </div>
        )}
        </div>
        
    </div>
  );
};

export default AIHealthHero;
