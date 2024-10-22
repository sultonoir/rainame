import { create } from "zustand";

interface CountStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset : () => void
}

const useCount = create<CountStore>((set) => ({
  count: 1,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset : () => set({ count: 1 })
}));

export default useCount;
