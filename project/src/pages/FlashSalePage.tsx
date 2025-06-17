// src/pages/FlashSalePage.tsx

import React from "react";
import ProductGrid from "../components/ProductGrid";
import { Product } from "../types";

interface FlashSalePageProps {
  allProducts: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
}

const FlashSalePage: React.FC<FlashSalePageProps> = ({
  allProducts,
  onProductClick,
  onAddToCart,
}) => {
  // Filter produk untuk mendapatkan hanya yang sedang flash sale
  const flashSaleProducts = allProducts.filter(
    (product) => product.isFlashSale
  );

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <div className="bg-red-600 text-white p-6 rounded-lg mb-8 shadow-lg">
        <h1 className="text-4xl font-extrabold tracking-tight">Flash Sale!</h1>
        <p className="mt-2 text-lg">
          Grab these amazing deals before they're gone!
        </p>
      </div>

      {flashSaleProducts.length > 0 ? (
        <ProductGrid
          products={flashSaleProducts}
          onProductClick={onProductClick}
          onAddToCart={onAddToCart}
        />
      ) : (
        <div className="text-center py-10 bg-gray-100 rounded-lg">
          <p className="text-gray-600 text-xl">
            No flash sale items at the moment. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
};

export default FlashSalePage;
