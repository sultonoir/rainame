import { create } from "zustand";

interface ToggleAuthStore {
  signin: boolean;
  signup: boolean;
  forgot: boolean;
  onSignup: () => void;
  onSignin: () => void;
  onForgot: () => void;
}

const useToggleAuth = create<ToggleAuthStore>((set) => ({
  signin: true,
  signup: false,
  forgot: false,
  onSignup: () => set({ signin: false, signup: true, forgot: false }),
  onSignin: () => set({ signin: true, signup: false, forgot: false }),
  onForgot: () => set({ signin: false, signup: false, forgot: true }),
}));

export default useToggleAuth;
