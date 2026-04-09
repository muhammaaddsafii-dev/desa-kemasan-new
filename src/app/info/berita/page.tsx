export default function Berita() {
  const data = [
    { title: "Pembangunan Jembatan Desa Tahap II Rampung", date: "2 April 2026", cat: "Infrastruktur", desc: "Jembatan penghubung antar dusun sepanjang 25 meter telah selesai dibangun dan siap digunakan masyarakat. Pembangunan ini didanai dari Dana Desa 2025." },
    { title: "Pelatihan UMKM Digital untuk Warga Desa", date: "28 Maret 2026", cat: "Ekonomi", desc: "Pemerintah desa bekerja sama dengan Dinas Koperasi menggelar pelatihan digitalisasi UMKM bagi 50 pelaku usaha lokal." },
    { title: "Posyandu Lansia Rutin Setiap Bulan", date: "25 Maret 2026", cat: "Kesehatan", desc: "Kegiatan posyandu lansia dilaksanakan setiap minggu keempat di Balai Desa dengan pemeriksaan kesehatan gratis." },
    { title: "Panen Raya Padi Organik Desa Sukamakmur", date: "20 Maret 2026", cat: "Pertanian", desc: "Hasil panen padi organik musim ini mencapai 120 ton, meningkat 15% dari musim sebelumnya berkat program pertanian berkelanjutan." },
    { title: "Kunjungan Bupati ke Desa Sukamakmur", date: "15 Maret 2026", cat: "Pemerintahan", desc: "Bupati Bandung Barat melakukan kunjungan kerja dan meresmikan fasilitas air bersih baru di Dusun Ciburial." },
    { title: "Turnamen Voli Antar RT Meriahkan HUT RI", date: "10 Maret 2026", cat: "Olahraga", desc: "Turnamen voli antar RT dalam rangka HUT Kemerdekaan RI berlangsung meriah dengan diikuti 16 tim." },
  ];

  return (
    <>
      <section className="gradient-primary text-primary-foreground py-16 md:py-20">
        <div className="container-village">
          <span className="text-sm font-medium opacity-80">Info Desa &gt; Berita</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Berita Desa</h1>
          <p className="mt-3 opacity-90 max-w-2xl">Kabar terbaru seputar pembangunan, kegiatan, dan kehidupan masyarakat Desa Sukamakmur.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-village">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((b, i) => (
              <div key={i} className="card-village overflow-hidden group cursor-pointer">
                <div className="h-48 bg-village-green-50" />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">{b.cat}</span>
                    <span className="text-xs text-muted-foreground">{b.date}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{b.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
