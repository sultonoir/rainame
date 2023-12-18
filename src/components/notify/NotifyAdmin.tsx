"use client";
import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { BellIcon } from "lucide-react";

const NotifyAdmin = () => {
  return (
    <Popover placement="bottom" offset={20} showArrow>
      <PopoverTrigger>
        <Button isIconOnly variant="light" radius="full">
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
