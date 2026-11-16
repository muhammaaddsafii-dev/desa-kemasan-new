import type { ApprovalStatus, FotoFasum, FotoKondisiJalan, FotoPenduduk } from "@/lib/types/geo";

export const DEFAULT_MAP_CENTER: [number, number] = [-6.2, 106.816666];
export const DEFAULT_MAP_ZOOM = 15;

export type GeoMapCategory = "penduduk" | "fasum" | "jalan";

export const GEO_CATEGORY_CONFIG: Record<GeoMapCategory, { label: string; color: string }> = {
  penduduk: { label: "Penduduk", color: "#2563eb" },
  fasum: { label: "Fasilitas Umum", color: "#0891b2" },
  jalan: { label: "Kondisi Jalan", color: "#ea580c" },
};

export type KondisiJalanClassKey = "baik" | "cukup" | "kurang" | "tidak" | "lainnya";

/** Kelas kondisi jalan untuk simbologi peta (urut dari paling baik ke paling buruk). */
export const KONDISI_JALAN_CLASSES: Record<KondisiJalanClassKey, { label: string; color: string }> = {
  baik: { label: "Baik", color: "#16a34a" },
  cukup: { label: "Cukup baik", color: "#eab308" },
  kurang: { label: "Kurang baik", color: "#f97316" },
  tidak: { label: "Tidak baik", color: "#dc2626" },
  lainnya: { label: "Lainnya", color: "#6b7280" },
};

export const KONDISI_JALAN_CLASS_KEYS = Object.keys(KONDISI_JALAN_CLASSES) as KondisiJalanClassKey[];

/** Data kondisi di DB tidak seragam ("Baik", "Cukup Baik", salah ketik) - cocokkan tanpa peduli huruf besar/kecil. */
export function kondisiJalanClass(kondisi: string | null | undefined): KondisiJalanClassKey {
  const k = (kondisi ?? "").trim().toLowerCase();
  if (k === "baik") return "baik";
  if (k === "cukup baik") return "cukup";
  if (k.startsWith("kur")) return "kurang"; // termasuk salah ketik "kurag baik"
  if (k === "tidak baik" || k.includes("rusak")) return "tidak";
  return "lainnya";
}

/** Kunci filter/legenda sebuah titik: kategori, atau "jalan:<kelas>" untuk kondisi jalan. */
export type GeoFilterKey = Exclude<GeoMapCategory, "jalan"> | `jalan:${KondisiJalanClassKey}`;

export function geoFilterKey(point: { category: GeoMapCategory; kondisi?: string }): GeoFilterKey {
  return point.category === "jalan" ? `jalan:${kondisiJalanClass(point.kondisi)}` : point.category;
}

interface GeoMapPointBase {
  id: string;
  lat: number;
  lng: number;
  title: string;
}

export type GeoMapPoint =
  | (GeoMapPointBase & { category: "penduduk"; rt: string | null; rw: string | null; foto: FotoPenduduk[] })
  | (GeoMapPointBase & { category: "fasum"; jenis: string; toponim: string | null; status: ApprovalStatus; foto: FotoFasum[] })
  | (GeoMapPointBase & { category: "jalan"; perkerasan: string; kondisi: string; status: ApprovalStatus; foto: FotoKondisiJalan[] });
