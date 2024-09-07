import { create } from "zustand";

interface DialogTermsStore {
  open: boolean;
  setOpen: (open: boolean) => void;
  terms: string;
  setTerms: (terms: string) => void;
}

const useDialogTerms = create<DialogTermsStore>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
  terms: "",
  setTerms: (terms: string) => set({ terms }),
}));

export default useDialogTerms;
