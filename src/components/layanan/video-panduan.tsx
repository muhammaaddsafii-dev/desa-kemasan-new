"use client";

import { useMemo, useState } from "react";
import { Play, Youtube } from "lucide-react";

import { youtubeEmbedUrl, youtubeId, youtubeThumbnail } from "@/lib/youtube";

export interface VideoItem {
  url: string;
  title: string;
  desc?: string;
}

/** Pemutar video YouTube: satu video utama + daftar video lain. Iframe baru dimuat setelah tombol putar ditekan. */
export function VideoPanduan({ videos }: { videos: VideoItem[] }) {
  const daftar = useMemo(
    () =>
      videos
        .map((v) => ({ ...v, id: youtubeId(v.url) }))
        .filter((v): v is VideoItem & { id: string } => v.id !== null),
    [videos],
  );
  const [index, setIndex] = useState(0);
  const [diputar, setDiputar] = useState(false);

  if (daftar.length === 0) return null;
  const video = daftar[index] ?? daftar[0];

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Pemutar */}
      <div className="lg:col-span-3">
        <div className="card-village overflow-hidden">
          <div className="relative aspect-video bg-black">
            {diputar ? (
              <iframe
                key={video.id}
                src={youtubeEmbedUrl(video.id, true)}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : (
              <button
                type="button"
                onClick={() => setDiputar(true)}
                aria-label={`Putar video: ${video.title}`}
                className="group absolute inset-0 block h-full w-full"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- thumbnail eksternal YouTube */}
                <img src={youtubeThumbnail(video.id)} alt="" className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 text-white shadow-xl transition-transform group-hover:scale-110">
                  <Play className="ml-1 h-7 w-7 fill-current" />
                </span>
              </button>
            )}
          </div>
          <div className="p-5">
            <h3 className="text-lg font-bold text-foreground">{video.title}</h3>
            {video.desc && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{video.desc}</p>}
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:underline"
            >
              <Youtube className="h-4 w-4" />
              Tonton di YouTube
            </a>
          </div>
        </div>
      </div>

      {/* Daftar video */}
      <div className="lg:col-span-2">
        <p className="mb-3 text-sm font-semibold text-foreground">
          Daftar Video <span className="font-normal text-muted-foreground">({daftar.length})</span>
        </p>
        <ul className="space-y-3 lg:max-h-[520px] lg:overflow-y-auto lg:pr-1">
          {daftar.map((v, i) => {
            const dipilih = i === index;
            return (
              <li key={v.id}>
                <button
                  type="button"
                  onClick={() => {
                    setIndex(i);
                    setDiputar(false);
                  }}
                  aria-pressed={dipilih}
                  className={`card-village flex w-full items-center gap-3 p-3 text-left ${dipilih ? "border-2 border-red-500 bg-red-50/60 shadow-md" : ""}`}
                >
                  <span className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-lg bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element -- thumbnail eksternal YouTube */}
                    <img src={youtubeThumbnail(v.id)} alt="" className="h-full w-full object-cover" loading="lazy" />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                      <Play className="h-5 w-5 fill-white text-white" />
                    </span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">{v.title}</span>
                    {v.desc && <span className="mt-1 line-clamp-2 text-xs text-muted-foreground">{v.desc}</span>}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
