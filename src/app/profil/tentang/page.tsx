import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CloudSun,
  History,
  Landmark,
  Leaf,
  Map,
  MapPin,
  Mountain,
  Ruler,
  Sprout,
  Target,
  Users,
} from "lucide-react";

import { getAssetsCurrent } from "@/lib/data/profil";

// Jangan di-prerender statis saat build (API_URL belum ke backend produksi saat itu) - lihat
// catatan di src/app/data/geospasial/page.tsx.
export const dynamic = "force-dynamic";

// Data profil wilayah (belum tersedia di backend, jadi masih ditulis di sini).
const KABUPATEN = "Boyolali";

const faktaUtama = [
  { icon: Ruler, label: "Luas Wilayah", value: "12,5 km²", tone: "bg-green-100 text-green-700" },
  { icon: Mountain, label: "Ketinggian", value: "850 mdpl", tone: "bg-cyan-100 text-cyan-700" },
  { icon: Building2, label: "Jumlah Dusun", value: "4 Dusun", tone: "bg-amber-100 text-amber-700" },
  { icon: Users, label: "RT / RW", value: "32 RT / 8 RW", tone: "bg-violet-100 text-violet-700" },
];

const profilWilayah = [
  {
    icon: Landmark,
    title: "Administrasi",
    tone: "bg-blue-100 text-blue-700",
    rows: [
      { label: "Kecamatan", value: "Sawit" },
      { label: "Kabupaten", value: KABUPATEN },
      { label: "Provinsi", value: "Jawa Tengah" },
      { label: "Kode Pos", value: "40551" },
    ],
  },
  {
    icon: CloudSun,
    title: "Geografis",
    tone: "bg-cyan-100 text-cyan-700",
    rows: [
      { label: "Luas Wilayah", value: "12,5 km²" },
      { label: "Ketinggian", value: "850 mdpl" },
      { label: "Iklim", value: "Tropis Sejuk" },
    ],
  },
  {
    icon: Users,
    title: "Pemerintahan",
    tone: "bg-violet-100 text-violet-700",
    rows: [
      { label: "Jumlah Dusun", value: "4 Dusun" },
      { label: "Jumlah RT", value: "32 RT" },
      { label: "Jumlah RW", value: "8 RW" },
    ],
  },
];

const potensi = [
  {
    icon: Sprout,
    title: "Pertanian Organik",
    desc: "Padi, sayuran, dan buah-buahan organik yang dipasarkan hingga ke pasar modern di kota-kota besar.",
    tone: "bg-green-100 text-green-700",
    bar: "from-green-500 to-green-600",
  },
  {
    icon: Mountain,
    title: "Pariwisata Alam",
    desc: "Curug, tracking jalur pegunungan, dan wisata edukasi pertanian menarik ribuan pengunjung setiap tahun.",
    tone: "bg-cyan-100 text-cyan-700",
    bar: "from-cyan-500 to-cyan-600",
  },
  {
    icon: Leaf,
    title: "Kerajinan Bambu",
    desc: "Anyaman bambu dan kerajinan tangan yang telah diekspor ke berbagai negara di Asia Tenggara.",
    tone: "bg-amber-100 text-amber-700",
    bar: "from-amber-500 to-amber-600",
  },
];

export default async function TentangDesa() {
  const assets = await getAssetsCurrent();
  const nama = assets?.nama ?? "Desa Sukamakmur";
  const lokasi = assets?.lokasi;

  const tonggak = [
    { tahun: "1892", judul: "Tercatat dalam arsip", desc: `${nama} pertama kali tercatat dalam arsip pemerintahan Hindia Belanda sebagai pemukiman petani di lembah pegunungan.` },
    { tahun: "Pasca kemerdekaan", judul: "Sentra pertanian", desc: "Desa berkembang pesat menjadi sentra pertanian padi dan sayuran organik." },
    { tahun: "2005", judul: "Desa definitif", desc: `${nama} resmi menjadi desa definitif.` },
    { tahun: "2020", judul: "Menuju desa digital", desc: "Desa terus bertransformasi menjadi desa digital sejak 2020." },
    { tahun: "Kini", judul: "Desa percontohan", desc: `Menjadi salah satu desa percontohan di Kabupaten ${KABUPATEN} dalam pelayanan publik digital dan transparansi anggaran.` },
  ];

  return (
    <>
      {/* Header */}
      <section className="gradient-primary py-16 pb-28 text-primary-foreground md:py-20 md:pb-32">
        <div className="container-village">
          <span className="text-sm font-medium opacity-80">Profil &gt; Tentang Desa</span>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">Tentang {nama}</h1>
          <p className="mt-3 max-w-2xl opacity-90">Mengenal sejarah, potensi, dan keunikan {nama}.</p>
          {lokasi && (
            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur">
              <MapPin className="h-4 w-4" />
              {lokasi}
            </span>
          )}
        </div>
      </section>

      {/* Fakta utama */}
      <section className="pb-4">
        <div className="container-village">
          <div className="-mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {faktaUtama.map((f) => (
              <div key={f.label} className="card-village flex items-center gap-4 p-5">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${f.tone}`}>
                  <f.icon className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{f.label}</span>
                  <span className="block text-lg font-bold leading-tight text-foreground">{f.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sejarah */}
      <section className="section-padding">
        <div className="container-village">
          <div className="grid items-start gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2 lg:sticky lg:top-24">
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element -- gambar statis di /public, tidak perlu optimasi next/image */}
                <img src="/history.jpg" alt={`Sejarah ${nama}`} className="h-80 w-full object-cover md:h-[26rem]" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
                  <span className="text-xs font-semibold uppercase tracking-wider opacity-80">Tercatat sejak</span>
                  <div className="text-3xl font-extrabold">1892</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <History className="h-5 w-5" />
                </span>
                <h2 className="text-2xl font-bold text-foreground">Sejarah Singkat</h2>
              </div>
              <p className="leading-relaxed text-muted-foreground">
                Nama &quot;{nama}&quot; berasal dari bahasa Sunda yang berarti &quot;suka kemakmuran&quot;. Berikut perjalanan {nama} dari pemukiman petani hingga desa digital.
              </p>

              <ol className="relative mt-8 space-y-7 border-l-2 border-primary/20 pl-8">
                {tonggak.map((t, i) => (
                  <li key={t.tahun} className="relative">
                    <span
                      className={`absolute -left-[41px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-[3px] border-background ${
                        i === tonggak.length - 1 ? "bg-primary ring-4 ring-primary/20" : "bg-primary/60"
                      }`}
                    />
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-bold text-primary">{t.tahun}</span>
                    <h3 className="mt-1.5 font-semibold text-foreground">{t.judul}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Profil wilayah */}
      <section className="section-padding bg-muted/50">
        <div className="container-village">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">Profil Wilayah</h2>
            <p className="mt-1 text-sm text-muted-foreground">Gambaran administrasi, geografis, dan pemerintahan desa.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {profilWilayah.map((g) => (
              <div key={g.title} className="card-village p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${g.tone}`}>
                    <g.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-semibold text-foreground">{g.title}</h3>
                </div>
                <dl className="divide-y">
                  {g.rows.map((r) => (
                    <div key={r.label} className="flex items-center justify-between py-2.5 text-sm">
                      <dt className="text-muted-foreground">{r.label}</dt>
                      <dd className="font-semibold text-foreground">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Potensi */}
      <section className="section-padding">
        <div className="container-village">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-foreground">Potensi Desa</h2>
            <p className="mx-auto mt-1 max-w-xl text-sm text-muted-foreground">Kekuatan yang menjadi andalan ekonomi dan kebanggaan warga {nama}.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {potensi.map((p) => (
              <div key={p.title} className="card-village overflow-hidden">
                <div className={`h-1.5 bg-gradient-to-r ${p.bar}`} />
                <div className="p-6">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${p.tone}`}>
                    <p.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lanjutan */}
      <section className="pb-16 md:pb-24">
        <div className="container-village">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { href: "/profil/visi-misi", icon: Target, title: "Visi dan Misi", desc: "Arah pembangunan desa", tone: "bg-blue-100 text-blue-700" },
              { href: "/data/statistik-kependudukan", icon: BarChart3, title: "Statistik Kependudukan", desc: "Data demografi terbaru", tone: "bg-green-100 text-green-700" },
              { href: "/data/geospasial", icon: Map, title: "Peta Desa", desc: "Sebaran penduduk dan fasilitas", tone: "bg-amber-100 text-amber-700" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="card-village group flex items-center gap-4 p-5">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${l.tone}`}>
                  <l.icon className="h-6 w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-foreground">{l.title}</span>
                  <span className="block text-sm text-muted-foreground">{l.desc}</span>
                </span>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
