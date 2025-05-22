import { useWishlistStore } from "../store/wishListStore";
import { useNavigate } from "react-router-dom";

export default function WishlistDropdown() {
  const items = useWishlistStore((state) => state.items);
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white border shadow-md rounded-md z-50">
      <div className="p-3 border-b font-semibold text-gray-700">
        Wish List ({items.length})
      </div>
      <div className="max-h-64 overflow-y-auto divide-y">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-3">
            <img
              src={item.image_url || item.image}
              alt={item.name}
              className="w-12 h-12 object-contain rounded"
            />
            <div>
              <p className="font-semibold text-sm mb-0.5">{item.name}</p>
              <p className="text-sm font-bold">
                {Number(item.price).toLocaleString("sq-AL", {
                  style: "currency",
                  currency: "EUR",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t">
        <button
          onClick={() => navigate("/wishlist")}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm font-semibold"
        >
          Go To WishList
        </button>
      </div>
    </div>
  );
}
