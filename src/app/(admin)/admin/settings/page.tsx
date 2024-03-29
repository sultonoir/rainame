"use client";

import FormChangePass from "@/components/form/FormChangePass";
import FormUpdateAdmin from "@/components/form/FormUpdateAdmin";
import ModalUploadImage from "@/components/modal/ModalUploadImage";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const { data: admin } = useSession();
  const [active, setActive] = useState("Profile");

  if (!admin) redirect("/admin");

  const option = [
    {
      title: "Profile",
    },
    {
      title: "Password",
    },
  ];

  return (
    <main className="container max-w-4xl">
      <header className="p-2">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p>Manage your account settings and set e-mail preferences.</p>
      </header>
      <section className="flex gap-5">
        <ul className="mt-2 flex w-fit flex-col gap-1" aria-label="option">
          {option.map((item) => (
            <Button
              as="li"
              key={item.title}
              variant={active === item.title ? "flat" : "light"}
              color="primary"
              onClick={() => setActive(item.title)}
            >
              {item.title}
            </Button>
          ))}
        </ul>
        <div className="mt-2 w-full">
          {active === "Profile" && (
            <>
              <div className="flex w-full justify-center gap-5">
                <ModalUploadImage imageUrl={admin.user.image ?? ""} />
                <FormUpdateAdmin admin={admin} />
              </div>
            </>
          )}
          {active === "Password" && <FormChangePass />}
        </div>
      </section>
    </main>
  );
};

export default Page;
