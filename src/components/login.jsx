import React, { useState, useEffect } from "react";
import { User, LogIn } from "lucide-react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    // Empty useEffect - can be safely removed if no side effects needed
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsSubmitting(true);

    // Simulate a brief loading state for better UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    const user = {
      username: username.trim(),
      loginTime: new Date().toISOString(),
    };

    onLogin(user);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-black overflow-hidden">
      {/* Animated SVG gradient background - neon cyan, magenta, blue, no green */}
      <svg
        className="absolute inset-0 w-full h-full z-0"
        style={{ minHeight: "100vh", pointerEvents: "none" }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="bg-grad1" cx="60%" cy="40%" r="80%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.3" />
            <stop offset="60%" stopColor="#ff00ff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.95" />
          </radialGradient>
          <radialGradient id="bg-grad2" cx="30%" cy="80%" r="70%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.95" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg-grad1)" />
        <rect width="100%" height="100%" fill="url(#bg-grad2)" />
        {/* Neon floating shapes (cyan, magenta, blue) */}
        <circle
          cx="80%"
          cy="20%"
          r="120"
          fill="#00ffff"
          fillOpacity="0.15"
        >
          <animate
            attributeName="cy"
            values="20%;30%;20%"
            dur="12s"
            repeatCount="indefinite"
          />
        </circle>
        <ellipse
          cx="15%"
          cy="70%"
          rx="90"
          ry="60"
          fill="#ff00ff"
          fillOpacity="0.15"
        >
          <animate
            attributeName="cx"
            values="15%;25%;15%"
            dur="14s"
            repeatCount="indefinite"
          />
        </ellipse>
        <circle
          cx="50%"
          cy="90%"
          r="70"
          fill="#6366f1"
          fillOpacity="0.12"
        >
          <animate
            attributeName="r"
            values="70;100;70"
            dur="10s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* White card with dark text for better contrast */}
      <div
        className="relative z-10 w-full max-w-md rounded-3xl shadow-2xl p-10
        bg-white border border-gray-100
        transition-all duration-700
        hover:shadow-cyan-500/30"
        style={{
          boxShadow: "0 8px 32px 0 rgba(0, 255, 255, 0.15), 0 1.5px 8px 0 rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Logo and title - updated colors */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30 animate-spin-slow">
            <User className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 mt-5 mb-2 tracking-tight animate-fade-in-up">
            Task<span className="text-cyan-600">Tracker</span>
          </h1>
          <p className="text-gray-600 text-lg font-medium animate-fade-in-up">
            Organize your day, beautifully.
          </p>
        </div>

        {/* Login form - updated for better contrast */}
        <form onSubmit={handleSubmit} className="space-y-7">
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Username
            </label>
            <div className="relative group">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-4 pl-12 bg-gray-100 border border-gray-200 rounded-xl
                  focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300
                  placeholder-gray-400 text-gray-800 group-hover:bg-gray-50
                  shadow-inner"
                placeholder="Enter your username"
                required
                disabled={isSubmitting}
                autoComplete="off"
              />
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
          </div>

          <button
            type="submit"
            disabled={!username.trim() || isSubmitting}
            className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white py-4 px-4
              rounded-xl font-semibold hover:from-cyan-600 hover:to-purple-700 focus:ring-2 focus:ring-cyan-400
              focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
              flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/30 hover:shadow-purple-500/30
              animate-fade-in-up"
            style={{ animationDelay: "400ms" }}
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : username.trim() ? (
              <>
                <LogIn className="w-5 h-5" />
                <span className="text-lg">Sign In</span>
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span className="text-lg">Enter Username</span>
              </>
            )}
          </button>
        </form>

        {/* Footer - updated colors */}
        <div
          className="mt-10 text-center animate-fade-in-up"
          style={{ animationDelay: "600ms" }}
        >
          <p className="text-gray-600 text-sm">
            New here? Just enter any username to get started!
          </p>
          <div className="mt-4 flex justify-center gap-2 text-xs text-gray-500">
            <span>✨ Designed for productivity</span>
            <span>•</span>
            <span>Made with React & Tailwind</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
