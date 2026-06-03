"use client";
import { Progress } from "@/components/ui/progress";
import StarRatingFractions from "../ui/star-rating-fractions";
interface ReviewStatUiProps {
  stars: number;
  percentage: number;
  count: number;
}

interface ReviewStatUiData {
  stars: number;
  percentage: number;
  count: number;
}

interface ReviewerStatsProps {
  title?: string;
  subtitle?: string;
  overallRating?: number;
  totalReviewCount?: number;
  verifiedPurchases?: number;
  reviewStatUis?: ReviewStatUiData[];
  showProgress?: boolean;
}

function ReviewStatUi({ count, percentage, stars }: ReviewStatUiProps) {
  return (
    <div className="flex w-full items-center gap-2">
      <div className="w-16 text-right text-sm">{stars} stars</div>
      <Progress
        value={percentage}
        className="h-2 flex-1"
      />
      <div className="text-muted-foreground w-12 text-left text-sm">
        {count}
      </div>
    </div>
  );
}

function ReviewerStats({
  overallRating = 4.7,
  reviewStatUis = [
    { count: 629, percentage: 76, stars: 5 },
    { count: 116, percentage: 14, stars: 4 },
    { count: 50, percentage: 6, stars: 3 },
    { count: 24, percentage: 3, stars: 2 },
    { count: 8, percentage: 1, stars: 1 },
  ],
  showProgress = true,
  subtitle = "What our customers are saying",
  title = "Customer Reviews",
  totalReviewCount = 827,
  verifiedPurchases = 756,
}: ReviewerStatsProps = {}) {
  const verifiedPercentage = Math.round(
    (verifiedPurchases / totalReviewCount) * 100,
  );

  return (
    <div className="flex max-w-lg flex-col gap-8 rounded-lg bg-white px-6 py-6 dark:bg-card border">
      <div className="flex flex-col items-center text-center">
        <h2 className="mb-1 text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground mb-6 text-sm">{subtitle}</p>

        <div className="mb-4 flex flex-col items-center">
          <span className="mb-2 text-5xl font-bold">{overallRating}</span>
          <StarRatingFractions
            value={overallRating}
            readOnly
            iconSize={24}
            className="mb-2"
          />
          <p className="text-muted-foreground text-sm">
            Based on {totalReviewCount} reviews
          </p>
        </div>

        <div className="mb-2 w-full max-w-xs rounded-md bg-gray-50 px-4 py-3 dark:bg-muted">
          <p className="text-sm">
            <span className="font-medium">{verifiedPercentage}%</span> of
            reviews from{" "}
            <span className="font-medium text-green-600 dark:text-green-400">
              verified purchases
            </span>
          </p>
        </div>
      </div>

      {showProgress && (
        <div className="mx-auto w-full max-w-md space-y-2">
          {reviewStatUis.map((stat) => (
            <ReviewStatUi
              key={stat.stars}
              stars={stat.stars}
              percentage={stat.percentage}
              count={stat.count}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewerStats;
export type { ReviewStatUiData, ReviewStatUiProps, ReviewerStatsProps };
