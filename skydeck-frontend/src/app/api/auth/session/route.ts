// app/api/auth/session/route.ts
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { User } from "@prisma/client";

// Opt out of caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

type SessionResponse = {
  user: Omit<User, "password"> | null; // Never expose passwords
  error?: string;
};

export async function GET(): Promise<NextResponse<SessionResponse>> {
  try {
    const sessionToken = (await cookies()).get("session")?.value;

    if (!sessionToken) {
      return NextResponse.json({ user: null });
    }

    const session = await prisma.session.findUnique({
      where: { token: sessionToken },
      include: { user: true },
    });

    if (!session?.user || session.expires_at < new Date()) {
      return NextResponse.json({ user: null });
    }

    // Strip sensitive fields before sending to client
    const { password, ...safeUser } = session.user;

    return NextResponse.json(
      {
        user: safeUser,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json(
      { user: null, error: "Internal server error" },
      { status: 500 }
    );
  }
}
