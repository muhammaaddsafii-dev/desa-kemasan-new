"use client";

import { useState } from "react";
import { Download, ExternalLink, FileText, Loader2 } from "lucide-react";

import { formatTanggalDariTimestamp } from "@/lib/format";
import type { Panduan } from "@/lib/types/layanan";

/** Daftar dokumen panduan (PDF) di kiri, pratinjau PDF di kanan. Pratinjau memakai rute yang selalu mengembalikan URL segar. */
export function PanduanViewer({ items }: { items: Panduan[] }) {
  const [aktif, setAktif] = useState(items[0]?.slug ?? "");
  const [memuat, setMemuat] = useState(true);

  const dokumen = items.find((p) => p.slug === aktif) ?? items[0];
  if (!dokumen) return null;

  const src = `/layanan/panduan/${encodeURIComponent(dokumen.slug)}/pdf`;

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Daftar dokumen */}
      <div className="lg:col-span-2">
        <ul className="space-y-3 lg:max-h-[640px] lg:overflow-y-auto lg:pr-1">
          {items.map((p) => {
            const dipilih = p.slug === dokumen.slug;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => {
                    if (!dipilih) setMemuat(true);
                    setAktif(p.slug);
                  }}
                  aria-pressed={dipilih}
                  className={`card-village flex w-full items-center gap-4 p-4 text-left transition-all ${
                    dipilih ? "border-2 border-primary bg-primary/5 shadow-md" : ""
                  }`}
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                      dipilih ? "bg-primary text-primary-foreground" : "bg-red-100 text-red-700"
                    }`}
                  >
                    <FileText className="h-6 w-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-foreground">{p.title}</span>
                    <span className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="rounded bg-muted px-1.5 py-0.5 font-bold uppercase tracking-wide">PDF</span>
                      Diperbarui {formatTanggalDariTimestamp(p.updated_at)}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Pratinjau */}
      <div className="card-village flex flex-col overflow-hidden lg:col-span-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-foreground">{dokumen.title}</h3>
            <p className="text-xs text-muted-foreground">Pratinjau dokumen PDF</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border bg-background px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <ExternalLink className="h-4 w-4" />
              Buka
            </a>
            <a
              href={src}
              download
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Download className="h-4 w-4" />
              Unduh
            </a>
          </div>
        </div>

        <div className="relative h-[480px] bg-muted/40 md:h-[600px]">
          {memuat && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-muted/60 text-sm text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
              Memuat dokumen...
            </div>
          )}
          <iframe
            key={dokumen.slug}
            src={src}
            title={`Pratinjau ${dokumen.title}`}
            className="h-full w-full border-0"
            onLoad={() => setMemuat(false)}
          />
        </div>
        <p className="border-t bg-muted/30 px-4 py-2.5 text-xs text-muted-foreground">
          Pratinjau tidak tampil? Gunakan tombol <span className="font-semibold text-foreground">Buka</span> untuk membuka dokumen di tab baru.
        </p>
      </div>
    </div>
  );
}
