import { create } from "zustand";

interface CartSheetStore {
  isOpen: boolean;
  onOpen: (isOpen: boolean) => void;
}

const useCartSheet = create<CartSheetStore>((set) => ({
  isOpen: false,
  onOpen: (isOpen) => set({ isOpen }),
}));

export default useCartSheet;
