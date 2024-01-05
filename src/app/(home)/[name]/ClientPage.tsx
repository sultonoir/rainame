"use client";

import FormChangePass from "@/components/form/FormChangePass";
import FormUpdateAdmin from "@/components/form/FormUpdateAdmin";
import ModalUploadImage from "@/components/modal/ModalUploadImage";
import ScrollToTop from "@/components/shared/ScrollToTop";
import TableOrderUser from "@/components/table/TableOrderUser";
import TableRatingUser from "@/components/table/TableRatingUser";
import { api } from "@/trpc/react";
import { Button, Spinner, User } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const ClientPage = () => {
  const { data: admin } = useSession();
  const searchParams = useSearchParams();
  //get data payment
  const payments = api.cart.getPaymentByUser.useMutation();

  //get ratings
  const ratings = api.rating.getRatingByUser.useMutation();
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
    switch (title) {
      case "Order":
        title === "Order";
        payments.mutate();
        setActive(title);
        break;
      case "Ratings":
        title === "Ratings";
        ratings.mutate();
        setActive(title);
      default:
        setActive(title);
        break;
    }
  };

  return (
    <section className="relative my-5 flex w-full flex-col gap-5 sm:flex-row">
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
      {active === "Profile" && (
        <div className="flex w-full flex-col justify-start gap-10 sm:flex-row">
          <ModalUploadImage imageUrl={admin.user.image ?? ""} />
          <FormUpdateAdmin admin={admin} />
        </div>
      )}
      {active === "Password" && <FormChangePass admin={admin} />}
      {active === "Order" && (
        <>
          {payments.isLoading ? (
            <div className="flex h-[400px] w-full items-center justify-center">
              <Spinner color="primary" />
            </div>
          ) : (
            <>
              {!payments.data ? (
                <div className="flex min-h-screen items-center justify-center">
                  Order not found
                </div>
              ) : (
                <>
                  <TableOrderUser payments={payments.data} />
                </>
              )}
            </>
          )}
        </>
      )}
      {active === "Ratings" && (
        <>
          {ratings.isLoading ? (
            <div className="flex h-[400px] w-full items-center justify-center">
              <Spinner color="primary" />
            </div>
          ) : (
            <>
              {!ratings.data ? (
                <div className="flex h-[400px] items-center justify-center">
                  Order not found
                </div>
              ) : (
                <>
                  <TableRatingUser ratings={ratings.data} />
                </>
              )}
            </>
          )}
        </>
      )}
      <ScrollToTop />
    </section>
  );
};

export default ClientPage;
