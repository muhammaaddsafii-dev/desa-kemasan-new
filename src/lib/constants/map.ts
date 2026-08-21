import type { ApprovalStatus, FotoFasum, FotoKondisiJalan, FotoPenduduk } from "@/lib/types/geo";

export const DEFAULT_MAP_CENTER: [number, number] = [-6.2, 106.816666];
export const DEFAULT_MAP_ZOOM = 15;

export type GeoMapCategory = "penduduk" | "fasum" | "jalan";

export const GEO_CATEGORY_CONFIG: Record<GeoMapCategory, { label: string; color: string }> = {
  penduduk: { label: "Penduduk", color: "#dc2626" },
  fasum: { label: "Fasilitas Umum", color: "hsl(152 60% 32%)" },
  jalan: { label: "Kondisi Jalan", color: "hsl(38 85% 52%)" },
};

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
