import type { Item } from "@/types";

const styles: Record<Item["status"], string> = {
  active:   "bg-green-100  text-green-800",
  inactive: "bg-gray-100   text-gray-600",
  pending:  "bg-yellow-100 text-yellow-800",
};

export default function StatusBadge({ status }: { status: Item["status"] }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${styles[status]}`}>
      {status}
    </span>
  );
}
