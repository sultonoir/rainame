"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { useInView } from "react-intersection-observer";

const Wrapper = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { ref, inView } = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  return (
    <div className={cn(className)} ref={ref}>
      {inView && props.children}
    </div>
  );
};

export default Wrapper;
