import ProductGrid from "../components/ProductGrid";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <Link
          to="/add-product"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          + Add Product
        </Link>
      </div>
      <ProductGrid />
    </div>
  );
}
