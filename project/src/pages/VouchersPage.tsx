// src/pages/VouchersPage.tsx - KODE LENGKAP UNTUK PERBAIKAN UI

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockVouchers } from "../data/mockVouchers";
import { Voucher } from "../types";
import { Scissors, Check } from "lucide-react";

interface VouchersPageProps {
  onApplyVoucher: (voucher: Voucher) => void;
  onCartClick: () => void;
}

const VouchersPage: React.FC<VouchersPageProps> = ({
  onApplyVoucher,
  onCartClick,
}) => {
  const [vouchers] = useState<Voucher[]>(mockVouchers);
  const [claimedVoucherIds, setClaimedVoucherIds] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleUseVoucher = (voucher: Voucher) => {
    // Tandai sebagai sudah diklaim secara lokal di halaman ini
    setClaimedVoucherIds((prev) => [...prev, voucher.id]);
    // Terapkan voucher di state utama App.tsx
    onApplyVoucher(voucher);

    // Kembali ke halaman utama, lalu buka cart setelah sedikit jeda
    navigate("/");
    setTimeout(() => {
      onCartClick();
    }, 100);
  };

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <div className="bg-white p-6 rounded-lg mb-8 shadow-lg">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-800">
          My Vouchers
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Claim and use these vouchers on your next purchase!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vouchers.map((voucher) => {
          const isClaimed = claimedVoucherIds.includes(voucher.id);
          const isExpired = new Date(voucher.expiryDate) < new Date();
          const canUse = !isExpired; // Tombol bisa diklik selama belum expired

          return (
            <div
              key={voucher.id}
              className={`flex items-center bg-white rounded-lg shadow transition-all ${
                isExpired ? "opacity-50" : ""
              }`}
            >
              <div
                className={`w-28 flex flex-col items-center justify-center p-4 text-white rounded-l-lg ${
                  voucher.type === "Free Shipping"
                    ? "bg-green-500"
                    : "bg-orange-500"
                }`}
              >
                <Scissors size={32} />
                <span className="mt-2 font-bold text-lg">{voucher.type}</span>
              </div>
              <div className="flex-1 p-4">
                <h3 className="font-bold text-lg text-gray-800">
                  {voucher.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {voucher.description}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {isExpired
                    ? `Expired on ${new Date(
                        voucher.expiryDate
                      ).toLocaleDateString("en-GB")}`
                    : `Valid until: ${new Date(
                        voucher.expiryDate
                      ).toLocaleDateString("en-GB")}`}
                </p>
              </div>
              <div className="p-4 border-l-2 border-dashed flex items-center">
                <button
                  onClick={() => handleUseVoucher(voucher)}
                  disabled={!canUse || isClaimed}
                  className={`px-6 py-2 rounded font-semibold text-white transition-colors w-28 text-center ${
                    isClaimed
                      ? "bg-green-600 cursor-default"
                      : canUse
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isClaimed ? <Check /> : "Gunakan"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VouchersPage;
