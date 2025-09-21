import React from "react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl mx-auto ">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Get in <span className="text-yellow-400">Touch</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Let us know your logistics needs — we're just a message away.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Contact Information
              </h3>
              <p className="text-gray-400">
                SV Supply Chain Solutions
                <br />
                Hyderabad, Telangana, India
              </p>
            </div>

            <div>
              <p>
                📞{" "}
                <a href="tel:+919876543210" className="hover:text-yellow-400">
                  +91-98765-43210
                </a>
              </p>
              <p>
                📧{" "}
                <a
                  href="mailto:info@svsupplychain.com"
                  className="hover:text-yellow-400"
                >
                  info@svsupplychain.com
                </a>
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-2">Working Hours</h4>
              <p className="text-gray-400">Mon - Sat: 9:00 AM – 7:00 PM</p>
              <p className="text-gray-400">Sunday: Closed</p>
            </div>
          </div>

          {/* Contact Form (UI only – no backend) */}
          <form className="bg-white text-gray-800 p-8 rounded-xl shadow-lg space-y-6">
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Message</label>
              <textarea
                rows="4"
                required
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us about your requirements..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold py-3 rounded-md transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
