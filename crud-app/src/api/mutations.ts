// ---------------------------------------------------------------------------
// WRITE operations — all POST / PUT / DELETE requests live here.
// ---------------------------------------------------------------------------
import { apiFetch } from "./client";
import type {
  CreateItemPayload,
  UpdateItemPayload,
  ItemResponse,
} from "@/types";

export async function createItem(
  payload: CreateItemPayload
): Promise<ItemResponse> {
  return apiFetch<ItemResponse>("/items", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateItem(
  id: string,
  payload: UpdateItemPayload
): Promise<ItemResponse> {
  return apiFetch<ItemResponse>(`/items/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteItem(id: string): Promise<void> {
  return apiFetch<void>(`/items/${id}`, { method: "DELETE" });
}
