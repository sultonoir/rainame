import React from "react";
import { Heart } from "lucide-react";
import useWishlist from "@/hook/useWishlist";
import { cn } from "@/lib/utils";
import useStore from "@/hook/useStore";

interface Props {
  id: string;
}

const ButtonWishlist = ({ id }: Props) => {
  const { toggle } = useWishlist();
  const wishlist = useStore(useWishlist, (state) => state.wishlist);

  const exist = wishlist?.some((item) => item === id);

  const handleClick = () => {
    toggle(id);
  };

  return (
    <button
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-foreground"
      onClick={handleClick}
    >
      <Heart
        size={20}
        className={cn("stroke-foreground/80", {
          "fill-rose-500 stroke-red-500": exist === true,
        })}
      />
    </button>
  );
};

export default ButtonWishlist;
