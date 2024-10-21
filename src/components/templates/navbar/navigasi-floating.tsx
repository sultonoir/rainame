"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement>;

export const NavigasiFloating = ({ className, children, ...props }: Props) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true); // Navbar terlihat di awal

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;

      // Ketika scroll berada di bagian paling atas
      if (scrollYProgress.get() < 0.05) {
        setVisible(true); // Navbar tetap terlihat
      } else {
        // Jika scroll ke bawah, sembunyikan navbar
        if (direction > 0) {
          setVisible(false);
        } else {
          // Jika scroll ke atas, tampilkan navbar
          setVisible(true);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 0, // Navbar muncul di awal
        }}
        animate={{
          y: visible ? 0 : -100, // Navbar menghilang ketika di-scroll ke bawah
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "sticky inset-x-0 top-0 z-[10] w-full max-w-[2000px]",
          className,
          { ...props },
        )}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
