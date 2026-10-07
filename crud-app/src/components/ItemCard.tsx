"use client";

import Link from "next/link";
import { useState } from "react";
import { deleteItem } from "@/api/mutations";
import StatusBadge from "./StatusBadge";
import type { Item } from "@/types";

interface Props {
  item: Item;
  onDeleted: (id: string) => void;
}

export default function ItemCard({ item, onDeleted }: Props) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete "${item.title}"?`)) return;
    setDeleting(true);
    try {
      await deleteItem(item.id);
      onDeleted(item.id);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
      setDeleting(false);
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold text-gray-900">
            {item.title}
          </h2>
          <p className="mt-1 line-clamp-2 text-sm text-gray-500">
            {item.description}
          </p>
        </div>
        <StatusBadge status={item.status} />
      </div>

      <p className="mt-3 text-xs text-gray-400">
        Updated {new Date(item.updatedAt).toLocaleDateString()}
      </p>

      <div className="mt-4 flex gap-2">
        <Link
          href={`/${item.id}`}
          className="flex-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-center text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex-1 rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
        >
          {deleting ? "Deleting…" : "Delete"}
        </button>
      </div>
    </div>
  );
}
