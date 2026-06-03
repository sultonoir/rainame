import { Prisma } from "prisma";
import z from "zod";
import { reviewSelect } from "./review.select";
export const inputGetReview = z.object({
  slug: z.string(),
  page: z.number(),
  take: z.number(),
});

export type InputGetReview = z.infer<typeof inputGetReview>;

export type Reviews = Prisma.RatingGetPayload<{
  select: typeof reviewSelect;
}>;
