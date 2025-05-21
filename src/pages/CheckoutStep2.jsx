import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../db/supabaseClient";
import useAuthStore from "../store/authStore";
import emailjs from "@emailjs/browser";

export default function CheckoutStep2() {
  const navigate = useNavigate();
  const profile = useAuthStore((state) => state.profile);

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [billingType, setBillingType] = useState("Private");
  const [invoiceToShipping, setInvoiceToShipping] = useState(true);
  const [checkoutInfo, setCheckoutInfo] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("checkoutInfo"));
    if (stored) {
      setCheckoutInfo(stored);
      console.log("Checkout Info Loaded:", stored);
    } else {
      console.error("Checkout info not found. Please go back and fill it.");
    }
  }, []);

  const handleFinish = async () => {
    if (!checkoutInfo) {
      alert("Missing checkout info!");
      return;
    }

    const { firstName, lastName, country, city, phone, address, email } = checkoutInfo;

    const { error } = await supabase.from("checkout_info").insert([
      {
        user_id: profile?.id,
        first_name: firstName,
        last_name: lastName,
        country,
        city,
        phone,
        address,
        payment_method: paymentMethod,
        billing_type: billingType,
        invoice_to_shipping: invoiceToShipping,
      },
    ]);

    if (error) {
      console.error("Insert failed:", error.message);
      return;
    }

    try {
      const result = await emailjs.send(
        "service_wkxgmku",
        "template_g64teim",
        {
          name: `${firstName} ${lastName}`,
          email,
          address,
          phone,
          city,
          country,
        },
        "GEOWAuCtH9-XtkI3N"
      );
      console.log(" Email sent:", result.text);
    } catch (err) {
      console.error(" Email sending failed:", err);
    }

    alert("Order placed successfully!");
    navigate("/confirmation");
  };

  if (!checkoutInfo) {
    return <p className="text-red-600 p-4">Checkout info not found. Please go back and fill it.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">2. Payment Details</h2>

      <div className="mb-4">
        <p className="font-semibold mb-1">Choose a payment method</p>
        {["Cash on Delivery", "Pay with POS", "Online Payment", "Bank Transfer"].map(
          (method) => (
            <label key={method} className="block">
              <input
                type="radio"
                value={method}
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
                className="mr-2"
              />
              {method}
            </label>
          )
        )}
      </div>

      <div className="mb-4">
        <p className="font-semibold mb-1">Billing address type</p>
        <button
          className={`px-4 py-2 rounded-l ${billingType === "Private" ? "bg-red-500 text-white" : "bg-gray-200"}`}
          onClick={() => setBillingType("Private")}
        >
          Private
        </button>
        <button
          className={`px-4 py-2 rounded-r ${billingType === "Company" ? "bg-red-500 text-white" : "bg-gray-200"}`}
          onClick={() => setBillingType("Company")}
        >
          Company
        </button>
      </div>

      <label className="block mb-4">
        <input
          type="checkbox"
          checked={invoiceToShipping}
          onChange={(e) => setInvoiceToShipping(e.target.checked)}
          className="mr-2"
        />
        Invoice to shipping address
      </label>

      <button
        onClick={handleFinish}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Finish
      </button>
    </div>
  );
}
