"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getItems } from "@/api/queries";
import ItemCard from "@/components/ItemCard";
import type { Item } from "@/types";

export default function HomePage() {
  const [items, setItems]     = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    getItems()
      .then((res) => setItems(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  if (loading) return <p className="text-center text-gray-400 py-20">Loading…</p>;

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 p-6 text-center text-red-700">
        <p className="font-medium">Failed to load items</p>
        <p className="mt-1 text-sm">{error}</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-gray-400">No items yet.</p>
        <Link
          href="/create"
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Create your first item
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Items <span className="text-base font-normal text-gray-400">({items.length})</span></h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} onDeleted={removeItem} />
        ))}
      </div>
    </>
  );
}
