"use client";

import { useEffect, useState } from "react";
import { GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";

import { Icon } from "@/components/icon";
import {
  GIS_LAYER_COLORS,
  GIS_LAYER_KEYS,
  GIS_LAYER_LABELS,
  type GisFeatureCollection,
  type GisLayerKey,
} from "@/lib/types/gis";
import type { GeoMapCategory } from "@/lib/constants/map";
import { GEO_CATEGORY_CONFIG } from "@/lib/constants/map";

export { GIS_LAYER_COLORS };

export const GIS_LAYER_STYLES: Record<GisLayerKey, L.PathOptions> = {
  jalan: { color: "#525252", weight: 1, fillColor: "#a3a3a3", fillOpacity: 0.5 },
  perairan: { color: "#1d4ed8", weight: 1, fillColor: "#93c5fd", fillOpacity: 0.5 },
  batas_admin: { color: "#b91c1c", weight: 2, fillOpacity: 0, dashArray: "6 4" },
  tanah_desa: { color: "#15803d", weight: 1, fillColor: "#86efac", fillOpacity: 0.4 },
};

export type BaseLayerKey = "satelite" | "topografi" | "osm";

export const BASE_LAYER_CONFIG: Record<BaseLayerKey, { label: string; url: string; attribution: string; maxZoom?: number }> = {
  satelite: {
    label: "Satelit",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community",
    maxZoom: 19,
  },
  topografi: {
    label: "Topografi",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    maxZoom: 17,
  },
  osm: {
    label: "OpenStreetMap",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  },
};

export const BASE_LAYER_KEYS = Object.keys(BASE_LAYER_CONFIG) as BaseLayerKey[];

const MARKER_CATEGORY_ICON: Record<GeoMapCategory, string> = {
  penduduk: "home",
  fasum: "domain",
  jalan: "edit_road",
};

export function createCategoryIcon(category: GeoMapCategory): L.DivIcon {
  const color = GEO_CATEGORY_CONFIG[category].color;
  const icon = MARKER_CATEGORY_ICON[category];
  return L.divIcon({
    className: "custom-marker-icon",
    html: `<div style="background:${color};width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4);"><span class="material-symbols-outlined" style="color:#fff;font-size:16px;">${icon}</span></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -14],
  });
}

function bindGisPopup(feature: { properties?: Record<string, string | number | null> }, layer: L.Layer) {
  const props = feature.properties ?? {};
  const rows = Object.entries(props)
    .filter(([key]) => key !== "gid")
    .map(([key, value]) => `<div><strong>${key}:</strong> ${value ?? "-"}</div>`)
    .join("");
  if (rows) layer.bindPopup(`<div style="font-size:12px;line-height:1.5">${rows}</div>`);
}

export function GisLayers({
  gisLayers,
  visibleLayers,
}: {
  gisLayers: Partial<Record<GisLayerKey, GisFeatureCollection>>;
  visibleLayers?: Record<GisLayerKey, boolean>;
}) {
  return (
    <>
      {(Object.keys(gisLayers) as GisLayerKey[]).map((layer) => {
        if (!visibleLayers?.[layer]) return null;
        const data = gisLayers[layer];
        if (!data) return null;
        return (
          <GeoJSON
            key={layer}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- GisFeatureCollection is structurally compatible with GeoJSON.FeatureCollection
            data={data as any}
            style={GIS_LAYER_STYLES[layer]}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- react-leaflet's onEachFeature typing expects the `geojson` package's Feature type
            onEachFeature={bindGisPopup as any}
          />
        );
      })}
    </>
  );
}

export function MapInstanceCapture({ mapRef }: { mapRef: React.MutableRefObject<L.Map | null> }) {
  const map = useMap();
  useEffect(() => {
    mapRef.current = map;
  }, [map, mapRef]);
  return null;
}

export function MapLayerControl({
  visibleLayers,
  loadingLayers,
  onToggleLayer,
  onResetView,
  baseLayer,
  onBaseLayerChange,
}: {
  visibleLayers?: Record<GisLayerKey, boolean>;
  loadingLayers?: Partial<Record<GisLayerKey, boolean>>;
  onToggleLayer?: (layer: GisLayerKey) => void;
  onResetView: () => void;
  baseLayer?: BaseLayerKey;
  onBaseLayerChange?: (layer: BaseLayerKey) => void;
}) {
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <div
      className="absolute right-2.5 top-2.5 z-[1000] flex flex-col items-end gap-2"
      onMouseDown={(event) => event.stopPropagation()}
      onDoubleClick={(event) => event.stopPropagation()}
      onWheel={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        onClick={onResetView}
        title="Kembali ke tampilan awal"
        className="flex h-9 w-9 items-center justify-center rounded-lg border bg-card text-muted-foreground shadow-lg transition-colors hover:bg-muted"
      >
        <Icon name="center_focus_strong" className="text-lg" />
      </button>
      {(onToggleLayer || onBaseLayerChange) && (
        <div className="relative">
          <button
            type="button"
            onClick={() => setPanelOpen((prev) => !prev)}
            title="Layer Peta"
            aria-expanded={panelOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg border bg-card text-muted-foreground shadow-lg transition-colors hover:bg-muted"
          >
            <Icon name="layers" className="text-lg" />
          </button>
          {panelOpen && (
            <div className="absolute right-0 mt-2 w-44 rounded-xl border bg-card p-3.5 shadow-lg">
              {onBaseLayerChange && (
                <>
                  <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Jenis Peta Dasar</p>
                  <div className="mb-3.5 space-y-2.5">
                    {BASE_LAYER_KEYS.map((key) => (
                      <label key={key} className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                        <input
                          type="radio"
                          name="base-layer"
                          checked={baseLayer === key}
                          onChange={() => onBaseLayerChange(key)}
                          className="h-4 w-4 shrink-0 accent-primary"
                        />
                        <span className="flex-1 truncate">{BASE_LAYER_CONFIG[key].label}</span>
                      </label>
                    ))}
                  </div>
                </>
              )}
              {onToggleLayer && (
                <>
                  <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Layer Peta</p>
                  <div className="space-y-2.5">
                    {GIS_LAYER_KEYS.map((layer) => (
                      <label key={layer} className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                        <input
                          type="checkbox"
                          checked={visibleLayers?.[layer] ?? false}
                          onChange={() => onToggleLayer(layer)}
                          className="h-4 w-4 shrink-0 rounded border-input accent-primary"
                        />
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: GIS_LAYER_COLORS[layer] }}
                        />
                        <span className="flex-1 truncate">{GIS_LAYER_LABELS[layer]}</span>
                        {loadingLayers?.[layer] && <Icon name="progress_activity" className="animate-spin text-sm text-muted-foreground" />}
                      </label>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
