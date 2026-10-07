// Usage: node --env-file=.env.local scripts/migrate.mjs
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
const statements = readFileSync("db/schema.sql", "utf8")
  .split(";")
  .map((s) => s.trim())
  .filter(Boolean);

for (const stmt of statements) await sql.query(stmt);
console.log("Schema applied.");
