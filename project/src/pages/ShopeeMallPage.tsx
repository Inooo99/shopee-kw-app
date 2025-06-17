// src/pages/ShopeeMallPage.tsx

import React from "react";
import ProductGrid from "../components/ProductGrid";
import { Product } from "../types";
import { CheckCircle } from "lucide-react";

interface ShopeeMallPageProps {
  allProducts: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
}

const ShopeeMallPage: React.FC<ShopeeMallPageProps> = ({
  allProducts,
  onProductClick,
  onAddToCart,
}) => {
  // Filter untuk mendapatkan produk Shopee Mall
  const mallProducts = allProducts.filter((product) => product.isShopeeMall);

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <div className="bg-white border-2 border-red-600 p-6 rounded-lg mb-8 shadow-lg text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-red-600">
          Shopee Mall
        </h1>
        <div className="flex justify-center items-center gap-4 mt-2 text-gray-600">
          <span className="flex items-center gap-1">
            <CheckCircle size={16} className="text-red-500" /> 100% Authentic
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle size={16} className="text-red-500" /> 15-Day Return
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle size={16} className="text-red-500" /> Free Shipping
          </span>
        </div>
      </div>

      {mallProducts.length > 0 ? (
        <ProductGrid
          products={mallProducts}
          onProductClick={onProductClick}
          onAddToCart={onAddToCart}
        />
      ) : (
        <div className="text-center py-10 bg-gray-100 rounded-lg">
          <p className="text-gray-600 text-xl">
            No official store products available at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default ShopeeMallPage;
