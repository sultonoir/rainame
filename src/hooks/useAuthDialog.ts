import { create } from "zustand";

interface AuthDialogState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  type: "signin" | "signup" | "forgot-password" | "reset-password";
  setType: (
    type: "signin" | "signup" | "forgot-password" | "reset-password",
  ) => void;
}

export const useAuthDialog = create<AuthDialogState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  type: "signin",
  setType: (type) => set({ type }),
}));
