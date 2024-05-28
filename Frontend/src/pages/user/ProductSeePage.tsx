import React from "react";
const images = [
  "https://m.media-amazon.com/images/I/8137Bu8s4jL._SY741_.jpg",
  "https://m.media-amazon.com/images/I/81etu1EI-XL._SY741_.jpg",
  "https://m.media-amazon.com/images/I/81WzIbilc9L._SY741_.jpg",
  "https://m.media-amazon.com/images/I/8137Bu8s4jL._SY741_.jpg",
];

const ProductImageCarousel: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Product ${index}`}
          className="w-48 h-48 mb-4"
        />
      ))}
    </div>
  );
};

const ProductDetails: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">
        PERFORMAX Regular Fit Zip-Front Hooded Track Jacket
      </h1>
      <div className="flex items-center mt-2">
        <span className="text-green-600 text-xl font-semibold">₹450</span>
        <span className="line-through text-gray-500 ml-2">₹1,499</span>
        <span className="text-red-600 ml-2">70% OFF</span>
      </div>
      <div className="mt-4">
        <button className="bg-yellow-400 text-black font-bold py-2 px-4 rounded">
          Add to Bag
        </button>
      </div>
    </div>
  );
};

const ProductDetailPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg flex">
        <ProductImageCarousel />
        <ProductDetails />
      </div>
    </div>
  );
};

export default ProductDetailPage;
