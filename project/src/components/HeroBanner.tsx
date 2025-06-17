import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
    title: 'Flash Sale Up to 90% OFF',
    subtitle: 'Limited time offer on electronics'
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg',
    title: 'Fashion Week Special',
    subtitle: 'Trendy clothes at amazing prices'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg',
    title: 'Beauty Must-Haves',
    subtitle: 'Premium skincare and makeup'
  }
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <section className="relative h-96 overflow-hidden bg-gradient-to-r from-orange-400 to-red-500">
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {/* Banner Carousel */}
          <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                  index === currentSlide ? 'translate-x-0' : index < currentSlide ? '-translate-x-full' : 'translate-x-full'
                }`}
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
                  <div className="p-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">{banner.title}</h2>
                    <p className="text-lg opacity-90">{banner.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Promo Cards */}
          <div className="grid grid-cols-2 gap-4 h-80">
            <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col justify-center items-center text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-gray-800 mb-2">Flash Sale</h3>
              <p className="text-sm text-gray-600">Up to 90% off</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col justify-center items-center text-center">
              <div className="text-4xl mb-3">🚚</div>
              <h3 className="font-bold text-gray-800 mb-2">Free Ship</h3>
              <p className="text-sm text-gray-600">Orders over $50</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col justify-center items-center text-center">
              <div className="text-4xl mb-3">🎁</div>
              <h3 className="font-bold text-gray-800 mb-2">Daily Deals</h3>
              <p className="text-sm text-gray-600">New offers daily</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col justify-center items-center text-center">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="font-bold text-gray-800 mb-2">Cashback</h3>
              <p className="text-sm text-gray-600">Up to 15% back</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;