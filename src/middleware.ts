import { authMiddleware } from "better-auth/next-js";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard/:*"];
const publicRoutes = ["/reset-password"];

export default authMiddleware({
  customRedirect: async (session, request) => {
    const path = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);
    const baseURL = request.nextUrl.origin;

    if (isProtectedRoute && !session) {
      return NextResponse.redirect(new URL("/", baseURL));
    }
    if (isPublicRoute && !session) {
      return NextResponse.redirect(new URL("/", baseURL));
    }
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/dashboard", "/sign-in"],
};
