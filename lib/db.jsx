const path = require("path");
const Database = require("better-sqlite3");

const dbPath = path.join("database.sqlite");
const db = new Database(dbPath);
module.exports = db;
