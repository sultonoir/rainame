"use client";
import { Bell, CheckIcon, DotIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { api } from "@/trpc/react";
import dayjs from "dayjs";
import fromNow from "dayjs/plugin/relativeTime";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
dayjs.extend(fromNow);

export default function UserNotifications() {
  const [open, setOpen] = React.useState(false);

  const { data } = api.notifi.notifyIndicator.useQuery();
  const ctx = api.useUtils();
  const { mutate } = api.notifi.markAllReads.useMutation({
    onSuccess: async () => {
      await ctx.notifi.notifyIndicator.invalidate();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const { mutate: remove } = api.notifi.markOneRead.useMutation({
    onSuccess: async () => {
      await ctx.notifi.notifyIndicator.invalidate();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const notifiId = data?.notifications
    .filter((notifi) => notifi.isRead === null)
    .flatMap((item) => item.notifi.id);

  return (
    <HoverCard openDelay={1} open={open} onOpenChange={setOpen}>
      <HoverCardTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <span
            className={cn(
              "absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full border bg-secondary text-xs",
              {
                hidden: data && data?.idicator <= 0,
              },
            )}
          >
            {data?.idicator}
          </span>
          <Bell size={20} />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="h-fit w-dvw overflow-hidden md:max-w-[450px]">
        <div className="flex items-center justify-between font-semibold">
          <p>Notifications</p>
          <Button
            className="text-sm"
            size="sm"
            variant="ghost"
            onClick={() =>
              mutate({
                notifiId: notifiId ?? [],
              })
            }
          >
            Mark as read
          </Button>
        </div>
        <Separator className="mt-2" />
        <div className="flex max-h-[350px] w-full flex-col overflow-y-auto">
          {data?.notifications.map((item) => (
            <Link
              href="/user/order"
              onClick={() => remove({ id: item.notifi.id })}
              className="flex items-start gap-3 border-t p-2 first:border-none hover:bg-secondary"
              key={item.notifi.id}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <CheckIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">{item.notifi.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {dayjs(item.notifi.createdAt).fromNow()}
                  </p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.notifi.details}
                </p>
              </div>
              {!!item.isRead === false && (
                <div className="size-8 flex-shrink-0">
                  <DotIcon className="text-primary" />
                </div>
              )}
            </Link>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
