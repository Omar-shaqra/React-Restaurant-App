import { toast } from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useCart = create(
  persist(
    (set, get) => ({
      items: [],

      // Add an item to the cart
      addItem: (data, selectedSize, selectedDough) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.id === data._id
        );

        if (existingItemIndex !== -1) {
          // Item already exists in the cart
          const newItem = {
            ...data,
            selectedSize,
            selectedDough,
            quantity: 1,
          };

          // Check if the item with the same id, size, and dough type already exists
          const hasSameItem =
            currentItems.findIndex(
              (item) =>
                item.id === data._id &&
                item.selectedSize === selectedSize &&
                item.selectedDough === selectedDough
            ) !== -1;

          if (hasSameItem) {
            // Item with the same id, size, and dough type already in cart
            return toast.dismiss(), toast("Item already in cart!");
          }

          // Add the new item with different size or dough type as a separate entry
          set((state) => ({
            items: [
              ...state.items.slice(0, existingItemIndex + 1),
              newItem,
              ...state.items.slice(existingItemIndex + 1),
            ],
          }));
        } else {
          // Item does not exist in the cart
          const newItem = {
            ...data,
            selectedSize,
            selectedDough,
            quantity: 1,
          };

          // Add the new item to the cart
          set((state) => ({
            items: [...state.items, newItem],
          }));
        }

        toast.success(`${selectedSize} ${data.title} Added to Cart.`);
      },

      // Update the size of an item in the cart
      size: (id, size) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, selectedSize: size } : item
          ),
        }));
      },

      // Update the dough of an item in the cart
      dough: (id, dough) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, selectedDough: dough } : item
          ),
        }));
      },

      increaseQuantity: (id, selectedSize, selectedDough) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id &&
            item.selectedSize === selectedSize &&
            item.selectedDough === selectedDough
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }));
      },

      decreaseQuantity: (id, selectedSize, selectedDough) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id &&
            item.selectedSize === selectedSize &&
            item.selectedDough === selectedDough &&
            item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        }));
      },

      // Remove an item from the cart
      removeItem: (id, selectedSize, selectedDough) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              item.id !== id ||
              item.selectedSize !== selectedSize ||
              item.selectedDough !== selectedDough
          ),
        }));
      },

      // Remove all items from the cart
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
