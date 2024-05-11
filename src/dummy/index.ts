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
