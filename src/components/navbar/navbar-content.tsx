import { getCategories } from "@/modules/category/category.action";
import NavbarDesktop from "./navbar-desktop";
import NavbarMobile from "./navbar-mobile";

const NavbarContent = async () => {
  const result = await getCategories();

  const categories = result.ok ? result.data : [];
  return (
    <div className="container mx-auto flex h-full max-w-7xl items-center justify-between gap-3">
      <NavbarDesktop categories={categories} />
      <NavbarMobile categories={categories} />
    </div>
  );
};

export default NavbarContent;
