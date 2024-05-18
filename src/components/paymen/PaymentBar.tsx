"use client";
import React from "react";
import { Button } from "../ui/button";
import { MessageSquareText } from "lucide-react";
import { type Details, type Product } from "@/server/db/schema";
import AddtoCart from "./AddtoCart";
import { api } from "@/trpc/react";
import useDialog from "@/hook/useDialog";
import { useSession } from "next-auth/react";
import useCart from "@/hook/useCart";
import { calculate } from "@/lib/totalprice";
import { navigate } from "@/lib/navigate";
import { toast } from "sonner";

interface Props {
  product: Product;
  details: Details[];
}

const PaymentBar = ({ product, details }: Props) => {
  const { data } = useSession();
  const { onOpen } = useDialog();
  const { size } = useCart();
  const { mutate, isPending } = api.payment.createPayment.useMutation({
    onSuccess: (e) => {
      navigate(`/payment/${e}`);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const totalPrice = calculate({
    discount: product.discount,
    price: product.price,
  });
  const handleClick = () => {
    if (!data) {
      return onOpen(true);
    }
    mutate({
      productId: product.id,
      price: totalPrice,
      size: size,
      amount: 1,
    });
  };

  return (
    <div className="fixed bottom-0 left-0 z-50 block w-full border-t bg-background px-4 py-2 lg:hidden">
      <div className="flex w-full flex-row items-center gap-2">
        <Button size="icon" variant="outline" className="flex-shrink-0">
          <MessageSquareText size="20" />
        </Button>
        <AddtoCart product={product} details={details} />
        <Button
          size="sm"
          className="h-10 w-full"
          onClick={handleClick}
          isLoading={isPending}
          disabled={isPending}
        >
          Buy now
        </Button>
      </div>
    </div>
  );
};

export default PaymentBar;
