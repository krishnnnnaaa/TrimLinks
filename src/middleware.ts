import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";
import { NextResponse, NextRequest } from "next/server";
import { parse } from "cookie";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const cookies = parse(request.headers.get('cookie') || '');
  const csrfToken = cookies['next-auth.csrf-token'];
  

  if (!csrfToken && url.pathname.startsWith("/workspace")) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  if (
    csrfToken &&
    (url.pathname.startsWith("/signin") ||
      url.pathname.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/workspace", request.url));
  }

  // return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // '/',
    "/signin",
    "/signup",
    "/workspace/:path",
  ],
};
