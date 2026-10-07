"use client";

import { useRouter } from "next/navigation";
import { createItem } from "@/api/mutations";
import ItemForm from "@/components/ItemForm";
import type { CreateItemPayload } from "@/types";

export default function CreatePage() {
  const router = useRouter();

  async function handleSubmit(values: CreateItemPayload) {
    await createItem(values);
    router.push("/");
  }

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 text-2xl font-bold">New Item</h1>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <ItemForm onSubmit={handleSubmit} submitLabel="Create Item" />
      </div>
    </div>
  );
}
