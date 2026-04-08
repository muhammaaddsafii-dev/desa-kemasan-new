import Layout from "@/components/layout/Layout";
import { Calendar, MapPin, Clock } from "lucide-react";

const data = [
  { title: "Gotong Royong Bersih Desa", date: "12 April 2026", time: "07:00 WIB", loc: "Sepanjang Jalan Desa", desc: "Kegiatan kerja bakti membersihkan lingkungan desa bersama seluruh warga.", status: "Mendatang" },
  { title: "Festival Budaya Desa 2026", date: "20 April 2026", time: "09:00 WIB", loc: "Lapangan Desa", desc: "Pesta seni dan budaya menampilkan kesenian tradisional Sunda, kuliner lokal, dan bazar UMKM.", status: "Mendatang" },
  { title: "Peringatan Hari Kartini", date: "21 April 2026", time: "08:00 WIB", loc: "Balai Desa", desc: "Upacara dan kegiatan pemberdayaan perempuan desa dalam rangka Hari Kartini.", status: "Mendatang" },
  { title: "Musrenbangdes 2027", date: "15 April 2026", time: "09:00 WIB", loc: "Aula Kecamatan", desc: "Musyawarah perencanaan pembangunan desa untuk menyusun program tahun 2027.", status: "Mendatang" },
  { title: "Pelatihan Pertanian Organik", date: "5 Maret 2026", time: "08:00 WIB", loc: "Kebun Desa", desc: "Pelatihan teknik pertanian organik bersama penyuluh pertanian dari dinas terkait.", status: "Selesai" },
  { title: "Donor Darah PMI", date: "28 Februari 2026", time: "09:00 WIB", loc: "Puskesmas Desa", desc: "Aksi donor darah bekerja sama dengan PMI Kabupaten Bandung Barat.", status: "Selesai" },
];

const Kegiatan = () => (
  <Layout>
    <section className="gradient-primary text-primary-foreground py-16 md:py-20">
      <div className="container-village">
        <span className="text-sm font-medium opacity-80">Info Desa &gt; Kegiatan</span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2">Kegiatan Desa</h1>
        <p className="mt-3 opacity-90 max-w-2xl">Agenda dan dokumentasi kegiatan masyarakat Desa Sukamakmur.</p>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-village">
        <div className="grid md:grid-cols-2 gap-6">
          {data.map((k, i) => (
            <div key={i} className="card-village p-6 flex gap-5">
              <div className="shrink-0">
                <div className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center ${k.status === "Mendatang" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                  <Calendar className="w-5 h-5 mb-0.5" />
                  <span className="text-xs font-bold">{k.date.split(" ")[0]}</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${k.status === "Mendatang" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{k.status}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{k.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{k.desc}</p>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{k.time}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{k.loc}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Kegiatan;
