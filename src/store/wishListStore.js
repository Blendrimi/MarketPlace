import { create } from 'zustand';

export const useWishlistStore = create((set) => ({
  items: [],

  addToWishlist: (product) =>
    set((state) => {
      const exists = state.items.find((item) => item.id === product.id);
      if (!exists) {
        return { items: [...state.items, product] };
      }
      return state;
    }),

  removeFromWishlist: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  clearWishlist: () => set({ items: [] }),
}));
