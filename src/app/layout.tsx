import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";
import SessionProvider from "@/providers/SessionProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { getServerAuthSession } from "@/server/auth";
export const metadata = {
  title: "Rainame",
  description:
    "Welcome to Rainame, where style meets convenience. Dive into a world of fashion-forward trends and timeless classics, all at your fingertips. Whether you're seeking the perfect outfit for a night out or elevating your everyday wardrobe, Rainame offers a curated selection of clothing, accessories, and footwear to suit every taste and occasion. With seamless navigation and hassle-free shopping, indulge in a personalized experience tailored to your preferences. Embrace your individuality and let your style shine with Rainame, where fashion is more than just clothing—it's an expression of self",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
        <TRPCReactProvider>
          <SessionProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme="light">
              {children}
            </ThemeProvider>
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
