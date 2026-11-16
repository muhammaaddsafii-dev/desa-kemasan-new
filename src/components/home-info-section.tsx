import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  Megaphone,
  Paperclip,
  Sparkles,
} from "lucide-react";

import { excerpt, statusKegiatan } from "@/components/info-status";
import { SafeImage } from "@/components/safe-image";
import {
  formatBulanSingkat,
  formatHariTanggal,
  formatTanggalHari,
  formatTanggalPanjang,
  selisihHari,
} from "@/lib/format";
import type { Kegiatan, Pengumuman } from "@/lib/types/informasi";

interface HomeInfoSectionProps {
  pengumuman: Pengumuman[];
  kegiatan: Kegiatan[];
  /** Tanggal hari ini "YYYY-MM-DD". */
  today: string;
  /** True kalau tidak ada kegiatan mendatang dan yang ditampilkan adalah kegiatan terakhir. */
  kegiatanLampau: boolean;
}

/** Keterangan relatif untuk tanggal pengumuman: "Hari ini", "3 hari lalu", dst. */
function umurPengumuman(dateStr: string, today: string) {
  const d = selisihHari(today, dateStr);
  if (d <= 0) return "Hari ini";
  if (d === 1) return "Kemarin";
  if (d < 30) return `${d} hari lalu`;
  return null;
}

function SectionHeading({
  eyebrow,
  title,
  meta,
  href,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  meta: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</span>
        <h2 className="mt-2 text-3xl font-bold text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{meta}</p>
      </div>
      <Link
        href={href}
        className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline sm:inline-flex"
      >
        {linkLabel} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function PengumumanUtama({ item, today }: { item: Pengumuman; today: string }) {
  const foto = item.foto_pengumuman[0]?.file;
  const umur = umurPengumuman(item.date, today);
  return (
    <Link
      href={`/info/pengumuman/${item.id}`}
      className="card-village group block overflow-hidden border-2 border-blue-500 shadow-md"
    >
      {foto ? (
        <SafeImage
          src={foto}
          alt={item.judul}
          className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          fallbackClassName="h-44 bg-blue-50"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      ) : (
        <div className="relative flex h-24 items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800">
          <Megaphone className="h-12 w-12 text-white/25" />
        </div>
      )}
      <div className="bg-blue-50/60 p-5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
            <Sparkles className="h-3 w-3" />
            Terbaru
          </span>
          <span className="text-xs text-muted-foreground">
            {formatTanggalPanjang(item.date)}
            {umur && <> · {umur}</>}
          </span>
        </div>
        <h3 className="text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-blue-700">{item.judul}</h3>
        {excerpt(item.isi_pengumuman) && (
          <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{excerpt(item.isi_pengumuman)}</p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          {item.foto_pengumuman.length > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 font-medium text-muted-foreground ring-1 ring-border">
              <ImageIcon className="h-3 w-3" />
              {item.foto_pengumuman.length} foto
            </span>
          )}
          {item.dokumen_pengumuman.length > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 font-medium text-muted-foreground ring-1 ring-border">
              <Paperclip className="h-3 w-3" />
              {item.dokumen_pengumuman.length} lampiran
            </span>
          )}
          <span className="ml-auto inline-flex items-center gap-1 font-semibold text-blue-700">
            Baca selengkapnya <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function PengumumanRow({ item }: { item: Pengumuman }) {
  return (
    <Link
      href={`/info/pengumuman/${item.id}`}
      className="card-village group flex items-center gap-4 p-3.5"
    >
      <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-muted text-foreground">
        <span className="text-lg font-bold leading-none">{formatTanggalHari(item.date)}</span>
        <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{formatBulanSingkat(item.date)}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="truncate font-semibold text-foreground transition-colors group-hover:text-primary">{item.judul}</h4>
        <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
          {excerpt(item.isi_pengumuman, 90) || formatTanggalPanjang(item.date)}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2 text-muted-foreground">
        {item.dokumen_pengumuman.length > 0 && <FileText className="h-4 w-4" aria-label="Ada lampiran dokumen" />}
        <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

function KegiatanCard({ item, today, highlight }: { item: Kegiatan; today: string; highlight: boolean }) {
  const status = statusKegiatan(item.date, today);
  const selesai = selisihHari(item.date, today) < 0;
  const internal = item.category === "internal";
  return (
    <Link
      href={`/info/kegiatan/${item.slug}`}
      className={`card-village group flex items-stretch gap-4 overflow-hidden p-4 ${
        highlight ? "border-2 border-blue-500 bg-blue-50/60 shadow-md" : ""
      }`}
    >
      <div className={`flex w-16 shrink-0 flex-col items-center justify-center rounded-xl py-2 ${status.tile}`}>
        <span className="text-[10px] font-bold uppercase tracking-wide">{formatBulanSingkat(item.date)}</span>
        <span className="text-2xl font-extrabold leading-none">{formatTanggalHari(item.date)}</span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
          {highlight && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
              <Sparkles className="h-3 w-3" />
              Terbaru
            </span>
          )}
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${status.className}`}>
            {status.icon}
            {status.label}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              internal ? "bg-slate-100 text-slate-700" : "bg-violet-100 text-violet-700"
            }`}
          >
            {internal ? "Internal" : "Eksternal"}
          </span>
        </div>
        <h4 className={`font-semibold leading-snug text-foreground transition-colors group-hover:text-primary ${selesai ? "opacity-90" : ""}`}>
          {item.title}
        </h4>
        {excerpt(item.deskripsi, 110) && (
          <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{excerpt(item.deskripsi, 110)}</p>
        )}
        <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatHariTanggal(item.date)}
        </p>
      </div>

      {item.image_cover && (
        <SafeImage
          src={item.image_cover}
          alt={item.title}
          className="hidden h-auto w-24 shrink-0 self-stretch rounded-lg object-cover sm:block"
          fallbackClassName="hidden w-24 shrink-0 self-stretch rounded-lg bg-muted sm:block"
          sizes="96px"
        />
      )}
    </Link>
  );
}

/** Bagian beranda: Pengumuman Penting (kiri) dan Kegiatan Mendatang (kanan). */
export function HomeInfoSection({ pengumuman, kegiatan, today, kegiatanLampau }: HomeInfoSectionProps) {
  const [utama, ...lainnya] = pengumuman;
  const akanDatang = kegiatan.filter((k) => selisihHari(k.date, today) >= 0).length;

  return (
    <section className="section-padding">
      <div className="container-village">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Pengumuman */}
          <div>
            <SectionHeading
              eyebrow="Perhatian"
              title="Pengumuman Penting"
              meta={pengumuman.length > 0 ? `${pengumuman.length} pengumuman terbaru dari pemerintah desa` : "Belum ada pengumuman."}
              href="/info/pengumuman"
              linkLabel="Semua Pengumuman"
            />
            <div className="space-y-3">
              {utama && <PengumumanUtama item={utama} today={today} />}
              {lainnya.map((p) => (
                <PengumumanRow key={p.id} item={p} />
              ))}
              {pengumuman.length === 0 && (
                <p className="py-8 text-center text-sm text-muted-foreground">Belum ada pengumuman.</p>
              )}
            </div>
            <Link href="/info/pengumuman" className="mt-4 inline-flex items-center gap-1 font-semibold text-primary hover:underline sm:hidden">
              Semua Pengumuman <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Kegiatan */}
          <div>
            <SectionHeading
              eyebrow="Agenda"
              title="Kegiatan Mendatang"
              meta={
                kegiatan.length === 0
                  ? "Belum ada data kegiatan."
                  : kegiatanLampau
                    ? "Belum ada agenda baru - menampilkan kegiatan terakhir"
                    : `${akanDatang} kegiatan akan datang`
              }
              href="/info/kegiatan"
              linkLabel="Semua Kegiatan"
            />
            <div className="space-y-3">
              {kegiatan.map((k, index) => (
                <KegiatanCard key={k.id} item={k} today={today} highlight={index === 0} />
              ))}
              {kegiatan.length === 0 && (
                <p className="py-8 text-center text-sm text-muted-foreground">Belum ada data kegiatan.</p>
              )}
            </div>
            <Link href="/info/kegiatan" className="mt-4 inline-flex items-center gap-1 font-semibold text-primary hover:underline sm:hidden">
              Semua Kegiatan <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
