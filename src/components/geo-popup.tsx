"use client";

import { useState, type ReactNode } from "react";

import { Icon } from "@/components/icon";
import { PhotoLightbox } from "@/components/photo-slider";
import {
  GEO_CATEGORY_CONFIG,
  KONDISI_JALAN_CLASSES,
  kondisiJalanClass,
  type GeoMapPoint,
} from "@/lib/constants/map";

type Photo = { id: string; file: string };

/** Galeri foto popup: satu foto utama lebar + deretan thumbnail kecil; klik membuka lightbox. */
function PopupPhotos({ photos, alt }: { photos: Photo[]; alt: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  if (photos.length === 0) return null;

  const thumbs = photos.slice(1, 5);
  const hidden = photos.length - 1 - thumbs.length;

  return (
    <>
      <div>
        <button type="button" onClick={() => setLightbox(0)} className="relative block w-full overflow-hidden" title="Lihat foto">
          {/* eslint-disable-next-line @next/next/no-img-element -- presigned S3 URL, not a static/optimizable Next Image */}
          <img src={photos[0].file} alt={alt} className="aspect-[16/9] w-full object-cover" />
          <span className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/35 to-transparent" />
          {photos.length > 1 && (
            <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-0.5 text-[11px] font-medium text-white">
              <Icon name="photo_library" className="!text-[13px]" />
              {photos.length} foto
            </span>
          )}
        </button>
        {thumbs.length > 0 && (
          <div className="grid grid-cols-4 gap-1 p-1 pb-0">
            {thumbs.map((foto, i) => (
              <button
                key={foto.id}
                type="button"
                onClick={() => setLightbox(i + 1)}
                className="relative aspect-square overflow-hidden rounded-md"
                title="Lihat foto"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- presigned S3 URL, not a static/optimizable Next Image */}
                <img src={foto.file} alt={alt} className="h-full w-full object-cover" />
                {hidden > 0 && i === thumbs.length - 1 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-sm font-semibold text-white">
                    +{hidden}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      {lightbox !== null && (
        <PhotoLightbox photos={photos} alt={alt} index={lightbox} onClose={() => setLightbox(null)} onNavigate={setLightbox} />
      )}
    </>
  );
}

function InfoTile({ icon, label, children }: { icon: string; label: string; children: ReactNode }) {
  return (
    <div className="min-w-0 rounded-lg bg-muted/60 px-3 py-2">
      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        <Icon name={icon} className="!text-[13px]" />
        {label}
      </div>
      <div className="mt-0.5 truncate text-sm font-semibold text-foreground">{children}</div>
    </div>
  );
}

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-700">
      <Icon name="verified" filled className="!text-[13px]" />
      Terverifikasi
    </span>
  );
}

const CATEGORY_ICON = { penduduk: "home", fasum: "domain", jalan: "edit_road" } as const;

export function GeoPopupContent({ point }: { point: GeoMapPoint }) {
  const kondisi = point.category === "jalan" ? KONDISI_JALAN_CLASSES[kondisiJalanClass(point.kondisi)] : null;
  const accent = kondisi?.color ?? GEO_CATEGORY_CONFIG[point.category].color;
  const mapsUrl = `https://www.google.com/maps?q=${point.lat},${point.lng}`;

  let subtitle: string | null = null;
  if (point.category === "fasum") subtitle = point.jenis;
  if (point.category === "jalan") subtitle = `Jalan ${point.perkerasan}`;
  if (point.category === "penduduk" && (point.rt || point.rw)) subtitle = `RT ${point.rt ?? "-"} / RW ${point.rw ?? "-"}`;

  return (
    <div className="text-sm">
      <PopupPhotos photos={point.foto} alt={`Foto ${point.title}`} />

      <div className="p-3.5">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider" style={{ color: accent }}>
            <span
              className={`flex h-5 w-5 items-center justify-center text-white ${point.category === "jalan" ? "rounded-md" : "rounded-full"}`}
              style={{ background: accent }}
            >
              <Icon name={CATEGORY_ICON[point.category]} className="!text-[12px]" />
            </span>
            {GEO_CATEGORY_CONFIG[point.category].label}
          </span>
          {point.category !== "penduduk" && <VerifiedBadge />}
        </div>

        <div className="mt-2 text-base font-bold leading-snug text-foreground">{point.title}</div>
        {subtitle && <div className="mt-0.5 text-xs capitalize text-muted-foreground">{subtitle}</div>}

        <div className="mt-3 grid grid-cols-2 gap-2">
          {point.category === "penduduk" && (
            <>
              <InfoTile icon="location_on" label="RT">{point.rt ?? "-"}</InfoTile>
              <InfoTile icon="map" label="RW">{point.rw ?? "-"}</InfoTile>
            </>
          )}
          {point.category === "fasum" && (
            <>
              <InfoTile icon="category" label="Jenis">{point.jenis || "-"}</InfoTile>
              <InfoTile icon="pin_drop" label="Toponim">{point.toponim || "-"}</InfoTile>
            </>
          )}
          {point.category === "jalan" && kondisi && (
            <>
              <InfoTile icon="layers" label="Perkerasan"><span className="capitalize">{point.perkerasan}</span></InfoTile>
              <div className="min-w-0 rounded-lg px-3 py-2" style={{ background: `${kondisi.color}1f` }}>
                <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <Icon name="speed" className="!text-[13px]" />
                  Kondisi
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 truncate text-sm font-semibold capitalize" style={{ color: kondisi.color }}>
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: kondisi.color }} />
                  {point.kondisi}
                </div>
              </div>
            </>
          )}
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="geo-popup-link mt-3 flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors hover:bg-muted"
        >
          <Icon name="directions" className="!text-[16px]" />
          Buka di Google Maps
        </a>
      </div>
    </div>
  );
}
