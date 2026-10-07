import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import {
  UUID_RE,
  errorResponse,
  parseItemBody,
  toItem,
  type ItemRow,
} from "@/lib/items";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

async function validId(ctx: Ctx) {
  const { id } = await ctx.params;
  return UUID_RE.test(id) ? id : null;
}

// GET /api/items/:id
export async function GET(_req: NextRequest, ctx: Ctx) {
  const id = await validId(ctx);
  if (!id) return errorResponse("Item not found", 404);
  try {
    const rows = await sql`SELECT * FROM items WHERE id = ${id}`;
    if (!rows.length) return errorResponse("Item not found", 404);
    return NextResponse.json({ data: toItem(rows[0] as ItemRow) });
  } catch (err) {
    console.error("GET /api/items/:id", err);
    return errorResponse("Internal server error", 500);
  }
}

// PUT /api/items/:id  (partial updates allowed)
export async function PUT(req: NextRequest, ctx: Ctx) {
  const id = await validId(ctx);
  if (!id) return errorResponse("Item not found", 404);

  const body = await req.json().catch(() => null);
  const parsed = parseItemBody(body, true);
  if (!parsed.ok) return errorResponse(parsed.message, 400);
  const { title, description, status } = parsed.value;

  try {
    const rows = await sql`
      UPDATE items SET
        title       = COALESCE(${title ?? null}, title),
        description = COALESCE(${description ?? null}, description),
        status      = COALESCE(${status ?? null}, status),
        updated_at  = now()
      WHERE id = ${id}
      RETURNING *`;
    if (!rows.length) return errorResponse("Item not found", 404);
    return NextResponse.json({ data: toItem(rows[0] as ItemRow) });
  } catch (err) {
    console.error("PUT /api/items/:id", err);
    return errorResponse("Internal server error", 500);
  }
}

// DELETE /api/items/:id
export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const id = await validId(ctx);
  if (!id) return errorResponse("Item not found", 404);
  try {
    const rows = await sql`DELETE FROM items WHERE id = ${id} RETURNING id`;
    if (!rows.length) return errorResponse("Item not found", 404);
    // Non-empty body: the frontend client always calls res.json().
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/items/:id", err);
    return errorResponse("Internal server error", 500);
  }
}
