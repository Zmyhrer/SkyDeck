import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function PUT(req: Request) {
  try {
    const { user_id, unit_system } = await req.json();

    // Check if all required fields are provided
    if (!user_id || !unit_system) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Update the user's unit system in the database
    const result = await pool.query(
      "UPDATE users SET unit_system = $1 WHERE user_id = $2",
      [unit_system, user_id]
    );

    // If the update was successful, return the user's ID
    if (result.rows.length > 0) {
      return NextResponse.json(
        {
          success: true,
          message: "User unit system successfully updated",
          user_id: result.rows[0].user_id,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "User not found or no changes made" },
        { status: 404 } // Not found
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
