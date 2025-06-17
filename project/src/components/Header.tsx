import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Bell,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  cartItemsCount,
  onCartClick,
  searchQuery,
  onSearchChange,
  onLoginClick,
  onSignupClick,
}) => {
  const { currentUser, logout } = useAuth();
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // useEffect untuk menutup menu dropdown profil saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    };
    if (isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  // useEffect untuk menutup menu dropdown mobile saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".mobile-menu-button")
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleProfileClick = () => {
    if (currentUser) {
      setProfileMenuOpen((prev) => !prev);
    } else {
      onLoginClick();
    }
  };

  const navLinks = [
    { to: "/", text: "All Categories", end: true },
    { to: "/flash-sale", text: "Flash Sale" },
    { to: "/shopee-mall", text: "Shopee Mall" },
    { to: "/free-shipping", text: "Free Shipping" },
    { to: "/vouchers", text: "Vouchers" },
  ];

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs sm:text-sm py-2">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="hidden md:flex space-x-4">
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </div>
            <div className="w-full md:w-auto flex justify-end items-center gap-4">
              {currentUser ? (
                <div className="flex items-center gap-4">
                  <span className="font-semibold">Hi, {currentUser.name}</span>
                  <button onClick={logout} className="hover:underline">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <button onClick={onSignupClick} className="hover:underline">
                    Sign Up
                  </button>
                  <button onClick={onLoginClick} className="hover:underline">
                    Log In
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-y-3">
            <div className="flex items-center gap-4">
              <button
                className="md:hidden mobile-menu-button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              >
                <Menu size={24} />
              </button>
              <Link to="/" className="flex items-center">
                <h1 className="text-3xl font-bold text-orange-500">Shopee</h1>
              </Link>
            </div>
            <div className="w-full md:flex-1 md:max-w-2xl md:mx-8 order-3 md:order-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full px-4 py-2 pr-12 border-2 border-orange-500 rounded-md focus:outline-none focus:border-orange-600"
                />
                <button className="absolute right-0 top-0 h-full px-4 bg-orange-500 text-white rounded-r-md hover:bg-orange-600">
                  <Search size={20} />
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 order-2 md:order-3">
              <button
                onClick={onCartClick}
                className="relative p-2 hover:bg-gray-100 rounded-full"
              >
                <ShoppingCart size={24} className="text-gray-700" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              <div className="relative">
                <button
                  onClick={handleProfileClick}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <User size={24} className="text-gray-700" />
                </button>
                {isProfileMenuOpen && currentUser && (
                  <div
                    ref={profileMenuRef}
                    className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50"
                  >
                    <ul className="py-1">
                      <li>
                        <Link
                          to="/account"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          My Account
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/purchases"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          My Purchases
                        </Link>
                      </li>
                      <li className="border-t my-1"></li>
                      <li>
                        <button
                          onClick={() => {
                            logout();
                            setProfileMenuOpen(false);
                          }}
                          className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- BAGIAN NAVIGASI DESKTOP YANG DIKEMBALIKAN --- */}
        <nav className="border-t bg-white hidden md:block">
          <div className="container mx-auto px-4">
            <div className="flex justify-center space-x-8 py-2 text-sm">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `py-2 transition-colors hover:text-orange-500 ${
                      isActive
                        ? "text-orange-500 font-medium border-b-2 border-orange-500"
                        : "text-gray-600"
                    }`
                  }
                  end={link.end}
                >
                  {link.text}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Dropdown */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden absolute top-16 left-4 bg-white rounded-md shadow-lg border w-64 p-2 transition-all duration-300 ease-in-out origin-top-left z-50 ${
          isMobileMenuOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `py-2 px-3 rounded text-base ${
                  isActive
                    ? "bg-orange-100 text-orange-600 font-semibold"
                    : "text-gray-700"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
              end={link.end}
            >
              {link.text}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;
