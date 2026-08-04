import { Eye, Target } from "lucide-react";

import { getAssetsCurrent } from "@/lib/data/profil";

export default async function VisiMisi() {
  const assets = await getAssetsCurrent();
  const visi = assets?.visi?.trim();
  const misi = assets?.misi?.trim();

  return (
    <>
      <section className="gradient-primary text-primary-foreground py-16 md:py-20">
        <div className="container-village">
          <span className="text-sm font-medium opacity-80">Profil &gt; Visi dan Misi</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Visi dan Misi</h1>
          <p className="mt-3 opacity-90 max-w-2xl">Arah dan tujuan pembangunan {assets?.nama ?? "desa"}.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-village max-w-4xl">
          {/* Visi */}
          <div className="card-village p-8 md:p-12 mb-10 text-center border-2 border-primary/20">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-5">
              <Eye className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Visi</h2>
            {visi ? (
              <p className="text-lg text-muted-foreground leading-relaxed italic">&quot;{visi}&quot;</p>
            ) : (
              <p className="text-muted-foreground">Belum ada data visi.</p>
            )}
          </div>

          {/* Misi */}
          <div className="card-village p-8 md:p-12 text-center border-2 border-secondary/20">
            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mx-auto mb-5">
              <Target className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Misi</h2>
            {misi ? (
              <p className="text-lg text-muted-foreground leading-relaxed italic whitespace-pre-line">&quot;{misi}&quot;</p>
            ) : (
              <p className="text-muted-foreground">Belum ada data misi.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
