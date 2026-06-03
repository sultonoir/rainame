import { Prisma } from "prisma";

export const reviewSelect = {
  id: true,
  value: true,
  message: true,
  createdAt: true,
  user: {
    select: {
      name: true,
      image: true,
      imageBlur: true,
    },
  },
} satisfies Prisma.RatingSelect;
