"use client";

import { useState } from "react";
import Image from "next/image";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  /** Kelas untuk placeholder yang ditampilkan kalau gambar gagal dimuat (mis. presigned URL kedaluwarsa/objek belum ada). Default: sama seperti `className`. */
  fallbackClassName?: string;
  /** Kalau diisi, saat `src` gagal dimuat gambar diganti ke sumber ini alih-alih disembunyikan. */
  fallbackSrc?: string;
  /**
   * Perkiraan lebar gambar terhadap viewport (mis. "(min-width: 768px) 33vw, 100vw"), diteruskan ke
   * next/image supaya ukuran file yang diunduh & dioptimasi sesuai ukuran tampil sebenarnya — bukan
   * ukuran asli. Hanya dipakai saat `width`/`height` tidak diisi (mode fill). Default: "100vw".
   */
  sizes?: string;
}

/**
 * Kalau `width`/`height` diisi, gambar dirender pada ukuran intrinsik itu (CSS lewat `className`
 * boleh menimpa ukuran tampil). Kalau tidak, gambar mengisi penuh kontainer relatif (mode `fill`)
 * mengikuti ukuran yang sudah ditentukan `className` pada kontainernya (mis. `h-48 w-full`).
 */
export function SafeImage({ src, alt, className, width, height, fallbackClassName, fallbackSrc, sizes }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    if (fallbackSrc) {
      if (width && height) {
        return <Image src={fallbackSrc} alt={alt} className={className} width={width} height={height} />;
      }
      return (
        <span className={`relative block overflow-hidden ${className ?? ""}`}>
          <Image src={fallbackSrc} alt={alt} fill sizes={sizes ?? "100vw"} className="object-cover" />
        </span>
      );
    }
    return <div className={fallbackClassName ?? className} />;
  }

  if (width && height) {
    return (
      <Image
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span className={`relative block overflow-hidden ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        className="object-cover"
        onError={() => setFailed(true)}
      />
    </span>
  );
}
