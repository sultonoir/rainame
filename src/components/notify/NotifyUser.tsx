"use client";
import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  cn,
} from "@nextui-org/react";
import { BellIcon, BellRing, Check } from "lucide-react";
import { api } from "@/trpc/react";
import { motion } from "framer-motion";
const NotifyUser = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => {
    setIsOpen(!isOpen);
  };
  //handle notify foruser
  const { data } = api.user.getNotify.useQuery();

  //handle notification has reads
  const ctx = api.useUtils();
  const { mutate } = api.user.readsNotify.useMutation({
    onSuccess: async () => {
      await ctx.user.getNotify.refetch();
    },
  });
  const handleClick = () => {
    mutate();
  };

  //filter data notification has reads
  const reads = data?.notify.filter((item) => item.reads === false);
  return (
    <>
      {data?.role === "admin" ? null : (
        <Popover
          placement="bottom"
          showArrow
          shouldBlockScroll
          isOpen={isOpen}
          onOpenChange={(open) => setIsOpen(open)}
        >
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
              {!data ? (
                <p>Error</p>
              ) : (
                <>
                  {data.notify.length < 1 ? (
                    <div className="mt-2 flex flex-col items-center gap-2">
                      <p className="text-xl font-bold">No notification</p>
                    </div>
                  ) : (
                    <div className="flex h-fit max-h-[300px] flex-col gap-1 divide-y overflow-y-auto scrollbar-hide">
                      {data?.notify.map((item) => (
                        <div
                          key={item.id}
                          className={cn(
                            "relative flex items-center bg-content1 py-2 first:pt-2 last:pb-0 hover:opacity-80",
                            {
                              "bg-transparent": item.reads === true,
                            },
                          )}
                          onClick={onClose}
                        >
                          <Button
                            variant="flat"
                            color="success"
                            isIconOnly
                            radius="full"
                          >
                            <Check />
                          </Button>
                          <div className="ml-4 flex flex-1 flex-col">
                            <p className="text-medium font-semibold">
                              Payment success
                            </p>
                            <p className="w-full max-w-[150px] truncate text-small text-default-500">
                              {item.createdAt.toLocaleDateString()}
                            </p>
                          </div>
                          <a
                            href={`/${data.name}?options=Order`}
                            className="absolute inset-0"
                          ></a>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

export default NotifyUser;
