import { ArrowUpRight, ChevronDown, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { STATUS_META } from "@/components/layanan/status-badge";
import type { StatusPermohonan } from "@/lib/types/layanan";

/** Header halaman layanan: judul, penjelasan, tombol aksi utama, dan poin keunggulan. */
export function LayananHero({
  breadcrumb,
  title,
  description,
  ctaLabel,
  ctaHref,
  poin,
}: {
  breadcrumb: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  poin: string[];
}) {
  return (
    <section className="gradient-primary py-16 text-primary-foreground md:py-20">
      <div className="container-village">
        <span className="text-sm font-medium opacity-80">{breadcrumb}</span>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl opacity-90">{description}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary-foreground px-5 py-2.5 text-sm font-semibold text-primary shadow-lg shadow-black/10 transition-opacity hover:opacity-90"
          >
            {ctaLabel}
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm opacity-90">
            {poin.map((p) => (
              <li key={p} className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground/80" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export interface Langkah {
  icon: LucideIcon;
  title: string;
  desc: string;
}

/** Alur layanan bernomor, tersambung dengan garis di layar lebar. */
export function LangkahLayanan({ judul, deskripsi, langkah }: { judul: string; deskripsi: string; langkah: Langkah[] }) {
  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-foreground">{judul}</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">{deskripsi}</p>
      </div>
      <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <span className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 lg:block" aria-hidden />
        {langkah.map((l, i) => (
          <li key={l.title} className="relative flex flex-col items-center text-center">
            <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <l.icon className="h-6 w-6" />
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-foreground text-xs font-bold text-background">
                {i + 1}
              </span>
            </span>
            <h3 className="mt-4 font-semibold text-foreground">{l.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{l.desc}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Ringkasan jumlah per status dengan bar proporsi. */
export function RingkasanStatus({ judul, status }: { judul: string; status: StatusPermohonan[] }) {
  const total = status.length;
  const hitung = (s: StatusPermohonan) => status.filter((x) => x === s).length;
  const selesai = hitung("selesai");
  const persenSelesai = total ? Math.round((selesai / total) * 100) : 0;

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="card-village flex flex-col justify-center p-6 lg:col-span-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{judul}</span>
        <div className="mt-1 flex items-end gap-3">
          <span className="text-5xl font-extrabold leading-none text-foreground">{total}</span>
          <span className="pb-1 text-sm text-muted-foreground">tercatat</span>
        </div>
        <div className="mt-4">
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="font-medium text-foreground">Tingkat penyelesaian</span>
            <span className="font-bold tabular-nums text-green-700">{persenSelesai}%</span>
          </div>
          <div className="flex h-2.5 overflow-hidden rounded-full bg-muted">
            {(["selesai", "diproses", "diajukan"] as StatusPermohonan[]).map((s) => (
              <div
                key={s}
                style={{ width: `${total ? (hitung(s) / total) * 100 : 0}%`, background: STATUS_META[s].bar }}
                title={`${STATUS_META[s].label}: ${hitung(s)}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3 lg:col-span-3">
        {(["diajukan", "diproses", "selesai"] as StatusPermohonan[]).map((s) => {
          const meta = STATUS_META[s];
          return (
            <div key={s} className="card-village p-5">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${meta.badge}`}>
                <meta.icon className="h-3 w-3" />
                {meta.label}
              </span>
              <div className="mt-3 text-3xl font-bold tabular-nums text-foreground">{hitung(s)}</div>
              <p className="mt-1 text-xs text-muted-foreground">{meta.hint}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Pertanyaan umum berbentuk akordeon (<details>, tanpa JS). */
export function PertanyaanUmum({ judul, items }: { judul: string; items: { q: string; a: ReactNode }[] }) {
  return (
    <div>
      <h2 className="mb-5 text-2xl font-bold text-foreground">{judul}</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <details key={item.q} className="card-village group p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground">
              {item.q}
              <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</div>
          </details>
        ))}
      </div>
    </div>
  );
}

/** Ajakan di bagian bawah halaman. */
export function CtaLayanan({ judul, deskripsi, label, href }: { judul: string; deskripsi: string; label: string; href: string }) {
  return (
    <div className="gradient-primary rounded-2xl p-8 text-center text-primary-foreground md:p-12">
      <h2 className="text-2xl font-bold md:text-3xl">{judul}</h2>
      <p className="mx-auto mt-3 max-w-xl opacity-90">{deskripsi}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary shadow-lg shadow-black/10 transition-opacity hover:opacity-90"
      >
        {label}
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}
