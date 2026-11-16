import { KegiatanList } from "@/components/kegiatan-list";
import { getAllKegiatan } from "@/lib/data/informasi";

// Jangan di-prerender statis saat build (API_URL belum ke backend produksi saat itu) - lihat
// catatan di src/app/data/geospasial/page.tsx.
export const dynamic = "force-dynamic";

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
          <KegiatanList items={data} today={today} />
        </div>
      </section>
    </>
  );
}
