import React, { useState, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../component/Header";

const MERCHANT_UPI_ID = "manishprajapatip29-1@okicici";
const COUNTRY_CURRENCY = "INR";

const PaymentPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const orderData = location.state;

  const [selectedApp, setSelectedApp] = useState("");

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Order details not found
      </div>
    );
  }

  const { product, selectedSize } = orderData;

  // Create UPI link
  const upiLink = useMemo(() => {
    const tid = `ORDER:${id || "UNKNOWN"}`;
    const params = new URLSearchParams({
      pa: MERCHANT_UPI_ID,
      pn: "MerchantName",
      am: product.price?.toString() || "0",
      cu: COUNTRY_CURRENCY,
      tid,
    });
    return `upi://pay?${params.toString()}`;
  }, [product.price, id]);

  const handlePayClick = () => {
    if (!selectedApp) {
      alert("Please select a payment app first!");
      return;
    }
    // Redirect to UPI app
    window.location.href = upiLink;
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex justify-center">
        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 space-y-6">
          {/* Order Summary */}
          <div className="flex items-center gap-6 border-b pb-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-28 h-28 object-contain border rounded-lg bg-gray-50"
            />
            <div>
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-700 font-bold text-lg">₹{product.price}</p>
              <p className="text-sm text-gray-500">Size: {selectedSize}</p>
            </div>
          </div>

          {/* Select App */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Select Payment App</h3>
            <div className="flex gap-4">
              {["GPay", "PhonePe", "Paytm"].map((app) => (
                <button
                  key={app}
                  onClick={() => setSelectedApp(app)}
                  className={`flex-1 py-3 rounded-lg border text-center font-medium ${
                    selectedApp === app
                      ? "bg-pink-600 text-white border-pink-600"
                      : "bg-white hover:bg-gray-50 border-gray-300"
                  }`}
                >
                  {app}
                </button>
              ))}
            </div>
          </div>

          {/* Pay Button */}
          <div className="pt-4">
            <button
              onClick={handlePayClick}
              className="w-full bg-pink-600 text-white py-3 rounded-lg font-medium hover:bg-pink-700 transition"
            >
              Pay ₹{product.price}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
