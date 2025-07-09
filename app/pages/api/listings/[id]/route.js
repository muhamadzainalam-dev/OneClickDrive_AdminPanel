import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const id = params.id;
    const data = await request.json();

    const db = await open({
      filename: "database.sqlite",
      driver: sqlite3.Database,
    });

    const { status, title, owner, price, location } = data;

    if (status && Object.keys(data).length === 1) {
      await db.run("UPDATE listings SET status = ? WHERE id = ?", [status, id]);
    } else {
      await db.run(
        "UPDATE listings SET title = ?, owner = ?, price = ?, location = ?, status = ? WHERE id = ?",
        [title, owner, price, location, status, id]
      );
    }

    const updated = await db.get("SELECT * FROM listings WHERE id = ?", [id]);

    await db.close();
    return NextResponse.json(updated);
  } catch (err) {
    console.error("Database error:", err);
    return NextResponse.json(
      { error: "Failed to update listing" },
      { status: 500 }
    );
  }
}
