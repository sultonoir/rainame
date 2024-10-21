"use client";

import { forwardRef, Fragment, type ReactNode } from "react";
import { AnimatedSpinner } from "@/components/templates/icons";
import { Button, type ButtonProps } from "@/components/ui/button";

import { cn } from "@/lib/utils";

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
    return (
      <Button
        ref={ref}
        {...props}
        disabled={props.disabled ? props.disabled : loading}
        className={cn(className, "relative")}
      >
        {loading ? (
          <div className="absolute inset-0 grid place-items-center">
            <AnimatedSpinner className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <Fragment>
            {startContent && <span className="mr-1">{startContent}</span>}
            {children}
            {endContent && <span className="mr-1">{startContent}</span>}
          </Fragment>
        )}
      </Button>
    );
  },
);

LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
