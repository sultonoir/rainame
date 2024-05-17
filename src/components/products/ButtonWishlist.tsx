import React from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonProps } from "../ui/button";
import { api } from "@/trpc/react";
import { toast } from "sonner";

interface Props extends ButtonProps {
  id: string;
  heart?: string;
}

const ButtonWishlist = ({
  id,
  className,
  variant,
  size,
  children,
  heart,
}: Props) => {
  const { data: exist } = api.wishlist.isWishlist.useQuery({
    productId: id,
  });

  const ctx = api.useUtils();
  const { mutate, isPending } = api.wishlist.toggleWishlist.useMutation({
    onSuccess: (e) => {
      toast.success(e);
    },
    onError: (e) => {
      toast.error(e.message);
    },
    onSettled: async () => {
      await ctx.wishlist.isWishlist.invalidate();
    },
  });
  const handleClick = () => {
    mutate({
      productId: id,
    });
  };
  

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={handleClick}
    >
      <Heart
        size={20}
        className={cn(
          "stroke-black/80",
          heart,
          {
            "fill-rose-500 stroke-red-500": exist === true,
          },
          {
            "fill-rose-500 stroke-red-500": isPending === true,
          },
        )}
      />
      {children}
    </button>
  );
};

export default ButtonWishlist;
