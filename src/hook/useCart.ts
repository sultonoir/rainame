import { create } from "zustand";

interface CartStore {
  size: string;
  amount: number;
  setInitial: (size: string, amount: number) => void;
  changeSize: (value: string) => void;
  increment: (value: number) => void;
  decrement: (value: number) => void;
}

const useCart = create<CartStore>((set) => ({
  size: "",
  amount: 1,
  setInitial: (size: string, amount: number) => set({ size, amount }),
  changeSize: (size: string) => set({ size }),
  increment: (value: number) =>
    set((state) => ({ amount: (state.amount += value) })),
  decrement: (value: number) =>
    set((state) => ({ amount: (state.amount -= value) })),
}));

export default useCart;
