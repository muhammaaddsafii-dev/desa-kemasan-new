"use client";

import { useState } from "react";

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
}

export function SafeImage({ src, alt, className, width, height, fallbackClassName, fallbackSrc }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    if (fallbackSrc) {
      return <img src={fallbackSrc} alt={alt} className={className} width={width} height={height} />;
    }
    return <div className={fallbackClassName ?? className} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={() => setFailed(true)}
    />
  );
}
