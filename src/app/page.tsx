import Link from "next/link";
import {
  FileText, MessageSquareWarning, BarChart3, Newspaper,
  Users, Home, MapPin, Ruler, Calendar, ArrowRight,
  Phone, Mail
} from "lucide-react";

import { getBeritaList, getKegiatanList, getPengumumanList } from "@/lib/data/informasi";
import { getCombinedGeoPoints } from "@/lib/data/geo";
import { getAssetsCurrent } from "@/lib/data/profil";
import { formatTanggalHari, formatTanggalPanjang, stripHtml } from "@/lib/format";
import { GeospasialMap } from "@/components/geospasial-map";
import { SafeImage } from "@/components/safe-image";

const quickLinks = [
  { icon: FileText, label: "Surat Online", desc: "Ajukan surat secara digital", to: "/layanan/surat-online", color: "bg-primary" },
  { icon: MessageSquareWarning, label: "Pengaduan", desc: "Laporkan keluhan Anda", to: "/layanan/pengaduan", color: "bg-secondary" },
  { icon: BarChart3, label: "Statistik", desc: "Data kependudukan desa", to: "/data/statistik-kependudukan", color: "bg-accent" },
  { icon: Newspaper, label: "Berita", desc: "Berita terbaru desa", to: "/info/berita", color: "bg-primary" },
];

const stats = [
  { icon: Users, label: "Jumlah Penduduk", value: "4.827" },
  { icon: Home, label: "Jumlah KK", value: "1.356" },
  { icon: Ruler, label: "Luas Wilayah", value: "12,5 km²" },
  { icon: MapPin, label: "Jumlah RT/RW", value: "32 / 8" },
];

export default async function Beranda() {
  const [beritaRes, pengumumanRes, kegiatanRes, geoPoints, assets] = await Promise.all([
    getBeritaList({ ordering: "-published_at" }),
    getPengumumanList({ ordering: "-date" }),
    getKegiatanList({ ordering: "date" }),
    getCombinedGeoPoints(),
    getAssetsCurrent(),
  ]);

  const nama = assets?.nama ?? "Desa Sukamakmur";
  const berita = beritaRes.results.slice(0, 3);
  const pengumuman = pengumumanRes.results.slice(0, 4);

  // Prioritaskan kegiatan mendatang; kalau tidak ada, tampilkan kegiatan terakhir yang sudah lewat
  // supaya bagian ini tidak kosong ketika seluruh data kegiatan yang ada kebetulan sudah lampau.
  const today = new Date().toISOString().slice(0, 10);
  const upcomingKegiatan = kegiatanRes.results.filter((k) => k.date >= today);
  const pastKegiatan = kegiatanRes.results.filter((k) => k.date < today).reverse();
  const kegiatan = (upcomingKegiatan.length > 0 ? upcomingKegiatan : pastKegiatan).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <SafeImage
          src={assets?.file_hero_image || "/hero-desa.jpg"}
          fallbackSrc="/hero-desa.jpg"
          alt={`Pemandangan ${nama}`}
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative container-village text-primary-foreground py-20">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/20 backdrop-blur-sm text-sm font-medium mb-6 animate-fade-in-up">
              Portal Resmi {nama}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Selamat Datang di<br />{nama}
            </h1>
            <p className="text-lg sm:text-xl opacity-90 mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Desa yang asri, maju, dan berdaya — menyediakan layanan publik digital untuk masyarakat yang lebih baik.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Link href="/layanan/surat-online" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-foreground text-primary font-semibold hover:bg-primary-foreground/90 transition-colors">
                Layanan Online <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/profil/tentang" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-primary-foreground/50 font-semibold hover:bg-primary-foreground/10 transition-colors">
                Tentang Desa
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="-mt-16 relative z-10">
        <div className="container-village">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((q) => (
              <Link key={q.label} href={q.to} className="card-village p-5 flex items-start gap-4 group">
                <div className={`w-12 h-12 rounded-xl ${q.color} flex items-center justify-center shrink-0 text-primary-foreground group-hover:scale-110 transition-transform`}>
                  <q.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{q.label}</h3>
                  <p className="text-sm text-muted-foreground">{q.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Profil Singkat */}
      <section className="section-padding">
        <div className="container-village">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Tentang Desa</span>
              <h2 className="text-3xl font-bold mt-2 mb-4 text-foreground">Mengenal {nama}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {nama} adalah salah satu dari 12 desa yang ada di Kecamatan Sawit, Kabupaten Boyolali, Provinsi Jawa Tengah. Bisa dikatakan bahwa Desa Kemasan adalah ibukotanya Kecamatan Sawit karena kantor kecamatan berada di desa ini. Desa ini terus berkembang menjadi desa digital yang melayani masyarakat secara modern dan transparan.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Potensi utama desa meliputi pertanian organik, pariwisata alam, dan kerajinan anyaman bambu yang sudah dikenal hingga mancanegara.
              </p>
              <Link href="/profil/tentang" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                Selengkapnya <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-village-green-light rounded-2xl p-8 lg:p-12">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary">
                      <s.icon className="w-5 h-5" />
                    </div>
                    <span className="block text-2xl font-bold text-foreground">{s.value}</span>
                    <span className="text-sm text-muted-foreground">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Berita Terbaru */}
      <section className="section-padding bg-muted/50">
        <div className="container-village">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Informasi Terkini</span>
              <h2 className="text-3xl font-bold mt-2 text-foreground">Berita Terbaru</h2>
            </div>
            <Link href="/info/berita" className="hidden sm:inline-flex items-center gap-1 text-primary font-semibold hover:underline">
              Semua Berita <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {berita.length === 0 && (
              <p className="text-sm text-muted-foreground col-span-full text-center py-8">Belum ada berita.</p>
            )}
            {berita.map((b) => (
              <Link key={b.id} href={`/info/berita/${b.slug}`} className="card-village overflow-hidden group block">
                {b.image_cover ? (
                  <SafeImage
                    src={b.image_cover}
                    alt={b.title}
                    className="h-48 w-full object-cover"
                    fallbackClassName="h-48 bg-village-green-50"
                  />
                ) : (
                  <div className="h-48 bg-village-green-50" />
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-muted-foreground">{formatTanggalPanjang(b.published_at)}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{b.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{stripHtml(b.content)}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="sm:hidden mt-6 text-center">
            <Link href="/info/berita" className="inline-flex items-center gap-1 text-primary font-semibold">
              Semua Berita <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pengumuman */}
      <section className="section-padding">
        <div className="container-village">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Perhatian</span>
              <h2 className="text-3xl font-bold mt-2 mb-6 text-foreground">Pengumuman Penting</h2>
              <div className="space-y-3">
                {pengumuman.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">Belum ada pengumuman.</p>
                )}
                {pengumuman.map((p) => (
                  <Link key={p.id} href={`/info/pengumuman/${p.id}`} className="card-village p-4 flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 shrink-0 bg-muted-foreground/30" />
                    <div>
                      <h4 className="font-medium text-foreground">{p.judul}</h4>
                      <span className="text-xs text-muted-foreground">{formatTanggalPanjang(p.date)}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/info/pengumuman" className="inline-flex items-center gap-1 text-primary font-semibold mt-4 hover:underline">
                Semua Pengumuman <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Kegiatan */}
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Agenda</span>
              <h2 className="text-3xl font-bold mt-2 mb-6 text-foreground">Kegiatan Mendatang</h2>
              <div className="space-y-4">
                {kegiatan.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">Belum ada data kegiatan.</p>
                )}
                {kegiatan.map((k) => {
                  const isPast = k.date < today;
                  return (
                    <Link key={k.id} href={`/info/kegiatan/${k.slug}`} className="card-village p-5 flex items-start gap-4">
                      <div className="text-center shrink-0">
                        <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center ${isPast ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"}`}>
                          <Calendar className="w-4 h-4 mb-0.5" />
                          <span className="text-xs font-bold">{formatTanggalHari(k.date)}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-foreground">{k.title}</h4>
                          {isPast && (
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground shrink-0">Selesai</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {formatTanggalPanjang(k.date)} · {k.category === "internal" ? "Internal" : "Eksternal"}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <Link href="/info/kegiatan" className="inline-flex items-center gap-1 text-primary font-semibold mt-4 hover:underline">
                Semua Kegiatan <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Geospasial Preview */}
      <section className="section-padding bg-muted/50">
        <div className="container-village">
          <div className="text-center mb-10">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Peta Desa</span>
            <h2 className="text-3xl font-bold mt-2 text-foreground">Data Geospasial Desa</h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Lihat peta wilayah, fasilitas umum, dan batas administratif {nama}.</p>
          </div>
          <div className="card-village overflow-hidden p-4 md:p-6">
            <GeospasialMap points={geoPoints} showGisLayers />
          </div>
          <div className="text-center mt-6">
            <Link href="/data/geospasial" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
              Lihat Peta Lengkap <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Layanan */}
      <section className="section-padding">
        <div className="container-village">
          <div className="gradient-primary rounded-2xl p-8 md:p-14 text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Butuh Layanan Desa?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">Ajukan surat, sampaikan pengaduan, atau cari panduan layanan secara online — cepat, mudah, dan transparan.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/layanan/surat-online" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-foreground text-primary font-semibold hover:bg-primary-foreground/90 transition-colors">
                <FileText className="w-4 h-4" /> Surat Online
              </Link>
              <Link href="/layanan/pengaduan" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-primary-foreground/50 font-semibold hover:bg-primary-foreground/10 transition-colors">
                <MessageSquareWarning className="w-4 h-4" /> Pengaduan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Kontak Singkat */}
      <section className="section-padding bg-muted/50">
        <div className="container-village">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="card-village p-6">
              <Phone className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold text-foreground mb-1">Telepon</h3>
              <p className="text-muted-foreground text-sm">{assets?.kontak ?? "(022) 123-4567"}</p>
            </div>
            <div className="card-village p-6">
              <Mail className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold text-foreground mb-1">Email</h3>
              <p className="text-muted-foreground text-sm">{assets?.email ?? "desa@sukamakmur.desa.id"}</p>
            </div>
            <div className="card-village p-6">
              <MapPin className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold text-foreground mb-1">Alamat</h3>
              <p className="text-muted-foreground text-sm">{assets?.lokasi ?? "Jl. Raya Sukamakmur No. 01, Bandung Barat"}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
