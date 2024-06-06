import {
  HeartIcon,
  Home,
  MessageSquareTextIcon,
  NotepadText,
  Package2,
  Sliders,
  UserIcon,
} from "lucide-react";

export const sidebarItems = [
  {
    titile: "Home",
    path: "/admin",
    icons: Home,
  },
  {
    title: "Chat",
    path: "/admin/chat",
    icons: MessageSquareTextIcon,
  },
  {
    title: "Product",
    path: "/admin/product",
    icons: Package2,
  },
];

export const profileMenu = [
  {
    title: "My Account",
    path: "/user/",
    icon: UserIcon,
  },
  {
    title: "My Order",
    path: "/user/my-order",
    icon: NotepadText,
  },
  {
    title: "Wishlist",
    path: "/user/wishlist",
    icon: HeartIcon,
  },
  {
    title: "Settings",
    path: "user/settings",
    icon: Sliders,
  },
];

export const subCategories = [
  { id: "t-shirt-regular", categoryId: "t-shirt", name: "T-shirt Regular" },
  {
    id: "t-shirt-longsleeve",
    categoryId: "t-shirt",
    name: "T-shirt  Longsleeve",
  },
  { id: "t-shirt-basic", categoryId: "t-shirt", name: "T-Shirt Basic" },
  {
    id: "t-shirt-oversize",
    categoryId: "t-shirt",
    name: "T-shirt Oversize",
  },
  {
    id: "t-shirt-longsleeve-oversize",
    categoryId: "t-shirt",
    name: "T-shirt  Longsleeve Oversize",
  },
  { id: "short-shirt", categoryId: "shirt", name: "Short Shirt" },
  { id: "work-shirt", categoryId: "shirt", name: "Work Shirt" },
  { id: "hoodie", categoryId: "outerwear", name: "Hoodie" },
  { id: "sukajan", categoryId: "outerwear", name: "Sukajan" },
  {
    id: "flannel-shortsleeve",
    categoryId: "shirt",
    name: "Flannel Shortsleeve",
  },
  {
    id: "flannel-longsleeve",
    categoryId: "shirt",
    name: "Flannel Longsleeve",
  },
  { id: "long-shirt", categoryId: "shirt", name: "Long Shirt" },
  { id: "denim-pants", categoryId: "pants", name: "Denim Pants" },
  { id: "chino-pants", categoryId: "pants", name: "Chino Pants" },
  { id: "cargo-pants", categoryId: "pants", name: "Cargo Pants" },
  { id: "choach-jacket", categoryId: "outerwear", name: "Choach Jacket" },
  { id: "chore-jacket", categoryId: "outerwear", name: "Chore Jacket" },
  { id: "denim-jacket", categoryId: "outerwear", name: "Denim Jacket" },
  { id: "tote-bag", categoryId: "accessories", name: "Tote bag" },
  { id: "cap", categoryId: "accessories", name: "Cap" },
];

export const category = [
  { id: "t-shirt", name: "T-Shirt" },
  { id: "shirt", name: "Shirt" },
  { id: "outerwear", name: "Outerwear" },
  { id: "pants", name: "Pants" },
  { id: "accessories", name: "Accessories" },
];

export const sizes = [
  { id: "one-size", name: "One Size" },
  { id: "s", name: "S" },
  { id: "m", name: "M" },
  { id: "l", name: "L" },
  { id: "xl", name: "XL" },
  { id: "xxl", name: "XXL" },
];

export const sorts = [
  {
    value: "best-selling",
    name: "Best selling",
  },
  {
    value: "price-low-to-high",
    name: "Price,low to high",
  },
  {
    value: "price-high-to-low",
    name: "Price, high to low",
  },
  {
    value: "date-old-to-new",
    name: "Date, old to new",
  },
  {
    value: "date-new-to-old",
    name: "Date, new-to-old",
  },
];

export const product = [
  {
    title: "t-shirt",
    selling: [
      {
        amount: 20,
      },
      {
        amount: 40,
      },
    ],
  },
  {
    title: "shirt",
    selling: [
      {
        amount: 20,
      },
    ],
  },
];
