import React, { useState } from "react";
import { X, Star, Minus, Plus, ShoppingCart } from "lucide-react";
import { Product } from "../types";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const images = product.images || [product.image];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              <div className="mb-4">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index
                          ? "border-orange-500"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-medium">{product.rating}</span>
                </div>
                <span className="text-gray-400 mx-3">•</span>
                <span className="text-gray-600">{product.reviews} reviews</span>
                <span className="text-gray-400 mx-3">•</span>
                <span className="text-gray-600">{product.sold} sold</span>
              </div>

              <div className="mb-6">
                {product.originalPrice && (
                  <div className="text-lg text-gray-400 line-through mb-1">
                    {formatPrice(product.originalPrice)}
                  </div>
                )}
                <div className="text-3xl font-bold text-orange-500">
                  {formatPrice(product.price)}
                </div>
                {product.discount && (
                  <div className="inline-block bg-red-100 text-red-600 text-sm px-2 py-1 rounded mt-2">
                    {product.discount}% OFF
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Seller</span>
                  <span className="font-medium">{product.seller}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">{product.location}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{product.category}</span>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={decreaseQuantity}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-3 font-medium">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
