import { type Coupon } from "@prisma/client";
import { create } from "zustand";

interface SelectCouponStore {
  selectedCoupon: Coupon | undefined;
  setSelectedCoupon: (open: Coupon) => void;
}

const useSelectCoupon = create<SelectCouponStore>((set) => ({
  selectedCoupon: undefined,
  setSelectedCoupon: (selectedCoupon: Coupon) => set({ selectedCoupon }),
}));

export default useSelectCoupon;
