import { create } from "zustand";

interface SelectedStore {
  selected: string[];
  toggle: (value: string) => void;
  add: (value: string[]) => void;
  remove: (value: string[]) => void;
}

const useSelected = create<SelectedStore>((set) => ({
  selected: [],
  add: (selected: string[]) => set({ selected }),
  remove: (selected: string[]) => set({ selected }),
  toggle: (value: string) => {
    set((state) => {
      const newWishlist = state.selected;
      const exist = newWishlist.some((item) => item === value);
      if (!exist) {
        newWishlist.push(value);
        return { selected: newWishlist };
      } else {
        const remove = newWishlist.filter((item) => item !== value);
        return { selected: remove };
      }
    });
  },
}));

export default useSelected;
