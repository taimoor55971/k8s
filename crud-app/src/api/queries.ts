// ---------------------------------------------------------------------------
// READ operations — all GET requests live here.
// ---------------------------------------------------------------------------
import { apiFetch } from "./client";
import type { Item, ItemsResponse, ItemResponse } from "@/types";

export async function getItems(params?: {
  page?: number;
  pageSize?: number;
  status?: Item["status"];
}): Promise<ItemsResponse> {
  const query = new URLSearchParams();
  if (params?.page)     query.set("page",     String(params.page));
  if (params?.pageSize) query.set("pageSize", String(params.pageSize));
  if (params?.status)   query.set("status",   params.status);

  const qs = query.toString() ? `?${query.toString()}` : "";
  return apiFetch<ItemsResponse>(`/items${qs}`);
}

export async function getItemById(id: string): Promise<ItemResponse> {
  return apiFetch<ItemResponse>(`/items/${id}`);
}
