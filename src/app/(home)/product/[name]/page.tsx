import { api } from "@/trpc/server";
import React from "react";
import NameClient from "./NameClient";
import { type Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const product = await api.product.getProductMeta.query({
    path: params.name,
  });

  return {
    title: product?.name,
    generator:
      "T-shirt,batik,Electronic,Computer,react,nextjs,trpc,mongodb,mysql",
    description: product?.desc,
    metadataBase: new URL("https://kyoshop.vercel.app/"),
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en-US",
        "de-DE": "/de-DE",
      },
    },
    openGraph: {
      title: product?.name,
      description: product?.desc ?? "",
      url: "https://kyoshop.vercel.app/",
      siteName: "KyouShop",
      images: [
        {
          url: product?.imageUrl.at(0) ?? "",
          width: 800,
          height: 600,
        },
        {
          url: product?.imageUrl.at(0) ?? "",
          width: 1800,
          height: 1600,
          alt: "My custom alt",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      site: "https://kyoshop.vercel.app/",
      title: "KyouShop",
      description: "KyouShop easy shopping for everyone",
      images: [
        {
          url: product?.imageUrl.at(0) ?? "",
          width: 800,
          height: 600,
        },
        {
          url: product?.imageUrl.at(0) ?? "",
          width: 1800,
          height: 1600,
          alt: "My custom alt",
        },
      ],
    },
  };
}

const page = async ({ params }: { params: { name: string } }) => {
  const product = await api.product.getProductByName.query({
    path: params.name,
  });
  return <NameClient product={product} />;
};

export default page;
