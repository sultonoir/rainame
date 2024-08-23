import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    if (req.nextUrl.pathname === "/admin") {
      return NextResponse.rewrite(new URL("/admin/dashboard", req.url));
    }

    if (req.nextUrl.pathname === "/user") {
      return NextResponse.rewrite(new URL("/user/settings", req.url));
    }

    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/", req.url));
    }
  },
  {
    pages: {
      signIn: "/",
      error: "/",
    },
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = { matcher: ["/admin/:path*", "/cart", "/user/:path*"] };
