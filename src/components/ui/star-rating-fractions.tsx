"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import * as React from "react";

interface StarRatingBasicProps {
  value: number;
  onChange?: (value: number) => void;
  className?: string;
  iconSize?: number;
  maxStars?: number;
  readOnly?: boolean;
  color?: string;
}

const StarIcon = React.memo(
  ({
    iconSize,
    isInteractive,
    onClick,
    onMouseMove,
    style,
  }: {
    style: React.CSSProperties;
    iconSize: number;
    onClick: (e: React.MouseEvent<SVGElement>) => void;
    onMouseMove: (e: React.MouseEvent<SVGElement>) => void;
    isInteractive: boolean;
  }) => (
    <Star
      size={iconSize}
      fill={style.fill}
      color={style.color}
      onClick={onClick}
      onMouseMove={onMouseMove}
      className={cn(
        "transition-colors duration-200",
        isInteractive && "cursor-pointer",
      )}
      style={style}
    />
  ),
);

StarIcon.displayName = "StarIcon";

const StarRatingFractions = ({
  className,
  color = "#e4c616",
  iconSize = 24,
  maxStars = 5,
  onChange,
  readOnly = false,
  value,
}: StarRatingBasicProps) => {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);

  // Stable SSR-safe id
  const id = React.useId();

  const calculateRating = React.useCallback(
    (index: number, event: React.MouseEvent<SVGElement>) => {
      const star = event.currentTarget;
      const rect = star.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const clickPosition = x / rect.width;

      let fraction = 1;

      if (clickPosition <= 0.25) fraction = 0.25;
      else if (clickPosition <= 0.5) fraction = 0.5;
      else if (clickPosition <= 0.75) fraction = 0.75;

      return index + fraction;
    },
    [],
  );

  const handleStarClick = React.useCallback(
    (index: number, event: React.MouseEvent<SVGElement>) => {
      if (readOnly || !onChange) return;

      onChange(calculateRating(index, event));
    },
    [readOnly, onChange, calculateRating],
  );

  const handleStarHover = React.useCallback(
    (index: number, event: React.MouseEvent<SVGElement>) => {
      if (readOnly) return;

      setHoverRating(calculateRating(index, event));
    },
    [readOnly, calculateRating],
  );

  const handleMouseLeave = React.useCallback(() => {
    if (!readOnly) {
      setHoverRating(null);
    }
  }, [readOnly]);

  const ratingToUse = !readOnly && hoverRating !== null ? hoverRating : value;

  const getStarStyle = React.useCallback(
    (index: number) => {
      const difference = ratingToUse - index;

      if (difference <= 0) {
        return {
          color: "gray",
          fill: "transparent",
        };
      }

      if (difference >= 1) {
        return {
          color,
          fill: color,
        };
      }

      return {
        color,
        fill: `url(#${id}-${index})`,
      };
    },
    [ratingToUse, color, id],
  );

  const renderGradientDefs = () => {
    const partialStarIndex = Math.floor(ratingToUse);
    const partialFill = (ratingToUse % 1) * 100;

    if (partialFill <= 0) return null;

    return (
      <linearGradient
        id={`${id}-${partialStarIndex}`}
        x1="0%"
        y1="0%"
        x2="100%"
        y2="0%">
        <stop
          offset={`${partialFill}%`}
          stopColor={color}
        />
        <stop
          offset={`${partialFill}%`}
          stopColor="transparent"
        />
      </linearGradient>
    );
  };

  return (
    <div
      className={cn("relative flex items-center gap-x-0.5", className)}
      onMouseLeave={handleMouseLeave}>
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}>
        <defs>{renderGradientDefs()}</defs>
      </svg>

      {Array.from({ length: maxStars }).map((_, index) => (
        <StarIcon
          key={index}
          style={getStarStyle(index)}
          iconSize={iconSize}
          onClick={(e) => handleStarClick(index, e)}
          onMouseMove={(e) => handleStarHover(index, e)}
          isInteractive={!readOnly}
        />
      ))}
    </div>
  );
};

export default StarRatingFractions;
