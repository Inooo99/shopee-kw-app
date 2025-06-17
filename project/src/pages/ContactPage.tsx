// src/pages/ContactPage.tsx

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      "Thank you for your message! This is a demo and your message has not been sent."
    );
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800">Contact Us</h1>
        <p className="mt-4 text-xl text-gray-600">
          We'd love to hear from you. Here's how you can reach us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-orange-100 p-3 rounded-full mt-1">
              <MapPin className="text-orange-500" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Our Office</h3>
              <p className="text-gray-600">
                Shopee KW Tower, Jl. Gatot Subroto No. 1, Jakarta, Indonesia
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-orange-100 p-3 rounded-full mt-1">
              <Mail className="text-orange-500" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Email Us</h3>
              <p className="text-gray-600">support@shopeekw.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-orange-100 p-3 rounded-full mt-1">
              <Phone className="text-orange-500" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Call Us</h3>
              <p className="text-gray-600">(021) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-md font-semibold hover:bg-orange-600"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
