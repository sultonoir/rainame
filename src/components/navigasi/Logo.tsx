"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const Logo = () => {
  const path = usePathname();
  return (
    <React.Fragment>
      <Link
        href="/"
        className={cn("hidden lg:block", {
          hidden: path !== "/",
          block: path === "/",
        })}
      >
        <Image
          src="/logo.png"
          alt="logo"
          width={48}
          height={48}
          priority
          loading="eager"
          className="size-full"
        />
      </Link>
      <Button
        asChild
        variant="ghost"
        size="icon"
        className={cn("lg:hidden", { hidden: path === "/" })}
      >
        <Link href="/" className={cn("lg:hidden", { hidden: path === "/" })}>
          <ArrowLeft />
        </Link>
      </Button>
    </React.Fragment>
  );
};

export default Logo;
