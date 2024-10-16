import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <Image width={40} height={40} src="/logo.png" alt="logo" priority />
    </Link>
  );
};

export default Logo;
