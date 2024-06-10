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
    (set) => ({
      searchLists: [],
      setSearchList: (value: string) => {
        set((state) => {
          const newSearch = state.searchLists;
          if (newSearch.length > 10) {
            newSearch.shift();
            newSearch.push(value);
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
    { name: "search" },
  ),
);

export default useSearch;
