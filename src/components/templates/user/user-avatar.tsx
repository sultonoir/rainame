import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  avatar?: string | null;
  name?: string;
}
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function UserAvatar({ className, avatar, name }: Props) {
  return (
    <Avatar className={cn("h-8 w-8 rounded-lg", className)}>
      <AvatarImage src={avatar ?? "/avatar-placeholder.png"} alt={name} />
      <AvatarFallback className="rounded-lg">
        {name?.at(0)?.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
