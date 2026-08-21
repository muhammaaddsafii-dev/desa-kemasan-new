import { History, Mountain, Leaf, Sprout } from "lucide-react";

import { getAssetsCurrent } from "@/lib/data/profil";

// Jangan di-prerender statis saat build (API_URL belum ke backend produksi saat itu) - lihat
// catatan di src/app/data/geospasial/page.tsx.
export const dynamic = "force-dynamic";

export default async function TentangDesa() {
  const assets = await getAssetsCurrent();
  const nama = assets?.nama ?? "Desa Sukamakmur";

  return (
    <>
      {/* Header */}
      <section className="gradient-primary text-primary-foreground py-16 md:py-20">
        <div className="container-village">
          <span className="text-sm font-medium opacity-80">Profil &gt; Tentang Desa</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Tentang {nama}</h1>
          <p className="mt-3 opacity-90 max-w-2xl">Mengenal sejarah, potensi, dan keunikan {nama} di kaki gunung Bandung Barat.</p>
        </div>
      </section>

      {/* Sejarah */}
      <section className="section-padding">
        <div className="container-village">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <History className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Sejarah Singkat</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{nama} pertama kali tercatat dalam arsip pemerintahan Hindia Belanda pada tahun 1892 sebagai pemukiman petani di lembah pegunungan. Nama &quot;{nama}&quot; berasal dari bahasa Sunda yang berarti &quot;suka kemakmuran&quot;.</p>
                <p>Setelah kemerdekaan, desa ini berkembang pesat menjadi sentra pertanian padi dan sayuran organik. Pada tahun 2005, {nama} resmi menjadi desa definitif dan terus bertransformasi menjadi desa digital sejak 2020.</p>
                <p>Saat ini, {nama} menjadi salah satu desa percontohan di Kabupaten Bandung Barat dalam hal pelayanan publik digital dan transparansi anggaran.</p>
              </div>
            </div>
            <div className="bg-village-green-light rounded-2xl h-72 md:h-96 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element -- gambar statis di /public, tidak perlu optimasi next/image */}
              <img src="/history.jpg" alt={`Sejarah ${nama}`} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Deskripsi Umum */}
      <section className="section-padding bg-muted/50">
        <div className="container-village">
          <h2 className="text-2xl font-bold text-foreground mb-6">Deskripsi Umum</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Kecamatan", value: "Sawit" },
              { label: "Kabupaten", value: "Boyolali" },
              { label: "Provinsi", value: "Jawa Tengah" },
              { label: "Luas Wilayah", value: "12,5 km²" },
              { label: "Ketinggian", value: "850 mdpl" },
              { label: "Iklim", value: "Tropis Sejuk" },
              { label: "Jumlah Dusun", value: "4 Dusun" },
              { label: "Jumlah RT/RW", value: "32 RT / 8 RW" },
              { label: "Kode Pos", value: "40551" },
            ].map((d) => (
              <div key={d.label} className="card-village p-4 flex justify-between items-center">
                <span className="text-muted-foreground text-sm">{d.label}</span>
                <span className="font-semibold text-foreground">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Potensi Desa */}
      <section className="section-padding">
        <div className="container-village">
          <h2 className="text-2xl font-bold text-foreground mb-8">Potensi Desa</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Sprout, title: "Pertanian Organik", desc: "Padi, sayuran, dan buah-buahan organik yang dipasarkan hingga ke pasar modern di kota-kota besar." },
              { icon: Mountain, title: "Pariwisata Alam", desc: `Curug ${nama}, tracking jalur pegunungan, dan wisata edukasi pertanian menarik ribuan pengunjung setiap tahun.` },
              { icon: Leaf, title: "Kerajinan Bambu", desc: "Anyaman bambu dan kerajinan tangan yang telah diekspor ke berbagai negara di Asia Tenggara." },
            ].map((p) => (
              <div key={p.title} className="card-village p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <p.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
