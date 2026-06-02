"use client";

import { useAgency } from "@/hooks/useAgency";

export default function AgencyDebug() {
  const { agency } = useAgency();

  return (
    <div className="mt-4 rounded-lg border p-4">
      <p className="text-sm text-gray-600">Agency from context:</p>
      <p className="text-lg font-semibold">{agency?.name ?? "No agency found"}</p>
      <p className="text-sm text-gray-500">{agency?.slug ?? "no-slug"}</p>
    </div>
  );
}