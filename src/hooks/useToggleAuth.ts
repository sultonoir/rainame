import { create } from "zustand";

interface ToggleAuthStore {
  signin: boolean;
  onSignup: () => void;
  onSignin: () => void;
  onToggle: (signin: boolean) => void;
}

const useToggleAuth = create<ToggleAuthStore>((set) => ({
  signin: true,
  onSignup: () => set({ signin: false }),
  onSignin: () => set({ signin: true }),
  onToggle: (signin) => set({ signin: !signin }),
}));

export default useToggleAuth;
