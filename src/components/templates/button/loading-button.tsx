"use client";

import { forwardRef, type ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
}

const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    {
      loading = false,
      className,
      children,
      startContent,
      endContent,
      ...props
    },
    ref,
  ) => {
    const contentStart = loading ? (
      <Loader2 className="size-4 animate-spin" />
    ) : (
      startContent
    );
    return (
      <Button
        ref={ref}
        {...props}
        disabled={props.disabled ? props.disabled : loading}
        className={cn(className, "relative")}
      >
        {contentStart && (
          <span
            className={cn("mr-2", {
              "mr-0": !children,
            })}
          >
            {contentStart}
          </span>
        )}
        {children}
        {!loading && endContent && <span className="ml-2">{endContent}</span>}
      </Button>
    );
  },
);

LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
