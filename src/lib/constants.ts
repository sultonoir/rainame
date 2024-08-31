export const APP_TITLE = "Rainame";
export const DATABASE_PREFIX = "acme";
export const TEST_DB_PREFIX = "test_acme";
export const EMAIL_SENDER = '"Rainame" <noreply@acme.com>';

export enum Paths {
  Home = "/",
  Login = "/login",
  Signup = "/signup",
  Dashboard = "/dashboard",
  VerifyEmail = "/verify-email",
  ResetPassword = "/reset-password",
}

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
    path: "/dashboard/products",
    keybind: "⇧⌘S",
  },
];

export const UserMenulist = [
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
    path: "/dashboard/products",
    keybind: "⇧⌘S",
  },
];
