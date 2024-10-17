import { redirect } from "next/navigation";
import React from "react";

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

const Page = ({ searchParams }: Props) => {
  const error = searchParams?.error;

  if (error) {
    redirect("/");
  }

  return <div>Page</div>;
};

export default Page;
