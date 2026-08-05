import { User } from "lucide-react";

import { getPerangkatDesaList } from "@/lib/data/profil";
import type { PerangkatDesa } from "@/lib/types/profil";
import { SafeImage } from "@/components/safe-image";

const PersonCard = ({ nama, jabatan, foto, highlight }: { nama: string; jabatan: string; foto: string | null; highlight?: boolean }) => (
  <div className={`card-village p-5 text-center ${highlight ? "border-2 border-primary/30" : ""}`}>
    {foto ? (
      <SafeImage
        src={foto}
        alt={nama}
        className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
        fallbackClassName={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${highlight ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
      />
    ) : (
      <div className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${highlight ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
        <User className="w-7 h-7" />
      </div>
    )}
    <h3 className="font-semibold text-foreground text-sm">{nama}</h3>
    <p className="text-xs text-muted-foreground mt-1">{jabatan}</p>
  </div>
);

function jabatanLabel(p: PerangkatDesa) {
  return p.periode ? `${p.jabatan} (${p.periode})` : p.jabatan;
}

export default async function Struktur() {
  const perangkatDesa = await getPerangkatDesaList();

  const kepala = perangkatDesa.filter((p) => p.kelompok === "kepala_desa");
  const perangkat = perangkatDesa.filter((p) => p.kelompok === "perangkat");
  const kadusDusun = perangkatDesa.filter((p) => p.kelompok === "kadus");
  const bpd = perangkatDesa.filter((p) => p.kelompok === "bpd");

  return (
    <>
      <section className="gradient-primary text-primary-foreground py-16 md:py-20">
        <div className="container-village">
          <span className="text-sm font-medium opacity-80">Profil &gt; Struktur Organisasi</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Struktur Organisasi</h1>
          <p className="mt-3 opacity-90 max-w-2xl">Aparatur pemerintah desa yang melayani masyarakat.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-village max-w-5xl">
          {perangkatDesa.length === 0 && (
            <p className="text-center text-muted-foreground">Belum ada data struktur organisasi.</p>
          )}

          {/* Kepala Desa */}
          {kepala.length > 0 && (
            <div className="text-center mb-12">
              <h2 className="text-xl font-bold text-foreground mb-6">Kepala Desa</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {kepala.map((p) => (
                  <div key={p.id} className="w-full max-w-xs">
                    <PersonCard nama={p.nama} jabatan={jabatanLabel(p)} foto={p.file_foto} highlight />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Perangkat */}
          {perangkat.length > 0 && (
            <>
              <h2 className="text-xl font-bold text-foreground mb-6">Perangkat Desa</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                {perangkat.map((p) => (
                  <PersonCard key={p.id} nama={p.nama} jabatan={jabatanLabel(p)} foto={p.file_foto} />
                ))}
              </div>
            </>
          )}

          {/* Kadus */}
          {kadusDusun.length > 0 && (
            <>
              <h2 className="text-xl font-bold text-foreground mb-6">Kepala Dusun</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {kadusDusun.map((p) => (
                  <PersonCard key={p.id} nama={p.nama} jabatan={jabatanLabel(p)} foto={p.file_foto} />
                ))}
              </div>
            </>
          )}

          {/* BPD */}
          {bpd.length > 0 && (
            <>
              <h2 className="text-xl font-bold text-foreground mb-6">Badan Permusyawaratan Desa (BPD)</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {bpd.map((p) => (
                  <PersonCard key={p.id} nama={p.nama} jabatan={jabatanLabel(p)} foto={p.file_foto} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
