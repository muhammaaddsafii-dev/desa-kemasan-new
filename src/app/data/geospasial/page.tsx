import { getCombinedGeoPoints } from "@/lib/data/geo";
import { getAssetsCurrent } from "@/lib/data/profil";
import { GeospasialPagePanel } from "@/components/geospasial-page-panel";

// Render dinamis per-request, jangan di-prerender statis saat build: saat build image Docker,
// API_URL belum ter-set ke backend produksi (env var Cloud Run baru tersedia saat container jalan,
// bukan saat "docker build") - prerender statis akan gagal fetch/bake data kosong.
export const dynamic = "force-dynamic";

export default async function Geospasial() {
  const [geoPoints, assets] = await Promise.all([getCombinedGeoPoints(), getAssetsCurrent()]);
  const nama = assets?.nama ?? "Desa Sukamakmur";

  return (
    <>
      <section className="gradient-primary text-primary-foreground py-16 md:py-20">
        <div className="container-village">
          <span className="text-sm font-medium opacity-80">Data Desa &gt; Geospasial</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Data Geospasial</h1>
          <p className="mt-3 opacity-90 max-w-2xl">Peta wilayah dan informasi spasial {nama}.</p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        {/* Area peta dibuat lebih lebar dari container biasa supaya peta tampil besar. */}
        <div className="mx-auto w-full max-w-[1760px] px-3 sm:px-5 lg:px-8">
          <GeospasialPagePanel points={geoPoints} />
        </div>

      </section>
    </>
  );
}
