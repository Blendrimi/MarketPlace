import { create } from "zustand";

const useProductStore = create((set) => ({
  products: [],
  editingProduct: null,
  showModal: false,

  setProducts: (products) => set({ products }),
  setEditingProduct: (product) => set({ editingProduct: product }),
  setShowModal: (value) => set({ showModal: value }),
}));

export default useProductStore;
