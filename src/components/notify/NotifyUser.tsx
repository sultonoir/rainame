"use client";
import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { BellIcon } from "lucide-react";

const NotifyUser = () => {
  return (
    <Popover placement="bottom" showArrow>
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

export default NotifyUser;
