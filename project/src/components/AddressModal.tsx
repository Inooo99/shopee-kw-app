// src/components/AddressModal.tsx

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Address } from "../types";

interface AddressModalProps {
  onClose: () => void;
  initialData?: Address | null; // <-- Prop baru untuk menampung data yang akan diedit
}

const AddressModal: React.FC<AddressModalProps> = ({
  onClose,
  initialData,
}) => {
  const { addAddress, updateAddress } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // State form diisi dengan initialData jika ada (mode edit), atau string kosong (mode tambah)
  const [formData, setFormData] = useState({
    recipientName: initialData?.recipientName || "",
    phone: initialData?.phone || "",
    street: initialData?.street || "",
    city: initialData?.city || "",
    province: initialData?.province || "",
    postalCode: initialData?.postalCode || "",
  });

  const isEditMode = !!initialData; // Cek apakah ini mode edit atau tambah

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isEditMode) {
        // Panggil fungsi update jika mode edit
        await updateAddress(initialData.id, formData);
        alert("Address updated successfully!");
      } else {
        // Panggil fungsi tambah jika mode tambah
        await addAddress(formData);
        alert("New address added successfully!");
      }
      onClose();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to save address.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">
          {isEditMode ? "Edit Address" : "Add New Address"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ... (Isi form sama persis seperti AddAddressModal sebelumnya) ... */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-gray-700 mb-1"
                htmlFor="recipientName"
              >
                Recipient Name
              </label>
              <input
                name="recipientName"
                value={formData.recipientName}
                onChange={handleChange}
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="phone">
                Phone Number
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="street">
              Street Address
            </label>
            <input
              name="street"
              value={formData.street}
              onChange={handleChange}
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="city">
                City
              </label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="province">
                Province
              </label>
              <input
                name="province"
                value={formData.province}
                onChange={handleChange}
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="postalCode">
                Postal Code
              </label>
              <input
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-600 bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 rounded-lg text-white bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300"
            >
              {isLoading ? "Saving..." : "Save Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
