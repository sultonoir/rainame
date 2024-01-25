import BarChart from "@/components/admin/BarChart";
import Dashboard from "@/components/admin/Dashboard";
import TopProduct from "@/components/admin/TopProduct";
import React from "react";
import { type Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard - Rainame",
  description: "Your personal fashion",
  generator:
    "chat,chatting,chatting online,react,nextjs,trpc,mongodb,mysql,e-commerce,shopping,pants,hat,chlotes,shoes,accessories",
  metadataBase: new URL("https://rainame.vercel.app/"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "de-DE": "/de-DE",
    },
  },
  openGraph: {
    title: "Rainame",
    description: "Your personal fashion",
    url: "https://rainame.vercel.app/",
    siteName: "sultonoir-chat",
    images: [
      {
        url: "https://utfs.io/f/42b8d0a6-a5f4-4d45-8c27-d9f23b9c454a-xks0f9.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://utfs.io/f/42b8d0a6-a5f4-4d45-8c27-d9f23b9c454a-xks0f9.png",
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
    title: "Rainame",
    description: "Your personal fashion",
    images: [
      {
        url: "https://utfs.io/f/42b8d0a6-a5f4-4d45-8c27-d9f23b9c454a-xks0f9.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://utfs.io/f/42b8d0a6-a5f4-4d45-8c27-d9f23b9c454a-xks0f9.png",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
  },
};
const page = () => {
  return (
    <section className="my-2 h-full w-full">
      <Dashboard />
      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-3">
        <BarChart />
        <TopProduct />
      </div>
    </section>
  );
};

export default page;
