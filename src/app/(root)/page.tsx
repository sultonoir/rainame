import { SubmitButton } from "@/components/button/submit-button";
import JsonDisplay from "@/components/ui/json-ui";
import { logout } from "@/lib/auth/actions";
import { api } from "@/trpc/server";
import React from "react";

const Page = async () => {
  const data = await api.user.list();
  return (
    <div className="container h-screen space-y-2 py-4">
      <div className="flex flex-wrap gap-2">
        {data.map((item) => (
          <JsonDisplay data={item} key={item.id} />
        ))}
      </div>
      <form action={logout}>
        <SubmitButton>Logout</SubmitButton>
      </form>
    </div>
  );
};

export default Page;
