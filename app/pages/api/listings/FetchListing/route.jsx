import db from "@/lib/db";

export async function GET() {
  try {
    const listings = db.prepare("SELECT * FROM listings").all();
    return Response.json(listings);
  } catch (error) {
    console.error("DB Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
