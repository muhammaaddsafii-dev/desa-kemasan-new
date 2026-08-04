import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";

import { getPengumumanById } from "@/lib/data/informasi";
import { formatTanggalPanjang } from "@/lib/format";
import { SafeImage } from "@/components/safe-image";

export default async function PengumumanDetail({ params }: { params: { id: string } }) {
  const pengumuman = await getPengumumanById(params.id);
  if (!pengumuman) notFound();

  return (
    <>
      <section className="gradient-primary text-primary-foreground py-16 md:py-20">
        <div className="container-village max-w-4xl">
          <span className="text-sm font-medium opacity-80">Info Desa &gt; Pengumuman &gt; {pengumuman.judul}</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">{pengumuman.judul}</h1>
          <p className="mt-3 opacity-90 flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4" />
            {formatTanggalPanjang(pengumuman.date)}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-village max-w-4xl">
          <Link href="/info/pengumuman" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Pengumuman
          </Link>

          <div className="card-village p-6 md:p-8">
            <p className="text-foreground leading-relaxed whitespace-pre-line">{pengumuman.isi_pengumuman}</p>
          </div>

          {pengumuman.foto_pengumuman.length > 0 && (
            <div className="mt-10">
              <h2 className="text-lg font-semibold text-foreground mb-4">Galeri Foto</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {pengumuman.foto_pengumuman.map((foto) => (
                  <SafeImage
                    key={foto.id}
                    src={foto.file}
                    alt={pengumuman.judul}
                    className="w-full h-40 object-cover rounded-lg card-village"
                    fallbackClassName="hidden"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
