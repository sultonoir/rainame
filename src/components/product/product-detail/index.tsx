import ProductPrice from "./product-price";
import StarRatingFractions from "../../ui/star-rating-fractions";
import { getProductDetail } from "@/modules/product/product.action";
import { notFound } from "next/navigation";
import ImageGallery from "./image-gallery";
import PurchasePanel from "./purchase-panel";
import ProductDescription from "./description";
type Params = Promise<{ slug: string }>;

type Props = {
  params: Params;
};

const ProductDetail = async ({ params }: Props) => {
  const { slug } = await params;
  const product = await getProductDetail({ slug });

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:gap-10">
      <div className="relative lg:w-[55%]">
        <ImageGallery
          Images={product.images}
          title={product.name}
        />
      </div>
      <div className="space-y-4 lg:w-[45%]">
        <h1 className="text-2xl leading-none font-bold tracking-tight">
          {product.name}
        </h1>
        <StarRatingFractions
          value={product.ratingAverage}
          readOnly
          maxStars={5}
        />
        <ProductPrice
          discount={product.discount}
          price={product.normalPrice}
          priceAfterDiscount={product.discountedPrice}
          priceClassName="~text-lg/4xl"
          discountClassName="~text-sm/2xl"
        />
        <PurchasePanel
          key={product.id}
          productId={product.id}
          variants={product.variants}
        />
        <ProductDescription desc={product.desc} />
      </div>
    </div>
  );
};

export default ProductDetail;
