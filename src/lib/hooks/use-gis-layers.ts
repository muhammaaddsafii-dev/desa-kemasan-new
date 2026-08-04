"use client";

import { useEffect, useState, useTransition } from "react";
import { getGisLayerAction } from "@/lib/actions/gis";
import { GIS_LAYER_KEYS, type GisFeatureCollection, type GisLayerKey } from "@/lib/types/gis";

const ALL_HIDDEN: Record<GisLayerKey, boolean> = {
  jalan: false,
  perairan: false,
  batas_admin: false,
  tanah_desa: false,
};

const ALL_VISIBLE: Record<GisLayerKey, boolean> = {
  jalan: true,
  perairan: true,
  batas_admin: true,
  tanah_desa: true,
};

export function useGisLayers(enabled: boolean) {
  const [visibleLayers, setVisibleLayers] = useState<Record<GisLayerKey, boolean>>(() =>
    enabled ? ALL_VISIBLE : ALL_HIDDEN,
  );
  const [layerData, setLayerData] = useState<Partial<Record<GisLayerKey, GisFeatureCollection>>>({});
  const [loadingLayers, setLoadingLayers] = useState<Partial<Record<GisLayerKey, boolean>>>(() =>
    enabled ? (Object.fromEntries(GIS_LAYER_KEYS.map((layer) => [layer, true])) as Partial<Record<GisLayerKey, boolean>>) : {},
  );
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (!enabled) return;
    for (const layer of GIS_LAYER_KEYS) {
      if (!visibleLayers[layer]) continue;
      startTransition(async () => {
        const data = await getGisLayerAction(layer);
        setLayerData((prev) => ({ ...prev, [layer]: data }));
        setLoadingLayers((prev) => ({ ...prev, [layer]: false }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- hanya perlu fetch sekali saat mount
  }, [enabled]);

  const toggleLayer = (layer: GisLayerKey) => {
    const nextVisible = !visibleLayers[layer];
    setVisibleLayers((prev) => ({ ...prev, [layer]: nextVisible }));

    if (nextVisible && !layerData[layer]) {
      setLoadingLayers((prev) => ({ ...prev, [layer]: true }));
      startTransition(async () => {
        const data = await getGisLayerAction(layer);
        setLayerData((prev) => ({ ...prev, [layer]: data }));
        setLoadingLayers((prev) => ({ ...prev, [layer]: false }));
      });
    }
  };

  return { visibleLayers, layerData, loadingLayers, toggleLayer };
}
