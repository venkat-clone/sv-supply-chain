"use client";
import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-0  backdrop-blur-md shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <h1
          className="text-2xl font-extrabold tracking-wide cursor-pointer hover:text-blue-500 transition"
          tabIndex={0}
          role="link"
          aria-label="Go to homepage"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          onKeyDown={(e) =>
            e.key === "Enter" && window.scrollTo({ top: 0, behavior: "smooth" })
          }
        >
          SV Supply Chain
        </h1>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-8 text-lg font-medium">
          {["home", "about", "services", "why-us", "contact"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="hover:text-blue-400 transition duration-300 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {item.charAt(0).toUpperCase() + item.slice(1).replace("-", " ")}
            </a>
          ))}
        </div>

        {/* Action Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </a>
          <a
            href="/get-started"
            className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-5 py-2 rounded-lg font-semibold shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Get Started
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 bg-opacity-95 backdrop-blur-md shadow-inner">
          <div className="flex flex-col space-y-4 px-6 py-6 text-lg font-medium">
            {["home", "about", "services", "why-us", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="hover:text-blue-400 transition duration-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1).replace("-", " ")}
              </a>
            ))}
            <a
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </a>
            <a
              href="/get-started"
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-5 py-2 rounded-lg font-semibold shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
