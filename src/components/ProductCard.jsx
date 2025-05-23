import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishListStore";
import { FaHeart } from "react-icons/fa";
import useAuthStore from "../store/authStore";

export default function ProductCard({ product, onEdit, onDelete }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const role = useAuthStore((state) => state.role);
  const location = useLocation();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    if (location.pathname.startsWith("/category")) {
      navigate("/cart");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300 relative">
      <button
        onClick={() => addToWishlist(product)}
        className="absolute top-2 right-2 bg-purple-100 text-purple-600 p-2 rounded-full hover:bg-purple-200"
      >
        <FaHeart />
      </button>

      <Link to={`/product/${product.id}`}>
        <img
          src={product.image_url || product.image}
          alt={product.name}
          className="w-full h-40 object-contain mb-4"
        />
        <h3 className="text-sm font-semibold mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <p className="text-purple-700 font-bold mb-2">${product.price}</p>
      </Link>

      <button
        className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-600 text-sm mb-2"
        onClick={handleAddToCart}
      >
        Add To Cart
      </button>

      {role === "SELLER" && (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit && onEdit(product)}
            className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete  && onDelete(product.id)}
            className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
