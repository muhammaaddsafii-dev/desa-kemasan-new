import { PengumumanList } from "@/components/pengumuman-list";
import { getAllPengumuman } from "@/lib/data/informasi";

// Jangan di-prerender statis saat build (API_URL belum ke backend produksi saat itu) - lihat
// catatan di src/app/data/geospasial/page.tsx.
export const dynamic = "force-dynamic";

export default async function Pengumuman() {
  const data = await getAllPengumuman();
  const today = new Date().toISOString().slice(0, 10);

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
        <div className="container-village">
          <PengumumanList items={data} today={today} />
        </div>
      </section>
    </>
  );
}
