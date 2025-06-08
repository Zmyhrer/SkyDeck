// app/api/auth/signout/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST() {
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("session")?.value;

  try {
    // Always clear the cookie first to prevent race conditions
    (await cookieStore).delete("session");

    if (sessionToken) {
      // Use deleteMany to prevent errors if session doesn't exist
      await prisma.session.deleteMany({
        where: { token: sessionToken },
      });
    }

    return NextResponse.json(
      { success: true, message: "Signed out successfully" },
      {
        headers: {
          // Ensure client-side cache knows the auth state changed
          "Cache-Control": "no-store, max-age=0",
          Pragma: "no-cache",
        },
      }
    );
  } catch (error) {
    console.error("Signout error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to complete sign out",
      },
      { status: 500 }
    );
  }
}
