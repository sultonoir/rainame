import { Category } from "@/modules/category/category.types";
import React from "react";
import NavbarCategoryMobile from "./navbar-category-mobile";

interface Props {
  categories: Category[];
}

const NavbarMobile = ({ categories }: Props) => {
  return (
    <div className="flex items-center gap-2">
      {/* <SearchForm />
          <CartSidebar /> */}
      <NavbarCategoryMobile categories={categories} />
    </div>
  );
};

export default NavbarMobile;
