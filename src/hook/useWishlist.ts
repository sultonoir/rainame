import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistStore {
  wishlist: string[];
  toggle: (vavlue: string) => void;
}

const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],
      toggle: (value: string) => {
        set(() => {
          const newWishlist = get().wishlist;
          const exist = newWishlist.some((item) => item === value);
          if (!exist) {
            newWishlist.push(value);
            return { wishlist: newWishlist };
          } else {
            const remove = newWishlist.filter((item) => item !== value);
            return { wishlist: remove };
          }
        });
      },
    }),
    { name: "wishlist", skipHydration: true, getStorage: () => localStorage },
  ),
);

export default useWishlist;
