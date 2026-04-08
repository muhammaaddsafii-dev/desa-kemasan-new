import Layout from "@/components/layout/Layout";
import { Bell } from "lucide-react";

const data = [
  { title: "Jadwal Vaksinasi Booster Tahap 3", date: "5 April 2026", cat: "Kesehatan", priority: true, desc: "Vaksinasi booster tahap 3 akan dilaksanakan di Puskesmas Desa pada tanggal 10-12 April 2026. Warga yang belum mendapatkan booster diharapkan segera mendaftar." },
  { title: "Pendaftaran BLT Dana Desa 2026 Dibuka", date: "1 April 2026", cat: "Sosial", priority: true, desc: "Pendaftaran penerima Bantuan Langsung Tunai (BLT) Dana Desa tahun 2026 telah dibuka. Silakan datang ke kantor desa dengan membawa KTP dan KK." },
  { title: "Rapat Musyawarah Desa Tahun Anggaran 2027", date: "30 Maret 2026", cat: "Pemerintahan", priority: false, desc: "Musrenbangdes untuk tahun anggaran 2027 akan diselenggarakan pada 15 April 2026 di Balai Desa." },
  { title: "Perbaikan Jalan Dusun III Mulai 10 April", date: "28 Maret 2026", cat: "Infrastruktur", priority: false, desc: "Pekerjaan perbaikan jalan di Dusun III akan dimulai tanggal 10 April. Warga dimohon untuk menggunakan jalur alternatif." },
  { title: "Lomba Desa Bersih Tingkat Kecamatan", date: "25 Maret 2026", cat: "Lingkungan", priority: false, desc: "Desa Sukamakmur akan mengikuti Lomba Desa Bersih tingkat kecamatan. Partisipasi seluruh warga sangat diharapkan." },
  { title: "Penyaluran Pupuk Bersubsidi Musim Tanam II", date: "20 Maret 2026", cat: "Pertanian", priority: false, desc: "Pupuk bersubsidi untuk musim tanam II tersedia di koperasi desa. Petani yang terdaftar dapat mengambil sesuai jatah." },
];

const Pengumuman = () => (
  <Layout>
    <section className="gradient-primary text-primary-foreground py-16 md:py-20">
      <div className="container-village">
        <span className="text-sm font-medium opacity-80">Info Desa &gt; Pengumuman</span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2">Pengumuman</h1>
        <p className="mt-3 opacity-90 max-w-2xl">Informasi penting dan pengumuman resmi dari Pemerintah Desa Sukamakmur.</p>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-village max-w-4xl">
        <div className="space-y-4">
          {data.map((p, i) => (
            <div key={i} className={`card-village p-5 md:p-6 ${p.priority ? "border-l-4 border-l-accent" : ""}`}>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {p.priority && <Bell className="w-4 h-4 text-accent" />}
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">{p.cat}</span>
                <span className="text-xs text-muted-foreground">{p.date}</span>
                {p.priority && <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent/10 text-accent">Penting</span>}
              </div>
              <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Pengumuman;
