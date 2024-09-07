import { create } from "zustand";

interface SheetStore {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const useSheet = create<SheetStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));

export default useSheet;
