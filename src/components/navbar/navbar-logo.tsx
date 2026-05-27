import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className={cn("inline-flex w-fit items-center ring-0 outline-none")}>
      <Image
        src="/logo.png"
        height={40}
        width={40}
        alt="logo"
      />
      <p className="hidden text-lg font-bold lg:block">Rainame</p>
    </Link>
  );
};

export default NavbarLogo;
