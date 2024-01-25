"use client";
import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { BellIcon, DotIcon } from "lucide-react";
import { api } from "@/trpc/react";

const NotifyAdmin = () => {
  const { data } = api.user.getNotifyAdmin.useQuery();
  return (
    <Popover placement="bottom" offset={20} showArrow>
      <PopoverTrigger>
        <Button isIconOnly variant="light" radius="full" className="relative">
          {data?.admin?.hasNotify ? (
            <span className="absolute right-[8px] top-[8px] animate-pulse rounded-full border-[6px] border-primary text-primary"></span>
          ) : null}
          <BellIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">Popover Content</div>
          <div className="text-tiny">This is the popover content</div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotifyAdmin;
