"use server";

import { cacheLife } from "next/cache";
import { ReviewService } from "./review.service";

const reviews = new ReviewService();
export const getReviewBySlug = async (input: unknown) => {
  "use cache";
  cacheLife("hours");
  return reviews.getReviewBySlug(input);
};
