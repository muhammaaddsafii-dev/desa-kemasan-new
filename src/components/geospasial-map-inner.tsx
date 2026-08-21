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
import { PhotoSlider } from "@/components/photo-slider";
import { PopupDataTable } from "@/components/popup-data-table";
import {
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
  GEO_CATEGORY_CONFIG,
  type GeoMapCategory,
  type GeoMapPoint,
} from "@/lib/constants/map";
import type { GisFeatureCollection, GisLayerKey } from "@/lib/types/gis";

function StatusBadge({ status }: { status: "pending" | "approved" | "rejected" }) {
  const labels = { pending: "Menunggu", approved: "Disetujui", rejected: "Ditolak" };
  const classes = {
    pending: "bg-amber-100 text-amber-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${classes[status]}`}>
      {labels[status]}
    </span>
  );
}

function PopupContent({ point }: { point: GeoMapPoint }) {
  if (point.category === "penduduk") {
    return (
      <>
        <PopupDataTable
          rows={[
            { label: "Nama", value: point.title },
            { label: "RT", value: point.rt ?? "-" },
            { label: "RW", value: point.rw ?? "-" },
          ]}
        />
        {point.foto.length > 0 && (
          <>
            <h3 className="mb-2 mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Foto</h3>
            <PhotoSlider photos={point.foto} alt={`Foto ${point.title}`} />
          </>
        )}
      </>
    );
  }

  if (point.category === "fasum") {
    return (
      <>
        <PopupDataTable
          rows={[
            { label: "Nama Fasilitas", value: point.title },
            { label: "Jenis", value: point.jenis },
            { label: "Toponim", value: point.toponim || "-" },
            { label: "Status", value: <StatusBadge status={point.status} /> },
          ]}
        />
        {point.foto.length > 0 && (
          <>
            <h3 className="mb-2 mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Foto</h3>
            <PhotoSlider photos={point.foto} alt={`Foto ${point.title}`} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <PopupDataTable
        rows={[
          { label: "Nama Ruas Jalan", value: point.title },
          { label: "Perkerasan", value: <span className="capitalize">{point.perkerasan}</span> },
          { label: "Kondisi", value: <span className="capitalize">{point.kondisi}</span> },
          { label: "Status", value: <StatusBadge status={point.status} /> },
        ]}
      />
      {point.foto.length > 0 && (
        <>
          <h3 className="mb-2 mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Foto</h3>
          <PhotoSlider photos={point.foto} alt={`Foto ${point.title}`} />
        </>
      )}
    </>
  );
}

/** Popup content mounts (dan baru me-render foto-nya) hanya saat marker ini benar-benar dibuka,
 * bukan otomatis untuk semua marker sekaligus - penting karena titik di peta publik bisa banyak. */
function MarkerPopup({ point }: { point: GeoMapPoint }) {
  const [opened, setOpened] = useState(false);
  return (
    <Popup maxHeight={260} eventHandlers={{ add: () => setOpened(true), remove: () => setOpened(false) }}>
      <div className="min-w-[14rem] text-sm">{opened && <PopupContent point={point} />}</div>
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
          {categories.flatMap((category) => {
            if (!visibleCategories.has(category)) return [];
            return points
              .filter((p) => p.category === category)
              .map((point) => (
                <Marker key={point.id} position={[point.lat, point.lng]} icon={icons[category]}>
                  <MarkerPopup point={point} />
                </Marker>
              ));
          })}
          <MapInstanceCapture mapRef={mapRef} />
        </MapContainer>
      </div>
    </div>
  );
}
