import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { deck_name } = await request.json();

    const deck = await prisma.deck.create({
      data: {
        deck_name,
        deck_status: false,
        user_id: 1,
      },
    });

    return NextResponse.json({
      success: true,
      deck,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
