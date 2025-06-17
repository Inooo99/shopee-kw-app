// src/pages/HomePage.tsx

import React from "react";
import HeroBanner from "../components/HeroBanner";
import Categories from "../components/Categories";
import ProductGrid from "../components/ProductGrid";
import { Product } from "../types";

interface HomePageProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

const HomePage: React.FC<HomePageProps> = ({
  products,
  onProductClick,
  onAddToCart,
  onCategorySelect,
  selectedCategory,
}) => {
  return (
    <>
      <HeroBanner />
      <Categories
        onCategorySelect={onCategorySelect}
        selectedCategory={selectedCategory}
      />
      <ProductGrid
        products={products}
        onProductClick={onProductClick}
        onAddToCart={onAddToCart}
      />
    </>
  );
};

export default HomePage;
