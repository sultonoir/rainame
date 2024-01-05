"use client";
import { Button } from "@nextui-org/react";
import { ChevronUp } from "lucide-react";
import React from "react";

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // This creates a smooth scrolling effect
    });
  };
  return (
    <Button
      isIconOnly
      color="primary"
      variant="flat"
      radius="full"
      className="fixed bottom-1 right-1 sm:hidden"
      onClick={scrollToTop}
    >
      <ChevronUp />
    </Button>
  );
};

export default ScrollToTop;
