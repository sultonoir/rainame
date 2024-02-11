import { type ChipProps, Image, Chip } from "@nextui-org/react";
import React from "react";

type Props = {
  image: string | undefined;
  path: string;
  color: string | null;
  name: string;
  price?: number;
  size: string | null;
  actionOne?: () => void;
  qti?: number;
  status?: string;
  totalPrice?: number;
};

const CardItems = ({
  image,
  path,
  color,
  name,
  price,
  size,
  qti,
  status,
  actionOne,
  totalPrice,
}: Props) => {
  const statusColorMap: Record<string, ChipProps["color"]> = {
    success: "success",
    paid: "primary",
    pending: "default",
  };
  return (
    <div className="flex w-full flex-1 py-5 last:pb-0">
      <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
        <Image src={image} alt={name} />
        <a href={`/product/${path}`} className="absolute inset-0 z-10"></a>
      </div>
      <div className="ml-4 flex w-full flex-1 flex-col">
        <div>
          <div className="flex justify-between">
            <div>
              <h3 className="pr-1 text-base font-medium">
                <a href={`/product/${path}`}>{name}</a>
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                <span>{color}</span>
                <span className="mx-2 h-4 border-l border-slate-200 dark:border-slate-700"></span>
                <span>{size}</span>
              </p>
            </div>
            <div className="mt-0.5">
              {status ? (
                <Chip
                  className="capitalize"
                  color={statusColorMap[status]}
                  size="sm"
                  variant="flat"
                >
                  {status}
                </Chip>
              ) : (
                <div className="flex items-center rounded-lg border-2 border-green-500 px-2 py-1 text-sm font-medium md:px-2.5 md:py-1.5">
                  <span className="!leading-none text-green-500">${price}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          {totalPrice ? (
            <p className="text-medium font-semibold">${totalPrice}</p>
          ) : null}
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="text-gray-500 dark:text-slate-400">
            Qty {qti ?? 1}
          </div>
          <div className="flex">
            {actionOne && (
              <button onClick={actionOne} className="font-medium text-primary">
                remove
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItems;
