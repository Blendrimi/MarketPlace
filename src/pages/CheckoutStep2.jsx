import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CheckoutStep2() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [billingAddressType, setBillingAddressType] = useState("private");
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/confirmation"); 
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">2. Payment Details</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-2">Choose a payment method</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
              />
              <span>Cash on Delivery</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="pos"
                checked={paymentMethod === "pos"}
                onChange={() => setPaymentMethod("pos")}
              />
              <span>Pay with POS</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="online"
                checked={paymentMethod === "online"}
                onChange={() => setPaymentMethod("online")}
              />
              <span>Online Payment</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={() => setPaymentMethod("bank")}
              />
              <span>Bank Transfer</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">Billing address type</label>
          <div className="flex gap-4">
            <button
              type="button"
              className={`px-4 py-2 border rounded ${billingAddressType === "private" ? "bg-red-100 border-red-500" : ""}`}
              onClick={() => setBillingAddressType("private")}
            >
              Private
            </button>
            <button
              type="button"
              className={`px-4 py-2 border rounded ${billingAddressType === "company" ? "bg-red-100 border-red-500" : ""}`}
              onClick={() => setBillingAddressType("company")}
            >
              Company
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={sameAsShipping}
            onChange={() => setSameAsShipping(!sameAsShipping)}
          />
          <label>Invoice to shipping address</label>
        </div>

        <p className="text-sm text-gray-600">
          By clicking the "Finish" button, you confirm that you have read, understood, and agree to our <a href="#" className="text-blue-600 underline">Terms of Use</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
        </p>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-600 text-white px-6 py-2 rounded"
        >
          Finish
        </button>
      </form>
    </div>
  );
}
