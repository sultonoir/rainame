import FormPayment from "@/components/form/payment/FormPayment";
import PaymentCancel from "@/components/paymen/PaymentCancel";
import { api } from "@/trpc/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Payment - Rainame",
  description:
    "Welcome to Rainame, where style meets convenience. Dive into a world of fashion-forward trends and timeless classics, all at your fingertips. Whether you're seeking the perfect outfit for a night out or elevating your everyday wardrobe, Rainame offers a curated selection of clothing, accessories, and footwear to suit every taste and occasion. With seamless navigation and hassle-free shopping, indulge in a personalized experience tailored to your preferences. Embrace your individuality and let your style shine with Rainame, where fashion is more than just clothing—it's an expression of self",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface Props {
  params: { id: string };
}

const Page = async ({ params }: Props) => {
  const payment = await api.payment.getPayment({
    id: params.id,
  });

  if (!payment) {
    notFound();
  }

  const price = payment.items.reduce((acc, cur) => acc + cur.totalPrice, 0);

  return (
    <div className="container min-h-[50dvh] py-5">
      <div className="space-y-5">
        <PaymentCancel id={payment.id} />
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="flex w-[40%] flex-col space-y-5 px-10 ">
            <div className="flex w-full flex-col gap-2">
              <p className="text-[16px] leading-none text-muted-foreground">
                Pay
              </p>
              <p className="text-4xl">${price.toFixed(2)}</p>
            </div>
            {payment.items.map((item) => (
              <div className="flex gap-4" key={item.id}>
                <div className="relative aspect-square size-12">
                  {item.product.imageUrl.map((img) => (
                    <Image
                      key={img.id}
                      src={img.url}
                      alt={item.product.title}
                      fill
                      placeholder="blur"
                      blurDataURL={img.blur}
                      className="rounded-lg object-cover"
                    />
                  ))}
                </div>
                <div className="flex flex-1 flex-col space-y-3">
                  <div>
                    <div className="flex justify-between">
                      <div>
                        <p className="pr-1 text-base font-medium">
                          {item.product.title}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          <span className="capitalize">
                            Qty : {item.totlaProduct}
                          </span>
                          <span className="mx-2 h-4 border-l border-slate-200 dark:border-slate-700"></span>
                          <span className="uppercase">{item.size}</span>
                        </p>
                      </div>
                      <div className="mt-0.5">
                        <p className="pr-1 text-base font-medium">
                          ${price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <FormPayment id={payment.id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
