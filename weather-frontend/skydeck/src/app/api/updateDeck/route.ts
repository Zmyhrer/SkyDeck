import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { index, deckName, elements } = body;

    if (typeof index !== "number" || !deckName || !Array.isArray(elements)) {
      return NextResponse.json(
        { success: false, message: "Invalid input" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "src", "data", "decks.json");
    console.log("File path:", filePath); // Debugging line

    // Read the JSON file
    const file = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(file);

    // Check if the index is valid
    if (!json.data || !Array.isArray(json.data) || !json.data[index]) {
      return NextResponse.json(
        { success: false, message: "Invalid deck index" },
        { status: 404 }
      );
    }

    // Update the specified deck
    json.data[index].deckName = deckName;
    json.data[index].elements = elements;

    // Save the updated JSON
    await fs.writeFile(filePath, JSON.stringify(json, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api route error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
