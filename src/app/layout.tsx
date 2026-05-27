import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s • Rainame",
    default: "Rainame official store • Raianame",
  },
  description:
    "Rainame is a modern fashion brand offering stylish and high-quality apparel for every occasion. Discover trendsetting designs and timeless elegance that redefine your wardrobe.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  metadataBase: new URL("https://rainame.vercel.app/"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "de-DE": "/de-DE",
    },
  },
  openGraph: {
    title: {
      template: "%s • Rainame",
      default: "Rainame official store • Raianame",
    },
    description:
      "Rainame is a modern fashion brand offering stylish and high-quality apparel for every occasion. Discover trendsetting designs and timeless elegance that redefine your wardrobe.",
    url: "https://rainame.vercel.app/",
    siteName: "Rainame",
    images: [
      {
        url: "https://utfs.io/f/0vsSPX9AUvOHeSXoWVN7hsiRrPmF5cQkfzEWqV093Hj7NbJv",
        width: 800,
        height: 600,
      },
      {
        url: "https://utfs.io/f/0vsSPX9AUvOHeSXoWVN7hsiRrPmF5cQkfzEWqV093Hj7NbJv",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: {
      template: "%s • Rainame",
      default: "Rainame official store • Raianame",
    },
    description:
      "Rainame is a modern fashion brand offering stylish and high-quality apparel for every occasion. Discover trendsetting designs and timeless elegance that redefine your wardrobe.",
    site: "https://rainame.vercel.app/",
    images: [
      {
        url: "https://utfs.io/f/0vsSPX9AUvOHeSXoWVN7hsiRrPmF5cQkfzEWqV093Hj7NbJv",
        width: 800,
        height: 600,
      },
      {
        url: "https://utfs.io/f/0vsSPX9AUvOHeSXoWVN7hsiRrPmF5cQkfzEWqV093Hj7NbJv",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full dark",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
