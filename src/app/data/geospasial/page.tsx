import { Map, Layers, Info, Building, Trees, Droplets, Home } from "lucide-react";

const layers = [
  { icon: Home, label: "Batas Wilayah", desc: "Batas administratif desa, dusun, RT/RW", active: true },
  { icon: Building, label: "Fasilitas Umum", desc: "Sekolah, puskesmas, masjid, balai desa", active: true },
  { icon: Trees, label: "Tutupan Lahan", desc: "Sawah, perkebunan, hutan, pemukiman", active: false },
  { icon: Droplets, label: "Sumber Air", desc: "Sungai, mata air, irigasi", active: false },
];

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

export default function Geospasial() {
  return (
    <>
      <section className="gradient-primary text-primary-foreground py-16 md:py-20">
        <div className="container-village">
          <span className="text-sm font-medium opacity-80">Data Desa &gt; Geospasial</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Data Geospasial</h1>
          <p className="mt-3 opacity-90 max-w-2xl">Peta wilayah dan informasi spasial Desa Sukamakmur.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-village">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map */}
            <div className="lg:col-span-2">
              <div className="card-village overflow-hidden">
                <div className="h-[28rem] md:h-[32rem] bg-village-blue-light flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Map className="w-20 h-20 mx-auto mb-4 opacity-30" />
                    <p className="font-medium">Peta Interaktif Desa Sukamakmur</p>
                    <p className="text-xs opacity-60 mt-1">Integrasi GIS / OpenStreetMap akan ditampilkan di sini</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Layer Toggle */}
              <div className="card-village p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Layer Peta</h3>
                </div>
                <div className="space-y-3">
                  {layers.map((l) => (
                    <label key={l.label} className="flex items-start gap-3 cursor-pointer group">
                      <input type="checkbox" defaultChecked={l.active} className="mt-1 rounded border-input accent-primary" />
                      <div>
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{l.label}</span>
                        <span className="block text-xs text-muted-foreground">{l.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="card-village p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Legenda</h3>
                </div>
                <div className="space-y-2">
                  {[
                    { color: "bg-primary", label: "Batas Desa" },
                    { color: "bg-secondary", label: "Fasilitas Umum" },
                    { color: "bg-accent", label: "Jalan Desa" },
                    { color: "bg-blue-400", label: "Sungai / Air" },
                    { color: "bg-green-300", label: "Area Pertanian" },
                  ].map((l) => (
                    <div key={l.label} className="flex items-center gap-2">
                      <div className={`w-4 h-3 rounded-sm ${l.color}`} />
                      <span className="text-sm text-muted-foreground">{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

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
