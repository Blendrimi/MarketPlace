// src/Pages/ProductDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../db/supabaseClient";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setProduct(data);
      else console.error("Failed to fetch product:", error.message);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-80 object-contain rounded mb-6 shadow"
      />
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-purple-700 text-xl font-semibold mb-6">
        ${product.price}
      </p>
      <button className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800">
        Buy Now
      </button>
    </div>
  );
}
