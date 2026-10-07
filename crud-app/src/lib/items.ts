import { NextResponse } from "next/server";
import type { ApiError, CreateItemPayload, Item } from "@/types";

export const STATUSES: Item["status"][] = ["active", "inactive", "pending"];

export interface ItemRow {
  id: string;
  title: string;
  description: string;
  status: Item["status"];
  created_at: Date | string;
  updated_at: Date | string;
}

export function toItem(row: ItemRow): Item {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    status: row.status,
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
  };
}

export function errorResponse(message: string, status: number, code?: string) {
  const body: ApiError = { message, ...(code && { code }) };
  return NextResponse.json(body, { status });
}

export const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Parsed =
  | { ok: true; value: Partial<CreateItemPayload> }
  | { ok: false; message: string };

/** Validates a JSON body. With `partial`, every field is optional (PUT). */
export function parseItemBody(body: unknown, partial: boolean): Parsed {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { ok: false, message: "Body must be a JSON object" };
  }
  const b = body as Record<string, unknown>;
  const value: Partial<CreateItemPayload> = {};

  if (b.title !== undefined || !partial) {
    if (typeof b.title !== "string" || !b.title.trim()) {
      return { ok: false, message: "title is required" };
    }
    if (b.title.trim().length > 200) {
      return { ok: false, message: "title must be at most 200 characters" };
    }
    value.title = b.title.trim();
  }
  if (b.description !== undefined) {
    if (typeof b.description !== "string") {
      return { ok: false, message: "description must be a string" };
    }
    value.description = b.description;
  } else if (!partial) {
    value.description = "";
  }
  if (b.status !== undefined) {
    if (!STATUSES.includes(b.status as Item["status"])) {
      return { ok: false, message: `status must be one of: ${STATUSES.join(", ")}` };
    }
    value.status = b.status as Item["status"];
  } else if (!partial) {
    value.status = "pending";
  }
  return { ok: true, value };
}
