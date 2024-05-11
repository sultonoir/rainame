import "@/styles/globals.css";

import { cookies } from "next/headers";
import { GeistSans } from "geist/font/sans";
import { TRPCReactProvider } from "@/trpc/react";
import { Providers } from "@/components/shared/Providers";
import { Toaster } from "sonner";
import { getServerAuthSession } from "@/server/auth";
import SessionProvider from "@/components/shared/SessionProviders";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Rainame",
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <SessionProvider session={session}>
          <TRPCReactProvider cookies={cookies().toString()}>
            <Providers>
              <Toaster richColors position="top-right" closeButton />
              {children}
            </Providers>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
