import React from "react";

const ProductDetails: React.FC = () => {
  const product = {
    id: "1",
    name: "Regular Fit Zip-Front Hooded Track Jacket",
    category: "Western Wear / Jackets & Coats",
    images: [
      "https://example.com/jacket1.jpg",
      "https://example.com/jacket2.jpg",
      "https://example.com/jacket3.jpg",
      "https://example.com/jacket4.jpg",
    ],
    price: 1499,
    discountedPrice: 450,
    discountPercentage: 70,
    rating: 3.8,
    ratingCount: 682,
    colors: ["black", "maroon"],
    sizes: ["XS", "S", "M", "L", "XL"],
    modelDetails: {
      size: "M",
      height: "6'",
      chest: "38",
    },
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
        <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-center object-cover"
          />
          <div className="grid grid-cols-4 gap-2 mt-2">
            {product.images.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-md cursor-pointer"
              >
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="sm:col-span-2">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <div className="flex items-center">
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    Home
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="flex-shrink-0 h-5 w-5 text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                  <a
                    href="#"
                    className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    Men
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="flex-shrink-0 h-5 w-5 text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                  <a
                    href="#"
                    className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    {product.category}
                  </a>
                </div>
              </li>
              <li className="text-sm">
                <a
                  href="#"
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.name}
                </a>
              </li>
            </ol>
          </nav>

          <div className="mt-4">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {product.name}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">{`₹${product.discountedPrice}`}</p>
              <div className="pl-4">
                <p className="text-sm text-gray-500">
                  MRP:{" "}
                  <span className="font-medium text-gray-900">
                    ₹{product.price}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  ({product.discountPercentage}% OFF)
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">
                Price inclusive of all taxes
              </p>
            </div>

            <div className="mt-6 flex items-center">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Get it for ₹336
              </button>
              <div className="ml-4">
                <label htmlFor="code" className="sr-only">
                  Coupon code
                </label>
                <input
                  type="text"
                  id="code"
                  placeholder="Use Code NEW250"
                  className="appearance-none bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-sm leading-4 text-gray-600 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Get Flat Rs.250 OFF on cart value of 990 & Above.{" "}
                  <a href="#" className="font-bold text-indigo-600">
                    View All Products
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-sm font-medium text-gray-900">More</h2>
              <p className="text-sm text-gray-500">Jet-Black, Maroon</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
