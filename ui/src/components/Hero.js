"use client";

import React from "react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative text-white min-h-screen flex items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/international-logistics.1.14.avif')" }}
    >
      {/* Blue overlay on background image */}
      <div className="absolute inset-0 bg-blue-900 bg-opacity-50"></div>

      <div className="container mx-auto md:px-12 lg:px-24 relative z-10 flex flex-col md:flex-row items-center justify-between max-w-8xl">
        {/* Left Side: Text Content */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            Logistics Excellence for Modern India
          </h1>
          <p className="text-lg md:text-2xl font-light max-w-lg drop-shadow-md">
            Partnering for a streamlined supply chain experience.
          </p>
          <p className="italic font-semibold text-yellow-300 max-w-md">
            Please login to place your orders and manage your account.
          </p>

          <div className="mt-8 flex justify-center md:justify-start gap-6">
            <a
              href="/login"
              className="inline-block bg-yellow-500 text-gray-900 px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-yellow-400 transition duration-300 transform hover:scale-105"
            >
              Login
            </a>
            <a
              href="#about"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition duration-300 transform hover:scale-105"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
