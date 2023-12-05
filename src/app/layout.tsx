import "@/styles/globals.css";

import { cookies } from "next/headers";
import { GeistSans } from "geist/font/sans";
import { TRPCReactProvider } from "@/trpc/react";
import { Providers } from "@/components/shared/Providers";
import { Toaster } from "sonner";

export const metadata = {
  title: "Rainame",
  description: "Your personal fashion",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={GeistSans.className}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <Providers>
            <Toaster richColors position="bottom-left" />
            {children}
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
