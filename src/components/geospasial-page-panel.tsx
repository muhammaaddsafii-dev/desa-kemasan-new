"use client";

import { useState } from "react";
import { Layers, Info } from "lucide-react";

import { GeospasialMap } from "@/components/geospasial-map";
import { Icon } from "@/components/icon";
import { useGisLayers } from "@/lib/hooks/use-gis-layers";
import { GIS_LAYER_KEYS, GIS_LAYER_LABELS, type GisLayerKey } from "@/lib/types/gis";
import { GEO_CATEGORY_CONFIG, type GeoMapCategory, type GeoMapPoint } from "@/lib/constants/map";
import { MarkerSwatch, useLegendItems } from "@/components/geo-legend";

/** Penanda area/garis layer GIS - mengikuti gaya di GIS_LAYER_STYLES. */
const GIS_SWATCH: Record<GisLayerKey, React.CSSProperties> = {
  jalan: { background: "#a3a3a3", border: "1px solid #525252" },
  perairan: { background: "#93c5fd", border: "1px solid #1d4ed8" },
  batas_admin: { background: "transparent", border: "2px dashed #b91c1c" },
  tanah_desa: { background: "#86efac", border: "1px solid #15803d" },
};

const GIS_LAYER_DESCRIPTIONS: Record<GisLayerKey, string> = {
  jalan: "Jaringan jalan desa",
  perairan: "Sungai, irigasi, dan badan air",
  batas_admin: "Batas administratif dusun/RT/RW",
  tanah_desa: "Bidang tanah milik desa",
};

export function GeospasialPagePanel({ points }: { points: GeoMapPoint[] }) {
  const gisLayerControl = useGisLayers(true);
  const [tab, setTab] = useState<GeoMapCategory>("penduduk");

  const legendItems = useLegendItems(tab, points);

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_18rem] 2xl:grid-cols-[minmax(0,1fr)_20rem]">
      {/* Map */}
      <div className="min-w-0">
        <div className="card-village overflow-hidden p-2 md:p-3">
          <GeospasialMap
            points={points}
            showGisLayers
            showGisLayerButton={false}
            showLegend={false}
            gisLayerControl={gisLayerControl}
            activeTab={tab}
            onActiveTabChange={setTab}
            mapClassName="h-[32rem] md:h-[40rem] lg:h-[calc(100vh-8rem)] lg:min-h-[44rem] lg:max-h-[60rem]"
          />
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-4 lg:sticky lg:top-24">
        {/* Layer Toggle - swatch = gaya layer persis seperti di peta */}
        <div className="card-village p-4">
          <div className="mb-3 flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Layer Peta</h3>
          </div>
          <div className="space-y-2.5">
            {GIS_LAYER_KEYS.map((layer) => (
              <label key={layer} className="group flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={gisLayerControl.visibleLayers[layer]}
                  onChange={() => gisLayerControl.toggleLayer(layer)}
                  className="h-4 w-4 shrink-0 rounded border-input accent-primary"
                />
                <span className="h-3.5 w-5 shrink-0 rounded-sm" style={GIS_SWATCH[layer]} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium leading-tight text-foreground transition-colors group-hover:text-primary">
                    {GIS_LAYER_LABELS[layer]}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">{GIS_LAYER_DESCRIPTIONS[layer]}</span>
                </span>
                {gisLayerControl.loadingLayers[layer] && (
                  <Icon name="progress_activity" className="animate-spin text-sm text-muted-foreground" />
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Legend - mengikuti tab aktif */}
        <div className="card-village p-4">
          <div className="mb-3 flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Legenda</h3>
            <span className="ml-auto text-xs text-muted-foreground">{GEO_CATEGORY_CONFIG[tab].label}</span>
          </div>
          <div className="space-y-2.5">
            {legendItems.map((item) => (
              <div key={item.key} className="flex items-center gap-2.5">
                <MarkerSwatch color={item.color} icon={item.icon} square={item.square} />
                <span className="flex-1 text-sm text-foreground">{item.label}</span>
                {item.count !== undefined && (
                  <span className="text-sm font-semibold tabular-nums text-muted-foreground">{item.count}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
