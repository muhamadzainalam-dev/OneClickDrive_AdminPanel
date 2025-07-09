// scripts/seed.js
const path = require("path");
const db = require(path.resolve(__dirname, "../lib/db.jsx"));
const listings = require(path.resolve(__dirname, "../data/listing.jsx"));

const stmt = db.prepare(`
  INSERT OR REPLACE INTO listings (id, title, price, location, status, owner)
  VALUES (@id, @title, @price, @location, @status, @owner)
`);

for (const listing of listings) {
  stmt.run(listing);
}

console.log("✅ Listings seeded into SQLite.");
