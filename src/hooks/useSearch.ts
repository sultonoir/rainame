import { create } from "zustand";
import { persist } from "zustand/middleware";

interface searchvalue {
  id: string;
  name: string;
}

interface SearchState {
  search: searchvalue[] | undefined;
  add: (values: searchvalue) => void;
}

export const useSearch = create<SearchState>()(
  persist(
    (set) => ({
      search: [],
      add: (by: searchvalue) =>
        set((state) => ({ search: [...(state.search ?? []), by] })),
    }),
    { name: "recent-search" },
  ),
);
