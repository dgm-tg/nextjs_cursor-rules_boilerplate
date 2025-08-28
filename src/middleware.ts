import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { nextUrl, token } = req;
    const isLoggedIn = !!token;
    const role = token?.role;

    // Public routes
    if (
      nextUrl.pathname === "/" ||
      nextUrl.pathname === "/login" ||
      nextUrl.pathname === "/register" ||
      nextUrl.pathname === "/forgot-password" ||
      nextUrl.pathname.startsWith("/api/auth")
    ) {
      return NextResponse.next();
    }

    // Protected routes
    if (!isLoggedIn) {
      return Response.redirect(new URL("/login", nextUrl));
    }

    // Role-based access control
    if (nextUrl.pathname.startsWith("/dashboard/users") && role !== "ADMINISTRATOR") {
      return Response.redirect(new URL("/dashboard", nextUrl));
    }

    if (
      nextUrl.pathname.startsWith("/dashboard/announcements") &&
      role !== "ADMINISTRATOR" &&
      role !== "MANAGER"
    ) {
      return Response.redirect(new URL("/dashboard", nextUrl));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Optionally configure middleware matcher
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/announcements/:path*",
    "/api/profile/:path*",
    "/api/users/:path*",
  ],
};