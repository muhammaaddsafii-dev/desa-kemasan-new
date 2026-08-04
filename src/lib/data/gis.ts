import { apiFetch } from "@/lib/api/client";
import type { GisFeatureCollection, GisLayerKey } from "@/lib/types/gis";

export async function getGisLayer(layer: GisLayerKey): Promise<GisFeatureCollection> {
  try {
    return await apiFetch<GisFeatureCollection>(`gis/${layer}/`, { revalidate: 300 });
  } catch (error) {
    console.error(`Gagal memuat layer GIS "${layer}":`, error);
    return { type: "FeatureCollection", features: [] };
  }
}
