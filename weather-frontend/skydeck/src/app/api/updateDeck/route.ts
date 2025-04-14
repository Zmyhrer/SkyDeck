import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { index, deckName, elements } = body;

  const filePath = path.join(process.cwd(), "src/data/decks.json");
  const file = await fs.readFile(filePath, "utf-8");
  const json = JSON.parse(file);

  // Update the deck at the specified index
  if (json.data[index]) {
    json.data[index].deckName = deckName;
    json.data[index].elements = elements;
  }

  // Save the updated JSON back to the file
  await fs.writeFile(filePath, JSON.stringify(json, null, 2), "utf-8");

  return NextResponse.json({ success: true });
}
