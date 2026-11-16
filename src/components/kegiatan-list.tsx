"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, CalendarX2, Search, Sparkles } from "lucide-react";

import { excerpt, statusKegiatan } from "@/components/info-status";
import { SafeImage } from "@/components/safe-image";
import {
  formatBulanSingkat,
  formatBulanTahun,
  formatHariTanggal,
  formatTanggalHari,
  selisihHari,
} from "@/lib/format";
import type { Kegiatan } from "@/lib/types/informasi";

type Tab = "semua" | "mendatang" | "selesai";
type Kategori = "semua" | "internal" | "eksternal";

const TABS: { key: Tab; label: string }[] = [
  { key: "semua", label: "Semua" },
  { key: "mendatang", label: "Mendatang" },
  { key: "selesai", label: "Selesai" },
];

const KATEGORI: { key: Kategori; label: string }[] = [
  { key: "semua", label: "Semua kategori" },
  { key: "internal", label: "Internal" },
  { key: "eksternal", label: "Eksternal" },
];

function gambar(k: Kegiatan) {
  return k.image_cover ?? k.foto_kegiatan[0]?.file ?? null;
}

function KategoriBadge({ kategori }: { kategori: Kegiatan["category"] }) {
  const internal = kategori === "internal";
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${internal ? "bg-slate-100 text-slate-700" : "bg-violet-100 text-violet-700"}`}
    >
      {internal ? "Internal" : "Eksternal"}
    </span>
  );
}

/** Kegiatan terdekat yang akan datang, ditampilkan besar di puncak daftar. */
function KegiatanUtama({ item, today }: { item: Kegiatan; today: string }) {
  const status = statusKegiatan(item.date, today);
  const foto = gambar(item);
  return (
    <Link
      href={`/info/kegiatan/${item.slug}`}
      className="card-village group grid overflow-hidden border-2 border-blue-500 shadow-md md:grid-cols-5"
    >
      <div className="relative min-h-52 md:col-span-2">
        {foto ? (
          <SafeImage
            src={foto}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            fallbackClassName="absolute inset-0 bg-blue-50"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800" />
        )}
        <div className="absolute left-4 top-4 flex w-16 flex-col items-center rounded-xl bg-white py-2 text-center shadow-lg">
          <span className="text-[10px] font-bold uppercase tracking-wide text-blue-700">{formatBulanSingkat(item.date)}</span>
          <span className="text-2xl font-extrabold leading-none text-foreground">{formatTanggalHari(item.date)}</span>
        </div>
      </div>
      <div className="flex flex-col justify-center bg-blue-50/60 p-6 md:col-span-3 md:p-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-semibold text-white">
            <Sparkles className="h-3 w-3" />
            Kegiatan berikutnya
          </span>
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${status.className}`}>
            {status.icon}
            {status.label}
          </span>
          <KategoriBadge kategori={item.category} />
        </div>
        <h2 className="text-2xl font-bold leading-snug text-foreground transition-colors group-hover:text-blue-700">{item.title}</h2>
        {excerpt(item.deskripsi, 200) && <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{excerpt(item.deskripsi, 200)}</p>}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            {formatHariTanggal(item.date)}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
            Lihat detail <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function KegiatanKartu({ item, today }: { item: Kegiatan; today: string }) {
  const status = statusKegiatan(item.date, today);
  const foto = gambar(item);
  return (
    <Link href={`/info/kegiatan/${item.slug}`} className="card-village group flex flex-col overflow-hidden">
      <div className="relative h-40 overflow-hidden">
        {foto ? (
          <SafeImage
            src={foto}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            fallbackClassName="h-40 bg-muted"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className={`flex h-full items-center justify-center ${status.tile}`}>
            <CalendarDays className="h-12 w-12 opacity-30" />
          </div>
        )}
        <div className="absolute left-3 top-3 flex w-14 flex-col items-center rounded-xl bg-white py-1.5 text-center shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{formatBulanSingkat(item.date)}</span>
          <span className="text-xl font-extrabold leading-none text-foreground">{formatTanggalHari(item.date)}</span>
        </div>
        <span className={`absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${status.className}`}>
          {status.icon}
          {status.label}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2">
          <KategoriBadge kategori={item.category} />
        </div>
        <h3 className="font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">{item.title}</h3>
        {excerpt(item.deskripsi, 120) && <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{excerpt(item.deskripsi, 120)}</p>}
        <p className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatHariTanggal(item.date)}
        </p>
      </div>
    </Link>
  );
}

export function KegiatanList({ items, today }: { items: Kegiatan[]; today: string }) {
  const [tab, setTab] = useState<Tab>("semua");
  const [kategori, setKategori] = useState<Kategori>("semua");
  const [kata, setKata] = useState("");

  const counts = useMemo(() => {
    const mendatang = items.filter((k) => selisihHari(k.date, today) >= 0).length;
    return { semua: items.length, mendatang, selesai: items.length - mendatang };
  }, [items, today]);

  const berikutnya = useMemo(
    () => [...items].filter((k) => k.date >= today).sort((a, b) => a.date.localeCompare(b.date))[0] ?? null,
    [items, today],
  );

  const tersaring = useMemo(() => {
    const q = kata.trim().toLowerCase();
    return items
      .filter((k) => (tab === "mendatang" ? k.date >= today : tab === "selesai" ? k.date < today : true))
      .filter((k) => (kategori === "semua" ? true : k.category === kategori))
      .filter((k) => (q ? `${k.title} ${k.deskripsi ?? ""}`.toLowerCase().includes(q) : true))
      // Mendatang: terdekat dulu. Selainnya: terbaru dulu.
      .sort((a, b) => (tab === "mendatang" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)));
  }, [items, tab, kategori, kata, today]);

  // Kegiatan unggulan hanya ditampilkan saat tidak ada filter, supaya tidak muncul dua kali.
  const tampilkanUtama = berikutnya && tab !== "selesai" && kategori === "semua" && !kata.trim();
  const daftar = tampilkanUtama ? tersaring.filter((k) => k.id !== berikutnya.id) : tersaring;

  const grup = useMemo(() => {
    const map = new Map<string, Kegiatan[]>();
    for (const k of daftar) {
      const key = formatBulanTahun(k.date);
      map.set(key, [...(map.get(key) ?? []), k]);
    }
    return [...map.entries()];
  }, [daftar]);

  return (
    <div className="space-y-8">
      {/* Ringkasan */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Kegiatan", value: counts.semua, tone: "bg-blue-100 text-blue-700" },
          { label: "Akan Datang", value: counts.mendatang, tone: "bg-amber-100 text-amber-700" },
          { label: "Sudah Selesai", value: counts.selesai, tone: "bg-green-100 text-green-700" },
        ].map((s) => (
          <div key={s.label} className="card-village flex items-center gap-3 p-4">
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl font-extrabold ${s.tone}`}>{s.value}</span>
            <span className="text-xs font-semibold uppercase leading-tight tracking-wide text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Kegiatan berikutnya */}
      {tampilkanUtama && <KegiatanUtama item={berikutnya} today={today} />}

      {/* Toolbar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label="Status kegiatan" className="inline-flex self-start rounded-xl bg-muted p-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                tab === t.key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
              <span className="text-xs text-muted-foreground">{counts[t.key]}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            {KATEGORI.map((k) => (
              <button
                key={k.key}
                type="button"
                onClick={() => setKategori(k.key)}
                aria-pressed={kategori === k.key}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  kategori === k.key
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {k.label}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={kata}
              onChange={(event) => setKata(event.target.value)}
              placeholder="Cari kegiatan..."
              aria-label="Cari kegiatan"
              className="w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-56"
            />
          </div>
        </div>
      </div>

      {/* Daftar per bulan */}
      {items.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">Belum ada kegiatan.</p>
      ) : grup.length === 0 && !tampilkanUtama ? (
        <div className="card-village flex flex-col items-center gap-2 py-14 text-center">
          <CalendarX2 className="h-10 w-10 text-muted-foreground/60" />
          <p className="font-semibold text-foreground">Tidak ada kegiatan yang cocok</p>
          <p className="text-sm text-muted-foreground">Coba ubah filter atau kata pencarian.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {grup.map(([bulan, daftarBulan]) => (
            <section key={bulan}>
              <div className="mb-4 flex items-center gap-3">
                <h2 className="text-lg font-bold capitalize text-foreground">{bulan}</h2>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{daftarBulan.length} kegiatan</span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {daftarBulan.map((k) => (
                  <KegiatanKartu key={k.id} item={k} today={today} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
