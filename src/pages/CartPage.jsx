import { useCartStore } from "../store/cartStore";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { items, removeItem, clearCart } = useCartStore();
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return <div className="text-center mt-10 text-gray-500">Cart is empty</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Shopping Cart</h2>

      <div className="grid gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border p-4 rounded shadow"
          >
            <div className="flex gap-4 items-center">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-20 h-20 object-contain"
              />
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-sm text-gray-600">Price: €{item.price}</p>
              </div>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="text-right mt-6">
        <h3 className="text-lg font-semibold">Total: €{total.toFixed(2)}</h3>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={clearCart}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Clear Cart
          </button>
          <button
            onClick={() => navigate("/checkout")}
            className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
