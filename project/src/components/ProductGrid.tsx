// src/components/ProductGrid.tsx

import React from "react";
import { Product } from "../types";
import ProductCard from "./ProductCard"; // Asumsi Anda punya komponen ProductCard

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onProductClick,
  onAddToCart,
}) => {
  return (
    // INI BAGIAN PENTINGNYA
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        // Asumsi Anda punya komponen ProductCard untuk menampilkan setiap produk
        // Jika tidak, logika tampilan produk Anda ada di sini
        <div key={product.id} onClick={() => onProductClick(product)}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="font-semibold truncate">{product.name}</h3>
            <p className="text-orange-500 font-bold mt-2">
              Rp {product.price.toLocaleString("id-ID")}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="w-full mt-3 bg-orange-100 text-orange-600 font-semibold py-2 rounded hover:bg-orange-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
