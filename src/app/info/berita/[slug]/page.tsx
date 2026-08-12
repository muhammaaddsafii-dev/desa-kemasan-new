import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";

import { getBeritaBySlug } from "@/lib/data/informasi";
import { formatTanggalPanjang } from "@/lib/format";
import { SafeImage } from "@/components/safe-image";

export default async function BeritaDetail({ params }: { params: { slug: string } }) {
  const berita = await getBeritaBySlug(params.slug);
  if (!berita) notFound();

  return (
    <>
      <section className="gradient-primary text-primary-foreground py-16 md:py-20">
        <div className="container-village max-w-4xl">
          <span className="text-sm font-medium opacity-80">Info Desa &gt; Berita &gt; {berita.title}</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">{berita.title}</h1>
          <p className="mt-3 opacity-90 flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4" />
            {formatTanggalPanjang(berita.published_at)}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-village max-w-4xl">
          <Link href="/info/berita" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Berita
          </Link>

          {berita.image_cover && (
            <SafeImage
              src={berita.image_cover}
              alt={berita.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
              fallbackClassName="hidden"
              sizes="(min-width: 1024px) 896px, 100vw"
            />
          )}

          <div
            className="prose prose-sm sm:prose-base max-w-none prose-headings:text-foreground prose-p:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: berita.content }}
          />

          {berita.foto_berita.length > 0 && (
            <div className="mt-10">
              <h2 className="text-lg font-semibold text-foreground mb-4">Galeri Foto</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {berita.foto_berita.map((foto) => (
                  <SafeImage
                    key={foto.id}
                    src={foto.file}
                    alt={berita.title}
                    className="w-full h-40 object-cover rounded-lg card-village"
                    fallbackClassName="hidden"
                    sizes="(min-width: 768px) 33vw, 50vw"
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
