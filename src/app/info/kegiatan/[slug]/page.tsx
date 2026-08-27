import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";

import { getKegiatanBySlug } from "@/lib/data/informasi";
import { formatTanggalPanjang } from "@/lib/format";
import { DetailPhotoGallery } from "@/components/detail-photo-gallery";

export default async function KegiatanDetail({ params }: { params: { slug: string } }) {
  const kegiatan = await getKegiatanBySlug(params.slug);
  if (!kegiatan) notFound();

  const today = new Date().toISOString().slice(0, 10);
  const status = kegiatan.date >= today ? "Mendatang" : "Selesai";

  return (
    <>
      <section className="gradient-primary text-primary-foreground py-16 md:py-20">
        <div className="container-village max-w-4xl">
          <span className="text-sm font-medium opacity-80">Info Desa &gt; Kegiatan &gt; {kegiatan.title}</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">{kegiatan.title}</h1>
          <p className="mt-3 opacity-90 flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4" />
            {formatTanggalPanjang(kegiatan.date)}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-village max-w-4xl">
          <Link href="/info/kegiatan" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Kegiatan
          </Link>

          <div className="flex items-center gap-2 mb-6">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status === "Mendatang" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{status}</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary/10 text-secondary capitalize">{kegiatan.category}</span>
          </div>

          <DetailPhotoGallery cover={kegiatan.image_cover} coverAlt={kegiatan.title} photos={[]} photosAlt={kegiatan.title} />

          {kegiatan.deskripsi && (
            <div
              className="prose prose-sm sm:prose-base max-w-none prose-headings:text-foreground prose-p:text-muted-foreground mb-8"
              dangerouslySetInnerHTML={{ __html: kegiatan.deskripsi }}
            />
          )}

          {kegiatan.foto_kegiatan.length > 0 && (
            <DetailPhotoGallery
              cover={null}
              coverAlt={kegiatan.title}
              photos={kegiatan.foto_kegiatan}
              photosAlt={kegiatan.title}
              galleryClassName="mt-2"
            />
          )}
        </div>
      </section>
    </>
  );
}
