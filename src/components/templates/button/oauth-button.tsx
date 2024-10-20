import React from "react";
import Link from "next/link";
import { Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";

const OauthButton = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" className="w-full" asChild>
        <Link href="/login/google" prefetch={false}>
          <Chrome className="mr-2 size-5" />
        </Link>
      </Button>
    </div>
  );
};

export default OauthButton;
