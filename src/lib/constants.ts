export const AdminMenulist = [
  {
    title: "Dashboard",
    path: "/dashboard",
    keybind: "⇧⌘P",
  },
  {
    title: "Chats",
    path: "/dashboard/chats",
    keybind: "⇧⌘C",
  },
  {
    title: "Products",
    path: "/dashboard/products",
    keybind: "⌘J",
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    keybind: "⇧⌘S",
  },
];

export const UserMenulist = [
  {
    title: "Profile",
    path: "/user",
    keybind: "⇧⌘P",
  },
  {
    title: "My order",
    path: "/user/history",
    keybind: "⇧⌘C",
  },
  {
    title: "Settings",
    path: "/user/settings",
    keybind: "⇧⌘S",
  },
];

export type MenulistType = typeof UserMenulist;
