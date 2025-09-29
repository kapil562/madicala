import React from "react";
import { Star, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";

// ---------------- PRODUCT CARD ----------------
function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded overflow-hidden relative cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`, { state: product })}
    >
      {/* Wishlist Heart Icon */}
      <button
        onClick={(e) => e.stopPropagation()} // prevent navigate on heart click
        className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow hover:scale-110 transition"
      >
        <Heart className="w-4 h-4 text-gray-600" />
      </button>

      {/* Product Image - Square aspect ratio */}
      <div
        className="w-full relative bg-gray-50"
        style={{ paddingBottom: "100%" }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-2">
        {/* Product Name - 2 lines max */}
        <h3
          className="text-xs text-gray-700 mb-1 overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: "32px",
            lineHeight: "16px",
          }}
        >
          {product.name}
        </h3>

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-base font-bold text-gray-900">
            ₹{product.price}
          </span>
          <span className="text-xs text-gray-400 line-through">
            ₹{Math.floor(product.price * (1 + product.discount / 100))}
          </span>
        </div>

        {/* Special Offer */}
        <p className="text-xs text-teal-600 mb-1">
          ₹{product.price - 20} with{" "}
          {Math.floor(Math.random() * 2) + 1} Special Offer
        </p>

        {/* Free Delivery */}
        <p className="text-xs text-gray-600 mb-2">Free Delivery</p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center bg-teal-600 text-white px-1.5 py-0.5 rounded text-xs font-semibold">
            {product.rating}{" "}
            <Star className="w-2.5 h-2.5 ml-0.5 fill-current" />
          </div>
          <span className="text-xs text-gray-500">
            ({product.reviews > 999 ? (product.reviews / 1000).toFixed(0) + "k" : product.reviews})
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------------- PRODUCT GRID ----------------
function ProductGrid() {
  const imageLinks = [
    "https://upload.meeshosupplyassets.com/cataloging/1758390894062/saree_0.jpg",
    "https://upload.meeshosupplyassets.com/cataloging/1758390951941/saree_1.jpg",
    "https://upload.meeshosupplyassets.com/cataloging/1758390797352/saree_2.jpg",
    "https://upload.meeshosupplyassets.com/cataloging/1758390812823/saree_3.jpg",
    "https://upload.meeshosupplyassets.com/cataloging/1758390875426/saree_4.jpg",
    "https://upload.meeshosupplyassets.com/cataloging/1758391152307/saree_5.jpg",
    "https://upload.meeshosupplyassets.com/cataloging/1758390840746/saree_6.jpg",
    "https://upload.meeshosupplyassets.com/cataloging/1758390980847/saree_7.jpg",
    "https://upload.meeshosupplyassets.com/cataloging/1758390887866/saree_8.jpg",
    "https://upload.meeshosupplyassets.com/cataloging/1758390815975/saree_9.jpg",
  ];

  const productNames = [
    "Shimmering Beautiful Bracelet & Bangles",
    "STJ Men's Shirts",
    "Attractive Women Kurta Sets",
    "Premium Quality Earbuds M19",
    "Elegant Designer Saree Collection",
    "Stylish Cotton Kurti for Women",
    "Traditional Jewellery Set",
    "Casual Men's Checkered T-Shirt",
    "Beautiful Embroidered Dress",
    "Designer Ethnic Wear",
  ];

  const products = imageLinks.map((link, index) => ({
    id: index + 1,
    name: productNames[index % productNames.length],
    price: Math.floor(Math.random() * (300 - 150 + 1) + 150),
    discount: Math.floor(Math.random() * (70 - 20 + 1) + 20),
    rating: (Math.random() * 1 + 3.5).toFixed(1),
    reviews: Math.floor(Math.random() * 100000 + 100),
    image: link,
  }));

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Banner */}
      <div className="w-full">
        <img
          src="https://images.meesho.com/images/marketing/1759128726415.webp"
          alt="Maha Diwali Sale Banner"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Products Header */}
      <div className="px-3 py-4 bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Products For You
        </h2>

        {/* Filter Bar */}
        <div className="grid grid-cols-4 gap-0 bg-white border-t border-b">
          <button className="flex items-center justify-center gap-2 py-4 border-r hover:bg-gray-50 transition">
            <span className="text-xl">↕</span>
            <span className="text-sm font-normal text-gray-700">Sort</span>
          </button>
          <button className="flex items-center justify-center gap-2 py-4 border-r hover:bg-gray-50 transition">
            <span className="text-sm font-normal text-gray-700">Category</span>
            <span className="text-sm">▼</span>
          </button>
          <button className="flex items-center justify-center gap-2 py-4 border-r hover:bg-gray-50 transition">
            <span className="text-sm font-normal text-gray-700">Gender</span>
            <span className="text-sm">▼</span>
          </button>
          <button className="flex items-center justify-center gap-2 py-4 hover:bg-gray-50 transition">
            <span className="text-xl">☰</span>
            <span className="text-sm font-normal text-gray-700">Filters</span>
          </button>
        </div>
      </div>

      {/* Product Grid - 2 columns */}
      <div className="grid grid-cols-2 gap-0">
        {products.map((item, index) => (
          <div
            key={item.id}
            className={`${index % 2 === 0 ? "border-r" : ""} border-b`}
          >
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
