import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req, res, next) {
  // token will exist is the user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  //   Allow the request to continue if:
  //   1) It's a request for next-auth session nd provider fetching
  //   2) the token exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  //Redirect them to the login page if they aren't logged in and are trying to access a protected page

  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
