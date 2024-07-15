import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import { customerProtectedRoutes, creativeProtectedRoutes } from "./route";

export const middleware = async (req: NextRequest) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { nextUrl } = req;
  const isLoggedIn = !!token;

  const isCreative = token?.role === "creative";
  const isCustomer = token?.role === "customer";
  const isCustomerProtectedRoute = customerProtectedRoutes.includes(
    nextUrl.pathname
  );
  const isCreativeProtectedRoute = creativeProtectedRoutes.includes(
    nextUrl.pathname
  );

  if ((isCreativeProtectedRoute || isCustomerProtectedRoute) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (isCreativeProtectedRoute && !isCreative) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return null;
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
