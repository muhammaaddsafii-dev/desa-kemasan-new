"use client";

import { useState } from "react";
import { SafeImage } from "@/components/safe-image";
import { PhotoLightbox } from "@/components/photo-slider";

type Photo = { id: string; file: string };

type DetailPhotoGalleryProps = {
  cover?: string | null;
  coverAlt: string;
  coverClassName?: string;
  coverSizes?: string;
  photos: Photo[];
  photosAlt: string;
  photoClassName?: string;
  photoSizes?: string;
  galleryTitle?: string;
  galleryClassName?: string;
};

/** Renders an optional cover image plus a photo gallery grid; clicking any photo opens a fullscreen, navigable lightbox. */
export function DetailPhotoGallery({
  cover,
  coverAlt,
  coverClassName = "w-full h-64 md:h-96 object-cover rounded-xl mb-8",
  coverSizes = "(min-width: 1024px) 896px, 100vw",
  photos,
  photosAlt,
  photoClassName = "w-full h-40 object-cover rounded-lg card-village",
  photoSizes = "(min-width: 768px) 33vw, 50vw",
  galleryTitle = "Galeri Foto",
  galleryClassName,
}: DetailPhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const allPhotos: Photo[] = [...(cover ? [{ id: "__cover__", file: cover }] : []), ...photos];
  const coverOffset = cover ? 1 : 0;

  return (
    <>
      {cover && (
        <button
          type="button"
          onClick={() => setLightboxIndex(0)}
          className="block w-full cursor-zoom-in text-left"
          title="Lihat foto"
        >
          <SafeImage src={cover} alt={coverAlt} className={coverClassName} fallbackClassName="hidden" sizes={coverSizes} />
        </button>
      )}

      {photos.length > 0 && (
        <div className={galleryClassName ?? (cover ? "mt-10" : "mt-2")}>
          <h2 className="text-lg font-semibold text-foreground mb-4">{galleryTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((foto, index) => (
              <button
                key={foto.id}
                type="button"
                onClick={() => setLightboxIndex(coverOffset + index)}
                className="block cursor-zoom-in text-left"
                title="Lihat foto"
              >
                <SafeImage
                  src={foto.file}
                  alt={photosAlt}
                  className={photoClassName}
                  fallbackClassName="hidden"
                  sizes={photoSizes}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {lightboxIndex !== null && allPhotos.length > 0 && (
        <PhotoLightbox
          photos={allPhotos}
          alt={coverAlt}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
