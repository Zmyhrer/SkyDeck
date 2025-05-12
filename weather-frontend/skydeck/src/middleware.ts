import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || "your_secret_key"
    );

    const { payload } = await jwtVerify(token, secret);

    console.log("Valid token payload:", payload);

    // Optional: You can modify request headers or context here
    const response = NextResponse.next();
    response.headers.set("x-user-id", payload.userId as string);
    return response;
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
