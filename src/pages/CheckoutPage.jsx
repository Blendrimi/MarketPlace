import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/checkout-step2"); 
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Country:</label>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">Select your country</option>
              <option value="Kosovo">Kosovo</option>
              <option value="Albania">Albania</option>
              <option value="Germany">Germany</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">City:</label>
            <select
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">Select your city</option>
              <option value="Pristina">Pristina</option>
              <option value="Gjakova">Gjakova</option>
              <option value="Peja">Peja</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Phone Number:</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Address:</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        </div>

        <div className="bg-blue-100 border border-blue-300 rounded px-4 py-3 mt-6">
          <strong>Free Shipping:</strong> Free delivery across Kosovo for orders over €100.00.
        </div>

        <div className="bg-gray-100 border mt-4 px-4 py-3 rounded">
          <strong>€1.50 - Standard Shipping</strong>
          <p className="text-sm text-gray-500">Estimated delivery: May 30 or May 31</p>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-600 text-white px-6 py-2 rounded"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
