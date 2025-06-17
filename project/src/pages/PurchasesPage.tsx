// src/pages/PurchasesPage.tsx - VERSI BARU

import React from "react";
import { PurchaseRecord } from "../types"; // Impor tipe PurchaseRecord

interface PurchasesPageProps {
  purchases: PurchaseRecord[];
}

const PurchasesPage: React.FC<PurchasesPageProps> = ({ purchases }) => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">My Purchases</h1>

      {purchases.length === 0 ? (
        <div className="text-center py-10 bg-gray-100 rounded-lg">
          <p className="text-gray-500">You have no purchase history yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Urutkan dari yang terbaru, lalu map untuk setiap catatan pembelian */}
          {[...purchases].reverse().map((purchase) => (
            <div
              key={purchase.id}
              className="bg-white border rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <div>
                  <h2 className="font-semibold">Order ID: {purchase.id}</h2>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(purchase.date).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-lg font-bold">
                    Rp {purchase.totalPrice.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              {/* Map untuk setiap item di dalam satu pembelian */}
              <div className="space-y-4">
                {purchase.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p>{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x Rp{" "}
                        {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchasesPage;
