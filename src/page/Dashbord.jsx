import React, { useState, useEffect, useRef } from "react";
import { Star, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";

// ---------------- CATEGORY CIRCLES SLIDER ----------------
function CategoryCirclesSlider() {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const categories = [
    { id: 1, image: "https://kurtikk.diwalioffer.shop/static/media/homesilder.6892f317534061e0f574.webp" },
    { id: 2, image: "https://kurtikk.diwalioffer.shop/static/media/homesilder2.52cd5e20a74c625da15b.webp" },
    { id: 3, image: "https://kurtikk.diwalioffer.shop/static/media/homesilder3.11ad8ccc8fe1435b0757.webp" },
    { id: 4, image: "https://kurtikk.diwalioffer.shop/static/media/homesilder4.e781a43aad5902347d06.webp" },
    { id: 5, image: "https://kurtikk.diwalioffer.shop/static/media/homesilder5.1602de9aa0bd8b43657a.webp" },
    { id: 6, image: "https://kurtikk.diwalioffer.shop/static/media/homesilder6.80b4cda9bf6e766fa099.webp" },
    { id: 7, image: "https://kurtikk.diwalioffer.shop/static/media/homesilder7.cab07317ed5bf663e4c5.webp" },
    { id: 8, image: "https://kurtikk.diwalioffer.shop/static/media/homesilder8.05a357ab1a826f082d82.webp" },
    { id: 9, image: "https://kurtikk.diwalioffer.shop/static/media/homesilder11.0c764c1b490978dff3d8.webp" },
    { id: 10, image: "https://kurtikk.diwalioffer.shop/static/media/homesilder12.c5044c3eaa6903c18080.webp" },
    { id: 11, image: "https://kurtikk.diwalioffer.shop/static/media/homesilder13.d52c256eb905be8b9b3e.webp" },
    { id: 12, image: "https://kurtikk.diwalioffer.shop/static/media/homesilder14.03d41c0e7739a11d1def.webp" },
    { id: 13, image: "https://kurtikk.diwalioffer.shop/static/media/homesilder15.b525ef2493b04cd7c6f6.webp" },
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="bg-white py-3">
      <div
        ref={scrollRef}
        className="flex gap-4 px-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {categories.map((cat) => (
          <div key={cat.id} className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
              <img
                src={cat.image}
                alt={`Category ${cat.id}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------- IMAGE SLIDER ----------------
function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full bg-white px-3 py-3 flex gap-3">
      {/* Main Slider */}
      <div className="flex-1 relative overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-purple-600 w-6"
                  : "bg-gray-300 w-1.5"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------- COUNTDOWN HOOK ----------------
function useCountdown(startSeconds = 30 * 60) {
  const [timeLeft, setTimeLeft] = useState(startSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return startSeconds; // Reset after finish
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [startSeconds]);

  const formatTime = () => {
    const m = Math.floor(timeLeft / 60).toString().padStart(2, "0");
    const s = (timeLeft % 60).toString().padStart(2, "0");
    return `${m}m : ${s}s`;
  };

  return formatTime();
}

// ---------------- PROMOTIONAL BANNERS ----------------
function PromotionalBanners() {
  const time = useCountdown();

  return (
    <div className="bg-white">
      {/* Buy 2 Get 1 Free Banner */}
      <div className="w-full bg-purple-600 py-4 text-center text-white font-semibold text-sm">
        Buy 2 Get 1 Free (Add 3 item to cart)
      </div>

      {/* Feature Icons */}
      <div className="w-full bg-[#fffbea] flex justify-center py-4">
        <img
          src="https://kurtikk.diwalioffer.shop/static/media/freeshippingposter.8c0aff28d27a959880ff.webp"
          alt="Easy returns, COD, Lowest price"
          className="max-w-4xl w-full object-contain"
        />
      </div>

      {/* Daily Deals */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-gray-800">Meesho Daily Deals</h3>
          <span className="text-xl">⚡</span>
        </div>
        <div className="bg-yellow-100 px-3 py-1 rounded-full flex items-center gap-1">
          <span className="text-sm">⏰</span>
          <span className="text-xs font-semibold">{time}</span>
        </div>
      </div>

      {/* Track Order Banner */}
      <div className="w-full bg-purple-600 py-3 text-center text-white font-semibold flex items-center justify-center gap-2 text-sm">
        <span>🚚</span>
        <span>Track Your Order</span>
      </div>
    </div>
  );
}

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
        onClick={(e) => e.stopPropagation()}
        className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow hover:scale-110 transition"
      >
        <Heart className="w-4 h-4 text-gray-600" />
      </button>

      {/* Product Image */}
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

        <div className="flex items-center gap-2 mb-1">
          <span className="text-base font-bold text-gray-900">
            ₹{product.price}
          </span>
          <span className="text-xs text-gray-400 line-through">
            ₹{Math.floor(product.price * (1 + product.discount / 100))}
          </span>
        </div>

        <p className="text-xs text-teal-600 mb-1">
          ₹{product.price - 20} with{" "}
          {Math.floor(Math.random() * 2) + 1} Special Offer
        </p>

        <p className="text-xs text-gray-600 mb-2">Free Delivery</p>

        <div className="flex items-center gap-1">
          <div className="flex items-center bg-teal-600 text-white px-1.5 py-0.5 rounded text-xs font-semibold">
            {product.rating}{" "}
            <Star className="w-2.5 h-2.5 ml-0.5 fill-current" />
          </div>
          <span className="text-xs text-gray-500">
            (
            {product.reviews > 999
              ? (product.reviews / 1000).toFixed(0) + "k"
              : product.reviews}
            )
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------------- PRODUCT GRID ----------------
function ProductGrid() {
  const sliderImages = [
    "https://kurtikk.diwalioffer.shop/static/media/c1oug.529b42955c36742bbffa.gif",
    "https://kurtikk.diwalioffer.shop/static/media/0muga.5a23765c71bc806439e8.gif",
    "https://kurtikk.diwalioffer.shop/static/media/rj4n7_600.8726da3ef2bdae12fe59.webp",
    "https://kurtikk.diwalioffer.shop/static/media/1714392890046_600.e12a058ac59a2979f9f1.webp",
    "https://kurtikk.diwalioffer.shop/static/media/1714392923259_600.cfd5b7264b5d0fb79f79.webp",
    "https://kurtikk.diwalioffer.shop/static/media/wgxt9_600.d3e7adfabdd17ba535d1.webp",
    "https://kurtikk.diwalioffer.shop/static/media/1714393007305_600.85cf1f81a6a13df4793a.webp",
    "https://kurtikk.diwalioffer.shop/static/media/1714393036273_600.fc4fb5b894ebe0d5fee6.webp",
    "https://kurtikk.diwalioffer.shop/static/media/1714393062584_600.19620d86d9cdff12a19a.webp",
    "https://kurtikk.diwalioffer.shop/static/media/1714393091336_600.1e604b1ae9351c4c9dcb.webp",
    "https://kurtikk.diwalioffer.shop/static/media/1714393117987_600.14ac979a80904e2cb594.webp",
    "https://kurtikk.diwalioffer.shop/static/media/1714393144837_600.f87e79ef6ae7b3caa865.webp",
    "https://kurtikk.diwalioffer.shop/static/media/1714393169858_600.1530bb1bc2b0b54f0bc1.webp",
    "https://kurtikk.diwalioffer.shop/static/media/1714393194978_600.16cf8274447ef066e03f.webp",
    "https://kurtikk.diwalioffer.shop/static/media/1714393219415_600.e2bd9dbe2fc7c270c8f6.webp",
    "https://kurtikk.diwalioffer.shop/static/media/1714393245702_600.8e3c201784ea0376cff8.webp",
    "https://kurtikk.diwalioffer.shop/static/media/1697808309043_600.d42e360ab435882d0d6a.webp",
  ];

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

      {/* Category Circles Slider */}
      <CategoryCirclesSlider />

      {/* Maha Sale Banner */}
      <div className="w-full bg-yellow-400 py-2 px-4">
        <img
          src="https://kurtikk.diwalioffer.shop/static/media/pngmeesho.4e5fc246936989b7b849.jpeg"
          alt="Maha Sale"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* 10 Image Slider */}
      <ImageSlider images={sliderImages} />

      {/* Banners */}
      <PromotionalBanners />

      {/* Products Header */}
      <div className="px-3 py-4 bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Products For You
        </h2>
      </div>

      {/* Product Grid */}
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
