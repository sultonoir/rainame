import React from "react";
import ClientPage from "./ClientPage";
import { type Metadata } from "next";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const user = await api.user.getUser.query();

  if (!user) {
    redirect("/");
  }

  return {
    title: `${user.name} - Rainame`,
    generator:
      "T-shirt,batik,Electronic,Computer,react,nextjs,trpc,mongodb,mysql",
    description: "Profile page",
    metadataBase: new URL("https://kyoshop.vercel.app/"),
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en-US",
        "de-DE": "/de-DE",
      },
    },
    openGraph: {
      title: user?.name ?? "Rainame",
      description: "Profile page",
      url: "https://kyoshop.vercel.app/",
      siteName: "KyouShop",
      images: [
        {
          url: user?.image ?? "",
          width: 800,
          height: 600,
        },
        {
          url: user?.image ?? "",
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
          url: user?.image ?? "",
          width: 800,
          height: 600,
        },
        {
          url: user?.image ?? "",
          width: 1800,
          height: 1600,
          alt: "My custom alt",
        },
      ],
    },
  };
}

const page = () => {
  return <ClientPage />;
};

export default page;
