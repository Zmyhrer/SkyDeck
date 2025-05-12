import { NextResponse } from "next/server";
import pool from "../../../lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id",
      [username, email, hashedPassword]
    );

    if (result.rows.length > 0) {
      return NextResponse.json(
        {
          success: true,
          message: "User successfully added",
          user_id: result.rows[0].user_id,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Failed to add user" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, message: `Internal error: ${errorMessage}` },
      { status: 500 }
    );
  }
}
