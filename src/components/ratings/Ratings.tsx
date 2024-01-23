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

  const calculateAverageRating = () => {
    const totalRating = rattings.reduce(
      (total, current) => total + current.value,
      0,
    );

    const averageRating = totalRating / rattings.length;
    return averageRating;
  };

  const rataRata = calculateAverageRating();

  const filteredRating = rattings.filter((item) => item.value === value);

  function calPercen(nilai: number) {
    const totalRating = rattings.length;
    const jumlahKemunculan = rattings.filter(
      (rating) => rating.value === nilai,
    ).length;
    const persentase = (jumlahKemunculan / totalRating) * 100;

    return persentase;
  }

  const items = React.useMemo(() => {
    const start = (page - 1) * 5;
    const end = start + 5;

    return filteredRating.slice(start, end);
  }, [page, filteredRating]);
  const pages = Math.ceil(filteredRating.length / 5);
  return (
    <div className="my-10">
      <p className="py-3 text-xl font-semibold">Rattings</p>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
        <div className="col-span-2">
          <div className="relative order-1">
            <div className="sticky top-24">
              <Card className="h-fit w-full px-5">
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
                  {num.reverse().map((item) => {
                    const percen = calPercen(item);
                    return (
                      <div key={item} className="flex w-full space-x-4">
                        <Checkbox
                          key={item}
                          isSelected={value === item}
                          onChange={() => {
                            setValue(item);
                          }}
                        >
                          <div
                            className="flex flex-row items-center gap-2"
                            key={item}
                          >
                            <Star className="fill-yellow-400 stroke-default-100 stroke-1" />
                            {item}
                          </div>
                        </Checkbox>
                        <span className="relative w-full overflow-hidden rounded-large border">
                          <span
                            className="absolute inset-0 bg-primary"
                            style={{ width: percen }}
                          ></span>
                        </span>
                      </div>
                    );
                  })}
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
        <div className="col-span-2 lg:col-span-3">
          <div
            className={cn(
              "grid min-h-full grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-1",
              {
                "h-full": items.length < 1,
              },
            )}
          >
            {items.map((item) => (
              <div
                className="flex flex-col gap-2 border-b border-default-100 py-3"
                key={item.id}
              >
                <div className="flex items-center justify-between lg:flex-1">
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
          <div className="mt-5 flex justify-center">
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
