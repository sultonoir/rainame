import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import React from "react";

export default function ButtonNotification() {
  return (
    <Button size="icon" variant="ghost" className="size-fit rounded-full p-3">
      <Bell size={20} />
    </Button>
  );
}
