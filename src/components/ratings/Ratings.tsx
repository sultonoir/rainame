"use client";
import {
  Card,
  CardBody,
  Checkbox,
  Pagination,
  User,
  cn,
} from "@nextui-org/react";
import { type User as Profile, type Rattings } from "@prisma/client";
import { Star } from "lucide-react";
import React, { useState } from "react";

type Props = {
  rattings: Array<
    Rattings & {
      user: Profile;
    }
  >;
};

const Ratings = ({ rattings }: Props) => {
  const [value, setValue] = useState(5);
  const [page, setPage] = React.useState(1);

  const num = [1, 2, 3, 4, 5];

  let totalRating = 0;
  let jumlahRatings = 0;

  // Iterasi melalui setiap objek rating
  for (const rating of rattings) {
    totalRating += rating.value;
    jumlahRatings++;
  }
  const rataRataRating = () => {
    if (jumlahRatings === 0) {
      return 0; // Menghindari pembagian oleh nol jika tidak ada ratings
    } else {
      const ratting = totalRating / jumlahRatings;
      return ratting;
    }
  };
  const rataRata = rataRataRating();

  const filteredRating = rattings.filter((item) => item.value === value);

  const items = React.useMemo(() => {
    const start = (page - 1) * 5;
    const end = start + 5;

    return filteredRating.slice(start, end);
  }, [page, filteredRating]);
  const pages = Math.ceil(filteredRating.length / 5);
  return (
    <div className="my-10">
      <p className="py-3 text-xl font-semibold">Rattings</p>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-1">
          <div className="relative order-1">
            <div className="sticky top-24">
              <Card className="h-fit">
                <CardBody className="flex flex-col gap-2">
                  <div className="my-3 flex flex-row items-center justify-center gap-1">
                    <Star
                      className="fill-yellow-400 stroke-default-100 stroke-1"
                      size={50}
                    />
                    <p className="text-3xl">
                      {rataRata.toFixed(1)} <span>/</span> <span>5</span>
                    </p>
                  </div>
                  {num.reverse().map((item) => (
                    <Checkbox
                      key={item}
                      isSelected={value === item}
                      onChange={() => {
                        setValue(item);
                      }}
                    >
                      <div className="flex flex-row gap-2" key={item}>
                        <Star className="fill-yellow-400 stroke-default-100 stroke-1" />
                        {item}
                      </div>
                    </Checkbox>
                  ))}
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-3">
          <div
            className={cn("grid grid-cols-1 gap-10", {
              "h-full": items.length < 1,
            })}
          >
            {items.map((item) => (
              <div
                className="flex flex-col gap-2 border-b border-default-100 py-3"
                key={item.id}
              >
                <div className="flex flex-1 items-center justify-between">
                  <User
                    classNames={{
                      base: "justify-start",
                    }}
                    name={item.user.name}
                    description={item.createdAt.toLocaleString()}
                    avatarProps={{
                      src: item.user.image ?? "/Logo.png",
                    }}
                  />
                  <p className="inline-flex">
                    <Star className="fill-yellow-400 stroke-default-100 stroke-1" />
                    {item.value}
                  </p>
                </div>
                <p>{item.comment}</p>
              </div>
            ))}
            {items.length < 1 && (
              <div className="inline-flex h-full w-full items-center justify-center">
                <p className="text-lg font-semibold">No rating yet</p>
              </div>
            )}
          </div>
          <div className="mt-2 flex justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ratings;
