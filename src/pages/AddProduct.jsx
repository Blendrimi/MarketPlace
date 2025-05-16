
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../db/supabaseClient";
import useAuthStore from "../store/authStore";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageFile: null,
  });
  const navigate = useNavigate();
  const profile = useAuthStore((state) => state.profile);

  if (profile?.role !== "SELLER") {
    return <div className="text-center p-6 text-red-500">Access denied. Only sellers can add products.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.imageFile) {
      alert("Please select an image file.");
      return;
    }

    const fileExt = form.imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, form.imageFile);

    if (uploadError) {
      console.error("Image upload failed:", uploadError.message);
      alert("Image upload failed.");
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("product-images").getPublicUrl(filePath);

    const { data, error: insertError } = await supabase.from("products").insert([
      {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        image_url: publicUrl,
      },
    ]);

    if (insertError) {
      console.error("Insert product failed:", insertError.message);
      alert("Product insert failed.");
      return;
    }

    alert("Product added successfully!");
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, imageFile: e.target.files[0] })}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-purple-700 text-white py-2 rounded hover:bg-purple-800"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
