"use client";

import { type Coupon } from "@prisma/client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useSheet from "@/hooks/useSheet";
import CouponProduct from "../product/coupon-product";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoadingButton } from "../button/loading-button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import useSelectCoupon from "@/hooks/useSelectCoupon";
import { cn } from "@/lib/utils";
type Props = {
  coupons: Coupon[];
  type: "select" | "show";
};

export const SheetCoupon = (props: Props) => {
  const { isOpen, setIsOpen } = useSheet();
  const { selectedCoupon, setSelectedCoupon } = useSelectCoupon();
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Voucher</SheetTitle>
        </SheetHeader>
        <ScrollArea
          className={cn("mt-2", {
            "h-[calc(100dvh-130px)]": props.type === "select",
            "h-[calc(100dvh-90px)]": props.type === "show",
          })}
        >
          {props.type === "select" ? (
            <div className="flex flex-col gap-2 pr-4">
              {props.coupons.map((coupon) => (
                <div className="flex items-center space-x-2" key={coupon.id}>
                  <Checkbox
                    id={coupon.id}
                    checked={selectedCoupon?.id === coupon.id}
                    onCheckedChange={() => setSelectedCoupon(coupon)}
                  />
                  <Label htmlFor={coupon.id}>
                    <CouponProduct
                      key={coupon.id}
                      coupon={coupon}
                      type="single"
                      amount={0}
                    />
                  </Label>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {props.coupons.map((coupon) => (
                <CouponProduct
                  key={coupon.id}
                  coupon={coupon}
                  type="single"
                  amount={0}
                />
              ))}
            </div>
          )}
        </ScrollArea>
        {props.type === "select" && (
          <div className="mt-4">
            <LoadingButton className="w-full">Hallo</LoadingButton>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
