"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Map as MapIcon } from "lucide-react";

import { GEO_CATEGORY_CONFIG, type GeoMapCategory, type GeoMapPoint } from "@/lib/constants/map";
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

interface GeospasialMapProps {
  points: GeoMapPoint[];
  /** Tampilkan layer referensi desa (jalan, perairan, batas admin, tanah desa). */
  showGisLayers?: boolean;
  /** Tampilkan tombol toggle layer GIS di dalam peta. Matikan kalau kontrolnya sudah disediakan di luar (mis. card "Layer Peta" di sidebar). Default true. */
  showGisLayerButton?: boolean;
  /** Kelola state layer GIS dari luar komponen ini (lihat useGisLayers). Kalau diisi, komponen tidak fetch sendiri. */
  gisLayerControl?: GisLayerControl;
  /** Kelas Tailwind untuk tinggi area peta, mis. "h-72 md:h-96" */
  mapClassName?: string;
  className?: string;
}

export function GeospasialMap({
  points,
  showGisLayers = false,
  showGisLayerButton = true,
  gisLayerControl,
  mapClassName = "h-72 md:h-96",
  className,
}: GeospasialMapProps) {
  const internalGisLayers = useGisLayers(showGisLayers && !gisLayerControl);
  const { visibleLayers, layerData, loadingLayers, toggleLayer } = gisLayerControl ?? internalGisLayers;

  const availableCategories = useMemo(() => {
    const set = new Set<GeoMapCategory>();
    points.forEach((p) => set.add(p.category));
    return (Object.keys(GEO_CATEGORY_CONFIG) as GeoMapCategory[]).filter((c) => set.has(c));
  }, [points]);

  const [visible, setVisible] = useState<Set<GeoMapCategory>>(() => new Set(availableCategories));

  const toggle = (category: GeoMapCategory) => {
    setVisible((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

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
      {availableCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {availableCategories.map((category) => {
            const active = visible.has(category);
            return (
              <button
                key={category}
                type="button"
                onClick={() => toggle(category)}
                className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  active
                    ? "bg-primary/10 border-primary/30 text-foreground"
                    : "bg-muted border-transparent text-muted-foreground"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: GEO_CATEGORY_CONFIG[category].color }}
                />
                {GEO_CATEGORY_CONFIG[category].label}
              </button>
            );
          })}
        </div>
      )}
      <div className={`${mapClassName} rounded-xl overflow-hidden border`}>
        <GeospasialMapInner
          points={points}
          visibleCategories={visible}
          gisLayers={showGisLayers ? layerData : undefined}
          visibleGisLayers={showGisLayers ? visibleLayers : undefined}
          loadingGisLayers={showGisLayers ? loadingLayers : undefined}
          onToggleGisLayer={showGisLayers && showGisLayerButton ? toggleLayer : undefined}
        />
      </div>
    </div>
  );
}
