import React from "react";
import {
  GlobeAltIcon,
  TruckIcon,
  UsersIcon,
} from "@heroicons/react/24/outline"; // Optional, use only if available

const About = () => {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-6">
          About <span className="text-blue-600">SV Supply Chain Solutions</span>
        </h2>
        <p className="text-lg md:text-xl text-center text-gray-600 max-w-4xl mx-auto mb-12">
          Established in <strong>2018</strong> in Hyderabad, SV Supply Chain
          Solutions has become one of India’s most trusted logistics providers.
          Backed by over .
        </p>
        {/* <strong>15 years of industry expertise</strong> and a
          leadership team from renowned companies like{" "}
          <strong>VRL, JAYPEE, and SRS Logistics</strong>, we deliver with
          speed, safety, and precision across 12+ states */}
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 text-center">
            <div className="w-14 h-14 mx-auto mb-4 text-blue-600">
              <GlobeAltIcon />
            </div>
            <h3 className="text-xl font-semibold mb-2">Pan-India Reach</h3>
            <p className="text-gray-600">
              Serving 50+ key routes across <strong>12+ states</strong> with a
              robust fleet and on-time commitment.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 text-center">
            <div className="w-14 h-14 mx-auto mb-4 text-blue-600">
              <TruckIcon />
            </div>
            <h3 className="text-xl font-semibold mb-2">Diverse Fleet</h3>
            <p className="text-gray-600">
              From <strong>4-wheelers to 16-wheelers</strong> (3MT–35MT) —
              optimized for any cargo or terrain.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 text-center">
            <div className="w-14 h-14 mx-auto mb-4 text-blue-600">
              <UsersIcon />
            </div>
            <h3 className="text-xl font-semibold mb-2">Trusted Partnerships</h3>
            <p className="text-gray-600">
              Long-term alliances built on <strong>reliability</strong>,
              transparency, and shared success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
