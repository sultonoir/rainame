import { create } from "zustand";

interface ActionsStore {
  categoryOpen: boolean;
  subCategoryOpen: boolean;
  sizeOpen: boolean;
  setSizeOpen: (sizeOpen: boolean) => void;
  setSubCategoryOpen: (subCategoryOpen: boolean) => void;
  setCategoryOpen: (categoryOpen: boolean) => void;
}

const useActions = create<ActionsStore>((set) => ({
  sizeOpen: false,
  subCategoryOpen: false,
  categoryOpen: false,
  setSubCategoryOpen: (subCategoryOpen: boolean) => set({ subCategoryOpen }),
  setCategoryOpen: (categoryOpen: boolean) => set({ categoryOpen }),
  setSizeOpen: (sizeOpen: boolean) => set({ sizeOpen }),
}));

export default useActions;
