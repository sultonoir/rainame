"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import ModalAuth from "../modal/ModalAuth";
import { Link } from "@nextui-org/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ThemeSwitcher } from "../shared/ThemeSwithcer";
import Profile from "../shared/Profile";
import NotifyUser from "../notify/NotifyUser";
import Cart from "../shared/Cart";
import ModalAuthMobile from "../modal/ModalAuthMobile";
import { Button } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import ModalSearch from "../modal/ModalSearch";
import { useRouter } from "next/navigation";
import Test from "../test";

export default function NavbarUi() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [values, setValues] = React.useState("");
  const { data: user } = useSession();

  //handle submit
  const router = useRouter();
  const handleSubmit = () => {
    if (values !== "") {
      setValues("");
      setIsOpen((open) => !open);
      return router.push(`/product?search=${values}`);
    }
    setValues("");
    setIsOpen((open) => !open);
  };
  //handle keydown
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Mencegah aksi default saat menekan tombol "Enter"
      handleSubmit(); // Menambahkan todo saat tombol "Enter" ditekan
    }
  };
  return (
    <Navbar
      classNames={{
        wrapper: "px-3 lg:px-6 max-w-[1400px]",
      }}
    >
      <NavbarBrand>
        <Link href="/" className="flex font-bold text-foreground text-inherit">
          <Image
            src="/logo-transparent.png"
            alt="logo"
            width={40}
            height={40}
          />
          Rainame
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden grow md:flex lg:hidden" justify="center">
        <div className="relative w-full">
          <input
            onKeyDown={handleKeyDown}
            value={values}
            onChange={(e) => setValues(e.target.value)}
            autoFocus
            className="flex w-full rounded-full border border-primary bg-content1 p-2 pl-11 outline-none focus:ring focus:ring-primary focus:ring-opacity-20"
            placeholder="Search...."
          />
          <span className="absolute left-[10px] top-1/2 -translate-y-1/2 transform text-2xl">
            <SearchIcon />
          </span>
        </div>
      </NavbarContent>
      <NavbarContent
        as="div"
        className="relative hidden grow lg:flex"
        justify="center"
      >
        {isOpen ? (
          <div className="relative w-full">
            <input
              onKeyDown={handleKeyDown}
              value={values}
              onChange={(e) => setValues(e.target.value)}
              autoFocus
              className="flex w-full rounded-full border border-default-300 bg-default-100 p-2 pl-12 outline-none focus:border-primary focus:ring focus:ring-primary/30"
              placeholder="Search...."
            />
            <span className="absolute left-1 top-1/2 -translate-y-1/2 transform text-2xl md:left-2.5">
              <SearchIcon />
            </span>
          </div>
        ) : (
          <Test />
        )}
      </NavbarContent>
      <NavbarContent justify="end" className="gap-1">
        <ModalSearch />
        <Button
          isIconOnly
          radius="full"
          variant="light"
          className="hidden lg:flex"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <SearchIcon />
        </Button>
        <NavbarItem as="div" className="hidden lg:flex">
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          {!user ? (
            <div className="flex flex-row gap-2">
              <ModalAuth />
              <ModalAuthMobile />
            </div>
          ) : (
            <NavbarItem as="div" className="flex items-center gap-2">
              <Cart />
              <NotifyUser />
              <Profile />
            </NavbarItem>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
