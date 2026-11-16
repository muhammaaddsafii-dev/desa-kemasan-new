"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, FileSearch, ImageIcon, Megaphone, Paperclip, Search, Sparkles } from "lucide-react";

import { excerpt } from "@/components/info-status";
import { SafeImage } from "@/components/safe-image";
import {
  formatBulanSingkat,
  formatBulanTahun,
  formatTanggalHari,
  formatTanggalPanjang,
  selisihHari,
} from "@/lib/format";
import type { Pengumuman } from "@/lib/types/informasi";

const HALAMAN = 8;

function umur(dateStr: string, today: string) {
  const d = selisihHari(today, dateStr);
  if (d <= 0) return "Hari ini";
  if (d === 1) return "Kemarin";
  if (d < 30) return `${d} hari lalu`;
  return null;
}

function Lampiran({ item }: { item: Pengumuman }) {
  const foto = item.foto_pengumuman.length;
  const dok = item.dokumen_pengumuman.length;
  if (foto === 0 && dok === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
      {foto > 0 && (
        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 font-medium">
          <ImageIcon className="h-3 w-3" />
          {foto} foto
        </span>
      )}
      {dok > 0 && (
        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 font-medium">
          <Paperclip className="h-3 w-3" />
          {dok} lampiran
        </span>
      )}
    </div>
  );
}

function PengumumanUtama({ item, today }: { item: Pengumuman; today: string }) {
  const foto = item.foto_pengumuman[0]?.file;
  const keterangan = umur(item.date, today);
  return (
    <Link
      href={`/info/pengumuman/${item.id}`}
      className="card-village group grid overflow-hidden border-2 border-blue-500 shadow-md md:grid-cols-5"
    >
      <div className="relative min-h-48 md:col-span-2">
        {foto ? (
          <SafeImage
            src={foto}
            alt={item.judul}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            fallbackClassName="absolute inset-0 bg-blue-50"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800">
            <Megaphone className="h-16 w-16 text-white/25" />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center bg-blue-50/60 p-6 md:col-span-3 md:p-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-semibold text-white">
            <Sparkles className="h-3 w-3" />
            Pengumuman terbaru
          </span>
          <span className="text-xs text-muted-foreground">
            {formatTanggalPanjang(item.date)}
            {keterangan && <> · {keterangan}</>}
          </span>
        </div>
        <h2 className="text-2xl font-bold leading-snug text-foreground transition-colors group-hover:text-blue-700">{item.judul}</h2>
        {excerpt(item.isi_pengumuman, 220) && (
          <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{excerpt(item.isi_pengumuman, 220)}</p>
        )}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <Lampiran item={item} />
          <span className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
            Baca selengkapnya <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function PengumumanKartu({ item, today }: { item: Pengumuman; today: string }) {
  const baru = selisihHari(today, item.date) <= 7;
  const foto = item.foto_pengumuman[0]?.file;
  return (
    <Link href={`/info/pengumuman/${item.id}`} className="card-village group flex gap-4 p-4 md:p-5">
      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-muted text-foreground">
        <span className="text-xl font-extrabold leading-none">{formatTanggalHari(item.date)}</span>
        <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{formatBulanSingkat(item.date)}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          {baru && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-2 py-0.5 text-[11px] font-semibold text-white">
              <Sparkles className="h-3 w-3" />
              Baru
            </span>
          )}
          <span className="text-xs text-muted-foreground">{formatTanggalPanjang(item.date)}</span>
        </div>
        <h3 className="font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">{item.judul}</h3>
        {excerpt(item.isi_pengumuman, 130) && (
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{excerpt(item.isi_pengumuman, 130)}</p>
        )}
        <div className="mt-3 flex items-center justify-between gap-2">
          <Lampiran item={item} />
          <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
      </div>
      {foto && (
        <SafeImage
          src={foto}
          alt={item.judul}
          className="hidden h-24 w-24 shrink-0 rounded-lg object-cover sm:block"
          fallbackClassName="hidden"
          sizes="96px"
        />
      )}
    </Link>
  );
}

export function PengumumanList({ items, today }: { items: Pengumuman[]; today: string }) {
  const [kata, setKata] = useState("");
  const [tahun, setTahun] = useState<string>("semua");
  const [tampil, setTampil] = useState(HALAMAN);

  const daftarTahun = useMemo(() => [...new Set(items.map((p) => p.date.slice(0, 4)))].sort().reverse(), [items]);
  const denganLampiran = items.filter((p) => p.foto_pengumuman.length > 0 || p.dokumen_pengumuman.length > 0).length;
  const terbaru = items[0];

  const tersaring = useMemo(() => {
    const q = kata.trim().toLowerCase();
    return items
      .filter((p) => (tahun === "semua" ? true : p.date.startsWith(tahun)))
      .filter((p) => (q ? `${p.judul} ${excerpt(p.isi_pengumuman, 2000)}`.toLowerCase().includes(q) : true))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [items, kata, tahun]);

  const tanpaFilter = !kata.trim() && tahun === "semua";
  const utama = tanpaFilter ? tersaring[0] : undefined;
  const sisa = utama ? tersaring.slice(1) : tersaring;
  const terlihat = sisa.slice(0, tampil);

  const grup = useMemo(() => {
    const map = new Map<string, Pengumuman[]>();
    for (const p of terlihat) {
      const key = formatBulanTahun(p.date);
      map.set(key, [...(map.get(key) ?? []), p]);
    }
    return [...map.entries()];
  }, [terlihat]);

  return (
    <div className="space-y-8">
      {/* Ringkasan */}
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Total Pengumuman", value: String(items.length), tone: "bg-blue-100 text-blue-700", icon: Megaphone },
          {
            label: "Pengumuman Terbaru",
            value: terbaru ? (umur(terbaru.date, today) ?? formatTanggalPanjang(terbaru.date)) : "-",
            tone: "bg-amber-100 text-amber-700",
            icon: Sparkles,
          },
          { label: "Dengan Foto / Lampiran", value: String(denganLampiran), tone: "bg-green-100 text-green-700", icon: Paperclip },
        ].map((s) => (
          <div key={s.label} className="card-village flex items-center gap-3 p-4">
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${s.tone}`}>
              <s.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <span className="block truncate text-lg font-bold leading-tight text-foreground">{s.value}</span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {utama && <PengumumanUtama item={utama} today={today} />}

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Menampilkan <span className="font-semibold text-foreground">{tersaring.length}</span> dari {items.length} pengumuman
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {daftarTahun.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {["semua", ...daftarTahun].map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={tahun === t}
                  onClick={() => {
                    setTahun(t);
                    setTampil(HALAMAN);
                  }}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    tahun === t
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {t === "semua" ? "Semua tahun" : t}
                </button>
              ))}
            </div>
          )}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={kata}
              onChange={(event) => {
                setKata(event.target.value);
                setTampil(HALAMAN);
              }}
              placeholder="Cari pengumuman..."
              aria-label="Cari pengumuman"
              className="w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-60"
            />
          </div>
        </div>
      </div>

      {/* Daftar */}
      {items.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">Belum ada pengumuman.</p>
      ) : tersaring.length === 0 ? (
        <div className="card-village flex flex-col items-center gap-2 py-14 text-center">
          <FileSearch className="h-10 w-10 text-muted-foreground/60" />
          <p className="font-semibold text-foreground">Tidak ada pengumuman yang cocok</p>
          <p className="text-sm text-muted-foreground">Coba kata kunci atau tahun lain.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {grup.map(([bulan, daftarBulan]) => (
            <section key={bulan}>
              <div className="mb-4 flex items-center gap-3">
                <h2 className="text-lg font-bold capitalize text-foreground">{bulan}</h2>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{daftarBulan.length} pengumuman</span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                {daftarBulan.map((p) => (
                  <PengumumanKartu key={p.id} item={p} today={today} />
                ))}
              </div>
            </section>
          ))}
          {sisa.length > tampil && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => setTampil((n) => n + HALAMAN)}
                className="rounded-lg border bg-background px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Tampilkan lebih banyak ({sisa.length - tampil} lagi)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
