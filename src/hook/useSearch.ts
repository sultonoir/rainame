import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchStore {
  searchLists: string[];
  setSearchList: (vavlue: string) => void;
  removeAll: () => void;
  removeItem: (value: string) => void;
}

const useSearch = create<SearchStore>()(
  persist(
    (set, get) => ({
      searchLists: [],
      setSearchList: (value: string) => {
        set(() => {
          const newSearch = get().searchLists;
          if (newSearch.length >= 10) {
            newSearch.pop();
            return { searchLists: newSearch };
          }
          newSearch.push(value);
          return { searchLists: newSearch };
        });
      },
      removeAll: () => set({ searchLists: [] }),
      removeItem: (value: string) =>
        set((state) => ({
          searchLists: state.searchLists.filter((item) => item !== value),
        })),
    }),
    { name: "search", skipHydration: true, getStorage: () => localStorage },
  ),
);

export default useSearch;
