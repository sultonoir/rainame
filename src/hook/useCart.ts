import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Props {
  id: string;
  amount: number;
  price : number;
}

interface CartStore {
  cart: Props[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  decrement: (values: Props) => void;
  increment: (value: Props) => void;
  remove: (id : string) => void;
}

const useCart = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      setIsOpen: (isOpen) => set({ isOpen }),
      increment: (value: Props) => {
        set(({ cart }) => {
          const existingItemIndex = cart.findIndex(
            (item) => item.id === value.id,
          );
          if (existingItemIndex !== -1) {
            cart[existingItemIndex]!.amount += value.amount;
            cart[existingItemIndex]!.price += value.price;
          } else {
            cart.push(value);
          }
          return { cart: [...cart] };
        });
      },
      decrement: (value: Props) => {
        set(({ cart }) => {
          const existingItemIndex = cart.findIndex(
            (item) => item.id === value.id,
          );
          if (existingItemIndex !== -1) {
            cart[existingItemIndex]!.amount -= value.amount;
            cart[existingItemIndex]!.price -= value.price;
          } else {
            cart.push(value);
          }
          return { cart: [...cart] };
        });
      },
      remove: (id : string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));
      },
    }),
    {
      name: "cart",
      skipHydration: false, // Ganti menjadi false untuk mengaktifkan inisialisasi dari local storage
      getStorage: () => localStorage, // Tentukan storage yang digunakan, misalnya localStorage atau sessionStorage
    },
  ),
);

export default useCart;
