import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust the import path as necessary

export async function middleware(req: Request) {
  // Check for the session
  const session = await getServerSession(authOptions);

  // If the user is not authenticated, redirect to the sign-in page
  if (!session) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
}

// Apply the middleware to the dashboard route (you can adjust this to any route you need)
export const config = {
  matcher: ["/dashboard/", "/profile/"], // Protects the dashboard and profile pages
};
