import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">
              SV Supply Chain
            </h3>
            <p className="text-sm leading-relaxed">
              Reliable logistics solutions across India. Trusted by industries
              for speed, safety, and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">
              Contact Us
            </h4>
            <p className="text-sm">Hyderabad, Telangana, India</p>
            <p className="text-sm mt-1">Email: info@svlogistics.in</p>
            <p className="text-sm">Phone: +91-98765-43210</p>
          </div>
        </div>

        <hr className="border-gray-700 mb-4" />

        <div className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} SV Supply Chain Solutions. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
