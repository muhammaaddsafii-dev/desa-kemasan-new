import Link from "next/link";

import { getAllBerita } from "@/lib/data/informasi";
import { formatTanggalPanjang, stripHtml } from "@/lib/format";
import { SafeImage } from "@/components/safe-image";

export default async function Berita() {
  const data = await getAllBerita();

  return (
    <>
      <section className="gradient-primary text-primary-foreground py-16 md:py-20">
        <div className="container-village">
          <span className="text-sm font-medium opacity-80">Info Desa &gt; Berita</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Berita Desa</h1>
          <p className="mt-3 opacity-90 max-w-2xl">Kabar terbaru seputar pembangunan, kegiatan, dan kehidupan masyarakat desa.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-village">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.length === 0 && (
              <p className="text-center text-muted-foreground py-8 col-span-full">Belum ada berita.</p>
            )}
            {data.map((b) => (
              <Link key={b.id} href={`/info/berita/${b.slug}`} className="card-village overflow-hidden group cursor-pointer block">
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
                  <p className="text-sm text-muted-foreground line-clamp-3">{stripHtml(b.content)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
