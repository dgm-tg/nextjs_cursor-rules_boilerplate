import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default auth((req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth?.user;
  const role = auth?.user?.role;

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
});

// Optionally configure middleware matcher
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};