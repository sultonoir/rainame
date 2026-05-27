import ProductSkeleton from "../product/product-skeleton";
import { Suspense, type FunctionComponent } from "react";
import { cn } from "@/lib/utils";
import { ProductCardSort } from "@/modules/product/product.types";
import ProductList from "../product/Product-list";
interface HomeProductProps extends React.HTMLAttributes<HTMLElement> {
  name?: string;
  description?: string;
  sortBy: ProductCardSort;
}

const HomeProduct: FunctionComponent<HomeProductProps> = ({
  name,
  description,
  sortBy,
  className,
}) => {
  return (
    <section
      className={cn("py-12 md:py-16", className)}
      id="home-products">
      <div className={`container`}>
        <div className="mb-8 flex flex-col items-center text-center">
          <h2
            className={`font-display text-3xl leading-tight font-bold tracking-tight md:text-4xl`}>
            {name}
          </h2>
          <div className="bg-primary mt-2 h-1 w-12 rounded-full" />
          <p
            className={`text-muted-foreground mt-4 max-w-2xl text-center md:text-lg`}>
            {description}
          </p>
        </div>
        <Suspense fallback={<ProductSkeleton />}>
          <ProductList sort={sortBy} />
        </Suspense>
      </div>
    </section>
  );
};

export default HomeProduct;
