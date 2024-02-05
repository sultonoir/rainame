"use client";
import { Button } from "@nextui-org/react";
import React from "react";
import AuthHeaders from "../authadmin/AuthHeaders";
import { XIcon } from "lucide-react";
import useToggleAuth from "@/hooks/useToggleAuth";
import FormSignin from "../form/FormSingin";
import FormSignup from "../form/FormSignup";
import { signIn } from "next-auth/react";
import FormForgotPass from "../form/FormForgotPass";
import { motion } from "framer-motion";
import { toast } from "sonner";

const ModalAuthMobile = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { signin, signup, onForgot, forgot } = useToggleAuth();
  return (
    <>
      <Button
        size="sm"
        color="primary"
        onClick={() => setIsOpen(true)}
        className="flex lg:hidden"
      >
        Login
      </Button>
      {isOpen ? (
        <div
          className="z- fixed inset-0 h-screen w-screen bg-overlay/50 backdrop-opacity-disabled"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="fixed inset-0 z-50 flex h-[100dvh] w-screen items-center justify-center">
            <motion.section
              aria-hidden
              className="relative z-50 mx-1 my-1 box-border flex w-full max-w-md flex-col overflow-y-hidden rounded-large bg-content1 shadow-small outline-none sm:mx-6 sm:my-16"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <button
                className="absolute right-1 top-1 select-none appearance-none rounded-full p-2 text-foreground-500 outline-none tap-highlight-transparent hover:bg-default-100"
                onClick={() => setIsOpen(false)}
              >
                <XIcon />
              </button>
              <header className="flex flex-initial flex-col px-6 py-4 text-large font-semibold">
                <AuthHeaders title="Welcome to Rainame" />
              </header>
              <div className="flex flex-col gap-2 px-6 pb-4">
                {signin && <FormSignin />}
                {signup && <FormSignup />}
                {forgot && <FormForgotPass />}
                {signin && (
                  <button
                    onClick={onForgot}
                    className="flex justify-end bg-transparent text-primary underline hover:opacity-80"
                  >
                    Forgot Password ?
                  </button>
                )}
                <div className="w-full max-w-md">
                  <hr className="mt-5 h-0 border-t border-zinc-300 dark:border-zinc-600" />
                  <p className="-mt-2.5 text-center text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="bg-content1 px-4">Or with</span>
                  </p>
                </div>

                <div className="mt-6 flex w-full max-w-md flex-col gap-2">
                  <Button
                    onClick={async () =>
                      await signIn("signin", {
                        email: "afdal@gmail.com",
                        password: "hajimete365",
                        redirect: false,
                      })
                        .then((callback) => {
                          if (callback?.ok) {
                            toast.success("sigin");
                          }
                          if (callback?.error) {
                            toast.error(callback.error);
                          }
                        })
                        .catch(() => {
                          toast.error("Errors");
                        })
                    }
                    variant="bordered"
                    color="default"
                    size="sm"
                  >
                    Try demo account
                  </Button>
                  <Button
                    onClick={() => signIn("google")}
                    variant="bordered"
                    color="default"
                    size="sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-auto"
                      preserveAspectRatio="xMidYMid"
                      viewBox="0 0 256 262"
                    >
                      <path
                        fill="#4285F4"
                        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                      ></path>
                      <path
                        fill="#34A853"
                        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                      ></path>
                      <path
                        fill="#FBBC05"
                        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                      ></path>
                      <path
                        fill="#EB4335"
                        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                      ></path>
                    </svg>
                    Sign in with Google
                  </Button>
                  <Button
                    onClick={() => signIn("discord")}
                    variant="bordered"
                    color="default"
                    size="sm"
                  >
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 -28.5 256 256"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMidYMid"
                    >
                      <g>
                        <path
                          d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
                          fill="#5865F2"
                          fillRule="nonzero"
                        ></path>
                      </g>
                    </svg>
                    Sign in with Discord
                  </Button>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ModalAuthMobile;
