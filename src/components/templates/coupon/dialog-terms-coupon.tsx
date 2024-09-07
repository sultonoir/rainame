"use client";
import useDialogTerms from "@/hooks/useDialogTerms";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const DialogTermsCoupon = () => {
  const { open, setOpen, terms } = useDialogTerms();
  const Preview = React.useMemo(
    () =>
      dynamic(() => import("@/components/ui/preview"), {
        ssr: false,
        loading: () => (
          <Skeleton className="flex min-h-[150px] w-full items-center justify-center" />
        ),
      }),
    [],
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms and conditions</DialogTitle>
          <DialogDescription>
            The following are the terms and conditions for using vouchers
          </DialogDescription>
        </DialogHeader>
        <Preview values={terms} />
      </DialogContent>
    </Dialog>
  );
};

export default DialogTermsCoupon;
