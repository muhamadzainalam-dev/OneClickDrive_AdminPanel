// app/pages/api/listings/[id]/route.jsx
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const id = params.id;
    const body = await request.json();

    const db = await open({
      filename: "database.sqlite",
      driver: sqlite3.Database,
    });

    const { status, title, owner, price, location } = body;

    // ✅ Only update status (approve/reject)
    if (body.status && Object.keys(body).length === 1) {
      await db.run("UPDATE listings SET status = ? WHERE id = ?", [status, id]);
    } else {
      // ✅ Full update from edit modal
      await db.run(
        "UPDATE listings SET title = ?, owner = ?, price = ?, location = ?, status = ? WHERE id = ?",
        [title, owner, price, location, status, id]
      );
    }

    // ✅ Return the updated listing
    const updatedListing = await db.get("SELECT * FROM listings WHERE id = ?", [
      id,
    ]);

    await db.close();
    return NextResponse.json(updatedListing);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to update listing" },
      { status: 500 }
    );
  }
}
