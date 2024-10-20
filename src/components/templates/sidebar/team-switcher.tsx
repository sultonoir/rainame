"use client";

import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="relative aspect-square size-10 transition-[width,height,padding] group-data-[collapsible=icon]:!size-8">
            <Image src={"/logo.png"} alt="logo" fill priority />
          </div>
          <p className="text-lg font-bold">Rainame</p>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
