import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { type AdminMenuList } from "@/types";
import { usePathname } from "next/navigation";

interface Props {
  item: AdminMenuList;
  isCollapsed: boolean;
}

export function AdminSidebarMenu({ isCollapsed, item }: Props) {
  const pathname = usePathname();
  const isActive = pathname.includes(item.path);
  return (
    <Tooltip key={item.title} delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={item.path}
          className={cn(
            "relative flex h-9 w-full items-center space-x-4 rounded-lg px-2 text-muted-foreground hover:bg-accent hover:text-foreground",
            {
              "bg-accent": isActive,
            },
          )}
        >
          <span className="flex-shrink-0">
            <item.icon size={20} />
          </span>
          <div
            className={cn(
              "absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-foreground",
              {
                hidden: item.count < 1,
              },
            )}
          >
            {item.count}
          </div>
          <span
            className={cn({
              "block md:hidden": isCollapsed,
              block: !isCollapsed,
            })}
          >
            {item.title}
          </span>
        </Link>
      </TooltipTrigger>
      <TooltipContent
        side="right"
        className={cn({
          hidden: isCollapsed,
          block: !isCollapsed,
        })}
      >
        Settings
      </TooltipContent>
    </Tooltip>
  );
}
