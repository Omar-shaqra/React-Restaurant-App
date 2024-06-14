import { toast } from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useCart = create(
  persist(
    (set, get) => ({
      productItems: [],
      offerItems: [],

      // Add an product item to the cart
      addProductItem: (product, selectedSize, selectedDough) => {
        const currentItems = get().productItems;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.id === product._id
        );

        if (existingItemIndex !== -1) {
          // Item already exists in the cart
          const newItem = {
            ...product,
            selectedSize,
            selectedDough,
            quantity: 1,
          };

          // Check if the item with the same id, size, and dough type already exists
          const hasSameItem =
            currentItems.findIndex(
              (item) =>
                item.id === product._id &&
                item.selectedSize === selectedSize &&
                item.selectedDough === selectedDough
            ) !== -1;

          if (hasSameItem) {
            // Item with the same id, size, and dough type already in cart
            return toast.dismiss(), toast("Item already in cart!");
          }

          // Add the new item with different size or dough type as a separate entry
          set((state) => ({
            productItems: [
              ...state.productItems.slice(0, existingItemIndex + 1),
              newItem,
              ...state.productItems.slice(existingItemIndex + 1),
            ],
          }));
        } else {
          // Item does not exist in the cart
          const newItem = {
            ...product,
            selectedSize,
            selectedDough,
            quantity: 1,
          };

          // Add the new item to the cart
          set((state) => ({
            productItems: [...state.productItems, newItem],
          }));
        }

        toast.success(`${selectedSize} ${product.title} Added to Cart.`);
      },

      // Update the size of an item in the cart
      size: (id, size) => {
        set((state) => ({
          productItems: state.productItems.map((item) =>
            item.id === id ? { ...item, selectedSize: size } : item
          ),
        }));
      },

      // Update the dough of an item in the cart
      dough: (id, dough) => {
        set((state) => ({
          productItems: state.productItems.map((item) =>
            item.id === id ? { ...item, selectedDough: dough } : item
          ),
        }));
      },

      increaseQuantity: (id, selectedSize, selectedDough) => {
        set((state) => ({
          productItems: state.productItems.map((item) =>
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
          productItems: state.productItems.map((item) =>
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
          productItems: state.productItems.filter(
            (item) =>
              item.id !== id ||
              item.selectedSize !== selectedSize ||
              item.selectedDough !== selectedDough
          ),
        }));
      },

      //! OFFERS
      addOfferItem: (offer, items) => {
        const currentItems = get().offerItems;

        // Check if the offer with the same items already exists
        const offerExists = currentItems.some((existingOffer) => {
          // Check if the offer ID matches and all items match
          return (
            existingOffer.id === offer.id &&
            existingOffer.items.every((item) =>
              items.some(
                (newItem) =>
                  item._id === newItem._id &&
                  item.productId === newItem.productId
              )
            )
          );
        });

        if (!offerExists) {
          const newItem = {
            ...offer,
            items,
            quantity: 1,
          };
          set((state) => ({
            offerItems: [...state.offerItems, newItem],
          }));
          toast.success(`${offer.name} Added to Cart.`);
        } else {
          toast("Offer With The Same Items Already Added.");
        }
      },

      increaseOfferQuantity: (offerId) => {
        set((state) => ({
          offerItems: state.offerItems.map((item) =>
            item.id === offerId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }));
      },

      decreaseOfferQuantity: (offerId) => {
        set((state) => ({
          offerItems: state.offerItems.map((item) =>
            item.id === offerId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        }));
      },

      // Remove an offer from the cart
      removeOfferItem: (offerId, itemsToRemove) => {
        set((state) => ({
          offerItems: state.offerItems.filter((offer) => {
            // Check if the offer ID matches
            if (offer.id !== offerId) {
              return true;
            }

            // Check if the items array matches
            const isSameItems = itemsToRemove.every((itemToRemove) =>
              offer.items.some(
                (item) =>
                  item._id === itemToRemove._id &&
                  item.productId === itemToRemove.productId
              )
            );

            // Return false to remove the offer if both conditions are met
            return !isSameItems;
          }),
        }));
      },

      // Remove all items from the cart
      removeAll: () => set({ productItems: [], offerItems: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
