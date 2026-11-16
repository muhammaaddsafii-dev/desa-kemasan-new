import Link from "next/link";
import { ArrowRight, Compass, Eye, Quote, Target } from "lucide-react";

import { getAssetsCurrent } from "@/lib/data/profil";

// Jangan di-prerender statis saat build (API_URL belum ke backend produksi saat itu) - lihat
// catatan di src/app/data/geospasial/page.tsx.
export const dynamic = "force-dynamic";

/** Memecah teks misi menjadi butir-butir: satu butir per baris/paragraf, tanpa nomor/bullet di awal. */
function parseMisi(teks: string | undefined): string[] {
  if (!teks) return [];
  return teks
    .split(/\r?\n+/)
    .map((baris) => baris.replace(/^\s*(?:\d+[.)]|[-•*])\s*/, "").trim())
    .filter(Boolean);
}

export default async function VisiMisi() {
  const assets = await getAssetsCurrent();
  const nama = assets?.nama ?? "Desa";
  const visi = assets?.visi?.trim();
  const misi = parseMisi(assets?.misi?.trim());

  return (
    <>
      <section className="gradient-primary py-16 text-primary-foreground md:py-20">
        <div className="container-village">
          <span className="text-sm font-medium opacity-80">Profil &gt; Visi dan Misi</span>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">Visi dan Misi</h1>
          <p className="mt-3 max-w-2xl opacity-90">Arah dan tujuan pembangunan {nama}: ke mana kita melangkah dan bagaimana mewujudkannya.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-village max-w-5xl space-y-14">
          {/* Visi */}
          <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/10 via-background to-background p-8 shadow-sm md:p-14">
            <Quote className="absolute -left-2 -top-2 h-28 w-28 rotate-180 text-primary/10 md:h-40 md:w-40" aria-hidden />
            <div className="relative mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/20">
                <Eye className="h-4 w-4" />
                Visi
              </span>
              {visi ? (
                <p className="mt-6 text-2xl font-semibold leading-relaxed text-foreground md:text-3xl md:leading-relaxed">{visi}</p>
              ) : (
                <p className="mt-6 text-muted-foreground">Belum ada data visi.</p>
              )}
            </div>
          </div>

          {/* Misi */}
          <div>
            <div className="mb-8 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary">
                <Target className="h-4 w-4" />
                Misi
              </span>
              <h2 className="mt-3 text-2xl font-bold text-foreground md:text-3xl">Langkah Mewujudkan Visi</h2>
              {misi.length > 0 && <p className="mt-2 text-sm text-muted-foreground">{misi.length} misi utama pemerintah desa</p>}
            </div>

            {misi.length === 0 ? (
              <p className="text-center text-muted-foreground">Belum ada data misi.</p>
            ) : (
              <ol className="grid gap-5 md:grid-cols-2">
                {misi.map((butir, i) => (
                  <li
                    key={butir}
                    className={`card-village relative flex gap-4 p-6 ${i === 0 && misi.length % 2 === 1 ? "md:col-span-2" : ""}`}
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl font-extrabold text-primary">
                      {i + 1}
                    </span>
                    <p className="pt-1 leading-relaxed text-foreground">{butir}</p>
                  </li>
                ))}
              </ol>
            )}
          </div>

          {/* Lanjutan */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/profil/tentang" className="card-village group flex items-center gap-4 p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <Compass className="h-6 w-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-foreground">Tentang {nama}</span>
                <span className="block text-sm text-muted-foreground">Sejarah, profil wilayah, dan potensi desa</span>
              </span>
              <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
            <Link href="/profil/struktur" className="card-village group flex items-center gap-4 p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                <Target className="h-6 w-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-foreground">Struktur Organisasi</span>
                <span className="block text-sm text-muted-foreground">Kenali perangkat yang menjalankan misi desa</span>
              </span>
              <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
