import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { supabase } from "../db/supabaseClient";

export default function CategoryPage() {
  const { name } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchCategoryProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .ilike("category", `%${name}%`);

      if (!error) {
        setProducts(data);
      }
    }

    fetchCategoryProducts();
  }, [name]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Products in "{name}"</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}