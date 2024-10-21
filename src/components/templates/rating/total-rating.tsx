import React from "react";
import { Star, Stars } from "lucide-react";

type Props = {
  rating: number;
  size?: number;
};

const TotalRating = ({ rating, size = 16 }: Props) => {
  return (
    <div className="flex items-center space-x-1.5">
      {rating > 0 ? (
        <>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, index) =>
              RenderStar(index, { size, rating }),
            )}
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {rating.toFixed(1)}
          </span>
        </>
      ) : (
        <div className="flex items-center space-x-1.5 text-sm">
          <Stars size={size} className="text-yellow-500" />
          <span>New</span>
        </div>
      )}
    </div>
  );
};

const RenderStar = (index: number, { rating, size }: Props) => {
  const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;

  return (
    <div key={index} className="relative inline-block">
      <Star size={size} className="text-gray-300" strokeWidth={1.5} />
      <div
        className="absolute left-0 top-0 overflow-hidden"
        style={{ width: `${fillPercentage}%` }}
      >
        <Star
          size={size}
          className="text-yellow-400"
          fill="currentColor"
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
};

export default TotalRating;
