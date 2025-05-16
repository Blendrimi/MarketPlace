import { useState, useEffect, useRef } from "react";
import { supabase } from "../db/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.trim()) {
        const { data, error } = await supabase
          .from("products")
          .select("id, name, description, image_url")
          .ilike("name", `%${query}%`);

        if (!error) setResults(data);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setShowDropdown(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (id) => {
    setShowDropdown(false);
    setQuery("");
    navigate(`/product/${id}`);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto" ref={dropdownRef}>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        className="w-full px-4 py-2 border rounded shadow"
      />
      {showDropdown && results.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded shadow max-h-80 overflow-y-auto">
          {results.map((product) => (
            <div
              key={product.id}
              onClick={() => handleSelect(product.id)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <p className="font-semibold text-sm">{product.name}</p>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
