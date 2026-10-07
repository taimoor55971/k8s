import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// HTTP-based driver: one stateless query per request, ideal for serverless.
export const sql = neon(process.env.DATABASE_URL);
