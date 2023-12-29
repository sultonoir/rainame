"use client";

import FormChangePass from "@/components/form/FormChangePass";
import FormUpdateAdmin from "@/components/form/FormUpdateAdmin";
import ModalUploadImage from "@/components/modal/ModalUploadImage";
import TableOrderUser from "@/components/table/TableOrderUser";
import { api } from "@/trpc/react";
import { Button, User } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const { data: admin } = useSession();
  const searchParams = useSearchParams();
  //get data payment
  const payments = api.cart.getPaymentByUser.useMutation();
  const Options = searchParams.get("options");
  const [active, setActive] = useState(Options ?? "Profile");

  React.useEffect(() => {
    if (Options === "Order") {
      payments.mutate();
    }
  }, [Options]);

  if (!admin) redirect("/");

  const option = [
    {
      title: "Profile",
      id: "Profile",
    },
    {
      title: "Order",
      id: "Order",
    },
    {
      title: "Ratings",
      id: "Ratings",
    },
    {
      title: "Password",
      id: "Password",
    },
  ];

  const handlePayment = (title: string) => {
    if (title === "Order") {
      setActive(title);
      payments.mutate();
    } else {
      setActive(title);
    }
  };

  return (
    <section className="flex gap-5">
      <div className="relative">
        <div className="sticky top-20 flex flex-col gap-5">
          <User
            className="justify-start pl-2"
            name={admin.user.name}
            avatarProps={{
              src: admin.user.image ?? "",
            }}
          />
          <ul className="flex w-fit flex-col gap-1" aria-label="option">
            {option.map((item) => (
              <Button
                as="li"
                id={item.id}
                size="sm"
                key={item.title}
                variant={active === item.title ? "flat" : "light"}
                color="primary"
                onClick={() => handlePayment(item.title)}
                className="w-[240px] justify-start"
              >
                {item.title}
              </Button>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-2 w-full">
        {active === "Profile" && (
          <div className="flex w-full flex-row justify-start gap-10">
            <ModalUploadImage imageUrl={admin.user.image ?? ""} />
            <FormUpdateAdmin admin={admin} />
          </div>
        )}
        {active === "Password" && <FormChangePass admin={admin} />}
        {active === "Order" && (
          <>
            {!payments.data ? (
              <div className="flex items-center justify-center">
                Order not found
              </div>
            ) : (
              <>
                <TableOrderUser payments={payments.data} />
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
