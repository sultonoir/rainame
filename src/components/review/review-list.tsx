"use client";

import { useState, useTransition } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reviews } from "@/modules/review/review.type";
import { Button } from "@/components/ui/button";
import { fromNow } from "@/lib/date";
import { getReviewBySlug } from "@/modules/review/review.action";
import { Image } from "@unpic/react";
import { blurhashToDataUri } from "@unpic/placeholder";

type Props = {
  initialData: Reviews[];
  initialPage: number;
  initialHasNext: boolean;
  initialHasPrev: boolean;
  slug: string;
};

const ReviewList = ({
  initialData,
  initialPage,
  initialHasNext,
  initialHasPrev,
  slug,
}: Props) => {
  const [reviews, setReviews] = useState<Reviews[]>(initialData);

  const [page, setPage] = useState(initialPage);

  const [hasNext, setHasNext] = useState(initialHasNext);

  const [hasPrev, setHasPrev] = useState(initialHasPrev);

  const [isPending, startTransition] = useTransition();

  const handlePagination = (nextPage: number) => {
    startTransition(async () => {
      const response = await getReviewBySlug({ page: nextPage, slug, take: 5 });

      if (!response) {
        return;
      }

      setReviews(response.reviews);
      setPage(response.pagination.page);
      setHasNext(response.pagination.hasNext);
      setHasPrev(response.pagination.hasPrev);
    });
  };

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="grid grid-cols-1 gap-2 ">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex items-start gap-5 py-4 first:pt-0 last:pb-0">
            <Image
              src={review.user.image}
              background={blurhashToDataUri(review.user.imageBlur)}
              alt="avatar"
              width={40}
              height={40}
              className="size-10 shrink-0 rounded-full overflow-hidden"
            />

            <div className="flex grow flex-col gap-1">
              <p className="text-lg font-semibold">
                {review.user?.name}

                <span className="text-muted-foreground ml-2 text-sm font-normal">
                  {fromNow(new Date(review.createdAt))}
                </span>
              </p>

              <div className="flex items-center">
                {Array.from({
                  length: 5,
                }).map((_, index) => (
                  <Star
                    key={index}
                    className={cn(
                      "size-4",
                      index < review.value
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted text-muted",
                    )}
                  />
                ))}
              </div>

              <p className="text-muted-foreground">{review.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            disabled={!hasPrev || isPending}
            onClick={() => handlePagination(page - 1)}>
            Prev
          </Button>

          <span className="text-muted-foreground text-sm">Page {page}</span>

          <Button
            variant="outline"
            disabled={!hasNext || isPending}
            onClick={() => handlePagination(page + 1)}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
