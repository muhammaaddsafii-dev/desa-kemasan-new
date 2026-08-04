"use client";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

import { createCategoryIcon, GisLayers, MapInstanceCapture, MapLayerControl } from "@/components/gis-map-layers";
import {
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
  GEO_CATEGORY_CONFIG,
  type GeoMapCategory,
  type GeoMapPoint,
} from "@/lib/constants/map";
import type { GisFeatureCollection, GisLayerKey } from "@/lib/types/gis";

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
  visibleCategories: Set<GeoMapCategory>;
  gisLayers?: Partial<Record<GisLayerKey, GisFeatureCollection>>;
  visibleGisLayers?: Record<GisLayerKey, boolean>;
  loadingGisLayers?: Partial<Record<GisLayerKey, boolean>>;
  onToggleGisLayer?: (layer: GisLayerKey) => void;
}

export default function GeospasialMapInner({
  points,
  visibleCategories,
  gisLayers = {},
  visibleGisLayers,
  loadingGisLayers,
  onToggleGisLayer,
}: GeospasialMapInnerProps) {
  const icons = useMemo(() => {
    const entries = (Object.keys(GEO_CATEGORY_CONFIG) as GeoMapCategory[]).map(
      (category) => [category, createCategoryIcon(category)] as const,
    );
    return Object.fromEntries(entries) as Record<GeoMapCategory, L.DivIcon>;
  }, []);

  const visiblePoints = points.filter((p) => visibleCategories.has(p.category));
  const categories = Object.keys(GEO_CATEGORY_CONFIG) as GeoMapCategory[];
  const mapRef = useRef<L.Map | null>(null);
  const [fitted, setFitted] = useState(false);

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

  return (
    <div className="relative isolate h-full w-full overflow-hidden">
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
      />
      <MapContainer center={DEFAULT_MAP_CENTER} zoom={DEFAULT_MAP_ZOOM} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GisLayers gisLayers={gisLayers} visibleLayers={visibleGisLayers} />
        {!fitted && <FitBoundsController bounds={bounds} ready={readyToFit} onDone={() => setFitted(true)} />}
        {categories.map((category) => {
          if (!visibleCategories.has(category)) return null;
          const categoryPoints = points.filter((p) => p.category === category);
          if (categoryPoints.length === 0) return null;
          return (
            <MarkerClusterGroup key={category} chunkedLoading removeOutsideVisibleBounds={false}>
              {categoryPoints.map((point) => (
                <Marker key={point.id} position={[point.lat, point.lng]} icon={icons[category]}>
                  <Popup>
                    <div className="text-sm">
                      <p className="font-semibold text-foreground">{point.title}</p>
                      {point.subtitle && <p className="text-muted-foreground">{point.subtitle}</p>}
                      <p className="text-xs text-muted-foreground mt-1">
                        {GEO_CATEGORY_CONFIG[category].label}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          );
        })}
        <MapInstanceCapture mapRef={mapRef} />
      </MapContainer>
    </div>
  );
}
