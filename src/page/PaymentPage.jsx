import React, { useState, useMemo } from "react";
import { ChevronDown, CreditCard, Wallet, ShieldCheck } from "lucide-react";

const MERCHANT_UPI_ID = "manishprajapatip29-1@okicici";
const COUNTRY_CURRENCY = "INR";

const PaymentPage = () => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [isReselling, setIsReselling] = useState(false);

  // Mock order data
  const orderData = {
    orderId: "ORDER123",
    product: {
      name: "Sample Product",
      price: 78,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    },
    selectedSize: "M",
  };

  const { product } = orderData;

  // Common UPI params
  const baseParams = useMemo(() => {
    const tid = `ORDER:${orderData.orderId}`;
    return new URLSearchParams({
      pa: MERCHANT_UPI_ID,
      pn: "MerchantName",
      am: product.price?.toString() || "0",
      cu: COUNTRY_CURRENCY,
      tid,
    }).toString();
  }, [product.price, orderData.orderId]);

  // App-specific links
  const paymentLinks = {
    phonepe: `phonepe://pay?${baseParams}`,
    paytm: `paytmmp://pay?${baseParams}`,
  };

  const handlePayClick = () => {
    if (!selectedPayment) {
      alert("Please select a payment method first!");
      return;
    }

    if (paymentLinks[selectedPayment]) {
      window.location.href = paymentLinks[selectedPayment];
    } else {
      alert("This payment method is not supported yet!");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Payment Methods Section */}
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Select Payment Method
          </h2>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            <div>
              <div className="font-semibold">100% SAFE</div>
              <div>PAYMENTS</div>
            </div>
          </div>
        </div>

        {/* Online Payment Offer Banner */}
        <div className="mx-4 mt-4 bg-pink-50 border border-pink-200 rounded-lg p-4">
          <p className="text-pink-600 font-semibold">
            Pay online & get EXTRA ₹25 off
          </p>
        </div>

        {/* Pay Online Section */}
        <div className="p-4">
          <p className="text-xs text-gray-500 font-semibold mb-3">PAY ONLINE</p>

          {/* PhonePe */}
          <div className="border rounded-lg mb-3">
            <button
              onClick={() =>
                setSelectedPayment(selectedPayment === "phonepe" ? "" : "phonepe")
              }
              className={`w-full flex items-center justify-between p-4 ${
                selectedPayment === "phonepe" ? "bg-pink-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src="https://kurtikk.diwalioffer.shop/static/media/phonepe.558dd7fea5d980ccf2c8.png"
                    alt="PhonePe"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <span className="text-sm font-medium text-gray-800">
                  PhonePe
                </span>
              </div>
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === "phonepe"}
                readOnly
                className="w-5 h-5"
              />
            </button>
          </div>

          {/* Paytm */}
          <div className="border rounded-lg mb-3">
            <button
              onClick={() =>
                setSelectedPayment(selectedPayment === "paytm" ? "" : "paytm")
              }
              className={`w-full flex items-center justify-between p-4 ${
                selectedPayment === "paytm" ? "bg-pink-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src="https://kurtikk.diwalioffer.shop/static/media/paytm_icon-icons.com_62778.a23c686df5f6d427a319.png"
                    alt="Paytm"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <span className="text-sm font-medium text-gray-800">Paytm</span>
              </div>
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === "paytm"}
                readOnly
                className="w-5 h-5"
              />
            </button>
          </div>

          {/* Debit/Credit Cards (disabled) */}
          <div className="border rounded-lg mb-3 bg-gray-50">
            <button className="w-full flex items-center justify-between p-4 opacity-50 cursor-not-allowed">
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-blue-500" />
                <span className="text-sm font-medium text-gray-800">
                  Debit/Credit Cards ( Not Available )
                </span>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Pay in Case Section */}
        <div className="px-4 pb-4">
          <p className="text-xs text-gray-500 font-semibold mb-3">PAY IN CASE</p>
          <div className="border rounded-lg bg-gray-50">
            <button className="w-full flex items-center justify-between p-4 opacity-50 cursor-not-allowed">
              <div className="flex items-center gap-3">
                <Wallet className="w-6 h-6 text-blue-500" />
                <span className="text-sm font-medium text-gray-800">
                  Cash on Delivery ( Not Available )
                </span>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Reselling Section */}
        <div className="px-4 pb-4 border-t pt-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                Reselling the Order?
              </h3>
              <p className="text-xs text-gray-500">
                Click on 'Yes' to add Final Price
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsReselling(false)}
                className={`px-5 py-2 rounded-full border-2 font-medium text-sm ${
                  !isReselling
                    ? "border-pink-500 text-pink-500"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                No
              </button>
              <button
                onClick={() => setIsReselling(true)}
                className={`px-5 py-2 rounded-full border-2 font-medium text-sm ${
                  isReselling
                    ? "border-pink-500 bg-pink-500 text-white"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                Yes
              </button>
            </div>
          </div>
        </div>

        {/* Price Details */}
        <div className="px-4 pb-4 border-t pt-4">
          <h3 className="text-base font-semibold text-gray-800 mb-3">
            Price Details ( 1 item )
          </h3>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-600">Total Product Price</span>
            <span className="text-sm font-medium text-gray-800">
              + ₹{product.price}
            </span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t">
            <span className="text-base font-semibold text-gray-800">
              Order Total
            </span>
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price}
            </span>
          </div>
        </div>

        {/* Pay Button */}
        <div className="p-4 border-t">
          <button
            onClick={handlePayClick}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-4 rounded-lg transition-colors"
          >
            PROCEED TO PAY ₹{product.price}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
