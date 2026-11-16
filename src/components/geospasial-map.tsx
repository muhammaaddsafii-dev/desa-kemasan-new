"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Map as MapIcon } from "lucide-react";

import {
  GEO_CATEGORY_CONFIG,
  KONDISI_JALAN_CLASS_KEYS,
  type GeoFilterKey,
  type GeoMapCategory,
  type GeoMapPoint,
} from "@/lib/constants/map";
import { GeoLegendStrip } from "@/components/geo-legend";
import { useGisLayers } from "@/lib/hooks/use-gis-layers";
import type { GisFeatureCollection, GisLayerKey } from "@/lib/types/gis";

const GeospasialMapInner = dynamic(() => import("./geospasial-map-inner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-village-blue-light">
      <p className="text-sm text-muted-foreground">Memuat peta...</p>
    </div>
  ),
});

export interface GisLayerControl {
  visibleLayers: Record<GisLayerKey, boolean>;
  layerData: Partial<Record<GisLayerKey, GisFeatureCollection>>;
  loadingLayers: Partial<Record<GisLayerKey, boolean>>;
  toggleLayer: (layer: GisLayerKey) => void;
}

const TAB_ORDER: GeoMapCategory[] = ["penduduk", "fasum", "jalan"];

interface GeospasialMapProps {
  points: GeoMapPoint[];
  /** Tampilkan layer referensi desa (jalan, perairan, batas admin, tanah desa). */
  showGisLayers?: boolean;
  /** Tampilkan tombol toggle layer GIS di dalam peta. Matikan kalau kontrolnya sudah disediakan di luar (mis. card "Layer Peta" di sidebar). Default true. */
  showGisLayerButton?: boolean;
  /** Tampilkan legenda satu baris di bawah peta. Matikan kalau legenda sudah disediakan di luar (mis. sidebar). Default true. */
  showLegend?: boolean;
  /** Kelola state layer GIS dari luar komponen ini (lihat useGisLayers). Kalau diisi, komponen tidak fetch sendiri. */
  gisLayerControl?: GisLayerControl;
  /** Kelas Tailwind untuk tinggi area peta, mis. "h-72 md:h-96" */
  mapClassName?: string;
  className?: string;
  /** Tab aktif yang dikontrol dari luar (mis. supaya legenda di sidebar ikut berganti). */
  activeTab?: GeoMapCategory;
  onActiveTabChange?: (tab: GeoMapCategory) => void;
}

export function GeospasialMap({
  points,
  showGisLayers = false,
  showGisLayerButton = true,
  showLegend = true,
  gisLayerControl,
  mapClassName = "h-[24rem] md:h-[32rem]",
  className,
  activeTab,
  onActiveTabChange,
}: GeospasialMapProps) {
  const internalGisLayers = useGisLayers(showGisLayers && !gisLayerControl);
  const { visibleLayers, layerData, loadingLayers, toggleLayer } = gisLayerControl ?? internalGisLayers;

  const counts = useMemo(() => {
    const c: Record<GeoMapCategory, number> = { penduduk: 0, fasum: 0, jalan: 0 };
    points.forEach((p) => {
      c[p.category] += 1;
    });
    return { category: c };
  }, [points]);

  const tabs = TAB_ORDER.filter((c) => counts.category[c] > 0);
  const [internalTab, setInternalTab] = useState<GeoMapCategory>(tabs[0] ?? "penduduk");
  const requested = activeTab ?? internalTab;
  const tab = tabs.includes(requested) ? requested : (tabs[0] ?? requested); // tab tanpa data tidak dipakai
  const changeTab = (next: GeoMapCategory) => {
    setInternalTab(next);
    onActiveTabChange?.(next);
  };

  const visibleKeys = useMemo(
    () =>
      new Set<GeoFilterKey>(
        tab === "jalan" ? KONDISI_JALAN_CLASS_KEYS.map((k) => `jalan:${k}` as GeoFilterKey) : [tab],
      ),
    [tab],
  );

  const shownCount = counts.category[tab];

  if (points.length === 0 && !showGisLayers) {
    return (
      <div className={`${mapClassName} bg-village-blue-light flex items-center justify-center rounded-xl ${className ?? ""}`}>
        <div className="text-center text-muted-foreground">
          <MapIcon className="w-16 h-16 mx-auto mb-3 opacity-40" />
          <p className="text-sm font-medium">Belum ada data lokasi untuk ditampilkan</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {tabs.length > 0 && (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div role="tablist" aria-label="Jenis data peta" className="inline-flex rounded-xl bg-muted p-1">
            {tabs.map((c) => {
              const active = tab === c;
              return (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => changeTab(c)}
                  className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    active ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 shrink-0 ${c === "jalan" ? "rounded-[3px]" : "rounded-full"}`}
                    style={{ background: GEO_CATEGORY_CONFIG[c].color }}
                  />
                  {GEO_CATEGORY_CONFIG[c].label}
                  <span className="text-xs text-muted-foreground">{counts.category[c]}</span>
                </button>
              );
            })}
          </div>
          <span className="text-xs text-muted-foreground">{shownCount} titik ditampilkan</span>
        </div>
      )}
      <div className={`${mapClassName} rounded-xl overflow-hidden border`}>
        <GeospasialMapInner
          points={points}
          visibleKeys={visibleKeys}
          fitKey={tab}
          gisLayers={showGisLayers ? layerData : undefined}
          visibleGisLayers={showGisLayers ? visibleLayers : undefined}
          loadingGisLayers={showGisLayers ? loadingLayers : undefined}
          onToggleGisLayer={showGisLayers && showGisLayerButton ? toggleLayer : undefined}
        />
      </div>
      {showLegend && <GeoLegendStrip tab={tab} points={points} />}
    </div>
  );
}
