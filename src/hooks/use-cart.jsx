import { toast } from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (data) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data._id);

        if (existingItem) {
          return toast.dismiss(), toast("Item already in cart!");
        }

        const newItem = {
          ...data,
          quantity: 1,
        };

        set({ items: [...get().items, newItem] });
        toast.success(`${data.title} Added to Cart.`);
      },

      increaseQuantity: (id) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }));
      },

      decreaseQuantity: (id) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        }));
      },

      size: (id, size) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, selectedSize: size } : item
          ),
        }));
      },

      dough: (id, dough) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, selectedDough: dough } : item
          ),
        }));
      },

      removeItem: (id) => {
        set({
          items: [...get().items.filter((item) => item.id !== id)],
        });
      },

      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
