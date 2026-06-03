import { getReviewBySlug } from "@/modules/review/review.action";
import ReviewerStats from "./review-stats";
import ReviewList from "./review-list";

interface Props {
  slug: string;
  totalReviewCount: number;
  overallRating: number;
  verifiedPurchases: number;
}

const ReviewContainer = async ({
  slug,
  totalReviewCount,
  overallRating,
  verifiedPurchases,
}: Props) => {
  const result = await getReviewBySlug({ page: 1, slug, take: 5 });

  if (!result) {
    return null;
  }

  return (
    <div className="flex w-full flex-col gap-10 lg:flex-row">
      <div className="order-1 lg:order-2">
        <ReviewerStats
          overallRating={Number(overallRating.toFixed(1))}
          totalReviewCount={totalReviewCount}
          verifiedPurchases={verifiedPurchases}
        />
      </div>

      <ReviewList
        initialData={result.reviews}
        initialPage={result.pagination.page}
        initialHasNext={result.pagination.hasNext}
        initialHasPrev={result.pagination.hasPrev}
        slug={slug}
      />
    </div>
  );
};

export default ReviewContainer;
