// middleware.ts
import { NextResponse } from "next/server";
import {parse} from "cookie";
import { verifyToken, getTokenFromHeader } from "./utils/authUtils";
import {AuthApiClient} from "@/lib/api/auth";

export async function middleware(request) {
  const cookiesHeader = request.headers.get("cookie");
  const cookiesObject = cookiesHeader ? parse(cookiesHeader) : {};
  const token = cookiesObject.token;
  const user = token ? await verifyToken(token) : null;

  const isProtected = request.nextUrl.pathname.startsWith("/dashboard");

  if (isProtected && !user) {
    console.log("Redirecting to login page");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Optionally attach user info
  if (user) {
    // get user info from API
    try{
      const user = await AuthApiClient.getProfile(token);
      console.log('trying to redirect',request.nextUrl.pathname);

      const roleRedirects = {
        'user': '/home',
        'admin': '/dashboard'
      };

      const roleName = user.role.name;
      const redirectUrl = roleRedirects[roleName];

      if (redirectUrl && !request.nextUrl.pathname.startsWith(redirectUrl)) {
        return NextResponse.redirect(new URL(redirectUrl, request.url));
      }else{
        request.headers.set("x-user-id", user.id);
        return NextResponse.next();
      }
    }catch (e) {
      console.log(e);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // Protected routes
};
