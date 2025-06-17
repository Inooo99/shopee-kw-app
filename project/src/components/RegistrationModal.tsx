// src/components/RegistrationModal.tsx

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface RegistrationModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  onClose,
  onSwitchToLogin,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      alert("Registration successful! Please log in.");
      onSwitchToLogin(); // Pindah ke modal login setelah berhasil register
    } catch (error) {
      alert(error instanceof Error ? error.message : "An error occurred.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email-signup">
              Email
            </label>
            <input
              id="email-signup"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="password-signup"
            >
              Password
            </label>
            <input
              id="password-signup"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
          >
            Sign Up
          </button>
        </form>
        <button
          onClick={onClose}
          className="w-full mt-4 text-center text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RegistrationModal;
