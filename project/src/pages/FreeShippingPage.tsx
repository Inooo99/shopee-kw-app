// src/pages/FreeShippingPage.tsx

import React from "react";
import ProductGrid from "../components/ProductGrid";
import { Product } from "../types";
import { Truck } from "lucide-react";

interface FreeShippingPageProps {
  allProducts: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
}

const FreeShippingPage: React.FC<FreeShippingPageProps> = ({
  allProducts,
  onProductClick,
  onAddToCart,
}) => {
  // Filter untuk mendapatkan produk dengan gratis ongkir
  const freeShippingProducts = allProducts.filter(
    (product) => product.hasFreeShipping
  );

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <div className="bg-green-500 text-white p-6 rounded-lg mb-8 shadow-lg flex items-center gap-4">
        <Truck size={48} />
        <div>
          <h1 className="text-4xl font-extrabold">Free Shipping</h1>
          <p className="mt-1 text-lg">
            Shop these items and enjoy shipping on us!
          </p>
        </div>
      </div>

      {freeShippingProducts.length > 0 ? (
        <ProductGrid
          products={freeShippingProducts}
          onProductClick={onProductClick}
          onAddToCart={onAddToCart}
        />
      ) : (
        <div className="text-center py-10 bg-gray-100 rounded-lg">
          <p className="text-gray-600 text-xl">
            No free shipping items found at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default FreeShippingPage;
