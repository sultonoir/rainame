import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
}

const useModal = create<ModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onOpenChange: () => set({ isOpen: !false }),
}));

export default useModal;
