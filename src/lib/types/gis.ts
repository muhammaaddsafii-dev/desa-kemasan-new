export interface GisFeature {
  type: "Feature";
  geometry: unknown;
  properties: Record<string, string | number | null>;
}

export interface GisFeatureCollection {
  type: "FeatureCollection";
  features: GisFeature[];
}

export const GIS_LAYER_KEYS = ["jalan", "perairan", "batas_admin", "tanah_desa"] as const;
export type GisLayerKey = (typeof GIS_LAYER_KEYS)[number];

export const GIS_LAYER_LABELS: Record<GisLayerKey, string> = {
  jalan: "Jalan",
  perairan: "Perairan",
  batas_admin: "Batas Admin",
  tanah_desa: "Tanah Desa",
};

/**
 * Warna per layer GIS - dipisah dari gis-map-layers.tsx (yang mengimpor `leaflet`, tidak SSR-safe)
 * supaya bisa dipakai juga oleh komponen yang dirender di server, mis. sidebar "Layer Peta".
 */
export const GIS_LAYER_COLORS: Record<GisLayerKey, string> = {
  jalan: "#525252",
  perairan: "#1d4ed8",
  batas_admin: "#b91c1c",
  tanah_desa: "#15803d",
};
