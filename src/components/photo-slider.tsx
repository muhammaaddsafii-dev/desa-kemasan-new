"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/icon";

type Photo = { id: string; file: string };

export function PhotoSlider({ photos, alt }: { photos: Photo[]; alt: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (photos.length === 0) return null;

  return (
    <>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {photos.map((foto, index) => (
          <button
            key={foto.id}
            type="button"
            onClick={() => setLightboxIndex(index)}
            className="shrink-0 overflow-hidden rounded-lg border"
            title="Lihat foto"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- presigned S3 URL, not a static/optimizable Next Image */}
            <img src={foto.file} alt={alt} className="h-24 w-24 object-cover sm:h-28 sm:w-28" />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={photos}
          alt={alt}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}

function PhotoLightbox({
  photos,
  alt,
  index,
  onClose,
  onNavigate,
}: {
  photos: Photo[];
  alt: string;
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNavigate((index + 1) % photos.length);
      if (event.key === "ArrowLeft") onNavigate((index - 1 + photos.length) % photos.length);
    };
    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [index, photos.length, onClose, onNavigate]);

  return createPortal(
    <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/85 p-4" onClick={onClose}>
      <button
        type="button"
        onClick={onClose}
        title="Tutup"
        className="absolute right-4 top-4 rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
      >
        <Icon name="close" className="text-2xl" />
      </button>

      {photos.length > 1 && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onNavigate((index - 1 + photos.length) % photos.length);
          }}
          title="Sebelumnya"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:left-4"
        >
          <Icon name="chevron_left" className="text-3xl" />
        </button>
      )}

      {/* eslint-disable-next-line @next/next/no-img-element -- presigned S3 URL, not a static/optimizable Next Image */}
      <img
        src={photos[index].file}
        alt={alt}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[85vh] max-w-full rounded-lg object-contain"
      />

      {photos.length > 1 && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onNavigate((index + 1) % photos.length);
          }}
          title="Berikutnya"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:right-4"
        >
          <Icon name="chevron_right" className="text-3xl" />
        </button>
      )}

      {photos.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
          {index + 1} / {photos.length}
        </div>
      )}
    </div>,
    document.body,
  );
}
