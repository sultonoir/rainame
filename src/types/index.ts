import { type Product, type ProductImage } from "@prisma/client";
import { type LucideProps } from "lucide-react";

export type GithubData = {
  id: number;
  name: string;
  avatar_url: string;
};

export type FacebookData = {
  name: string;
  id: string;
  email: string;
  picture: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      width: number;
    };
  };
};

export type GoogleUser = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  picture: string;
  locale: string;
};

export type AdminMenuList = {
  title: string;
  path: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  count: number | null;
};

type MenuListProfile = {
  title: string;
  path: string;
  keybind: string;
};

export type MenuProfileProps = {
  menulists: MenuListProfile[];
};

export type Option = Record<"value" | "label", string> & Record<string, string>;

export type ProductCard = Product & {
  productImage: ProductImage;
  rating: number;
  wishlist: boolean;
};
