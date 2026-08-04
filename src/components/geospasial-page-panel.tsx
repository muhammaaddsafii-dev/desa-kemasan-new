"use client";

import { Layers, Info, Route, Droplets, Landmark, Trees } from "lucide-react";

import { GeospasialMap } from "@/components/geospasial-map";
import { Icon } from "@/components/icon";
import { useGisLayers } from "@/lib/hooks/use-gis-layers";
import { GIS_LAYER_COLORS, GIS_LAYER_KEYS, GIS_LAYER_LABELS, type GisLayerKey } from "@/lib/types/gis";
import type { GeoMapPoint } from "@/lib/constants/map";

const GIS_LAYER_ICONS: Record<GisLayerKey, typeof Route> = {
  jalan: Route,
  perairan: Droplets,
  batas_admin: Landmark,
  tanah_desa: Trees,
};

const GIS_LAYER_DESCRIPTIONS: Record<GisLayerKey, string> = {
  jalan: "Jaringan jalan desa",
  perairan: "Sungai, irigasi, dan badan air",
  batas_admin: "Batas administratif dusun/RT/RW",
  tanah_desa: "Bidang tanah milik desa",
};

const legend = [
  { color: "bg-primary", label: "Batas Desa" },
  { color: "bg-secondary", label: "Fasilitas Umum" },
  { color: "bg-accent", label: "Jalan Desa" },
  { color: "bg-blue-400", label: "Sungai / Air" },
  { color: "bg-green-300", label: "Area Pertanian" },
];

export function GeospasialPagePanel({ points }: { points: GeoMapPoint[] }) {
  const gisLayerControl = useGisLayers(true);

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Map */}
      <div className="lg:col-span-2">
        <div className="card-village overflow-hidden p-4 md:p-6">
          <GeospasialMap
            points={points}
            showGisLayers
            showGisLayerButton={false}
            gisLayerControl={gisLayerControl}
            mapClassName="h-[28rem] md:h-[32rem]"
          />
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Layer Toggle */}
        <div className="card-village p-5">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Layer Peta</h3>
          </div>
          <div className="space-y-3">
            {GIS_LAYER_KEYS.map((layer) => {
              const LayerIcon = GIS_LAYER_ICONS[layer];
              return (
                <label key={layer} className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={gisLayerControl.visibleLayers[layer]}
                    onChange={() => gisLayerControl.toggleLayer(layer)}
                    className="mt-1 rounded border-input accent-primary"
                  />
                  <LayerIcon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: GIS_LAYER_COLORS[layer] }} />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {GIS_LAYER_LABELS[layer]}
                    </span>
                    <span className="block text-xs text-muted-foreground">{GIS_LAYER_DESCRIPTIONS[layer]}</span>
                  </div>
                  {gisLayerControl.loadingLayers[layer] && (
                    <Icon name="progress_activity" className="animate-spin text-sm text-muted-foreground" />
                  )}
                </label>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="card-village p-5">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Legenda</h3>
          </div>
          <div className="space-y-2">
            {legend.map((l) => (
              <div key={l.label} className="flex items-center gap-2">
                <div className={`w-4 h-3 rounded-sm ${l.color}`} />
                <span className="text-sm text-muted-foreground">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
