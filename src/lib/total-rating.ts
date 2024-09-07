import { type Rating } from "@prisma/client";

export const getTotalRating = (ratings: Rating[]) => {
  return ratings.reduce((acc, cur) => acc + cur.value, 0);
};
