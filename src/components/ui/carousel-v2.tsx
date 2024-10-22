"use client";
import React, { useEffect, useState, createContext, useContext } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "./button";

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  initialScroll?: number;
}

type CarouselContextProps = {
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  onCardClose: (index: number) => void;
  currentIndex: number;
  initialScroll: number;
  carouselRef: React.RefObject<HTMLDivElement>;
  checkScrollability: () => void;
};

const CarouselContext = createContext<CarouselContextProps | undefined>(
  undefined,
);

const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error(
      "useCarouselContext must be used within a CarouselProvider",
    );
  }
  return context;
};

const Carousel = ({
  className,
  children,
  initialScroll = 0,
}: CarouselProps) => {
  const isMobile = useIsMobile();
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, []);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollPrev(scrollLeft > 0);
      setCanScrollNext(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile ? 230 : 384; // (md:w-96)
      const gap = isMobile ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  return (
    <CarouselContext.Provider
      value={{
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        onCardClose: handleCardClose,
        currentIndex,
        carouselRef,
        initialScroll,
        checkScrollability,
      }}
    >
      <div className={cn("relative", className)}>{children}</div>
    </CarouselContext.Provider>
  );
};

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { carouselRef, checkScrollability } = useCarousel();

  return (
    <div className="overflow-hidden" ref={ref}>
      <div
        className={cn(
          "flex w-full flex-grow items-center overflow-x-scroll overscroll-x-auto scroll-smooth py-4 [scrollbar-width:none]",
          className,
        )}
        ref={carouselRef}
        onScroll={checkScrollability}
        {...props}
      >
        {children}
      </div>
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & { isShadow?: boolean }
>(
  (
    { className, variant = "outline", size = "icon", isShadow, ...props },
    ref,
  ) => {
    const { scrollPrev, canScrollPrev } = useCarousel();
    const buttonElement = (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute left-0 top-1/2 z-10 size-8 -translate-y-1/2 rounded-full",
          {
            hidden: !canScrollPrev,
          },
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
    );

    if (isShadow) {
      return (
        <div
          className={cn(
            "absolute left-0 h-full w-20 flex-shrink-0 bg-gradient-to-r from-background via-background/80 to-transparent",
            {
              hidden: !canScrollPrev,
            },
          )}
        >
          {buttonElement}
        </div>
      );
    }

    return buttonElement;
  },
);
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & { isShadow?: boolean }
>(
  (
    { className, variant = "outline", size = "icon", isShadow, ...props },
    ref,
  ) => {
    const { scrollNext, canScrollNext } = useCarousel();

    const buttonElement = (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute right-0 top-1/2 z-10 size-8 -translate-y-1/2 rounded-full",
          {
            hidden: !canScrollNext,
          },
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRight className="size-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    );

    if (isShadow) {
      return (
        <div
          className={cn(
            "absolute right-0 h-full w-20 flex-shrink-0 bg-gradient-to-l from-background via-background to-transparent",
            {
              hidden: !canScrollNext,
            },
          )}
        >
          {buttonElement}
        </div>
      );
    }

    return buttonElement;
  },
);
CarouselNext.displayName = "CarouselNext";

export { Carousel, CarouselPrevious, CarouselNext, CarouselContent };
