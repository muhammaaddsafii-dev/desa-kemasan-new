import { CheckCircle2, Clock } from "lucide-react";
import type { ReactNode } from "react";

import { selisihHari, stripHtml } from "@/lib/format";

/** Cuplikan teks polos dari konten rich-text. */
export function excerpt(html: string | null | undefined, length = 160) {
  const text = stripHtml(html);
  return text.length > length ? `${text.slice(0, length).trim()}...` : text;
}

export type StatusKegiatanKey = "selesai" | "hari-ini" | "mendatang";

export interface StatusKegiatan {
  key: StatusKegiatanKey;
  label: string;
  className: string;
  icon: ReactNode;
  tile: string;
}

/** Status kegiatan terhadap hari ini: Selesai (hijau), Hari ini (merah), atau hitung mundur (kuning). */
export function statusKegiatan(dateStr: string, today: string): StatusKegiatan {
  const d = selisihHari(dateStr, today);
  if (d < 0) {
    return {
      key: "selesai",
      label: "Selesai",
      className: "bg-green-100 text-green-700",
      icon: <CheckCircle2 className="h-3 w-3" />,
      tile: "bg-green-100 text-green-700",
    };
  }
  if (d === 0) {
    return {
      key: "hari-ini",
      label: "Hari ini",
      className: "bg-red-100 text-red-700",
      icon: <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-600" />,
      tile: "bg-red-100 text-red-700",
    };
  }
  return {
    key: "mendatang",
    label: d === 1 ? "Besok" : `${d} hari lagi`,
    className: "bg-amber-100 text-amber-700",
    icon: <Clock className="h-3 w-3" />,
    tile: "bg-amber-100 text-amber-700",
  };
}
