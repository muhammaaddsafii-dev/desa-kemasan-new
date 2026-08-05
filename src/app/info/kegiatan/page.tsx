import Link from "next/link";
import { Calendar } from "lucide-react";

import { getAllKegiatan } from "@/lib/data/informasi";
import { formatTanggalHari, formatTanggalPanjang } from "@/lib/format";

export default async function Kegiatan() {
  const data = await getAllKegiatan();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <section className="gradient-primary text-primary-foreground py-16 md:py-20">
        <div className="container-village">
          <span className="text-sm font-medium opacity-80">Info Desa &gt; Kegiatan</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Kegiatan Desa</h1>
          <p className="mt-3 opacity-90 max-w-2xl">Agenda dan dokumentasi kegiatan masyarakat desa.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-village">
          <div className="grid md:grid-cols-2 gap-6">
            {data.length === 0 && (
              <p className="text-center text-muted-foreground py-8 col-span-full">Belum ada kegiatan.</p>
            )}
            {data.map((k) => {
              const status = k.date >= today ? "Mendatang" : "Selesai";
              return (
                <Link key={k.id} href={`/info/kegiatan/${k.slug}`} className="card-village p-6 flex gap-5">
                  <div className="shrink-0">
                    <div className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center ${status === "Mendatang" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                      <Calendar className="w-5 h-5 mb-0.5" />
                      <span className="text-xs font-bold">{formatTanggalHari(k.date)}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status === "Mendatang" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{status}</span>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary/10 text-secondary capitalize">{k.category}</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{k.title}</h3>
                    <p className="text-sm text-muted-foreground">{formatTanggalPanjang(k.date)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
