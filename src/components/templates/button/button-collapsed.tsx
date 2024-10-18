"use client";
import { Button } from "@/components/ui/button";
import { useIsCollapsed } from "@/hooks/use-is-collapsed";
import { cn } from "@/lib/utils";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
}

export default function ButtonCollapsed({ className }: Props) {
  const { isCollapsed, setIsCollapsed } = useIsCollapsed();
  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn("size-fit rounded-full p-3", className)}
      onClick={() => setIsCollapsed(!isCollapsed)}
    >
      {isCollapsed ? <PanelLeftClose /> : <PanelLeftOpen />}
    </Button>
  );
}
