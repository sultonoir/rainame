import { create } from "zustand";

interface CartStore {
  size: string;
  changeSize: (value: string) => void;
  amount: number;
  increment: (value: number) => void;
  decrement: (value: number) => void;
}

const useCart = create<CartStore>((set) => ({
  size: "",
  changeSize: (size: string) => set({ size }),
  amount: 1,
  increment: (value: number) =>
    set((state) => ({ amount: (state.amount += value) })),
  decrement: (value: number) =>
    set((state) => ({ amount: (state.amount -= value) })),
}));

export default useCart;
