import React from 'react';
import { categories } from '../data/categories';

interface CategoriesProps {
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

const Categories: React.FC<CategoriesProps> = ({ onCategorySelect, selectedCategory }) => {
  return (
    <section className="bg-white py-8 border-b">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Categories</h2>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          <button
            onClick={() => onCategorySelect('')}
            className={`flex flex-col items-center p-4 rounded-lg transition-all hover:shadow-md ${
              selectedCategory === '' 
                ? 'bg-orange-50 border-2 border-orange-500' 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="text-3xl mb-2">🛍️</div>
            <span className="text-sm font-medium text-gray-700">All</span>
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.name)}
              className={`flex flex-col items-center p-4 rounded-lg transition-all hover:shadow-md ${
                selectedCategory === category.name 
                  ? 'bg-orange-50 border-2 border-orange-500' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <span className="text-sm font-medium text-gray-700">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;