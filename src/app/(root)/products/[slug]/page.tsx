import ProductDetail from "@/components/product/product-detail";
import ProductPageSkeleton from "@/components/product/product-detail/skeleton";
import { getMetadata } from "@/modules/product/product.action";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Params = Promise<{ slug: string }>;

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getMetadata({ slug });

  if (!data) notFound();

  return {
    title: data.name,
  };
}

const page = async ({ params }: Props) => {
  return (
    <Suspense fallback={<ProductPageSkeleton />}>
      <ProductDetail params={params} />
    </Suspense>
  );
};

export default page;
