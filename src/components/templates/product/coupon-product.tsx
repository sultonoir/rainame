"use client";
import useDialogTerms from "@/hooks/useDialogTerms";
import useSheet from "@/hooks/useSheet";
import { type Coupon } from "@prisma/client";
import { Ticket } from "lucide-react";
import React from "react";

type Props = {
  coupon: Coupon;
  type: "single" | "multiple";
  amount: number;
};

const CouponProduct = (props: Props) => {
  const { setOpen, setTerms } = useDialogTerms();
  const { setIsOpen } = useSheet();

  const openDialog = () => {
    setOpen(true);
    setTerms(props.coupon.tac);
  };

  const openSheet = () => {
    setIsOpen(true);
  };

  return (
    <div className="flex gap-2">
      <div className="max-w-xs flex-grow space-y-1 rounded-sm bg-sky-100 p-3 text-sky-800">
        <p className="inline-flex items-center gap-2 rounded-sm bg-sky-200 px-1 py-0.5 text-[12px] font-bold uppercase">
          <Ticket />
          {props.coupon.title}
        </p>
        <div className="flex items-end justify-between">
          <p className="max-w-xs flex-grow space-x-2 text-[10px] leading-normal">
            <strong>{props.coupon.code}</strong>
            <span>|</span>
            <span>{props.coupon.desc}</span>
          </p>
          <button onClick={openDialog} className="text-[12px] underline">
            T&C
          </button>
        </div>
      </div>
      {props.type === "multiple" && props.amount> 1 && (
        <div className="flex flex-shrink-0 flex-col items-center justify-center rounded-sm bg-sky-100 p-3 text-sky-800">
          <strong className="text-sm">+{props.amount - 1} more</strong>
          <button onClick={openSheet} className="text-[12px] underline">
            See all
          </button>
        </div>
      )}
    </div>
  );
};

export default CouponProduct;
