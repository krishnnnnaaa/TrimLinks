import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";
import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (!token && url.pathname.startsWith("/workspace")) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  if (
    token &&
    (url.pathname.startsWith("signin") ||
      url.pathname.startsWith("signup") ||
      url.pathname.startsWith("/"))
  ) {
    return NextResponse.redirect(new URL("/workspace", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // '/',
    "/signin",
    "/signup",
    "/workspace/:path*",
  ],
};
