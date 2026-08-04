export const DEFAULT_MAP_CENTER: [number, number] = [-6.2, 106.816666];
export const DEFAULT_MAP_ZOOM = 15;

export type GeoMapCategory = "penduduk" | "fasum" | "jalan";

export const GEO_CATEGORY_CONFIG: Record<GeoMapCategory, { label: string; color: string }> = {
  penduduk: { label: "Penduduk", color: "hsl(210 45% 45%)" },
  fasum: { label: "Fasilitas Umum", color: "hsl(152 60% 32%)" },
  jalan: { label: "Kondisi Jalan", color: "hsl(38 85% 52%)" },
};

export interface GeoMapPoint {
  id: string;
  lat: number;
  lng: number;
  category: GeoMapCategory;
  title: string;
  subtitle?: string;
}
