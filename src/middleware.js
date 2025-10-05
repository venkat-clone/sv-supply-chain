// middleware.ts
import { NextResponse } from "next/server";
import {parse} from "cookie";
import { verifyToken, getTokenFromHeader } from "./utils/authUtils";
import {AuthApiClient} from "@/lib/api/auth";

export function middleware(request) {
  const cookiesHeader = request.headers.get("cookie");
  const cookiesObject = cookiesHeader ? parse(cookiesHeader) : {};
  const token = cookiesObject.token;
  const user = token ? verifyToken(token) : null;

  const isProtected = request.nextUrl.pathname.startsWith("/dashboard");

  if (isProtected && !user) {
    console.log("Redirecting to login page");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Optionally attach user info
  if (user) {
    request.headers.set("x-user-id", user.id);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // Protected routes
};
