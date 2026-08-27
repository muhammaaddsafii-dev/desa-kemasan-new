import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, FileText } from "lucide-react";

import { getPengumumanById } from "@/lib/data/informasi";
import { formatTanggalPanjang } from "@/lib/format";
import { DetailPhotoGallery } from "@/components/detail-photo-gallery";

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

          <div
            className="card-village p-6 md:p-8 prose prose-sm sm:prose-base max-w-none prose-headings:text-foreground prose-p:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: pengumuman.isi_pengumuman }}
          />

          {pengumuman.dokumen_pengumuman.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">Dokumen Lampiran</h2>
              <ul className="space-y-2">
                {pengumuman.dokumen_pengumuman.map((dokumen) => (
                  <li key={dokumen.id}>
                    <a
                      href={dokumen.file}
                      target="_blank"
                      rel="noreferrer"
                      className="card-village flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      <FileText className="w-5 h-5 shrink-0 text-primary" />
                      <span className="truncate">{dokumen.nama_file ?? "Dokumen"}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {pengumuman.foto_pengumuman.length > 0 && (
            <DetailPhotoGallery
              cover={null}
              coverAlt={pengumuman.judul}
              photos={pengumuman.foto_pengumuman}
              photosAlt={pengumuman.judul}
              galleryClassName="mt-10"
            />
          )}
        </div>
      </section>
    </>
  );
}
