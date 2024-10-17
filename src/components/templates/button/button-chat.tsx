import { Button } from "@/components/ui/button";
import { MessagesSquare } from "lucide-react";
import React from "react";

export const ButtonChat = () => {
  return (
    <Button size="icon" variant="ghost" className="size-fit rounded-full p-3">
      <MessagesSquare className="size-5" />
    </Button>
  );
};
