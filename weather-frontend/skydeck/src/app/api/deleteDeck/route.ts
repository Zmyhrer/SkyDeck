import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "/src/data/decks.json");

export async function DELETE(req: Request) {
  try {
    const { index } = await req.json(); // Get index from the request body
    const file = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(file);

    // Validate the index
    if (index < 0 || index >= json.data.length) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid index" }),
        { status: 400 }
      );
    }

    const originalLength = json.data.length;

    // Remove the deck at the given index
    json.data.splice(index, 1);

    // If no deck was deleted, return an error
    if (json.data.length === originalLength) {
      return new Response(
        JSON.stringify({ success: false, message: "Deck not found" }),
        { status: 404 }
      );
    }

    // Write the updated data back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));

    return new Response(
      JSON.stringify({ success: true, message: "Deck deleted" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting deck:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error" }),
      { status: 500 }
    );
  }
}
