import Link from "next/link";
import { ImageIcon } from "lucide-react";

import { getAllPengumuman } from "@/lib/data/informasi";
import { formatTanggalPanjang } from "@/lib/format";
import { SafeImage } from "@/components/safe-image";

export default async function Pengumuman() {
  const data = await getAllPengumuman();

  return (
    <>
      <section className="gradient-primary text-primary-foreground py-16 md:py-20">
        <div className="container-village">
          <span className="text-sm font-medium opacity-80">Info Desa &gt; Pengumuman</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Pengumuman</h1>
          <p className="mt-3 opacity-90 max-w-2xl">Informasi penting dan pengumuman resmi dari Pemerintah Desa.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-village max-w-4xl">
          <div className="space-y-4">
            {data.length === 0 && (
              <p className="text-center text-muted-foreground py-8">Belum ada pengumuman.</p>
            )}
            {data.map((p) => (
              <Link key={p.id} href={`/info/pengumuman/${p.id}`} className="card-village p-5 md:p-6 flex gap-4 items-start">
                {p.foto_pengumuman[0] && (
                  <SafeImage
                    src={p.foto_pengumuman[0].file}
                    alt={p.judul}
                    className="w-20 h-20 rounded-lg object-cover shrink-0 hidden sm:block"
                    fallbackClassName="hidden"
                    sizes="80px"
                  />
                )}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs text-muted-foreground">{formatTanggalPanjang(p.date)}</span>
                    {p.foto_pengumuman.length > 0 && (
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <ImageIcon className="w-3 h-3" /> {p.foto_pengumuman.length} foto
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{p.judul}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{p.isi_pengumuman}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
