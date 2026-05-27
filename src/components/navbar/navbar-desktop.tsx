import React from "react";
import NavbarLogo from "./navbar-logo";
import NavbarCategoryDesktop from "./navbar-category-desktop";
import { Category } from "@/modules/category/category.types";

type Props = {
  categories: Category[];
};

const NavbarDesktop = ({ categories }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <NavbarLogo />
      <NavbarCategoryDesktop categories={categories} />
    </div>
  );
};

export default NavbarDesktop;
