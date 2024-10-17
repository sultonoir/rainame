import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import Provider from "@/provider/provider";

export const metadata: Metadata = {
  title: {
    template: "%s • Rainame",
    default: "Rainame",
  },
  description:
    "Rainame, the preferred fashion destination for fresh and trendy styles. Discover our cool and stylish collection to update your look",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body>
        <TRPCReactProvider>
          <Provider>{children}</Provider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
