import { useEffect, useState } from "react";
import { supabase } from "../db/supabaseClient";
import { Link } from "react-router-dom";

export default function BestSellerSection() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeTab, setActiveTab] = useState("Top 5");

  const tabs = [
    "Top 5",
    "Televisions",
    "PC Gaming",
    "Computers",
  
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (!error && data) {
        setProducts(data);
        setFiltered(data.slice(0, 5));
      }
    };
    fetchProducts();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "Top 5") {
      setFiltered(products.slice(0, 5));
    } else {
      const filteredProducts = products.filter((p) =>
        p.category?.toLowerCase() === tab.toLowerCase()
      );
      setFiltered(filteredProducts);
    }
  };

  return (
    <section className="px-6 py-8 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Best Seller</h2>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => handleTabClick(tab)}
            className={`px-4 py-1 rounded-full border text-sm font-medium ${
              activeTab === tab
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {filtered.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="bg-white border rounded-lg shadow hover:shadow-md transition relative p-2"
          >
            <div className="absolute top-2 right-2">
              <button
                className="text-purple-600"
                onClick={(e) => e.preventDefault()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.239-4.5-5-4.5-1.824 0-3.41 1.021-4 2.52A4.993 4.993 0 008 3.75c-2.761 0-5 2.015-5 4.5 0 5.25 9 12 9 12s9-6.75 9-12z"
                  />
                </svg>
              </button>
            </div>
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-32 object-contain mb-2"
            />
            <div className="px-2">
              <div className="flex gap-2 mb-1">
                <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">
                  BEST SELLER
                </span>
                <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">
                  NEW
                </span>
              </div>
              <h4 className="text-sm font-medium leading-tight mb-1">
                {product.name}
              </h4>
              <div className="text-purple-700 font-bold mb-1">
                ${product.price}
              </div>
              <div className="text-xs line-through text-gray-400 mb-1">
                $619.00
              </div>
              <p className="text-xs text-gray-500 mb-1">
                Sold: {Math.floor(Math.random() * 90) + 10} / 100
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
