import React, { useState } from 'react';
import { Star, Heart, Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onAddToCart }) => {
  const [isLiked, setIsLiked] = useState(product.isLiked || false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatSold = (sold: number) => {
    if (sold >= 1000) {
      return `${(sold / 1000).toFixed(1)}k sold`;
    }
    return `${sold} sold`;
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart();
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            -{product.discount}%
          </div>
        )}

        {/* Like Button */}
        <button
          onClick={handleLikeClick}
          className="absolute top-2 right-2 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full transition-all"
        >
          <Heart 
            size={16} 
            className={`${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
          />
        </button>

        {/* Quick Add Button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 p-2 bg-orange-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-orange-600"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 text-sm leading-5 h-10">
          {product.name}
        </h3>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
          <span className="text-gray-400 mx-2">•</span>
          <span className="text-sm text-gray-600">{formatSold(product.sold)}</span>
        </div>

        <div className="mb-3">
          {product.originalPrice && (
            <div className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </div>
          )}
          <div className="text-lg font-bold text-orange-500">
            {formatPrice(product.price)}
          </div>
        </div>

        <div className="text-xs text-gray-500 mb-1">{product.location}</div>
        <div className="text-xs text-gray-500 truncate">{product.seller}</div>
      </div>
    </div>
  );
};

export default ProductCard;