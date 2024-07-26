import { NextResponse } from "next/server";
import { authMiddleware, clerkClient } from "@clerk/nextjs";

export default authMiddleware({
  // Public routes are routes that don't require authentication
  publicRoutes: ["/", "/product(.*)", "/api(.*)", "/cart", "/order(.*)"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
