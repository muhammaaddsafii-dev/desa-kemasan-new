"use client";

import { useMemo, useState } from "react";
import { FileSearch, Search } from "lucide-react";

import { StatusBadge, STATUS_META } from "@/components/layanan/status-badge";
import { formatTanggalDariTimestamp } from "@/lib/format";
import type { StatusPermohonan } from "@/lib/types/layanan";

export interface PapanRow {
  kode: string;
  judul: string;
  /** Keterangan kecil di bawah judul (mis. nama pemohon). */
  keterangan?: string;
  tanggal: string;
  status: StatusPermohonan;
}

const FILTERS: { key: "semua" | StatusPermohonan; label: string }[] = [
  { key: "semua", label: "Semua" },
  { key: "diajukan", label: "Diajukan" },
  { key: "diproses", label: "Diproses" },
  { key: "selesai", label: "Selesai" },
];

const PER_HALAMAN = 8;

/** Papan status publik: pencarian kode/judul, filter status, dan daftar yang bisa dimuat bertahap. */
export function PapanStatus({
  rows,
  judulKolom,
  kosong,
}: {
  rows: PapanRow[];
  /** Label untuk kolom judul, mis. "Jenis Surat" atau "Perihal". */
  judulKolom: string;
  kosong: string;
}) {
  const [filter, setFilter] = useState<"semua" | StatusPermohonan>("semua");
  const [kata, setKata] = useState("");
  const [tampil, setTampil] = useState(PER_HALAMAN);

  const counts = useMemo(() => {
    const c = { semua: rows.length, diajukan: 0, diproses: 0, selesai: 0 };
    rows.forEach((r) => {
      if (r.status in c) c[r.status] += 1;
    });
    return c;
  }, [rows]);

  const tersaring = useMemo(() => {
    const q = kata.trim().toLowerCase();
    return rows
      .filter((r) => (filter === "semua" ? true : r.status === filter))
      .filter((r) => (q ? `${r.kode} ${r.judul}`.toLowerCase().includes(q) : true));
  }, [rows, filter, kata]);

  const terlihat = tersaring.slice(0, tampil);

  return (
    <div className="card-village overflow-hidden">
      <div className="flex flex-col gap-4 border-b p-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label="Filter status" className="inline-flex flex-wrap gap-1 self-start rounded-xl bg-muted p-1">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={filter === f.key}
              onClick={() => {
                setFilter(f.key);
                setTampil(PER_HALAMAN);
              }}
              className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                filter === f.key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.key !== "semua" && <span className={`h-2 w-2 rounded-full ${STATUS_META[f.key].dot}`} />}
              {f.label}
              <span className="text-xs text-muted-foreground">{counts[f.key]}</span>
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={kata}
            onChange={(event) => {
              setKata(event.target.value);
              setTampil(PER_HALAMAN);
            }}
            placeholder={`Cari kode lacak atau ${judulKolom.toLowerCase()}...`}
            aria-label="Cari di papan status"
            className="w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 lg:w-72"
          />
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="p-10 text-center text-sm text-muted-foreground">{kosong}</p>
      ) : tersaring.length === 0 ? (
        <div className="flex flex-col items-center gap-2 p-12 text-center">
          <FileSearch className="h-10 w-10 text-muted-foreground/60" />
          <p className="font-semibold text-foreground">Tidak ada data yang cocok</p>
          <p className="text-sm text-muted-foreground">Coba ubah filter status atau kata pencarian.</p>
        </div>
      ) : (
        <>
          <ul className="divide-y">
            {terlihat.map((r) => {
              const meta = STATUS_META[r.status];
              return (
                <li key={r.kode} className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/40 md:px-5">
                  <span className={`hidden h-10 w-1 shrink-0 rounded-full sm:block ${meta?.dot ?? "bg-muted"}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
                      <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs font-semibold text-foreground">{r.kode}</span>
                      <span className="text-xs text-muted-foreground">{formatTanggalDariTimestamp(r.tanggal)}</span>
                    </div>
                    <p className="mt-1 truncate font-medium text-foreground">{r.judul}</p>
                    {r.keterangan && <p className="truncate text-xs text-muted-foreground">{r.keterangan}</p>}
                  </div>
                  <div className="shrink-0 text-right">
                    <StatusBadge status={r.status} />
                    <p className="mt-1 hidden text-[11px] text-muted-foreground md:block">{meta?.hint}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/30 px-5 py-3 text-xs text-muted-foreground">
            <span>
              Menampilkan {terlihat.length} dari {tersaring.length} data
            </span>
            {tersaring.length > tampil && (
              <button
                type="button"
                onClick={() => setTampil((n) => n + PER_HALAMAN)}
                className="rounded-lg border bg-background px-4 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Tampilkan lebih banyak
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
