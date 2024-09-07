import { Star, Stars } from "lucide-react";
import React from "react";

type Props = {
  rating: number;
};

const TotalRating = (props: Props) => {
  return (
    <div className="flex-shrink-0">
      {props.rating > 0 ? (
        <div className="flex items-center space-x-1.5">
          <Star size={13} />
          <span>{props.rating}</span>
        </div>
      ) : (
        <div className="flex items-center space-x-1.5 text-sm">
          <Stars size={13} />
          <span>New</span>
        </div>
      )}
    </div>
  );
};

export default TotalRating;
