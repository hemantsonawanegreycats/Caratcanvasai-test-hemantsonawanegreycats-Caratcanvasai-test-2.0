
import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, HeartIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

const ProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('39');
  const [selectedColor, setSelectedColor] = useState('black');

  // Sample product images - replace with actual product images
  const productImages = [
    '/api/placeholder/500/500', // Main sneaker image
    '/api/placeholder/500/500', // Side view
    '/api/placeholder/500/500', // Back view
    '/api/placeholder/500/500', // Sole view
  ];

  const thumbnailImages = [
    '/api/placeholder/80/80',
    '/api/placeholder/80/80', 
    '/api/placeholder/80/80',
    '/api/placeholder/80/80',
  ];

  const sizes = ['37', '38', '39', '40', '41'];
  const colors = [
    { name: 'black', color: 'bg-black' },
    { name: 'gray', color: 'bg-gray-500' },
    { name: 'orange', color: 'bg-orange-500' },
    { name: 'blue', color: 'bg-blue-600' }
  ];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productImages.length);
  };

  const previousImage = () => {
    setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

          {/* Left Side - Product Images */}
          <div className="space-y-4">
            {/* Main Product Image */}
            <div className="relative bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-square">
                <img
                  src={productImages[selectedImage]}
                  alt="Product"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors"
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3 justify-center">
              {thumbnailImages.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-colors $\{
                    selectedImage === index ? 'border-black' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={thumb}
                    alt={`Thumbnail $\{index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Pagination Indicator */}
            <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
              <span>01</span>
              <div className="flex space-x-1">
                <div className="w-8 h-px bg-gray-300"></div>
                <div className="w-8 h-px bg-gray-300"></div>
                <div className="w-8 h-px bg-gray-300"></div>
              </div>
              <span>06</span>
            </div>
          </div>

          {/* Right Side - Product Information */}
          <div className="space-y-6">
            {/* Brand */}
            <div className="text-sm text-gray-500 uppercase tracking-wider">
              FENDI →
            </div>

            {/* Product Title */}
            <h1 className="text-3xl lg:text-4xl font-light text-gray-900 leading-tight">
              Black technical<br />
              knit fabric high-tops
            </h1>

            {/* Product Description */}
            <p className="text-gray-600 text-lg">
              Running sneakers with thin<br />
              elastic laces
            </p>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                SIZE
              </h3>
              <div className="flex space-x-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full border text-sm font-medium transition-colors $\{
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                REVIEWS
              </h3>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`w-4 h-4 $\{
                      star <= 3 ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                PRICE
              </h3>
              <div className="text-2xl font-light text-gray-900">
                $450
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                COLOUR
              </h3>
              <div className="flex space-x-3">
                {colors.map((colorOption) => (
                  <button
                    key={colorOption.name}
                    onClick={() => setSelectedColor(colorOption.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-colors $\{
                      selectedColor === colorOption.name
                        ? 'border-gray-800'
                        : 'border-gray-300 hover:border-gray-400'
                    } $\{colorOption.color}`}
                  >
                    <span className="sr-only">{colorOption.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <button className="flex-1 bg-black text-white py-4 px-8 rounded-sm text-sm font-medium uppercase tracking-wider hover:bg-gray-900 transition-colors">
                ADD TO CART
              </button>
              <button className="p-4 border border-gray-300 rounded-sm hover:border-gray-400 transition-colors">
                <HeartIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
