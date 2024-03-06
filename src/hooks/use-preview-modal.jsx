import { create } from "zustand";

// Product Modal
export const useProductPreviewModal = create((set) => ({
  isOpen: false,
  productData: null,
  onOpen: (productData) => set({ isOpen: true, productData }),
  onClose: () => set({ isOpen: false }),
}));

// Offer Modal
export const useOfferPreviewModal = create((set) => ({
  isOpen: false,
  offerData: null,
  onOpen: (offerData) => set({ isOpen: true, offerData }),
  onClose: () => set({ isOpen: false }),
}));
