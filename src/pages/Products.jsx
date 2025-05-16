import { Link } from "react-router-dom";
export default function Products() {
  return (
<div className="flex justify-between items-center px-6">
  <h2 className="text-2xl font-bold">Featured Products</h2>
  <Link
    to="/add-product"
    className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded"
  >
    + Add Product
  </Link>
</div>
  );
}
