import React from "react";
import { Heart } from "lucide-react";
import useWishlist from "@/hook/useWishlist";
import { cn } from "@/lib/utils";
import useStore from "@/hook/useStore";
import { buttonVariants, type ButtonProps } from "../ui/button";

interface Props extends ButtonProps {
  id: string;
}

const ButtonWishlist = ({ id, className, variant, size, children }: Props) => {
  const { toggle } = useWishlist();
  const wishlist = useStore(useWishlist, (state) => state.wishlist);

  const exist = wishlist?.some((item) => item === id);

  const handleClick = () => {
    toggle(id);
  };

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={handleClick}
    >
      <Heart
        size={20}
        className={cn("stroke-foreground/80", {
          "fill-rose-500 stroke-red-500": exist === true,
        })}
      />
      {children}
    </button>
  );
};

export default ButtonWishlist;
