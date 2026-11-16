"use client";

import "leaflet/dist/leaflet.css";

import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";

import {
  BASE_LAYER_CONFIG,
  createCategoryIcon,
  GisLayers,
  MapInstanceCapture,
  MapLayerControl,
  type BaseLayerKey,
} from "@/components/gis-map-layers";
import { GeoPopupContent } from "@/components/geo-popup";
import {
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
  GEO_CATEGORY_CONFIG,
  KONDISI_JALAN_CLASSES,
  geoFilterKey,
  type GeoFilterKey,
  type GeoMapCategory,
  type GeoMapPoint,
} from "@/lib/constants/map";
import type { GisFeatureCollection, GisLayerKey } from "@/lib/types/gis";

/** Popup content mounts (dan baru me-render foto-nya) hanya saat marker ini benar-benar dibuka,
 * bukan otomatis untuk semua marker sekaligus - penting karena titik di peta publik bisa banyak. */
function MarkerPopup({ point }: { point: GeoMapPoint }) {
  const [opened, setOpened] = useState(false);
  return (
    <Popup
      className="geo-popup"
      minWidth={280}
      maxWidth={280}
      maxHeight={440}
      autoPanPadding={[24, 24]}
      eventHandlers={{ add: () => setOpened(true), remove: () => setOpened(false) }}
    >
      {opened && <GeoPopupContent point={point} />}
    </Popup>
  );
}

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function FitBoundsController({ bounds, ready, onDone }: { bounds: L.LatLngBounds; ready: boolean; onDone: () => void }) {
  const map = useMap();
  const didFit = useRef(false);

  useEffect(() => {
    if (didFit.current || !ready) return;
    map.fitBounds(bounds, { padding: [32, 32], maxZoom: 16 });
    didFit.current = true;
    onDone();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- hanya sekali, begitu "ready" dan bounds final tersedia
  }, [ready]);

  return null;
}

interface GeospasialMapInnerProps {
  points: GeoMapPoint[];
  visibleKeys: Set<GeoFilterKey>;
  /** Berubah (mis. ganti tab) -> peta terbang ke titik yang sedang tampil. */
  fitKey?: string;
  gisLayers?: Partial<Record<GisLayerKey, GisFeatureCollection>>;
  visibleGisLayers?: Record<GisLayerKey, boolean>;
  loadingGisLayers?: Partial<Record<GisLayerKey, boolean>>;
  onToggleGisLayer?: (layer: GisLayerKey) => void;
}

export default function GeospasialMapInner({
  points,
  visibleKeys,
  fitKey,
  gisLayers = {},
  visibleGisLayers,
  loadingGisLayers,
  onToggleGisLayer,
}: GeospasialMapInnerProps) {
  // Satu ikon per kunci filter (penduduk, fasum, dan tiap kelas kondisi jalan) - dibuat sekali, dipakai ulang.
  const icons = useMemo(() => {
    const cache = new Map<GeoFilterKey, L.DivIcon>();
    for (const category of Object.keys(GEO_CATEGORY_CONFIG) as GeoMapCategory[]) {
      if (category === "jalan") {
        for (const [key, { color }] of Object.entries(KONDISI_JALAN_CLASSES)) {
          cache.set(`jalan:${key}` as GeoFilterKey, createCategoryIcon("jalan", color));
        }
      } else {
        cache.set(category, createCategoryIcon(category));
      }
    }
    return cache;
  }, []);

  const visiblePoints = points.filter((p) => visibleKeys.has(geoFilterKey(p)));
  const mapRef = useRef<L.Map | null>(null);
  const [fitted, setFitted] = useState(false);
  const lastFitKey = useRef(fitKey);
  const [baseLayer, setBaseLayer] = useState<BaseLayerKey>("satelite");
  const baseLayerConfig = BASE_LAYER_CONFIG[baseLayer];

  // Gabungkan bounds dari titik marker (penduduk/fasum/kondisi jalan) DAN dari layer referensi GIS
  // yang sedang tampil (jalan, perairan, batas admin, tanah desa) - supaya auto-zoom mencakup semua
  // data yang benar-benar ditampilkan, bukan cuma titik marker.
  const bounds = useMemo(() => {
    const b = L.latLngBounds([]);
    visiblePoints.forEach((p) => b.extend([p.lat, p.lng]));
    if (visibleGisLayers) {
      (Object.keys(gisLayers) as GisLayerKey[]).forEach((layer) => {
        if (!visibleGisLayers[layer]) return;
        const data = gisLayers[layer];
        if (!data || data.features.length === 0) return;
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- GisFeatureCollection is structurally compatible with GeoJSON.FeatureCollection
          const layerBounds = L.geoJSON(data as any).getBounds();
          if (layerBounds.isValid()) b.extend(layerBounds);
        } catch {
          // geometri tidak valid - lewati, jangan sampai menggagalkan auto-zoom keseluruhan
        }
      });
    }
    return b;
  }, [visiblePoints, gisLayers, visibleGisLayers]);

  // Tunggu semua layer GIS yang sedang ditampilkan selesai dimuat sebelum auto-zoom, supaya bounds
  // final sudah menghitung area layer tersebut (bukan cuma titik marker yang datang duluan).
  const layersStillLoading = loadingGisLayers ? Object.values(loadingGisLayers).some(Boolean) : false;
  const readyToFit = bounds.isValid() && !layersStillLoading;

  useEffect(() => {
    if (lastFitKey.current === fitKey) return;
    lastFitKey.current = fitKey;
    const map = mapRef.current;
    if (!map || visiblePoints.length === 0) return;
    const b = L.latLngBounds(visiblePoints.map((p) => [p.lat, p.lng] as [number, number]));
    map.flyToBounds(b, { padding: [32, 32], maxZoom: 16, duration: 0.8 });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- hanya bereaksi pada pergantian fitKey
  }, [fitKey]);

  return (
    <div className="relative isolate h-full w-full">
      <MapLayerControl
        visibleLayers={visibleGisLayers}
        loadingLayers={loadingGisLayers}
        onToggleLayer={onToggleGisLayer}
        onResetView={() => {
          const map = mapRef.current;
          if (!map) return;
          if (bounds.isValid()) {
            map.flyToBounds(bounds, { padding: [32, 32], maxZoom: 16, duration: 1 });
          } else {
            map.flyTo(DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM, { duration: 1 });
          }
        }}
        baseLayer={baseLayer}
        onBaseLayerChange={setBaseLayer}
      />
      <div className="h-full w-full overflow-hidden">
        <MapContainer center={DEFAULT_MAP_CENTER} zoom={DEFAULT_MAP_ZOOM} className="w-full h-full">
          <TileLayer
            key={baseLayer}
            attribution={baseLayerConfig.attribution}
            url={baseLayerConfig.url}
            maxZoom={baseLayerConfig.maxZoom}
          />
          <GisLayers gisLayers={gisLayers} visibleLayers={visibleGisLayers} />
          {!fitted && <FitBoundsController bounds={bounds} ready={readyToFit} onDone={() => setFitted(true)} />}
          {visiblePoints.map((point) => (
            <Marker key={point.id} position={[point.lat, point.lng]} icon={icons.get(geoFilterKey(point))}>
              <MarkerPopup point={point} />
            </Marker>
          ))}
          <MapInstanceCapture mapRef={mapRef} />
        </MapContainer>
      </div>
    </div>
  );
}
