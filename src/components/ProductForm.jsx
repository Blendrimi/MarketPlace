import { useState, useEffect } from "react";

export default function ProductForm({ product, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        image_url: "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow mb-6">
      <div className="mb-2">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-2">
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          type="number"
          placeholder="Price"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-2">
        <input
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
        />
      </div>
      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        {product ? "Update" : "Add"} Product
      </button>
    </form>
  );
}
