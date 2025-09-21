import React from "react";
import {
  TruckIcon,
  MapIcon,
  ShieldCheckIcon,
  Cog8ToothIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

const reasons = [
  {
    title: "Nationwide Coverage",
    description: "Strong fleet covering 50+ key routes across India.",
    icon: MapIcon,
  },
  {
    title: "Seamless Operations",
    description: "Safe and reliable from warehouse to last-mile delivery.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Industry-Wide Network",
    description: "Connecting factories, industries, and households pan-India.",
    icon: TruckIcon,
  },
  {
    title: "Heavy Load Expertise",
    description: "Specialized in heavy machinery and bulk cargo movement.",
    icon: Cog8ToothIcon,
  },
  {
    title: "Transparent Billing",
    description: "Digital tracking & GST-compliant invoicing with ease.",
    icon: DocumentDuplicateIcon,
  },
];

const WhyUs = () => {
  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-6">
          Why <span className="text-blue-600">Choose Us?</span>
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Heres what sets SV Supply Chain Solutions apart from the rest.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 text-center border border-gray-200"
              >
                <div className="w-14 h-14 mx-auto mb-4 text-blue-600">
                  <Icon />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {reason.title}
                </h3>
                <p className="text-gray-600 text-sm">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
