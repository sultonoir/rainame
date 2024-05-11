import { create } from "zustand";

interface DraftStore {
  images: File[];
  setImages: (fiel: File[]) => void;
}

const useDraft = create<DraftStore>((set) => ({
  images: [],
  setImages: (images: File[]) => set({ images }),
}));

export default useDraft;
