import React from "react";
import {
  TruckIcon,
  CubeIcon,
  CreditCardIcon,
  DocumentTextIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline"; // optional icons

const Services = () => {
  const services = [
    {
      title: "Full Truck Load (FTL)",
      description: "Reliable transport for bulk goods across India.",
      icon: TruckIcon,
    },
    {
      title: "Part Load (LTL)",
      description: "Cost-effective solutions for smaller consignments.",
      icon: CubeIcon,
    },
    {
      title: "Industrial & Household Goods",
      description: "Safe movement of factory equipment and household items.",
      icon: HomeModernIcon,
    },
    {
      title: "Digital Payments",
      description:
        "Hassle-free, secure online transactions at your fingertips.",
      icon: CreditCardIcon,
    },
    {
      title: "GST-Compliant Billing",
      description: "Detailed Lorry Receipts and Invoices for every delivery.",
      icon: DocumentTextIcon,
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-4">
          Our <span className="text-blue-600">Services</span>
        </h2>
        <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          From large shipments to individual parcels, we offer a wide range of
          logistics services to meet your business and personal needs.
        </p>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl border border-gray-200 text-center transition duration-300 hover:scale-105 group"
              >
                {/* Icon */}
                <div className="w-14 h-14 mx-auto mb-4 text-blue-600 group-hover:text-blue-700">
                  {Icon && <Icon />}
                </div>
                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>
                {/* Description */}
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
