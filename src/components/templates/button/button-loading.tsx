"use client";

import { forwardRef, Fragment } from "react";
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
        {loading ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <Fragment>
            {startContent && <span className={cn("mr-2")}>{startContent}</span>}
            {children}
            {endContent && <span className={cn("ml-2")}>{endContent}</span>}
          </Fragment>
        )}
      </Button>
    );
  },
);

ButtonLoading.displayName = "ButtonLoading";

export { ButtonLoading };
