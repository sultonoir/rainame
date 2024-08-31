import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth/actions";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";
import { LoadingButton } from "./loading-button";
import { APP_TITLE } from "@/lib/constants";

export const SignoutButton = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignout = async () => {
    setIsLoading(true);
    try {
      await logout();
      toast("Signed out successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message, {
          icon: (
            <ExclamationTriangleIcon className="h-4 w-4 text-destructive" />
          ),
        });
      }
    } finally {
      setOpen(false);
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        className="flex w-full items-center justify-between px-2 py-1.5 text-sm outline-none hover:bg-accent"
        asChild
      >
        <button>
          Sign out
          <span className="text-muted-foreground">⇧⌘Q</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xs">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Sign out from {APP_TITLE}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You will be redirected to the home page.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-center">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <LoadingButton loading={isLoading} onClick={handleSignout}>
            Continue
          </LoadingButton>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
