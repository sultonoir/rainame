"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Chrome, FacebookIcon, KeyRound } from "lucide-react";
const FormOauthButton = () => {
  const [isLoading, setIsLoading] = React.useState({
    github: false,
    demo: false,
  });
  const router = useRouter();
  return (
    <div className="mt-3 flex flex-col gap-1">
      <Button
        variant="outline"
        startContent={<Chrome className="mr-2 flex-shrink-0" />}
        onClick={() =>
          signIn("google", {
            callbackUrl: "/",
            redirect: true,
          })
        }
      >
        Continue with google
      </Button>
      <Button
        disabled={isLoading.github}
        isLoading={isLoading.github}
        startContent={<FacebookIcon className="mr-2 flex-shrink-0" />}
        variant="outline"
        onClick={async () => {
          setIsLoading({
            ...isLoading,
            github: true,
          });
          await signIn("github", {
            redirect: true,
            callbackUrl: "/",
          }).then((callback) => {
            if (callback?.ok) {
              setIsLoading({
                ...isLoading,
                github: false,
              });
              router.push("/");
            }
            if (callback?.error) {
              toast.error(callback.error);
              setIsLoading({
                ...isLoading,
                github: false,
              });
            }
          });
        }}
      >
        Continue with github
      </Button>
      <Button
        variant="outline"
        disabled={isLoading.demo}
        isLoading={isLoading.demo}
        startContent={<KeyRound className="mr-2 flex-shrink-0" />}
        onClick={async () => {
          setIsLoading({
            ...isLoading,
            demo: true,
          });
          await signIn("signin", {
            email: "ilham@gmail.com",
            redirect: true,
            callbackUrl: "/",
          }).then((callback) => {
            if (callback?.ok) {
              setIsLoading({
                ...isLoading,
                demo: false,
              });
            }
            if (callback?.error) {
              toast.error(callback.error);
              setIsLoading({
                ...isLoading,
                demo: false,
              });
            }
          });
        }}
      >
        Continue with demo
      </Button>
    </div>
  );
};

export default FormOauthButton;
