const path = require("path");
const db = require(path.resolve(__dirname, "../lib/db.jsx"));
const listings = require(path.resolve(__dirname, "../data/listing.jsx"));

const insertListing = db.prepare(`
  INSERT OR REPLACE INTO listings (id, title, price, location, status, owner)
  VALUES (@id, @title, @price, @location, @status, @owner)
`);

listings.forEach((listing) => {
  insertListing.run(listing);
});

console.log("✅ Listings have been seeded successfully.");
