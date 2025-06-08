import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Deck name is required" },
        { status: 400 }
      );
    }

    const decks = await prisma.deck.findMany({
      where: {
        user_id: parseInt(userId, 10),
      },
    });

    if (decks.length === 0) {
      return NextResponse.json(
        { success: false, message: "No decks found with that name" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: decks,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "An error occurred",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
