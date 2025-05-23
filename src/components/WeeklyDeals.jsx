import { useEffect, useState } from "react";
import { supabase } from "../db/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function WeeklyDeals() {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeals = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*");

      if (!error) setProducts(data);
    };

    fetchDeals();
  }, []);

  const visibleProducts = showAll ? products : products.slice(0, 4);

  return (
    <section className="w-full px-6 py-10 bg-blue-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Best Weekly Deals</h2>
        <span className="bg-red-500 text-white text-xs px-4 py-1 rounded-full">
          Expires in: -15 d -9 h -35 m -45 s
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="bg-white rounded-lg shadow relative overflow-hidden hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="absolute top-2 left-2 text-[10px] text-red-600 border border-red-600 rounded-full px-2 py-0.5 bg-white">
              0% Installment
            </div>
            <div className="absolute top-2 right-2">
              <button className="w-6 h-6 bg-purple-100 rounded-full text-purple-500 font-bold">
                ♥
              </button>
            </div>

            <img
              src={product.image_url || product.image}
              alt={product.name}
              className="w-full h-40 object-contain p-4"
            />

            <div className="p-3 border-t">
              <div className="text-xs text-white bg-red-500 px-2 py-0.5 rounded inline-block mb-2">
                15% OFF
              </div>
              <h3 className="font-semibold text-sm mb-1 leading-tight">
                {product.name}
              </h3>
              <p className="text-gray-500 text-xs mb-1">{product.description}</p>

              <div className="text-green-600 font-bold text-lg">
                ${product.price}
                <span className="text-gray-400 text-sm line-through ml-2">
                  $619.00
                </span>
              </div>
              <div className="w-full bg-purple-100 h-1 rounded-full mt-2">
                <div className="bg-purple-600 h-1 rounded-full w-1/2"></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Sold: 24 / 80</p>
            </div>
          </div>
        ))}
      </div>

      {products.length > 4 && (
        <div className="text-center mt-6">
          <button
            className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show Less" : `Show More`}
          </button>
        </div>
      )}
    </section>
  );
}
