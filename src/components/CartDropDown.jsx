import { useCartStore } from "../store/cartStore";
import { useNavigate } from "react-router-dom";

export default function CartDropdown() {
  const items = useCartStore((state) => state.items);
  const navigate = useNavigate();

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleGoToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white border shadow-md rounded-md z-50">
      <div className="p-3 border-b font-semibold text-gray-700">
        Produktet në shportë ({items.length})
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
              <p className="text-xs text-gray-600">Sasia: {item.quantity}</p>
              <p className="text-xs text-gray-600">
                Çmimi për njësi: €{item.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t">
        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm"
          onClick={handleGoToCart}      
        >
          Go To Cart (€{total.toFixed(2)})
        </button>
      </div>
    </div>
  );
}
