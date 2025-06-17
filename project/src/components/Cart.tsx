// src/components/Cart.tsx - KODE LENGKAP UNTUK PERBAIKAN FUNGSI

import React from "react";
import { X } from "lucide-react";
import { CartItem, Voucher } from "../types";

interface CartProps {
  items: CartItem[];
  subtotal: number;
  discount: number;
  totalPrice: number;
  appliedVoucher: Voucher | null;
  onClose: () => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
  onRemoveVoucher: () => void;
}

const Cart: React.FC<CartProps> = ({
  items,
  subtotal,
  discount,
  totalPrice,
  appliedVoucher,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onRemoveVoucher,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="bg-white w-full max-w-md h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Shopping Cart ({items.reduce((sum, item) => sum + item.quantity, 0)}
            )
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Daftar Item */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center mt-8">
              Your cart is empty.
            </p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className="border px-2 py-1 rounded-l"
                    >
                      -
                    </button>
                    <span className="border-t border-b px-4 py-1">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="border px-2 py-1 rounded-r"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer dengan Rincian Harga */}
        <div className="p-4 border-t space-y-2 bg-gray-50">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>Rp {subtotal.toLocaleString("id-ID")}</span>
          </div>
          {appliedVoucher && (
            <div className="flex justify-between text-green-600">
              <div className="flex items-center">
                <span>Discount ({appliedVoucher.code})</span>
                <button
                  onClick={onRemoveVoucher}
                  className="text-red-500 text-xs ml-2 font-semibold"
                >
                  (REMOVE)
                </button>
              </div>
              <span>- Rp {discount.toLocaleString("id-ID")}</span>
            </div>
          )}
          <div className="flex justify-between items-center font-bold text-xl pt-2 border-t mt-2">
            <span>Total:</span>
            <span className="text-orange-500">
              Rp {totalPrice.toLocaleString("id-ID")}
            </span>
          </div>
          <button
            onClick={onCheckout}
            className="w-full mt-2 bg-orange-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={items.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
