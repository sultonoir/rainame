import { api } from "@/trpc/server";
import { type Metadata } from "next";
import React from "react";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await api.product.slug({
    slug: params.slug,
  });

  return {
    title: data?.product.name ?? "Rainame",
    generator: "nextjs,Trpc,e-commerce",
    description:
      "Rainame is a leading online fashion retailer that offers the latest trends and styles in clothing, shoes, and accessories for men and women. Our mission is to provide our customers with a seamless and enjoyable shopping experience, allowing them to stay ahead of the fashion curve without breaking the bank.",
    metadataBase: new URL("https://rainame.vercel.app/"),
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en-US",
        "de-DE": "/de-DE",
      },
    },
    openGraph: {
      title: data?.product.name ?? "Rainame",
      description:
        "Rainame is a leading online fashion retailer that offers the latest trends and styles in clothing, shoes, and accessories for men and women. Our mission is to provide our customers with a seamless and enjoyable shopping experience, allowing them to stay ahead of the fashion curve without breaking the bank.",
      url: "https://rainame.vercel.app/",
      siteName: "KyouShop",
      images: [
        {
          url: data?.product.productImage[0]?.url ?? "",
          width: 800,
          height: 600,
        },
        {
          url: data?.product.productImage[0]?.url ?? "",

          width: 1800,
          height: 1600,
          alt: "My custom alt",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      site: "https://rainame.vercel.app/",
      title: "KyouShop",
      description: "KyouShop easy shopping for everyone",
      images: [
        {
          url: data?.product.productImage[0]?.url ?? "",

          width: 800,
          height: 600,
        },
        {
          url: data?.product.productImage[0]?.url ?? "",

          width: 1800,
          height: 1600,
          alt: "My custom alt",
        },
      ],
    },
  };
}

const Page = async ({ params }: Props) => {
  const data = await api.product.slug({
    slug: params.slug,
  });
  console.log(data);
  return <div className="container py-4"></div>;
};

export default Page;
