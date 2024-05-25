"use client";
import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface PaymentCancelProps {
  id: string;
}

const PaymentCancel = ({ id }: PaymentCancelProps) => {
  const router = useRouter();
  const { data } = useSession();
  const { mutate, isPending } = api.payment.calcelPayment.useMutation({
    onSuccess: () => {
      router.back();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const handleClick = () => {
    if (data?.user.role === "admin") {
      return;
    }
    mutate({
      id,
    });
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      className="group relative gap-2"
      disabled={isPending}
      isLoading={isPending}
      onClick={handleClick}
      startContent={<ArrowLeft size={15} />}
    >
      <div className="relative flex w-10 items-center">
        <span className="visible absolute flex justify-center opacity-100 transition-all group-hover:invisible group-hover:opacity-0">
          Rainame
        </span>
        <div className="invisible absolute flex justify-center opacity-0 transition-all group-hover:visible group-hover:opacity-100">
          Back
        </div>
      </div>
    </Button>
  );
};

export default PaymentCancel;
