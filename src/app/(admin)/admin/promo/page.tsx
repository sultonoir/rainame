"use client";
import ModalPromo from "@/components/modal/ModalPromo";
import { api } from "@/trpc/react";
import { Button, Image } from "@nextui-org/react";
import React from "react";
import { toast } from "sonner";

const Page = () => {
  const ctx = api.useUtils();
  const { data } = api.promo.getPromo.useQuery();
  const handleDelete = api.promo.deletePromo.useMutation({
    onSuccess: async () => {
      await ctx.promo.getPromo.refetch();
      toast.success("promo deleted");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  return (
    <section className="mt-2 flex w-full flex-col gap-5">
      <ModalPromo />
      <div className="mt-2 grid grid-cols-2 gap-5">
        {data?.map((item) => (
          <div key={item.id} className="flex h-96 w-full flex-row gap-5">
            <Image
              removeWrapper
              src={item.imageUrl}
              width={200}
              height={200}
              className="h-auto max-h-96 w-full rounded-2xl object-cover"
            />
            <Button
              variant="flat"
              color="danger"
              onClick={() => {
                handleDelete.mutate({
                  id: item.id,
                });
              }}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Page;
