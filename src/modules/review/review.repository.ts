import { db } from "@/lib/db";
import { InputGetReview } from "./review.type";

export class ReviewRepository {
  async findBySlugProduct({ slug, page, take }: InputGetReview) {
    const skip = (page - 1) * take;

    const [reviews, total] = await Promise.all([
      db.rating.findMany({
        where: {
          product: {
            slug,
          },
        },
        skip,
        take,
        orderBy: {
          createdAt: "desc",
        },
        select: {
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
        },
      }),

      db.rating.count({
        where: {
          product: {
            slug,
          },
        },
      }),
    ]);

    return {
      reviews,
      pagination: {
        page,
        take,
        total,
        totalPage: Math.ceil(total / take),
        hasNext: page * take < total,
        hasPrev: page > 1,
      },
    };
  }
}
