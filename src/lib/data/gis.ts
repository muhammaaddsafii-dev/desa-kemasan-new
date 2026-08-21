import { apiFetch } from "@/lib/api/client";
import type { GisFeatureCollection, GisLayerKey } from "@/lib/types/gis";

// Sengaja tetap menangkap error di sini (beda dari fungsi data/* lain): dipanggil lewat Server
// Action dari komponen client (lihat use-gis-layers.ts) saat user toggle layer, bukan saat render
// halaman - melempar error di sini akan jadi unhandled promise rejection di client, bukan
// tertangkap error.tsx. Layer GIS juga cuma overlay opsional, jadi aman fallback ke kosong.
export async function getGisLayer(layer: GisLayerKey): Promise<GisFeatureCollection> {
  try {
    return await apiFetch<GisFeatureCollection>(`gis/${layer}/`, { revalidate: 300 });
  } catch (error) {
    console.error(`Gagal memuat layer GIS "${layer}":`, error);
    return { type: "FeatureCollection", features: [] };
  }
}
