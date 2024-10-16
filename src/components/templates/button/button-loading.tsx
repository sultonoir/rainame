"use client";

import { forwardRef } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonLoadingProps extends ButtonProps {
  loading?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

const ButtonLoading = forwardRef<HTMLButtonElement, ButtonLoadingProps>(
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
    return (
      <Button
        ref={ref}
        {...props}
        disabled={props.disabled ? props.disabled : loading}
        className={cn(className, "relative")}
      >
        {startContent && (
          <span
            className={cn("mr-2", {
              "opacity-0": loading,
            })}
          >
            {startContent}
          </span>
        )}
        <span className={cn(loading ? "opacity-0" : "")}>{children}</span>
        {loading ? (
          <div className="absolute inset-0 grid place-items-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : null}
        {endContent && (
          <span
            className={cn("ml-2", {
              "opacity-0": loading,
            })}
          >
            {endContent}
          </span>
        )}
      </Button>
    );
  },
);

ButtonLoading.displayName = "ButtonLoading";

export { ButtonLoading };
