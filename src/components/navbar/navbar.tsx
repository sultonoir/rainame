import { Suspense } from "react";
import NavbarSkeleton from "./navbar-skeleton";
import NavbarContent from "./navbar-content";

const Navbar = async () => {
  return (
    <header className="bg-background sticky top-0 z-50 mx-auto h-14 w-full px-4">
      <Suspense fallback={<NavbarSkeleton />}>
        <NavbarContent />
      </Suspense>
    </header>
  );
};

export default Navbar;
