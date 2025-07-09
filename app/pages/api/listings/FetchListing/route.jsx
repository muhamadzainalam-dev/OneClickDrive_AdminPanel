import db from "@/lib/db";

export async function GET() {
  try {
    const listings = db.prepare("SELECT * FROM listings").all();
    return Response.json(listings);
  } catch (err) {
    console.error("DB Error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
