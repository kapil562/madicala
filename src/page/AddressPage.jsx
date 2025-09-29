import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../component/Header";

const AddressPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, size } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    address: "",
  });

  const [error, setError] = useState("");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Product not found
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // reset error on typing
  };

  const handleContinue = () => {
    // Validation
    if (
      !formData.name ||
      !formData.phone ||
      !formData.pincode ||
      !formData.city ||
      !formData.state ||
      !formData.address
    ) {
      setError("⚠️ Please fill all address fields before continuing.");
      return;
    }

    // Navigate to Payment Page with data
    navigate(`/PaymentPage/${product.id}`, {
      state: { product, size, formData },
    });
  };

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>

        {/* Product Info */}
        <div className="border rounded-lg p-4 flex items-center gap-4 mb-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-20 object-contain border rounded"
          />
          <div className="flex-1">
            <h3 className="font-medium text-gray-800 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600">Size: {size} • Qty: 1</p>
            <p className="font-semibold">₹{product.price}</p>
          </div>
        </div>

        {/* Address Form */}
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Mobile Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <textarea
            name="address"
            placeholder="Full Address (House no, street, landmark)"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded p-2 h-24"
          />
        </div>

        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}

        {/* Continue Button */}
        <div className="mt-6">
          <button
            onClick={handleContinue}
            className="w-full bg-pink-600 text-white py-2 rounded-lg font-medium"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
