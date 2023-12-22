import "@/styles/globals.css";

import { cookies } from "next/headers";
import { GeistSans } from "geist/font/sans";
import { TRPCReactProvider } from "@/trpc/react";
import { Providers } from "@/components/shared/Providers";
import { Toaster } from "sonner";
import { getServerAuthSession } from "@/server/auth";
import SessionProvider from "@/components/shared/SessionProviders";

export const metadata = {
  title: "Rainame",
  description: "Your personal fashion",
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
        <SessionProvider session={session}>
          <TRPCReactProvider cookies={cookies().toString()}>
            <Providers>
              <Toaster richColors position="bottom-left" />
              {children}
            </Providers>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
