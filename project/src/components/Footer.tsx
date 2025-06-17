// src/components/Footer.tsx - VERSI FINAL DENGAN GAMBAR LOKAL

import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Shopee Info */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-2xl font-bold text-orange-500 mb-4">
              Shopee KW
            </h2>
            <p className="text-gray-400 text-sm">
              Your trusted online marketplace for everything you need.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.facebook.com/ShopeeID"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/shopee_id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com/shopeeid"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://youtube.com/shopeeindonesia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-orange-500"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-bold mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-orange-500"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Download App */}
          <div className="col-span-2 md:col-span-2">
            <h3 className="font-bold mb-4">Download App</h3>
            <div className="space-y-3">
              <a
                href="https://apps.apple.com/id/app/shopee-id-jual-beli-online/id959841443"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 p-3 rounded-lg flex items-center gap-3 hover:bg-blue-400 transition-colors"
              >
                {/* --- UBAH SRC GAMBAR --- */}
                <img
                  src="src/assets/images/apple-logo.png"
                  alt="App Store"
                  className="w-8 h-8"
                />
                <div>
                  <p className="text-xs">Download on the</p>
                  <p className="text-lg font-semibold">App Store</p>
                </div>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.shopee.id"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 p-3 rounded-lg flex items-center gap-3 hover:bg-gray-400 transition-colors"
              >
                {/* --- UBAH SRC GAMBAR --- */}
                <img
                  src="src/assets/images/google-play-logo.png"
                  alt="Google Play"
                  className="w-8 h-8"
                />
                <div>
                  <p className="text-xs">Get it on</p>
                  <p className="text-lg font-semibold">Google Play</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>
            © 2025 Shopee KW. All rights reserved. Built with React & Tailwind
            CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
