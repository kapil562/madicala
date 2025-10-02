import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Header from "../component/Header";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Product not found
      </div>
    );
  }

  const finalPrice = product.price * quantity;

  const handleBuyNow = () => {
    navigate(`/AddressPage/${product.id}`, {
      state: { product, quantity, finalPrice, selectedSize: "Free Size" },
    });
  };

  const handleAddToCart = () => {
    alert(
      `🛒 Added ${product.name} (Size: Free Size, Qty: ${quantity}) - ₹${finalPrice} to cart`
    );
  };

  // ✅ सारे sizes fix करके डाल दिए
  const allSizes = [
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "3XL",
    "4XL",
    "5XL",
    "6XL",
    "7XL",
    "8XL",
  ];

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Side - Images */}
          <div>
            <div className="w-full border rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[400px] object-contain bg-white"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex mt-3 gap-3">
              {[product.image, product.image, product.image].map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="thumb"
                  className="w-20 h-20 border rounded-lg cursor-pointer object-contain bg-white"
                />
              ))}
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{product.name}</h2>

            {/* Price */}
            <div className="flex items-center gap-3 text-lg">
              <span className="font-bold text-gray-800">₹{finalPrice}</span>
              <span className="text-green-600">{product.discount}% off</span>
            </div>
            <p className="text-sm text-green-700">Free Delivery</p>

            {/* Sizes (Optional - सिर्फ दिखाने के लिए) */}
            <div>
              <h4 className="font-medium mb-2">Available Sizes</h4>
              <div className="flex flex-wrap gap-3">
                {allSizes.map((size) => (
                  <span
                    key={size}
                    className="px-4 py-2 border rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h4 className="font-medium mb-2">Quantity</h4>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 border rounded-lg"
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 border rounded-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-pink-100 text-pink-700 py-2 rounded-lg font-medium"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-pink-600 text-white py-2 rounded-lg font-medium"
              >
                Buy Now
              </button>
            </div>

            {/* Seller */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Sold By</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">SWIX TRADER</p>
                  <p className="text-sm text-gray-500">3.9 ★ | 1,259 Ratings</p>
                </div>
                <button className="px-3 py-1 border rounded-lg text-pink-600">
                  View Shop
                </button>
              </div>
            </div>

            {/* Highlights */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Product Highlights</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <p>Occasion: Casual</p>
                <p>Color: Random</p>
                <p>Fit/Shape: Regular</p>
                <p>Pattern: Printed</p>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t pt-4 text-sm text-gray-700">
              <h4 className="font-medium mb-2">Product Details</h4>
              <ul className="space-y-1">
                <li>Fabric: Cotton Blend</li>
                <li>Sleeve Length: Long Sleeves</li>
                <li>Sizes: {allSizes.join(", ")}</li>
                <li>Country of Origin: India</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
