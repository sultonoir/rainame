import { type StockAndSize } from "@prisma/client";
import { create } from "zustand";

interface SizesStore {
  sizes: StockAndSize | undefined;
  setSizes: (values: StockAndSize | undefined) => void;
}

const useSizes = create<SizesStore>((set) => ({
  sizes: undefined,
  setSizes: (values: StockAndSize | undefined) => set({ sizes: values }),
}));

export default useSizes;
