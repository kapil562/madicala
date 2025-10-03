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
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all ${index === currentIndex ? "w-6" : "bg-gray-300 w-1.5"}`}
              style={index === currentIndex ? { backgroundColor: "#9c27b0" } : {}}
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
      setTimeLeft((prev) => (prev <= 1 ? startSeconds : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [startSeconds]);

  const formatTime = () => {
    const h = Math.floor(timeLeft / 3600).toString().padStart(2, "0");
    const m = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, "0");
    const s = (timeLeft % 60).toString().padStart(2, "0");
    return `${h}h : ${m}m : ${s}s`;
  };

  return formatTime();
}

// ---------------- PROMOTIONAL BANNERS ----------------
function PromotionalBanners() {
  const time = useCountdown();

  return (
    <div className="bg-white">
      <div className="w-full py-4 text-center text-white font-semibold text-base" style={{ backgroundColor: "#9c27b0" }}>
        Buy 2 Get 1 Free (Add 3 item to cart)
      </div>

      <div className="w-full bg-[#fffbea] flex justify-center py-4">
        <img
          src="https://kurtikk.diwalioffer.shop/static/media/freeshippingposter.8c0aff28d27a959880ff.webp"
          alt="Easy returns, COD, Lowest price"
          className="max-w-4xl w-full object-contain"
        />
      </div>

      <div className="px-4 py-4 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-gray-900">Meesho Daily Deals</h3>
          <span className="text-2xl">⚡</span>
        </div>
        <div className="px-4 py-2 rounded-full flex items-center gap-2" style={{ backgroundColor: "#fff4e6" }}>
          <span className="text-lg">⏰</span>
          <span className="text-sm font-semibold text-gray-800">{time}</span>
        </div>
      </div>

      <div className="w-full py-4 text-center text-white font-semibold flex items-center justify-center gap-2 text-base" style={{ backgroundColor: "#9c27b0" }}>
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
      <button
        onClick={(e) => e.stopPropagation()}
        className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow hover:scale-110 transition"
      >
        <Heart className="w-4 h-4 text-gray-600" />
      </button>

      <div className="w-full relative bg-gray-50" style={{ paddingBottom: "100%" }}>
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

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
          <span className="text-base font-bold text-gray-900">₹{product.price}</span>
          <span className="text-xs text-gray-400 line-through">₹{Math.floor(product.price * (1 + product.discount / 100))}</span>
        </div>

        <p className="text-xs text-teal-600 mb-1">
          ₹{product.price - 20} with {Math.floor(Math.random() * 2) + 1} Special Offer
        </p>

        <p className="text-xs text-gray-600 mb-2">Free Delivery</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="flex items-center bg-teal-600 text-white px-1.5 py-0.5 rounded text-xs font-semibold">
              {product.rating} <Star className="w-2.5 h-2.5 ml-0.5 fill-current" />
            </div>
            <span className="text-xs text-gray-500">
              {product.reviews > 999 ? (product.reviews / 1000).toFixed(0) + "k" : product.reviews}
            </span>
          </div>
          <img
            src="data:image/png;base64,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"
            alt="Trusted"
            className="h-5"
          />
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
  ];

  const imageLinks = [
"https://upload.meeshosupplyassets.com/cataloging/1759479541344/AahanaGeorgetteSuitSet_89.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479501742/AarohiCottonSuitSet_2.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479479314/BlackEmbroideredCottonCo-ordSet_51.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479496267/BlackHandEmbroideresSuitSet_5.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479536730/BlackRosePetalKurtaSet_78.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479517640/BhavikaCottonSuitSet_80.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479461861/BlackSequinCottonSuitSet_81.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479525710/BlueBlissGeorgetteSuitSet_74.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479508386/BlueKurtaSet_47.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479525193/BlushGlowGeorgetteKurtaSet_54.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479540715/BrightPinkOrangeSalwarSuit_25.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479536501/BunaaiAmaraBeltCottonMaxiDress_16.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479549096/BunaaiBabyPinkGeorgetteGotaSuitSet_52.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479551057/BunaaiBabyPinkHandpaintedLehengaSet_59.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479541646/BunaaiBandhejCapewithTopPants_99.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479510384/BunaaiBlackCottonLurexKurtaSet_98.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479470082/BunaaiBlackCrushedCottonCoordSet_88.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479522325/BunaaiBlackSilverLurexKurtaPants_93.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479490403/BunaaiBlueYellowCrushedCottonCoordSet_61.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479513446/BunaaiBlushBeatco-ordSet_82.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479556001/BunaaiBrightRedGeorgetteSuitSet_71.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479506201/BunaaiCottonEnchantKurtaSet_13.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479456118/BunaaiCottonSerenityCoordSet_14.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479555226/BunaaiEmeraldGreenGeorgetteSuitSet_31.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479545527/BunaaiFloralDreamPinkKaftanSet_41.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479549689/BunaaiFrostyChicWhiteKurtaPants_49.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479475194/BunaaiGreenCottonDobbyCoordSet_86.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479545847/BunaaiGreenGottaSalwarSuit_32.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479529391/BunaaiIvyYellowCottonMaxiDress_37.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479476305/BunaaiLavenderCrushedCottonCoordSet_35.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479546560/BunaaiMeadowMagicShirtPants_62.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479547416/BunaaiModernMirageKurtaPants_27.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479491984/BunaaiOliveCrushedCottonCoordSet_11.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479551047/BunaaiPastelPeachGeorgetteSuitSet_45.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479546921/BunaaiPeachPinkGeorgetteSuitSet_44.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479546227/BunaaiPetalPerfectionKurtaSet_75.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479461949/BunaaiPowderBluePinkKaftanSet_43.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479493485/BunaaiPristineCottonLurexCoordSet_95.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479527517/BunaaiPureWhiteCottonMaxiDress_17.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479523680/BunaaiPurpleDresswithDupatta_6.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479535094/BunaaiPurpleEmbroideredKurtaPants_26.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479480250/BunaaiRosebloomCottonLurexCoordSet_97.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479549715/BunaaiRosyPinkGeorgetteSuitSet_20.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479541817/BunaaiRyleeCottonMaxiDress_19.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479540981/BunaaiSkyblueGottaSalwarSuit_33.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479548040/BunaaiTerracottaOrangeSuitSet_57.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479521523/BunaaiWhiteBlackFloralSchiffliCoordSet_90.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479528981/BunaaiWhiteBlueEmbroideredCo-ordSet_72.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479533649/BunaaiYellowMirrorWorkKurtaPants_22.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479532230/CharviCottonSuitSet_64.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479544871/ColorCrushKurtaSet_8.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479513159/CoordinatedChicKaftanSet_91.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479501526/CottonComfortTrioSuitSet_28.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479517119/CottonNightingaleSetofThree_100.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479529547/DeepGreenMirrorWorkKurtaSet_30.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479538292/DivyaGeorgetteSuitSet_87.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479544336/DoodleHeartsKurtaSet_50.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479546716/DoubleDelightKurtaSet_65.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479528272/EshaCottonSuitSet_60.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479522478/EshitaCottonSuitSet_67.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479511747/GauriGeorgetteSuitSet_63.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479556266/GazalaCottonSuitSet_79.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479526693/GreenChanderiSuitwithOrganzaDupatta_36.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479546177/HarmonyHuesKurtaSet_24.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479536197/IshaniGeorgetteSuitSet_68.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479536258/KritikaCottonSuitSet_10.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479483098/LimeGreenMatchingKurtaSet_1.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479529984/MeeraGeorgetteSuitSet_83.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479495844/MishkaTrioCottonSuitSet_70.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479549044/NaazCottonSuitSet_53.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479533412/NandiniGeorgetteSuitSet_94.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479528715/NayantaraGeorgetteSuitSet_39.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479530265/NoraNouveauCo-ordSet_29.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479510489/OjasviGeorgetteSuitSet_69.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479479032/OrangeWhiteEmbroideryCo-ordSet_21.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479551792/PeachGottaSalwarSuit_15.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479511468/PinkCharmGeorgetteSuitSet_4.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479524399/PureMauveGeorgetteSuitSet_84.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479556859/PurpleBandhejCottonSuitSet_9.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479501420/PurpleCottonSuitSet_0.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479550395/RedMirrorWorkSuitSet_18.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479526443/RidhimaCottonSuitSet_38.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479517058/RivaCottonSuitSet_12.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479458144/RoseDawnShararaSet_56.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479553619/ShiboriStraightKurtaSet_40.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479549539/ShimmerLurexKurtaSet_23.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479524698/ShreyaGeorgetteSuitSet_34.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479540481/SingleFlowerButtaKurtaSet_55.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479531441/SiyaCottonSuitSet_46.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479504475/SpringFlingKaftanPants_96.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479517984/TriptiTrioCottonSuitSet_85.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479509837/TwinningTonesKaftanSet_48.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479519644/UrviCottonSuitSet_42.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479521881/VedikaGeorgetteSuitSet_66.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479547163/VibrantPrintKurtaPants_77.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479475841/VictoriaBlueCottonKurtaSet_3.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479547603/VishakhaSuitSet_76.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479556223/YellowBandhejCottonSuitSet_7.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479511266/YellowTimelessGeorgetteCapePantsSet_73.jpg",
"https://upload.meeshosupplyassets.com/cataloging/1759479545774/ZariyaSuitSet_92.jpg",

  ];

  const products = imageLinks.map((link, index) => {
    const filename = link.split("/").pop().split(".")[0]; // Get filename
    const name = filename.replace(/_\d+$/, "").replace(/([a-z])([A-Z])/g, "$1 $2"); // Format name

    return {
      id: index + 1,
      name: name,
      price: Math.floor(Math.random() * (99 - 75 + 1) + 75),
      discount: Math.floor(Math.random() * (70 - 20 + 1) + 20),
      rating: (Math.random() * 1 + 3.5).toFixed(1),
      reviews: Math.floor(Math.random() * 100000 + 100),
      image: link,
    };
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CategoryCirclesSlider />
      <div className="w-full py-2 px-4" style={{ backgroundColor: "#ffc107" }}>
        <img
          src="https://kurtikk.diwalioffer.shop/static/media/pngmeesho.4e5fc246936989b7b849.jpeg"
          alt="Maha Sale"
          className="w-full h-auto object-cover"
        />
      </div>
      <ImageSlider images={sliderImages} />
      <PromotionalBanners />

      <div className="px-3 py-4 bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Products For You</h2>
      </div>

      <div className="grid grid-cols-2 gap-0">
        {products.map((item, index) => (
          <div key={item.id} className={`${index % 2 === 0 ? "border-r" : ""} border-b`}>
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
