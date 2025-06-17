// src/pages/MyAccountPage.tsx - VERSI FINAL DENGAN SEMUA FUNGSI ALAMAT

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PurchaseRecord, Address } from "../types";
import { useAuth } from "../context/AuthContext";
import {
  User as UserIcon,
  ShoppingBag,
  MapPin,
  Phone,
  Edit,
  Trash2,
} from "lucide-react";
import EditProfileModal from "../components/EditProfileModal";
import AddressModal from "../components/AddressModal";

interface MyAccountPageProps {
  purchases: PurchaseRecord[];
}

const MyAccountPage: React.FC<MyAccountPageProps> = ({ purchases }) => {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isAddressModalOpen, setAddressModalOpen] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState<Address | null>(null);
  const { currentUser, deleteAddress, setDefaultAddress } = useAuth(); // <-- Ambil setDefaultAddress dari context

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const recentPurchases = [...purchases].slice(-2).reverse();

  const handleOpenEditAddressModal = (address: Address) => {
    setAddressToEdit(address);
    setAddressModalOpen(true);
  };

  const handleOpenAddAddressModal = () => {
    setAddressToEdit(null);
    setAddressModalOpen(true);
  };

  const handleDeleteAddress = (addressId: string) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      deleteAddress(addressId).catch((err) => alert(err.message));
    }
  };

  const handleSetDefault = (addressId: string) => {
    setDefaultAddress(addressId).catch((err) => alert(err.message));
  };

  return (
    <>
      <div className="container mx-auto p-4 sm:p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mb-4 overflow-hidden">
                {currentUser.avatarUrl ? (
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon size={48} className="text-orange-500" />
                )}
              </div>
              <h2 className="text-2xl font-semibold">{currentUser.name}</h2>
              <p className="text-gray-500">{currentUser.email}</p>
              {currentUser.phone && (
                <p className="text-gray-500 mt-1 flex items-center gap-1">
                  <Phone size={14} /> {currentUser.phone}
                </p>
              )}
              <button
                onClick={() => setIsEditProfileModalOpen(true)}
                className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition-colors"
              >
                Edit Profile
              </button>
            </div>
          </div>

          <div className="md:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <ShoppingBag className="text-orange-500" />
                  Recent Purchases
                </h3>
                <Link
                  to="/purchases"
                  className="text-sm text-orange-500 hover:underline font-semibold"
                >
                  View All
                </Link>
              </div>
              {recentPurchases.length > 0 ? (
                <div className="space-y-3">
                  {recentPurchases.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded"
                    >
                      <div>
                        <p className="font-medium">
                          Order #{purchase.id.slice(-6)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {purchase.items.length} items
                        </p>
                      </div>
                      <p className="font-semibold">
                        Rp {purchase.totalPrice.toLocaleString("id-ID")}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">You have no recent purchases.</p>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <MapPin className="text-orange-500" />
                Shipping Address
              </h3>
              {currentUser.addresses && currentUser.addresses.length > 0 ? (
                <div className="space-y-4">
                  {currentUser.addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`p-3 border rounded-lg relative group ${
                        address.isDefault ? "border-orange-500" : ""
                      }`}
                    >
                      {address.isDefault && (
                        <span className="absolute top-2 right-2 text-xs bg-green-100 text-green-700 font-semibold px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                      <p className="font-bold">{address.recipientName}</p>
                      <p className="text-sm text-gray-600">{address.phone}</p>
                      <p className="text-sm text-gray-600">
                        {address.street}, {address.city}, {address.province}{" "}
                        {address.postalCode}
                      </p>
                      <div className="flex gap-2 mt-2 border-t pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleOpenEditAddressModal(address)}
                          className="text-xs text-blue-500 hover:underline flex items-center gap-1"
                        >
                          <Edit size={12} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-xs text-red-500 hover:underline flex items-center gap-1"
                        >
                          <Trash2 size={12} />
                          Delete
                        </button>
                        {!address.isDefault && (
                          <button
                            onClick={() => handleSetDefault(address.id)}
                            className="text-xs text-gray-600 hover:underline"
                          >
                            Set as Default
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  You have not set a default shipping address.
                </p>
              )}
              <button
                onClick={handleOpenAddAddressModal}
                className="mt-3 text-sm text-orange-500 hover:underline font-semibold"
              >
                + Add New Address
              </button>
            </div>
          </div>
        </div>
      </div>
      {isEditProfileModalOpen && (
        <EditProfileModal
          user={currentUser}
          onClose={() => setIsEditProfileModalOpen(false)}
        />
      )}
      {isAddressModalOpen && (
        <AddressModal
          onClose={() => setAddressModalOpen(false)}
          initialData={addressToEdit}
        />
      )}
    </>
  );
};

export default MyAccountPage;
