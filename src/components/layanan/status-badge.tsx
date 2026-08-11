import type { StatusPermohonan } from "@/lib/types/layanan";

const STATUS_STYLE: Record<StatusPermohonan, string> = {
  diajukan: "bg-amber-100 text-amber-700",
  diproses: "bg-blue-100 text-blue-700",
  selesai: "bg-primary/10 text-primary",
};

const STATUS_LABEL: Record<StatusPermohonan, string> = {
  diajukan: "Diajukan",
  diproses: "Diproses",
  selesai: "Selesai",
};

export function StatusBadge({ status }: { status: StatusPermohonan }) {
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLE[status] ?? "bg-muted text-muted-foreground"}`}>
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}
