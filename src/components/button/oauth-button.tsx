import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Chrome, Facebook } from "lucide-react";

const OauthButton = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" className="w-full" asChild>
        <Link href="/login/github" prefetch={false}>
          <GitHubLogoIcon className="mr-2 h-5 w-5" />
        </Link>
      </Button>
      <Button variant="outline" className="w-full" asChild>
        <Link href="/login/google" prefetch={false}>
          <Chrome className="mr-2 h-5 w-5" />
        </Link>
      </Button>
      <Button variant="outline" className="w-full" asChild>
        <Link href="/login/facebook" prefetch={false}>
          <Facebook className="mr-2 h-5 w-5" />
        </Link>
      </Button>
    </div>
  );
};

export default OauthButton;
