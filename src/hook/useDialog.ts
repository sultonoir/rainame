import { create } from "zustand";

interface DialogStore {
  isOpen: boolean;
  status: string;
  onOpen: (isOpen: boolean) => void;
  handleStatus: (status: string) => void;
}

const useDialog = create<DialogStore>((set) => ({
  isOpen: false,
  status: "signin",
  onOpen: (isOpen) => set({ isOpen }),
  handleStatus: (status: string) => set({ status }),
}));

export default useDialog;
