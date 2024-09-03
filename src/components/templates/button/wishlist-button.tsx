"use client";
import { buttonVariants, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { HeartIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface Props extends ButtonProps {
  isWislist: boolean;
  productId: string;
}

const WishlistButton = ({ variant, size, className, ...props }: Props) => {
  const [isExist, setisExist] = React.useState(props.isWislist);
  const toggleWishlish = api.wishlist.toggle.useMutation({
    onError: (e) => {
      toast.error(e.message);
    },
    onSuccess: (e) => {
      if (e === false) {
        toast.error("Remove from wishlist");
        setisExist(e);
      } else {
        toast.success("Add to wishlist");
        setisExist(e);
      }
    },
  });

  const handleToggle = () => {
    return toggleWishlish.mutate({
      productId: props.productId,
    });
  };
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={handleToggle}
    >
      <HeartIcon
        className={cn("transition-all", {
          "fill-rose-600 stroke-red-600": isExist === true,
        })}
      />
    </button>
  );
};

export default WishlistButton;
