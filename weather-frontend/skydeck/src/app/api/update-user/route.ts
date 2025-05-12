import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function PUT(req: Request) {
  try {
    // Get userId from custom header set by middleware
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { unitSystem } = await req.json();

    await pool.query("UPDATE users SET unit_system = $1 WHERE user_id = $2", [
      unitSystem,
      userId,
    ]);

    return NextResponse.json({ success: true, message: "Settings updated" });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
