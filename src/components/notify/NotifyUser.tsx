"use client";
import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  cn,
  Link,
} from "@nextui-org/react";
import { BellIcon, BellRing } from "lucide-react";
import { api } from "@/trpc/react";
import { motion } from "framer-motion";
const NotifyUser = () => {
  const { data } = api.user.getNotify.useQuery();

  //handle notification has reads
  const ctx = api.useUtils();
  const { mutate } = api.user.readsNotify.useMutation({
    onSuccess: () => {
      ctx.user.getNotify.getData();
    },
  });
  const handleClick = () => {
    mutate();
  };

  //filter data notification has reads
  const reads = data?.notify.filter((item) => item.reads === false);
  return (
    <Popover placement="bottom" showArrow>
      <PopoverTrigger>
        {reads && reads.length > 0 ? (
          <Button
            isIconOnly
            variant="light"
            radius="full"
            className="relative overflow-visible"
            onClick={handleClick}
          >
            <motion.div
              key={reads.length}
              className="absolute right-[4px] top-[2px] z-50 flex h-2 w-2 items-center justify-center rounded-full bg-primary p-2 text-xs text-white"
              initial={{ opacity: 0, translateY: -10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              {reads.length}
            </motion.div>

            <BellRing className="fill-foreground stroke-1" />
          </Button>
        ) : (
          <Button
            isIconOnly
            variant="light"
            radius="full"
            className="relative overflow-visible"
          >
            <BellIcon />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent>
        <div className="w-[240px] px-1 py-2">
          <div className="flex items-center justify-between border-b border-default-300 pb-2">
            <p className="text-lg font-semibold">Notification</p>
            <Button
              onClick={handleClick}
              size="sm"
              variant="light"
              color="primary"
            >
              Mark all read
            </Button>
          </div>
          <div className="flex h-fit max-h-[300px] flex-col gap-1 overflow-y-auto">
            {data?.notify.map((item) => (
              <Button
                as={Link}
                href={`/${data.name}?options=Order`}
                key={item.id}
                className={cn(
                  "mt-2 flex h-fit w-full flex-col items-start justify-start overflow-hidden rounded-small bg-primary-50 p-2 hover:bg-content2",
                  {
                    "bg-transparent": item.reads === true,
                  },
                )}
              >
                <p className="text-medium font-semibold">Payment success</p>
                <p className="-mt-2 w-full truncate text-small text-default-500">
                  {item.comment}
                </p>
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotifyUser;
