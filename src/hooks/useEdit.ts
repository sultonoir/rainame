import { type Products } from "@prisma/client";
import { create } from "zustand";

type TProducts = {
  product: Products | undefined;
};

interface EditState {
  isOpen: boolean;
  product: Products | undefined;
  onOpen: ({ product }: TProducts) => void;
  onClose: () => void;
}

const useEdit = create<EditState>((set) => ({
  isOpen: false,
  product: undefined,
  onOpen: ({ product }) => set({ isOpen: true, product }),
  onClose: () => set({ isOpen: false, product: undefined }),
}));

export default useEdit;
