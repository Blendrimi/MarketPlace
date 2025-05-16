import { useWishlistStore } from "../store/wishListStore";

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);

  if (items.length === 0) {
    return <div className="text-center mt-10 text-gray-500">Wishlist is empty</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>

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
                <p className="text-sm text-gray-600">
                  €{item.price.toFixed(2)}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeFromWishlist(item.id)}
              className="text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="text-right mt-6">
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={clearWishlist}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Clear Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
