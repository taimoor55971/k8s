import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import {
  STATUSES,
  errorResponse,
  parseItemBody,
  toItem,
  type ItemRow,
} from "@/lib/items";
import type { Item } from "@/types";

export const dynamic = "force-dynamic";

// GET /api/items?page=1&pageSize=10&status=active
export async function GET(req: NextRequest) {
  try {
    const p = req.nextUrl.searchParams;
    const page = Math.max(1, parseInt(p.get("page") ?? "1", 10) || 1);
    const pageSize = Math.min(100, Math.max(1, parseInt(p.get("pageSize") ?? "10", 10) || 10));
    const status = p.get("status");

    if (status && !STATUSES.includes(status as Item["status"])) {
      return errorResponse(`status must be one of: ${STATUSES.join(", ")}`, 400);
    }
    const offset = (page - 1) * pageSize;

    const [rows, count] = await Promise.all([
      sql`SELECT * FROM items
          WHERE (${status}::text IS NULL OR status = ${status})
          ORDER BY created_at DESC
          LIMIT ${pageSize} OFFSET ${offset}`,
      sql`SELECT count(*)::int AS total FROM items
          WHERE (${status}::text IS NULL OR status = ${status})`,
    ]);

    return NextResponse.json({
      data: (rows as ItemRow[]).map(toItem),
      total: count[0].total as number,
      page,
      pageSize,
    });
  } catch (err) {
    console.error("GET /api/items", err);
    return errorResponse("Internal server error", 500);
  }
}

// POST /api/items
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = parseItemBody(body, false);
  if (!parsed.ok) return errorResponse(parsed.message, 400);
  const { title, description, status } = parsed.value;

  try {
    const rows = await sql`
      INSERT INTO items (title, description, status)
      VALUES (${title}, ${description}, ${status})
      RETURNING *`;
    return NextResponse.json({ data: toItem(rows[0] as ItemRow) }, { status: 201 });
  } catch (err) {
    console.error("POST /api/items", err);
    return errorResponse("Internal server error", 500);
  }
}
