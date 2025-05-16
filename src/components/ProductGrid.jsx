import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../db/supabaseClient";
import ProductCard from "./ProductCard";
import EditProductModal from "../pages/EditProductModal";
import WeeklyDeals from "./WeeklyDeals";
import BestSellerSection from "./BestSellerSection";
import useProductStore from "../store/productStore"; 

export default function ProductGrid() {
  const {
    products,
    setProducts,
    editingProduct,
    setEditingProduct,
    showModal,
    setShowModal,
  } = useProductStore();

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (!error) setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleEditSave = async (updatedProduct) => {
    const { error } = await supabase
      .from("products")
      .update({
        name: updatedProduct.name,
        description: updatedProduct.description,
        price: updatedProduct.price,
      })
      .eq("id", updatedProduct.id);

    if (!error) {
      await fetchProducts();
      setShowModal(false);
    } else {
      console.error("Failed to update product:", error.message);
    }
  };

  return (
    <section className="w-full px-6 py-8 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Featured Products</h2>
        <Link
          to="/add-product"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          + Add Product
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">

        {products
          .filter((p) => p && p.id)
          .map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
      </div>

      <WeeklyDeals products={products} onEdit={handleEdit} onDelete={handleDelete} />

      <BestSellerSection onEdit={handleEdit} onDelete={handleDelete} />

      {showModal && editingProduct && (
        <EditProductModal
          product={editingProduct}
          onSave={handleEditSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
}
