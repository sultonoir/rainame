"use client";
import { Card, CardBody, Checkbox, User, cn } from "@nextui-org/react";
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

  return (
    <div className="my-10">
      <p className="py-3 text-xl font-semibold">Rattings</p>
      {rattings.length < 1 ? (
        <div className="mt-10 h-full w-full">
          <p className="text-center text-2xl font-semibold">No rating yet</p>
        </div>
      ) : (
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
                        {rataRata} <span>/</span> <span>5</span>
                      </p>
                    </div>
                    {num.reverse().map((item) => (
                      <div className="flex flex-row gap-2" key={item}>
                        <Checkbox
                          isSelected={value === item}
                          onChange={() => {
                            setValue(item);
                          }}
                        />
                        <Star className="fill-yellow-400 stroke-default-100 stroke-1" />
                        {item}
                      </div>
                    ))}
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-3">
            <div
              className={cn("grid grid-cols-1 gap-10", {
                "h-full": filteredRating.length < 1,
              })}
            >
              {filteredRating.map((item) => (
                <div className="flex flex-col gap-2 border-b border-default-100 py-3">
                  <p className="inline-flex">
                    <Star className="fill-yellow-400 stroke-default-100 stroke-1" />
                    {item.value}
                  </p>
                  <User
                    classNames={{
                      base: "justify-start",
                    }}
                    name={item.user.name}
                    avatarProps={{
                      src: item.user.image ?? "",
                    }}
                  />
                  <p>{item.comment}</p>
                </div>
              ))}
              {filteredRating.length < 1 && (
                <div className="inline-flex h-full w-full items-center justify-center">
                  <p className="text-lg font-semibold">No rating yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ratings;
