import { CheckCircle2, Clock, Loader2 } from "lucide-react";

import type { StatusPermohonan } from "@/lib/types/layanan";

export const STATUS_META: Record<StatusPermohonan, { label: string; badge: string; dot: string; bar: string; icon: typeof Clock; hint: string }> = {
  diajukan: {
    label: "Diajukan",
    badge: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
    bar: "#f59e0b",
    icon: Clock,
    hint: "Menunggu diperiksa petugas",
  },
  diproses: {
    label: "Diproses",
    badge: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
    bar: "#2563eb",
    icon: Loader2,
    hint: "Sedang ditangani petugas",
  },
  selesai: {
    label: "Selesai",
    badge: "bg-green-100 text-green-700",
    dot: "bg-green-500",
    bar: "#16a34a",
    icon: CheckCircle2,
    hint: "Sudah selesai ditindaklanjuti",
  },
};

export function StatusBadge({ status }: { status: StatusPermohonan }) {
  const meta = STATUS_META[status];
  if (!meta) {
    return <span className="inline-block rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">{status}</span>;
  }
  const Icon = meta.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${meta.badge}`}>
      <Icon className="h-3 w-3" />
      {meta.label}
    </span>
  );
}
