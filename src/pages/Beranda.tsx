import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-desa.jpg";
import {
  FileText, MessageSquareWarning, BarChart3, Newspaper,
  Users, Home, MapPin, Ruler, Calendar, Bell, ArrowRight,
  Phone, Mail, Map
} from "lucide-react";

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

const berita = [
  { title: "Pembangunan Jembatan Desa Tahap II Rampung", date: "2 April 2026", cat: "Infrastruktur", desc: "Jembatan penghubung antar dusun telah selesai dibangun dan siap digunakan masyarakat." },
  { title: "Pelatihan UMKM Digital untuk Warga Desa", date: "28 Maret 2026", cat: "Ekonomi", desc: "Pemerintah desa bekerja sama dengan Dinas Koperasi menggelar pelatihan digitalisasi UMKM." },
  { title: "Posyandu Lansia Rutin Setiap Bulan", date: "25 Maret 2026", cat: "Kesehatan", desc: "Kegiatan posyandu lansia dilaksanakan setiap minggu keempat di Balai Desa." },
];

const pengumuman = [
  { title: "Jadwal Vaksinasi Booster Tahap 3", date: "5 April 2026", priority: true },
  { title: "Pendaftaran BLT Dana Desa 2026 Dibuka", date: "1 April 2026", priority: true },
  { title: "Rapat Musyawarah Desa Tahun Anggaran 2027", date: "30 Maret 2026", priority: false },
  { title: "Perbaikan Jalan Dusun III Mulai 10 April", date: "28 Maret 2026", priority: false },
];

const kegiatan = [
  { title: "Gotong Royong Bersih Desa", date: "12 April 2026", time: "07:00 WIB", loc: "Sepanjang Jalan Desa" },
  { title: "Festival Budaya Desa 2026", date: "20 April 2026", time: "09:00 WIB", loc: "Lapangan Desa" },
  { title: "Peringatan Hari Kartini", date: "21 April 2026", time: "08:00 WIB", loc: "Balai Desa" },
];

const Beranda = () => (
  <Layout>
    {/* Hero */}
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <img src={heroImg} alt="Pemandangan Desa Sukamakmur" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 gradient-hero" />
      <div className="relative container-village text-primary-foreground py-20">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/20 backdrop-blur-sm text-sm font-medium mb-6 animate-fade-in-up">
            Portal Resmi Desa Sukamakmur
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Selamat Datang di<br />Desa Sukamakmur
          </h1>
          <p className="text-lg sm:text-xl opacity-90 mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Desa yang asri, maju, dan berdaya — menyediakan layanan publik digital untuk masyarakat yang lebih baik.
          </p>
          <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/layanan/surat-online" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-foreground text-primary font-semibold hover:bg-primary-foreground/90 transition-colors">
              Layanan Online <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/profil/tentang" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-primary-foreground/50 font-semibold hover:bg-primary-foreground/10 transition-colors">
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
            <Link key={q.label} to={q.to} className="card-village p-5 flex items-start gap-4 group">
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
            <h2 className="text-3xl font-bold mt-2 mb-4 text-foreground">Mengenal Desa Sukamakmur</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Desa Sukamakmur terletak di kaki pegunungan Bandung Barat, dikelilingi hamparan sawah hijau dan perkebunan teh yang asri. 
              Dengan sejarah panjang sejak era kolonial, desa ini terus berkembang menjadi desa digital yang melayani masyarakat secara modern dan transparan.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Potensi utama desa meliputi pertanian organik, pariwisata alam, dan kerajinan anyaman bambu yang sudah dikenal hingga mancanegara.
            </p>
            <Link to="/profil/tentang" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
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
          <Link to="/info/berita" className="hidden sm:inline-flex items-center gap-1 text-primary font-semibold hover:underline">
            Semua Berita <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {berita.map((b, i) => (
            <div key={i} className="card-village overflow-hidden group">
              <div className="h-48 bg-village-green-50" />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">{b.cat}</span>
                  <span className="text-xs text-muted-foreground">{b.date}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{b.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="sm:hidden mt-6 text-center">
          <Link to="/info/berita" className="inline-flex items-center gap-1 text-primary font-semibold">
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
              {pengumuman.map((p, i) => (
                <div key={i} className="card-village p-4 flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${p.priority ? "bg-accent" : "bg-muted-foreground/30"}`} />
                  <div>
                    <h4 className="font-medium text-foreground">{p.title}</h4>
                    <span className="text-xs text-muted-foreground">{p.date}</span>
                  </div>
                  {p.priority && (
                    <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-accent/10 text-accent shrink-0">Penting</span>
                  )}
                </div>
              ))}
            </div>
            <Link to="/info/pengumuman" className="inline-flex items-center gap-1 text-primary font-semibold mt-4 hover:underline">
              Semua Pengumuman <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Kegiatan */}
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Agenda</span>
            <h2 className="text-3xl font-bold mt-2 mb-6 text-foreground">Kegiatan Mendatang</h2>
            <div className="space-y-4">
              {kegiatan.map((k, i) => (
                <div key={i} className="card-village p-5 flex items-start gap-4">
                  <div className="text-center shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex flex-col items-center justify-center text-primary">
                      <Calendar className="w-4 h-4 mb-0.5" />
                      <span className="text-xs font-bold">{k.date.split(" ")[0]}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{k.title}</h4>
                    <p className="text-sm text-muted-foreground">{k.time} · {k.loc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/info/kegiatan" className="inline-flex items-center gap-1 text-primary font-semibold mt-4 hover:underline">
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
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Lihat peta wilayah, fasilitas umum, dan batas administratif Desa Sukamakmur.</p>
        </div>
        <div className="card-village overflow-hidden">
          <div className="h-72 md:h-96 bg-village-blue-light flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Map className="w-16 h-16 mx-auto mb-3 opacity-40" />
              <p className="text-sm font-medium">Peta Interaktif Desa Sukamakmur</p>
              <p className="text-xs opacity-60">Integrasi peta akan ditampilkan di sini</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link to="/data/geospasial" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
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
            <Link to="/layanan/surat-online" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-foreground text-primary font-semibold hover:bg-primary-foreground/90 transition-colors">
              <FileText className="w-4 h-4" /> Surat Online
            </Link>
            <Link to="/layanan/pengaduan" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-primary-foreground/50 font-semibold hover:bg-primary-foreground/10 transition-colors">
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
            <p className="text-muted-foreground text-sm">(022) 123-4567</p>
          </div>
          <div className="card-village p-6">
            <Mail className="w-8 h-8 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold text-foreground mb-1">Email</h3>
            <p className="text-muted-foreground text-sm">desa@sukamakmur.desa.id</p>
          </div>
          <div className="card-village p-6">
            <MapPin className="w-8 h-8 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold text-foreground mb-1">Alamat</h3>
            <p className="text-muted-foreground text-sm">Jl. Raya Sukamakmur No. 01, Bandung Barat</p>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Beranda;
