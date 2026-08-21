import { getCombinedGeoPoints } from "@/lib/data/geo";
import { getAssetsCurrent } from "@/lib/data/profil";
import { GeospasialPagePanel } from "@/components/geospasial-page-panel";

// Render dinamis per-request, jangan di-prerender statis saat build: saat build image Docker,
// API_URL belum ter-set ke backend produksi (env var Cloud Run baru tersedia saat container jalan,
// bukan saat "docker build") - prerender statis akan gagal fetch/bake data kosong.
export const dynamic = "force-dynamic";

const infos = [
  { label: "Luas Wilayah", value: "12,5 km²" },
  { label: "Batas Utara", value: "Desa Cikalong" },
  { label: "Batas Selatan", value: "Desa Mekarjaya" },
  { label: "Batas Timur", value: "Desa Cipatat" },
  { label: "Batas Barat", value: "Desa Padalarang" },
  { label: "Sawah", value: "4,2 km² (33,6%)" },
  { label: "Perkebunan", value: "3,1 km² (24,8%)" },
  { label: "Pemukiman", value: "2,8 km² (22,4%)" },
  { label: "Hutan", value: "1,5 km² (12%)" },
  { label: "Lainnya", value: "0,9 km² (7,2%)" },
];

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

      <section className="section-padding">
        <div className="container-village">
          <GeospasialPagePanel points={geoPoints} />

          {/* Spatial Info */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-foreground mb-4">Informasi Spasial Desa</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {infos.map((d) => (
                <div key={d.label} className="card-village p-4">
                  <span className="text-xs text-muted-foreground">{d.label}</span>
                  <span className="block font-semibold text-foreground mt-1">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
