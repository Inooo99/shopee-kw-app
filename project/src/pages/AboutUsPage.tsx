// src/pages/AboutUsPage.tsx

import React from "react";
import { Building, Users, Target } from "lucide-react";

const AboutUsPage = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800">
            About Shopee KW
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Your trusted online marketplace for everything you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="flex justify-center mb-4">
              <div className="bg-orange-100 p-4 rounded-full">
                <Building size={40} className="text-orange-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Our Story</h3>
            <p className="text-gray-500">
              Founded in 2025, Shopee KW was built with a simple mission: to
              provide a simple, secure, and fast online shopping experience for
              customers and sellers.
            </p>
          </div>
          <div className="p-6">
            <div className="flex justify-center mb-4">
              <div className="bg-orange-100 p-4 rounded-full">
                <Users size={40} className="text-orange-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Our Team</h3>
            <p className="text-gray-500">
              We are a passionate team of developers, designers, and e-commerce
              enthusiasts dedicated to creating a platform that everyone loves
              to use.
            </p>
          </div>
          <div className="p-6">
            <div className="flex justify-center mb-4">
              <div className="bg-orange-100 p-4 rounded-full">
                <Target size={40} className="text-orange-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
            <p className="text-gray-500">
              To connect millions of buyers and sellers across the nation,
              empowering people & businesses to grow and succeed in the digital
              economy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
