"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getItemById } from "@/api/queries";
import { updateItem } from "@/api/mutations";
import ItemForm from "@/components/ItemForm";
import StatusBadge from "@/components/StatusBadge";
import type { CreateItemPayload, Item } from "@/types";

export default function EditPage() {
  const { id }    = useParams<{ id: string }>();
  const router    = useRouter();
  const [item, setItem]       = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    getItemById(id)
      .then((res) => setItem(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(values: CreateItemPayload) {
    await updateItem(id, values);
    router.push("/");
  }

  if (loading) return <p className="text-center text-gray-400 py-20">Loading…</p>;

  if (error || !item) {
    return (
      <div className="rounded-xl bg-red-50 p-6 text-center text-red-700">
        <p className="font-medium">Item not found</p>
        {error && <p className="mt-1 text-sm">{error}</p>}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-2xl font-bold">Edit Item</h1>
        <StatusBadge status={item.status} />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <ItemForm
          initial={{
            title:       item.title,
            description: item.description,
            status:      item.status,
          }}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}
