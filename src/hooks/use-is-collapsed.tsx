import { create } from "zustand";

interface CollapsedProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

export const useIsCollapsed = create<CollapsedProps>((set) => ({
  isCollapsed: false,
  setIsCollapsed: (isCollapsed: boolean) => set({ isCollapsed }),
}));
